from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict
from services.mrz_service import analyze_mrz
from schemas.analysis_schema import MRZAnalysisResult

router = APIRouter(prefix="/api", tags=["MRZ"])

class MRZAnalyzeRequest(BaseModel):
    document_type: Optional[str] = "Passport"
    scenario_preset: Optional[str] = None
    visual_fields: Optional[Dict[str, str]] = None

@router.post("/mrz/analyze", response_model=MRZAnalysisResult)
def analyze_mrz_endpoint(payload: MRZAnalyzeRequest):
    """Parses MRZ lines, verifies 7-3-1 check digits, and cross-checks with VIZ fields."""
    return analyze_mrz(
        doc_type=payload.document_type,
        scenario_preset=payload.scenario_preset,
        visual_fields=payload.visual_fields
    )
