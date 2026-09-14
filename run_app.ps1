Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  Starting SecureID AI - Border Screening Platform" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

# 1. Check Python & Dependencies
Write-Host "[1/3] Verifying Python Environment..." -ForegroundColor Yellow
python -m pip install -q -r backend/requirements.txt
python demo/generate_demo_assets.py

# 2. Start Backend
Write-Host "[2/3] Launching FastAPI Backend on http://127.0.0.1:8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/backend'; python main.py"

# 3. Start Frontend
Write-Host "[3/3] Launching Vite React Frontend on http://localhost:5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/frontend'; npm run dev"

Write-Host "`nSecureID AI is starting!" -ForegroundColor Cyan
Write-Host "Backend API:  http://127.0.0.1:8000 (Docs: http://127.0.0.1:8000/docs)" -ForegroundColor White
Write-Host "Frontend App: http://localhost:5173" -ForegroundColor White
Write-Host "================================================================" -ForegroundColor Cyan
