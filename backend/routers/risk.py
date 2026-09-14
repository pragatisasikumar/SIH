from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.risk_service import calculate_explainable_risk
from schemas.analysis_schema import (
    ExplainableRiskResult,
    TamperingAnalysisResult,
    DocumentValidationResult,
    MRZAnalysisResult,
    FaceVerificationResult
)

router = APIRouter(prefix="/api", tags=["Risk Engine"])

class CalculateRiskRequest(BaseModel):
    tampering: TamperingAnalysisResult
    validation: DocumentValidationResult
    mrz: MRZAnalysisResult
    face: FaceVerificationResult
    scenario_preset: Optional[str] = None

@router.post("/risk/calculate", response_model=ExplainableRiskResult)
def risk_calculate_endpoint(payload: CalculateRiskRequest):
    """Calculates explainable 0-100 risk score and human review recommendation."""
    return calculate_explainable_risk(
        tampering=payload.tampering,
        validation=payload.validation,
        mrz=payload.mrz,
        face=payload.face,
        scenario_preset=payload.scenario_preset
    )
