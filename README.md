# Code Mentor Platform

Python-only teaching app: explain one line, check understanding, then the learner types the line with five hints.

## Layout

- `client/` — Vite + React workspace (editor + interactive mentor)
- `server/` — Express API over Supabase Postgres
- `ai-service/` — Qwen 3.5 4B LoRA training for a hint-first teacher

## Run the frontend

```bash
cd client
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

1. Type Python and press **Explain my code**
2. Answer with I understood nothing / Explain in detail / I got this part
3. When ready, type each line yourself (hints 1–4, hint 5 shows the line)

## Run the API

```bash
cd server
cp .env.example .env
# put your Supabase DATABASE_URL in .env
npm install
npm start
```

## Train the mentor (optional)

Needs a local base model in `ai-service/models/Qwen3.5-4B-Base` (not in git).

```bash
cd ai-service
python training/scripts/prepare_dataset.py
python training/scripts/train.py
```
