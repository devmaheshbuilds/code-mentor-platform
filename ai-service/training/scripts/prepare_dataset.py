"""Turn chat JSONL into Qwen chat-template text rows for train.py."""
import json
from pathlib import Path
from transformers import AutoTokenizer


# Find the ai-service folder automatically
AI_SERVICE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = AI_SERVICE_DIR / "models" / "Qwen3.5-4B-Base"
INPUT_PATH = AI_SERVICE_DIR / "training" / "dataset" / "python_teaching.jsonl"
OUTPUT_PATH = AI_SERVICE_DIR / "training" / "dataset" / "python_teaching_prepared.jsonl"


print("AI service:", AI_SERVICE_DIR)
print("Model:", MODEL_PATH)
print("Dataset:", INPUT_PATH)

print()
print("Loading Qwen tokenizer...")

tokenizer = AutoTokenizer.from_pretrained(
    str(MODEL_PATH),
    trust_remote_code=True,
)

examples = []

with open(INPUT_PATH, "r", encoding="utf-8") as f:
    for line in f:
        if not line.strip():
            continue

        example = json.loads(line)

        text = tokenizer.apply_chat_template(
            example["messages"],
            tokenize=False,
            add_generation_prompt=False,
        )

        examples.append({
            "text": text
        })


with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    for example in examples:
        f.write(
            json.dumps(example, ensure_ascii=False) + "\n"
        )


print()
print("================================")
print("Dataset preparation complete!")
print("Examples:", len(examples))
print("Saved to:", OUTPUT_PATH)
print("================================")