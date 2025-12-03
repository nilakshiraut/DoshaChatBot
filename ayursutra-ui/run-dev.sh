#!/bin/bash

# AyurSutra Development Runner
# This script runs both backend and frontend for development

echo "🌿 Starting AyurSutra Development Environment"
echo "==============================================="

# Check if we're in the right directory
if [ ! -d "../backend" ]; then
    echo "❌ Error: Backend directory not found. Please run from ayursutra-ui directory."
    exit 1
fi

# Start backend in background
echo "🚀 Starting AyurSutra Backend..."
cd ../backend
python app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting AyurSutra Frontend..."
cd ../ayursutra-ui
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both services started!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend: http://127.0.0.1:8000"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
