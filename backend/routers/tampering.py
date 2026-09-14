from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.document_service import load_image_from_base64_or_path
from services.tampering_service import analyze_document_tampering
from schemas.analysis_schema import TamperingAnalysisResult

router = APIRouter(prefix="/api", tags=["Tampering & Forensics"])

class TamperingRequest(BaseModel):
    document_image_base64: Optional[str] = None
    document_type: Optional[str] = "Passport"
    scenario_preset: Optional[str] = None

@router.post("/tampering/analyze", response_model=TamperingAnalysisResult)
def tampering_endpoint(payload: TamperingRequest):
    """Executes AI-assisted forensic inspection on photo, text, stamps, and metadata."""
    img = load_image_from_base64_or_path(payload.document_image_base64)
    return analyze_document_tampering(
        img=img,
        doc_type=payload.document_type,
        scenario_preset=payload.scenario_preset
    )
