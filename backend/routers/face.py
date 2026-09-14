from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.document_service import load_image_from_base64_or_path
from services.face_service import verify_faces
from schemas.analysis_schema import FaceVerificationResult

router = APIRouter(prefix="/api", tags=["Face Verification"])

class FaceVerifyRequest(BaseModel):
    document_image_base64: Optional[str] = None
    presented_face_base64: Optional[str] = None
    scenario_preset: Optional[str] = None

@router.post("/face/verify", response_model=FaceVerificationResult)
def verify_face_endpoint(payload: FaceVerifyRequest):
    """Compares document portrait with presented live face."""
    doc_img = load_image_from_base64_or_path(payload.document_image_base64)
    live_img = load_image_from_base64_or_path(payload.presented_face_base64)
    return verify_faces(
        doc_img=doc_img,
        live_img=live_img,
        scenario_preset=payload.scenario_preset
    )
