"""
Local AI mentor service for Code Mentor.

The Node server proxies to POST http://127.0.0.1:8000/hint

Run from ai-service/:
    .venv\\Scripts\\python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.hint import router as hint_router

app = FastAPI(title="Code Mentor AI", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(hint_router)
