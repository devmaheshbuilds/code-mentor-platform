"""
Fine-tune Qwen 3.5 4B as a hint-first Python teacher (LoRA).
Pipeline: build_curriculum_dataset.py → prepare_dataset.py → train.py
"""
from __future__ import annotations

import sys
from pathlib import Path

import torch
import yaml
from datasets import load_dataset
from peft import LoraConfig, get_peft_model
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    DataCollatorForLanguageModeling,
    Trainer,
    TrainingArguments,
    set_seed,
)

AI_SERVICE_DIR = Path(__file__).resolve().parents[2]
CONFIG_PATH = AI_SERVICE_DIR / "training" / "configs" / "qwen3.5-4b-lora.yaml"


def load_config() -> dict:
    with open(CONFIG_PATH, encoding="utf-8") as f:
        raw = yaml.safe_load(f)
    return {
        "model_path": AI_SERVICE_DIR / raw["model_path"],
        "prepared_path": AI_SERVICE_DIR / raw["prepared_path"],
        "output_path": AI_SERVICE_DIR / raw["output_path"],
        "lora": raw["lora"],
        "training": raw["training"],
    }


def main() -> None:
    cfg = load_config()
    train_cfg = cfg["training"]
    lora_cfg = cfg["lora"]

    device = "cuda" if torch.cuda.is_available() else "cpu"
    set_seed(train_cfg.get("seed", 42))

    print("=" * 40)
    print("CODE MENTOR TRAINING")
    print("=" * 40)
    print("Device:", device)
    if device == "cpu":
        print("WARNING: 4B model on CPU is very slow and may OOM. GPU recommended.")
    print("Model:", cfg["model_path"])
    print("Dataset:", cfg["prepared_path"])
    print()

    if not cfg["prepared_path"].exists():
        raise FileNotFoundError(
            f"Prepared dataset not found at {cfg['prepared_path']}. "
            "Run prepare_dataset.py first."
        )

    tokenizer = AutoTokenizer.from_pretrained(
        str(cfg["model_path"]),
        trust_remote_code=True,
    )
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    dataset = load_dataset(
        "json",
        data_files=str(cfg["prepared_path"]),
        split="train",
    )
    print("Examples:", len(dataset))

    eval_ratio = train_cfg.get("eval_ratio", 0.05)
    if eval_ratio > 0 and len(dataset) > 20:
        split = dataset.train_test_split(test_size=eval_ratio, seed=train_cfg.get("seed", 42))
        train_dataset = split["train"]
        eval_dataset = split["test"]
        print("Train:", len(train_dataset), "| Eval:", len(eval_dataset))
    else:
        train_dataset = dataset
        eval_dataset = None

    max_length = train_cfg.get("max_length", 1024)

    def tokenize_function(example):
        return tokenizer(
            example["text"],
            truncation=True,
            max_length=max_length,
        )

    train_tokenized = train_dataset.map(
        tokenize_function,
        batched=False,
        remove_columns=train_dataset.column_names,
    )
    eval_tokenized = None
    if eval_dataset is not None:
        eval_tokenized = eval_dataset.map(
            tokenize_function,
            batched=False,
            remove_columns=eval_dataset.column_names,
        )

    lora_config = LoraConfig(
        r=lora_cfg["r"],
        lora_alpha=lora_cfg["lora_alpha"],
        lora_dropout=lora_cfg["lora_dropout"],
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=lora_cfg["target_modules"],
    )

    use_bf16 = train_cfg.get("bf16", False) and torch.cuda.is_available()
    use_fp16 = train_cfg.get("fp16", False) and torch.cuda.is_available() and not use_bf16

    model = AutoModelForCausalLM.from_pretrained(
        str(cfg["model_path"]),
        torch_dtype=torch.bfloat16 if use_bf16 else torch.float32,
        low_cpu_mem_usage=True,
        trust_remote_code=True,
    )
    model = get_peft_model(model, lora_config)
    model.print_trainable_parameters()

    cfg["output_path"].mkdir(parents=True, exist_ok=True)

    training_args = TrainingArguments(
        output_dir=str(cfg["output_path"]),
        num_train_epochs=train_cfg.get("num_train_epochs", 3),
        per_device_train_batch_size=train_cfg.get("per_device_train_batch_size", 1),
        gradient_accumulation_steps=train_cfg.get("gradient_accumulation_steps", 8),
        learning_rate=train_cfg.get("learning_rate", 1e-4),
        warmup_ratio=train_cfg.get("warmup_ratio", 0.05),
        weight_decay=train_cfg.get("weight_decay", 0.01),
        logging_steps=train_cfg.get("logging_steps", 5),
        save_strategy=train_cfg.get("save_strategy", "epoch"),
        eval_strategy="epoch" if eval_tokenized is not None else "no",
        report_to="none",
        bf16=use_bf16,
        fp16=use_fp16,
        optim="adamw_torch",
        remove_unused_columns=False,
        load_best_model_at_end=eval_tokenized is not None,
    )

    data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_tokenized,
        eval_dataset=eval_tokenized,
        data_collator=data_collator,
    )

    print()
    print("=" * 40)
    print("STARTING TRAINING")
    print("=" * 40)

    trainer.train()

    model.save_pretrained(str(cfg["output_path"]))
    tokenizer.save_pretrained(str(cfg["output_path"]))

    print()
    print("=" * 40)
    print("TRAINING COMPLETE")
    print("Saved to:", cfg["output_path"])
    print("Restart uvicorn and check GET /health for adapter_ready: true")
    print("=" * 40)


if __name__ == "__main__":
    main()
