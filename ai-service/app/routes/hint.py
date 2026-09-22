"""
POST /hint — matches the Node mentor proxy contract.

Request:  { lesson_id, student_code, question }
Response: { hint: "..." }

Uses the LoRA coding-teacher adapter when it exists; otherwise a stub
so the proxy can be tested without a trained model.
"""
from __future__ import annotations

import re
import sys
from functools import lru_cache
from pathlib import Path

from fastapi import APIRouter
from pydantic import BaseModel, Field

TRAINING_DIR = Path(__file__).resolve().parents[2] / "training"
sys.path.insert(0, str(TRAINING_DIR))
from prompts import SYSTEM_PROMPT, build_user_message  # noqa: E402

router = APIRouter()

AI_SERVICE_DIR = Path(__file__).resolve().parents[2]
BASE_MODEL = AI_SERVICE_DIR / "models" / "Qwen3.5-4B-Base"
ADAPTER_PATH = AI_SERVICE_DIR / "training" / "outputs" / "qwen3.5-4b-coding-teacher"

STUB_HINT = "Try checking your loop condition"


class HintRequest(BaseModel):
    lesson_id: str = Field(..., examples=["variables"])
    student_code: str = Field(..., examples=["age = 19"])
    question: str = Field(..., examples=["What should I do next?"])
    hint_level: int = Field(default=1, ge=1, le=4)


class HintResponse(BaseModel):
    hint: str


@lru_cache(maxsize=1)
def _load_teacher():
    """Load base model + LoRA adapter once. Returns None if not available."""
    if not ADAPTER_PATH.exists() or not BASE_MODEL.exists():
        return None

    import torch
    from peft import PeftModel
    from transformers import AutoModelForCausalLM, AutoTokenizer

    tokenizer = AutoTokenizer.from_pretrained(str(BASE_MODEL), trust_remote_code=True)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    dtype = torch.float16 if torch.cuda.is_available() else torch.float32
    model = AutoModelForCausalLM.from_pretrained(
        str(BASE_MODEL),
        torch_dtype=dtype,
        low_cpu_mem_usage=True,
        trust_remote_code=True,
    )
    model = PeftModel.from_pretrained(model, str(ADAPTER_PATH))
    model.eval()
    if torch.cuda.is_available():
        model.to("cuda")
    return tokenizer, model


def _parse_hint_level(question: str, explicit: int) -> int:
    match = re.search(r"hint level\s*(\d)", question, re.IGNORECASE)
    if match:
        return max(1, min(4, int(match.group(1))))
    return max(1, min(4, explicit))


def _generate_hint(body: HintRequest) -> str:
    loaded = _load_teacher()
    if loaded is None:
        return STUB_HINT

    tokenizer, model = loaded
    import torch

    hint_level = _parse_hint_level(body.question, body.hint_level)
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {
            "role": "user",
            "content": build_user_message(
                body.lesson_id,
                body.student_code,
                body.question,
                hint_level,
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
            max_new_tokens=120,
            do_sample=False,
            pad_token_id=tokenizer.eos_token_id,
        )

    new_tokens = output[0][inputs["input_ids"].shape[-1] :]
    text = tokenizer.decode(new_tokens, skip_special_tokens=True).strip()
    return text or STUB_HINT


@router.post("/hint", response_model=HintResponse)
def hint(body: HintRequest) -> HintResponse:
    return HintResponse(hint=_generate_hint(body))


@router.get("/health")
def health():
    return {
        "status": "ok",
        "adapter_ready": ADAPTER_PATH.exists(),
        "base_model_ready": BASE_MODEL.exists(),
    }
