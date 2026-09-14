@echo off
echo ================================================================
echo   Starting SecureID AI - Border Screening Platform
echo ================================================================

echo [1/3] Generating Synthetic Assets & Checking Dependencies...
python -m pip install -q -r backend\requirements.txt
python demo\generate_demo_assets.py

echo [2/3] Starting FastAPI Backend on http://127.0.0.1:8000...
start cmd /k "cd backend && python main.py"

echo [3/3] Starting Vite React Frontend on http://localhost:5173...
start cmd /k "cd frontend && npm run dev"

echo.
echo SecureID AI is now launching!
echo Backend API:  http://127.0.0.1:8000 (Swagger: http://127.0.0.1:8000/docs)
echo Frontend App: http://localhost:5173
echo ================================================================
