# Code Mentor AI Service

Python mentor service used by the Node proxy at `POST /api/mentor/hint`.

**Endpoint:** `http://127.0.0.1:8000/hint`

## Run (inference)

```powershell
cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Health check: `GET http://127.0.0.1:8000/health`

- `base_model_ready` — weights in `models/Qwen3.5-4B-Base`
- `adapter_ready` — LoRA adapter in `training/outputs/qwen3.5-4b-coding-teacher`

Without a trained adapter, hints return a stub string so the proxy still works.

## Train the coding-teacher model (GPU recommended)

### 1. Place base model

Download Qwen3.5-4B-Base into `models/Qwen3.5-4B-Base` (gitignored).

### 2. Build dataset from curriculum

Generates ~270+ examples from lesson exercises (hint levels 1–4 per topic):

```powershell
cd ai-service
python training/scripts/build_curriculum_dataset.py
```

Output: `training/dataset/python_teaching_full.jsonl`

### 3. Prepare for Qwen chat template

```powershell
python training/scripts/prepare_dataset.py
```

Output: `training/dataset/python_teaching_prepared.jsonl`

### 4. Train LoRA adapter

```powershell
python training/scripts/train.py
```

Config: `training/configs/qwen3.5-4b-lora.yaml` (epochs, LoRA rank, LR, etc.)

Output: `training/outputs/qwen3.5-4b-coding-teacher/`

**Note:** CPU-only machines will likely OOM on the 4B model. Use a CUDA GPU.

### 5. Evaluate

```powershell
python training/scripts/evaluate.py
```

### 6. Restart inference

```powershell
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Check `GET /health` → `adapter_ready: true`

## Training pipeline overview

```
lessonExercises/*.ts  ──► build_curriculum_dataset.py
python_teaching.jsonl ──►     python_teaching_full.jsonl
                                    │
                                    ▼
                          prepare_dataset.py (unified system prompt)
                                    │
                                    ▼
                          python_teaching_prepared.jsonl
                                    │
                                    ▼
                               train.py (LoRA)
                                    │
                                    ▼
                    training/outputs/qwen3.5-4b-coding-teacher/
                                    │
                                    ▼
                              hint.py (inference)
```

## Hint levels (training + inference)

| Level | Behavior |
|-------|----------|
| 1 | Gentle nudge / guiding question |
| 2 | Syntax or approach direction |
| 3 | Strong hint, no full solution |
| 4 | Complete solution allowed |

Prompts live in `training/prompts.py` — keep training and inference in sync.
