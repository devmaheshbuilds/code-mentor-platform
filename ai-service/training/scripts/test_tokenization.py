"""Sanity-check that the prepared dataset tokenizes with the Qwen tokenizer."""
import json
from pathlib import Path
from transformers import AutoTokenizer


AI_SERVICE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = AI_SERVICE_DIR / "models" / "Qwen3.5-4B-Base"
DATASET_PATH = AI_SERVICE_DIR / "training" / "dataset" / "python_teaching_prepared.jsonl"


print("Loading tokenizer...")

tokenizer = AutoTokenizer.from_pretrained(
    str(MODEL_PATH),
    trust_remote_code=True,
)

print("Tokenizer loaded.")
print()

with open(DATASET_PATH, "r", encoding="utf-8") as f:
    examples = [json.loads(line) for line in f if line.strip()]

print("Examples:", len(examples))
print()

for i, example in enumerate(examples, 1):
    tokens = tokenizer(
        example["text"],
        truncation=False,
        add_special_tokens=False,
    )

    token_count = len(tokens["input_ids"])

    print(f"Example {i}: {token_count} tokens")

print()
print("==============================")
print("TOKENIZATION TEST: PASSED")
print("==============================")