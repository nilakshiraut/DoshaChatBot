"""
AyurSutra - Main FastAPI Application
Ayurvedic Dosha Detection & Panchakarma Recommendation Chatbot
"""
      
        from fastapi import FastAPI
        from fastapi.middleware.cors import CORSMiddleware
        import os
        from dotenv import load_dotenv

        load_dotenv() # For local development, loads .env file

        app = FastAPI(
            title="AyurSutra API",
            description="API for Ayurvedic Dosha Detection and Panchakarma Recommendation     Chatbot",
            version="1.0.0",
        )

        # Get frontend URL from environment variable
        frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:5173") # Default for local dev

        origins = [
            frontend_url,
            "http://localhost:5173",  # For local frontend development
            "http://127.0.0.1:8000",  # For local backend testing
            # Add other local dev origins if needed
        ]

        app.add_middleware(
            CORSMiddleware,
            allow_origins=origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        
# Include routers
app.include_router(chat.router)
app.include_router(assessment.router)
app.include_router(pdf.router)

# Mount static files for reports
reports_dir = os.path.join(os.path.dirname(__file__), 'reports')
os.makedirs(reports_dir, exist_ok=True)
app.mount("/reports", StaticFiles(directory=reports_dir), name="reports")

@app.get("/")
async def root():
    return {
        "message": "Namaste! Welcome to AyurSutra API",
        "version": "1.0.0",
        "endpoints": {
            "websocket": "/ws/chat",
            "assessment": "/api/assessment",
            "pdf": "/api/pdf/generate"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

