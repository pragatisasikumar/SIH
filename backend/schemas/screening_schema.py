from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime
from schemas.analysis_schema import (
    QualityAssessment,
    DocumentClassification,
    OCRExtractionResult,
    MRZAnalysisResult,
    DocumentValidationResult,
    TamperingAnalysisResult,
    FaceVerificationResult,
    ExplainableRiskResult
)

class ScreeningCreateRequest(BaseModel):
    document_type: str = "Passport"
    scenario_preset: Optional[str] = None # "valid_passport", "tampered_visa", "id_mismatch", or custom
    document_image_base64: Optional[str] = None
    presented_face_base64: Optional[str] = None
    manual_fields: Optional[Dict[str, str]] = None

class ScreeningFullResponse(BaseModel):
    screening_id: str
    created_at: datetime
    document_type: str
    person_name: str
    document_number: str
    nationality: str
    dob: str
    expiry_date: str
    
    # Core Results
    quality: QualityAssessment
    classification: DocumentClassification
    ocr: OCRExtractionResult
    mrz: MRZAnalysisResult
    validation: DocumentValidationResult
    tampering: TamperingAnalysisResult
    face: FaceVerificationResult
    risk: ExplainableRiskResult
    
    # Ledger & Hash
    blockchain_block_id: Optional[int]
    blockchain_hash: str
    
    class Config:
        from_attributes = True

class ScreeningSummaryItem(BaseModel):
    screening_id: str
    created_at: datetime
    document_type: str
    person_name: str
    document_number: str
    overall_risk: float
    risk_level: str
    recommendation: str
    blockchain_hash: str

class DashboardStatistics(BaseModel):
    total_screened: int = 428
    suspicious_count: int = 58
    high_risk_count: int = 34
    verified_clear_count: int = 336
    average_screening_time_sec: float = 1.45
    tampering_cases_count: int = 29
    face_mismatch_count: int = 19
    expired_documents_count: int = 10
    
    # Breakdown charts data
    volume_by_day: List[Dict[str, Any]] = []
    risk_distribution: List[Dict[str, Any]] = []
    document_type_distribution: List[Dict[str, Any]] = []
    tampering_category_breakdown: List[Dict[str, Any]] = []

class BlockChainBlockSchema(BaseModel):
    block_number: int
    timestamp: datetime
    screening_id: str
    document_type: str
    person_name: str
    risk_score: float
    recommendation: str
    event_type: str
    previous_hash: str
    current_hash: str
    nonce: int = 0
    is_tampered: bool = False
