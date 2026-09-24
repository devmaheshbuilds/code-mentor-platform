# Code Mentor — start all services (run from project root)
$root = $PSScriptRoot

Write-Host "Starting Code Mentor Platform..." -ForegroundColor Cyan
Write-Host ""

# Server (port 3000)
Start-Process powershell -ArgumentList @(
  '-NoExit', '-Command',
  "cd '$root\server'; Write-Host 'SERVER (port 3000)' -ForegroundColor Green; npm start"
)

Start-Sleep -Seconds 2

# AI service (port 8000)
Start-Process powershell -ArgumentList @(
  '-NoExit', '-Command',
  "cd '$root\ai-service'; Write-Host 'AI SERVICE (port 8000)' -ForegroundColor Green; .\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000"
)

Start-Sleep -Seconds 2

# Frontend (port 5173)
Start-Process powershell -ArgumentList @(
  '-NoExit', '-Command',
  "cd '$root\client'; Write-Host 'FRONTEND (port 5173)' -ForegroundColor Green; npm run dev"
)

Write-Host ""
Write-Host "3 terminals opened. Open your browser at:" -ForegroundColor Yellow
Write-Host "  http://127.0.0.1:5173" -ForegroundColor White
Write-Host ""
Write-Host "Do NOT use VS Code Go Live." -ForegroundColor Red
