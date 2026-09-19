"""
Fine-tune Qwen 3.5 4B as a hint-first Python teacher (LoRA, not full weights).
Reads python_teaching_prepared.jsonl and writes qwen3.5-4b-coding-teacher.
"""
import torch
from pathlib import Path
from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling,
)
from peft import LoraConfig, get_peft_model


# ============================================================
# PATHS
# ============================================================

AI_SERVICE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = AI_SERVICE_DIR / "models" / "Qwen3.5-4B-Base"
DATASET_PATH = AI_SERVICE_DIR / "training" / "dataset" / "python_teaching_prepared.jsonl"
OUTPUT_PATH = AI_SERVICE_DIR / "training" / "outputs" / "qwen3.5-4b-coding-teacher"


# ============================================================
# DEVICE
# ============================================================

device = "cuda" if torch.cuda.is_available() else "cpu"

print("================================")
print("CODE MENTOR TRAINING")
print("================================")
print("Device:", device)
print("Model:", MODEL_PATH)
print("Dataset:", DATASET_PATH)
print()


# ============================================================
# TOKENIZER
# ============================================================

print("Loading tokenizer...")

tokenizer = AutoTokenizer.from_pretrained(
    str(MODEL_PATH),
    trust_remote_code=True,
)

if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

print("Tokenizer loaded.")
print()


# ============================================================
# DATASET
# ============================================================

print("Loading dataset...")

dataset = load_dataset(
    "json",
    data_files=str(DATASET_PATH),
    split="train",
)

print("Examples:", len(dataset))
print()


# ============================================================
# TOKENIZATION
# ============================================================

def tokenize_function(example):
    return tokenizer(
        example["text"],
        truncation=True,
        max_length=1024,
    )


print("Tokenizing dataset...")

tokenized_dataset = dataset.map(
    tokenize_function,
    batched=False,
    remove_columns=dataset.column_names,
)

print("Tokenization complete.")
print()


# ============================================================
# LoRA
# ============================================================

print("Creating LoRA configuration...")

lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
    target_modules=[
        "q_proj",
        "k_proj",
        "v_proj",
        "o_proj",
    ],
)

print("LoRA configuration created.")
print()


# ============================================================
# MODEL
# ============================================================

print("Loading Qwen model...")

model = AutoModelForCausalLM.from_pretrained(
    str(MODEL_PATH),
    torch_dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
    low_cpu_mem_usage=True,
)

model = get_peft_model(model, lora_config)

model.print_trainable_parameters()

print()


# ============================================================
# TRAINING
# ============================================================

training_args = TrainingArguments(
    output_dir=str(OUTPUT_PATH),

    num_train_epochs=1,

    per_device_train_batch_size=1,
    gradient_accumulation_steps=4,

    learning_rate=2e-4,

    logging_steps=1,
    save_strategy="no",

    report_to="none",

    fp16=torch.cuda.is_available(),
    bf16=torch.cuda.is_available(),

    optim="adamw_torch",

    remove_unused_columns=False,
)


# ============================================================
# DATA COLLATOR
# ============================================================

data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False,
)


# ============================================================
# TRAINER
# ============================================================

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    data_collator=data_collator,
)


# ============================================================
# START
# ============================================================

print("================================")
print("STARTING TRAINING")
print("================================")
print()

trainer.train()

print()
print("================================")
print("TRAINING COMPLETE")
print("================================")

model.save_pretrained(str(OUTPUT_PATH))
tokenizer.save_pretrained(str(OUTPUT_PATH))

print("Saved to:", OUTPUT_PATH)