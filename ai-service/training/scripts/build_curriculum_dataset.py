"""
Build training examples from lesson exercise TypeScript files + base jsonl.

Each subtopic produces up to 4 rows (hint levels 1–3 use curriculum hints;
level 4 uses the solution as the assistant answer).

Run from ai-service/:
  python training/scripts/build_curriculum_dataset.py
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

AI_SERVICE_DIR = Path(__file__).resolve().parents[2]
REPO_ROOT = AI_SERVICE_DIR.parent
LESSON_EXERCISES_DIR = REPO_ROOT / "client" / "src" / "data" / "lessonExercises"
BASE_JSONL = AI_SERVICE_DIR / "training" / "dataset" / "python_teaching.jsonl"
OUTPUT_JSONL = AI_SERVICE_DIR / "training" / "dataset" / "python_teaching_full.jsonl"

sys.path.insert(0, str(AI_SERVICE_DIR / "training"))
from prompts import SYSTEM_PROMPT, build_user_message  # noqa: E402


def _unescape_ts_string(raw: str) -> str:
    return (
        raw.replace("\\n", "\n")
        .replace("\\'", "'")
        .replace('\\"', '"')
        .replace("\\\\", "\\")
    )


def _extract_quoted_string(block: str, field: str) -> str | None:
    """Extract TS object field value using matching open/close quotes."""
    match = re.search(
        rf"{field}:\s*\n?\s*(['\"])(.*?)\1",
        block,
        re.DOTALL,
    )
    if match:
        return _unescape_ts_string(match.group(2))
    return None


def _extract_hints(block: str) -> list[str]:
    hints_match = re.search(r"hints:\s*\[(.*?)\]", block, re.DOTALL)
    if not hints_match:
        return []
    inner = hints_match.group(1)
    hints: list[str] = []
    for quote in ("'", '"'):
        for h in re.findall(rf"{quote}((?:\\.|[^\\{quote}])*){quote}", inner):
            hints.append(_unescape_ts_string(h))
        if hints:
            return hints
    return hints


def _find_block_end(text: str, start: int) -> int:
    """Find closing brace for object at start, ignoring braces inside strings."""
    depth = 0
    i = start
    in_string: str | None = None
    escape = False
    while i < len(text):
        ch = text[i]
        if in_string:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == in_string:
                in_string = None
        elif ch in ("'", '"'):
            if in_string == ch:
                in_string = None
            elif in_string is None:
                in_string = ch
            # Other quote type inside a string is a literal character.
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    return len(text)


def parse_lesson_exercise_file(path: Path) -> dict[str, dict]:
    text = path.read_text(encoding="utf-8")
    lesson_match = re.search(r"lessonExercises\(\s*['\"]([^'\"]+)['\"]", text)
    if not lesson_match:
        return {}
    lesson_id = lesson_match.group(1)

    entries: dict[str, dict] = {}
    for topic_match in re.finditer(
        r"^\s+(?:['\"]([^'\"]+)['\"]|(\w+)):\s*\{",
        text,
        re.MULTILINE,
    ):
        topic = topic_match.group(1) or topic_match.group(2)
        start = topic_match.end() - 1
        end = _find_block_end(text, start)
        block = text[start:end]

        concept = _extract_quoted_string(block, "concept")
        challenge = _extract_quoted_string(block, "challenge")
        starter = _extract_quoted_string(block, "starterCode")
        solution = _extract_quoted_string(block, "solution")
        hints = _extract_hints(block)

        if not concept or not challenge or len(hints) < 3:
            continue

        entries[f"{lesson_id}:{topic}"] = {
            "lesson_id": lesson_id,
            "subtopic": topic,
            "concept": concept,
            "challenge": challenge,
            "starter_code": starter or "",
            "solution": solution or "",
            "hints": hints[:3],
        }

    return entries


def curriculum_messages(entry: dict, hint_level: int) -> dict:
    lesson_id = entry["lesson_id"]
    student_code = entry["starter_code"]
    question = (
        f"I am working on '{entry['subtopic']}'. "
        f"Challenge: {entry['challenge']}"
    )

    if hint_level <= 3:
        assistant = entry["hints"][hint_level - 1]
    else:
        assistant = f"Here is the complete solution:\n\n{entry['solution']}"

    return {
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": build_user_message(
                    lesson_id,
                    student_code,
                    question,
                    hint_level,
                ),
            },
            {"role": "assistant", "content": assistant},
        ]
    }


def main() -> None:
    all_entries: dict[str, dict] = {}
    if LESSON_EXERCISES_DIR.exists():
        for ts_file in sorted(LESSON_EXERCISES_DIR.glob("*.ts")):
            if ts_file.name in ("types.ts", "index.ts"):
                continue
            parsed = parse_lesson_exercise_file(ts_file)
            all_entries.update(parsed)
            print(f"Parsed {ts_file.name}: {len(parsed)} exercises")
    else:
        print("Warning: lessonExercises dir not found:", LESSON_EXERCISES_DIR)

    generated: list[dict] = []
    for entry in all_entries.values():
        for level in (1, 2, 3, 4):
            generated.append(curriculum_messages(entry, level))

    base_rows: list[dict] = []
    if BASE_JSONL.exists():
        with open(BASE_JSONL, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    base_rows.append(json.loads(line))

    combined = base_rows + generated
    with open(OUTPUT_JSONL, "w", encoding="utf-8") as f:
        for row in combined:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")

    print()
    print("=" * 40)
    print("Dataset build complete")
    print("Base examples:", len(base_rows))
    print("Curriculum examples:", len(generated))
    print("Total:", len(combined))
    print("Saved to:", OUTPUT_JSONL)
    print("=" * 40)


if __name__ == "__main__":
    main()
