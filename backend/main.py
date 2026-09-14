import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import engine, Base, SessionLocal
from services.demo_service import seed_demo_history
from routers import screening, ocr, mrz, validation, tampering, face, risk, blockchain, analytics

# Initialize database tables
Base.metadata.create_all(bind=engine)

# Seed initial historical demo data & Genesis block
db = SessionLocal()
try:
    seed_demo_history(db)
finally:
    db.close()

app = FastAPI(
    title="SecureID AI Backend",
    description="AI-Powered Fake Identity & Document Screening Platform API",
    version="2.1.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static demo assets
DEMO_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "demo"))
if os.path.exists(DEMO_DIR):
    app.mount("/demo", StaticFiles(directory=DEMO_DIR), name="demo")

# Include Routers
app.include_router(screening.router)
app.include_router(ocr.router)
app.include_router(mrz.router)
app.include_router(validation.router)
app.include_router(tampering.router)
app.include_router(face.router)
app.include_router(risk.router)
app.include_router(blockchain.router)
app.include_router(analytics.router)

@app.get("/api/health")
def health_check():
    """System health status endpoint for frontend monitoring."""
    return {
        "status": "ONLINE",
        "service": "SecureID AI Border Screening Platform",
        "version": "2.1.0",
        "database": "SQLite (Connected)",
        "ocr_engine": "READY (Multi-Engine & Rule Matrix)",
        "forensics_engine": "READY (ELA / Edge / Metadata / Baseline)",
        "face_engine": "READY (Structural & Similarity)",
        "blockchain_ledger": "VERIFIED (SHA-256 Tamper-Evident)"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
