from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class QualityAssessment(BaseModel):
    blur_score: float = Field(..., description="Laplacian variance score")
    is_blurry: bool = False
    brightness: float = Field(..., description="Mean brightness 0-255")
    contrast: float = Field(..., description="Standard deviation of pixel intensity")
    resolution: str = "850x560"
    quality_verdict: str = "OPTIMAL" # OPTIMAL, ACCEPTABLE, INSUFFICIENT
    warning: Optional[str] = None

class DocumentClassification(BaseModel):
    document_type: str = "Passport" # Passport, Visa, National ID, Driving License, Permit
    confidence: float = 0.95 # 0.0 - 1.0
    classification_warning: Optional[str] = None

class OCRField(BaseModel):
    key: str
    label: str
    value: str
    confidence: float = 0.95
    bounding_box: Optional[List[int]] = None # [x, y, w, h]

class OCRExtractionResult(BaseModel):
    document_type: str
    fields: Dict[str, str] = {}
    structured_fields: List[OCRField] = []
    raw_text: str = ""
    quality: QualityAssessment

class MRZCheckDigit(BaseModel):
    field_name: str
    extracted_value: str
    check_digit: str
    calculated_digit: str
    is_valid: bool

class VisualMRZMatch(BaseModel):
    field_name: str
    visual_value: str
    mrz_value: str
    match: bool
    risk_impact: int = 0

class MRZAnalysisResult(BaseModel):
    has_mrz: bool = True
    mrz_type: str = "TD3" # TD1, TD2, TD3, NONE
    raw_lines: List[str] = []
    parsed_fields: Dict[str, str] = {}
    check_digits: List[MRZCheckDigit] = []
    all_check_digits_valid: bool = True
    visual_comparisons: List[VisualMRZMatch] = []
    consistency_passed: bool = True
    mrz_score: float = 100.0 # 0-100 (100 is best)

class RuleValidationResult(BaseModel):
    rule_name: str
    rule_category: str # Format, Logical, Watchlist, Date
    status: str # PASS, WARNING, FAIL
    description: str
    risk_points: int = 0

class DocumentValidationResult(BaseModel):
    overall_status: str # VALID, EXPIRED, INVALID FORMAT, SUSPICIOUS, DEMO WATCHLIST MATCH
    passed_checks: int
    total_checks: int
    rules: List[RuleValidationResult] = []
    validation_score: float = 100.0 # 0-100 (100 is cleanest)
    watchlist_alert: Optional[str] = None

class SuspiciousRegion(BaseModel):
    region_id: str
    category: str # photo_boundary, text_baseline, compression_anomaly, stamp_distortion, metadata
    bounding_box: List[int] # [x, y, w, h]
    confidence: float
    reason: str
    severity: str # LOW, MEDIUM, HIGH

class TamperingAnalysisResult(BaseModel):
    tampering_probability: float # 0.0 - 1.0
    classification: str # likely_authentic, potential_manipulation, inconclusive
    confidence: float # 0.0 - 1.0
    forensic_score: float # 0-100 (100 = high tampering risk)
    
    # Subcategory Forensic Integrities (0-100%)
    photo_integrity: float = 95.0
    photo_status: str = "LIKELY AUTHENTIC" # LIKELY AUTHENTIC, POTENTIAL MANIPULATION
    
    text_integrity: float = 95.0
    text_status: str = "LIKELY AUTHENTIC"
    
    stamp_detected: bool = False
    stamp_consistency: float = 90.0
    stamp_status: str = "NORMAL" # NORMAL, REVIEW REQUIRED, SUSPICIOUS
    
    metadata_status: str = "NORMAL" # NORMAL, WARNING
    metadata_warning: Optional[str] = None
    metadata_details: Dict[str, Any] = {}
    
    suspicious_regions: List[SuspiciousRegion] = []
    explanations: List[str] = []

class FaceVerificationResult(BaseModel):
    face_detected_doc: bool = True
    face_detected_live: bool = True
    similarity_score: float = 92.0 # 0.0 - 100.0
    match_status: str = "MATCH INDICATOR" # MATCH INDICATOR, POTENTIAL MISMATCH
    confidence: float = 0.94
    quality_doc: str = "GOOD"
    quality_live: str = "GOOD"
    orientation_aligned: bool = True
    face_box_doc: Optional[List[int]] = None
    face_box_live: Optional[List[int]] = None
    disclaimer: str = "AI-assisted similarity estimate — not a definitive identity determination."

class RiskFactor(BaseModel):
    factor_type: str # POSITIVE, RISK
    category: str
    label: str
    description: str
    impact_points: int # e.g. +20, -15

class ExplainableRiskResult(BaseModel):
    overall_risk: float # 0 - 100
    risk_level: str # LOW (0-25), MEDIUM (26-50), HIGH (51-75), CRITICAL (76-100)
    recommendation: str # CLEAR, REVIEW REQUIRED, HIGH RISK - MANUAL INSPECTION REQUIRED, CRITICAL RISK
    
    # Weighted score components (0-100 each)
    tampering_component: float # weight 0.35
    validation_component: float # weight 0.20
    mrz_component: float # weight 0.15
    face_component: float # weight 0.20
    metadata_component: float # weight 0.10
    
    weights: Dict[str, float] = {
        "tampering": 0.35,
        "validation": 0.20,
        "mrz": 0.15,
        "face": 0.20,
        "metadata": 0.10
    }
    
    positive_indicators: List[RiskFactor] = []
    risk_indicators: List[RiskFactor] = []
    summary_explanation: str
