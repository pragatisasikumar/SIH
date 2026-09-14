from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict
from services.document_service import load_image_from_base64_or_path, classify_document
from services.ocr_service import extract_ocr_data
from schemas.analysis_schema import OCRExtractionResult, DocumentClassification

router = APIRouter(prefix="/api", tags=["OCR & Document"])

class ClassifyRequest(BaseModel):
    document_image_base64: Optional[str] = None
    filename: Optional[str] = ""

class ExtractOCRRequest(BaseModel):
    document_image_base64: Optional[str] = None
    document_type: Optional[str] = "Passport"
    scenario_preset: Optional[str] = None

@router.post("/document/classify", response_model=DocumentClassification)
def classify_doc(payload: ClassifyRequest):
    """Classifies the document category (Passport, Visa, National ID, etc.)."""
    img = load_image_from_base64_or_path(payload.document_image_base64)
    res = classify_document(img, filename=payload.filename)
    return DocumentClassification(**res)

@router.post("/ocr/extract", response_model=OCRExtractionResult)
def extract_ocr(payload: ExtractOCRRequest):
    """Extracts OCR text and structured fields with quality scoring."""
    img = load_image_from_base64_or_path(payload.document_image_base64)
    return extract_ocr_data(
        img=img,
        doc_type=payload.document_type,
        scenario_preset=payload.scenario_preset
    )
