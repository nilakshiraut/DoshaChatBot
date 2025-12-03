@echo off
REM AyurSutra Development Runner (Windows)
REM This script runs both backend and frontend for development

echo 🌿 Starting AyurSutra Development Environment
echo ===============================================

REM Check if backend directory exists
if not exist "..\backend" (
    echo ❌ Error: Backend directory not found. Please run from ayursutra-ui directory.
    pause
    exit /b 1
)

REM Start backend
echo 🚀 Starting AyurSutra Backend...
start cmd /k "cd ..\backend && python app.py"

REM Wait for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend
echo 🎨 Starting AyurSutra Frontend...
npm run dev

echo.
echo ✅ Services started!
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend: http://127.0.0.1:8000
echo.
echo Close this window to stop the frontend.
echo Close the backend cmd window separately.
pause
