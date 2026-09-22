"""Quick smoke test for a trained adapter (run after train.py)."""
from __future__ import annotations

import sys
from pathlib import Path

import torch
import yaml
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

AI_SERVICE_DIR = Path(__file__).resolve().parents[2]
CONFIG_PATH = AI_SERVICE_DIR / "training" / "configs" / "qwen3.5-4b-lora.yaml"

sys.path.insert(0, str(AI_SERVICE_DIR / "training"))
from prompts import SYSTEM_PROMPT, build_user_message  # noqa: E402


SAMPLES = [
    {
        "lesson_id": "loops",
        "student_code": "count = 0\nwhile count < 3:\n    print('repeat')",
        "question": "I am working on 'Introduction to Loops'. Challenge: use while to print repeat 3 times.",
        "hint_level": 1,
    },
    {
        "lesson_id": "conditions",
        "student_code": "age = 15\n",
        "question": "Challenge: if age >= 18 print Adult else Minor.",
        "hint_level": 2,
    },
]


def main() -> None:
    with open(CONFIG_PATH, encoding="utf-8") as f:
        raw = yaml.safe_load(f)

    model_path = AI_SERVICE_DIR / raw["model_path"]
    adapter_path = AI_SERVICE_DIR / raw["output_path"]
    gen_cfg = raw.get("generation", {})

    if not adapter_path.exists():
        print("No adapter at", adapter_path)
        print("Train first: python training/scripts/train.py")
        return

    tokenizer = AutoTokenizer.from_pretrained(str(model_path), trust_remote_code=True)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    dtype = torch.bfloat16 if torch.cuda.is_available() else torch.float32
    model = AutoModelForCausalLM.from_pretrained(
        str(model_path),
        torch_dtype=dtype,
        low_cpu_mem_usage=True,
        trust_remote_code=True,
    )
    model = PeftModel.from_pretrained(model, str(adapter_path))
    model.eval()
    if torch.cuda.is_available():
        model = model.cuda()

    for i, sample in enumerate(SAMPLES, 1):
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": build_user_message(
                    sample["lesson_id"],
                    sample["student_code"],
                    sample["question"],
                    sample["hint_level"],
                ),
            },
        ]
        prompt = tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True,
        )
        inputs = tokenizer(prompt, return_tensors="pt")
        if torch.cuda.is_available():
            inputs = {k: v.cuda() for k, v in inputs.items()}

        with torch.no_grad():
            output = model.generate(
                **inputs,
                max_new_tokens=gen_cfg.get("max_new_tokens", 150),
                do_sample=gen_cfg.get("do_sample", False),
                pad_token_id=tokenizer.eos_token_id,
            )

        new_tokens = output[0][inputs["input_ids"].shape[-1] :]
        text = tokenizer.decode(new_tokens, skip_special_tokens=True).strip()
        print(f"\n--- Sample {i} (hint level {sample['hint_level']}) ---")
        print(text)


if __name__ == "__main__":
    main()
