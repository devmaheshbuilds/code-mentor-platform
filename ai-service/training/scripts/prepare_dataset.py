"""Turn chat JSONL into Qwen chat-template text rows for train.py."""
import json
import sys
from pathlib import Path

import yaml
from transformers import AutoTokenizer

AI_SERVICE_DIR = Path(__file__).resolve().parents[2]
CONFIG_PATH = AI_SERVICE_DIR / "training" / "configs" / "qwen3.5-4b-lora.yaml"

sys.path.insert(0, str(AI_SERVICE_DIR / "training"))
from prompts import SYSTEM_PROMPT  # noqa: E402


def load_config() -> dict:
    with open(CONFIG_PATH, encoding="utf-8") as f:
        raw = yaml.safe_load(f)
    return {
        "model_path": AI_SERVICE_DIR / raw["model_path"],
        "dataset_path": AI_SERVICE_DIR / raw["dataset_path"],
        "prepared_path": AI_SERVICE_DIR / raw["prepared_path"],
    }


def normalize_messages(messages: list[dict]) -> list[dict]:
    """Ensure every row uses the same system prompt as inference."""
    normalized = []
    for msg in messages:
        if msg["role"] == "system":
            normalized.append({"role": "system", "content": SYSTEM_PROMPT})
        else:
            normalized.append(msg)
    if not normalized or normalized[0]["role"] != "system":
        normalized.insert(0, {"role": "system", "content": SYSTEM_PROMPT})
    return normalized


def main() -> None:
    cfg = load_config()
    input_path = cfg["dataset_path"]
    if not input_path.exists():
        print("Full dataset missing — run build_curriculum_dataset.py first.")
        print("Falling back to python_teaching.jsonl")
        input_path = AI_SERVICE_DIR / "training" / "dataset" / "python_teaching.jsonl"

    print("AI service:", AI_SERVICE_DIR)
    print("Model:", cfg["model_path"])
    print("Dataset:", input_path)
    print()
    print("Loading Qwen tokenizer...")

    tokenizer = AutoTokenizer.from_pretrained(
        str(cfg["model_path"]),
        trust_remote_code=True,
    )

    examples = []
    with open(input_path, encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            example = json.loads(line)
            messages = normalize_messages(example["messages"])
            text = tokenizer.apply_chat_template(
                messages,
                tokenize=False,
                add_generation_prompt=False,
            )
            examples.append({"text": text})

    cfg["prepared_path"].parent.mkdir(parents=True, exist_ok=True)
    with open(cfg["prepared_path"], "w", encoding="utf-8") as f:
        for example in examples:
            f.write(json.dumps(example, ensure_ascii=False) + "\n")

    print()
    print("=" * 40)
    print("Dataset preparation complete!")
    print("Examples:", len(examples))
    print("Saved to:", cfg["prepared_path"])
    print("=" * 40)


if __name__ == "__main__":
    main()
