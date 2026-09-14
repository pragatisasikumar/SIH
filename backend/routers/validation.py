from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict
from services.validation_service import validate_document
from schemas.analysis_schema import DocumentValidationResult

router = APIRouter(prefix="/api", tags=["Validation"])

class ValidateDocRequest(BaseModel):
    document_type: Optional[str] = "Passport"
    fields: Optional[Dict[str, str]] = None
    scenario_preset: Optional[str] = None

@router.post("/document/validate", response_model=DocumentValidationResult)
def validate_doc_endpoint(payload: ValidateDocRequest):
    """Executes rule-based logical, format, and synthetic watchlist verification."""
    return validate_document(
        doc_type=payload.document_type,
        fields=payload.fields,
        scenario_preset=payload.scenario_preset
    )
