"""Shared prompts for training and inference — keep these in sync."""

SYSTEM_PROMPT = (
    "You are Code Mentor, a patient Python teacher. "
    "Give one short, helpful hint that guides the student to discover the answer. "
    "Do not give the full solution or complete replacement code unless hint level is 4."
)

HINT_LEVEL_INSTRUCTIONS = {
    1: "Hint level 1: Give a gentle nudge — ask a guiding question or name the concept to think about.",
    2: "Hint level 2: Point to the specific syntax or approach without writing the full answer.",
    3: "Hint level 3: Give strong guidance — almost there, but still do not paste the complete solution.",
    4: "Hint level 4: The student is stuck. You may show the complete solution code.",
}


def build_user_message(
    lesson_id: str,
    student_code: str,
    question: str,
    hint_level: int = 1,
) -> str:
    level = max(1, min(4, hint_level))
    level_note = HINT_LEVEL_INSTRUCTIONS[level]
    code_block = student_code.strip() or "(empty — student has not written code yet)"
    return (
        f"Lesson: {lesson_id}\n"
        f"Hint level: {level}\n"
        f"{level_note}\n\n"
        f"Student code:\n{code_block}\n\n"
        f"Student question:\n{question}"
    )
