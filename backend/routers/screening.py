import uuid
import json
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import get_db
from models.screening_model import ScreeningRecord
from schemas.screening_schema import ScreeningCreateRequest, ScreeningFullResponse, ScreeningSummaryItem
from services.document_service import load_image_from_base64_or_path, classify_document, assess_image_quality
from services.ocr_service import extract_ocr_data
from services.mrz_service import analyze_mrz
from services.validation_service import validate_document
from services.tampering_service import analyze_document_tampering
from services.face_service import verify_faces
from services.risk_service import calculate_explainable_risk
from services.blockchain_service import add_screening_block

router = APIRouter(prefix="/api", tags=["Screening"])

@router.post("/screening/create", response_model=ScreeningFullResponse)
def create_screening(
    payload: ScreeningCreateRequest,
    db: Session = Depends(get_db)
):
    """
    Executes the full screening pipeline:
    Image Quality -> Classification -> OCR -> MRZ -> Validation -> AI Forensics -> Face -> Risk -> Blockchain Block.
    """
    doc_img = load_image_from_base64_or_path(payload.document_image_base64)
    live_img = load_image_from_base64_or_path(payload.presented_face_base64)
    
    # 1. Image Quality & Classification
    quality = assess_image_quality(doc_img)
    classification = classify_document(doc_img, filename=payload.document_type)
    doc_type = payload.document_type or classification["document_type"]
    
    # 2. OCR Extraction
    ocr_result = extract_ocr_data(
        img=doc_img,
        doc_type=doc_type,
        scenario_preset=payload.scenario_preset
    )
    
    # Override fields if manual inputs provided
    if payload.manual_fields:
        for k, v in payload.manual_fields.items():
            if v:
                ocr_result.fields[k] = v
                
    # 3. MRZ Analysis
    mrz_result = analyze_mrz(
        doc_type=doc_type,
        scenario_preset=payload.scenario_preset,
        visual_fields=ocr_result.fields
    )
    
    # 4. Document Validation & Synthetic Watchlist Check
    validation_result = validate_document(
        doc_type=doc_type,
        fields=ocr_result.fields,
        scenario_preset=payload.scenario_preset
    )
    
    # 5. AI-Assisted Document Forensics
    tampering_result = analyze_document_tampering(
        img=doc_img,
        doc_type=doc_type,
        scenario_preset=payload.scenario_preset
    )
    
    # 6. Face Verification
    face_result = verify_faces(
        doc_img=doc_img,
        live_img=live_img,
        scenario_preset=payload.scenario_preset
    )
    
    # 7. Explainable Risk Engine
    risk_result = calculate_explainable_risk(
        tampering=tampering_result,
        validation=validation_result,
        mrz=mrz_result,
        face=face_result,
        scenario_preset=payload.scenario_preset
    )
    
    # Generate Unique Screening ID
    screening_id = f"SCR-2026-{uuid.uuid4().hex[:6].upper()}"
    person_name = ocr_result.fields.get("full_name") or ocr_result.fields.get("surname", "UNKNOWN SUBJECT")
    doc_num = ocr_result.fields.get("passport_number") or ocr_result.fields.get("visa_number") or ocr_result.fields.get("id_number") or ocr_result.fields.get("license_number", "N/A")
    nationality = ocr_result.fields.get("nationality", "N/A")
    dob = ocr_result.fields.get("dob") or ocr_result.fields.get("dob_formatted", "N/A")
    expiry = ocr_result.fields.get("expiry_date") or ocr_result.fields.get("valid_until", "N/A")
    
    # 8. Cryptographic Blockchain Audit Ledger Block
    block = add_screening_block(
        db=db,
        screening_id=screening_id,
        document_type=doc_type,
        person_name=person_name,
        risk_score=risk_result.overall_risk,
        recommendation=risk_result.recommendation
    )
    
    # Compile Full JSON payload
    full_payload = {
        "quality": quality,
        "classification": classification,
        "ocr": ocr_result.dict(),
        "mrz": mrz_result.dict(),
        "validation": validation_result.dict(),
        "tampering": tampering_result.dict(),
        "face": face_result.dict(),
        "risk": risk_result.dict()
    }
    
    # Save to SQLite
    record = ScreeningRecord(
        id=screening_id,
        document_type=doc_type,
        person_name=person_name,
        document_number=doc_num,
        nationality=nationality,
        dob=dob,
        expiry_date=expiry,
        overall_risk=risk_result.overall_risk,
        risk_level=risk_result.risk_level,
        recommendation=risk_result.recommendation,
        tampering_score=tampering_result.forensic_score,
        validation_score=validation_result.validation_score,
        mrz_score=mrz_result.mrz_score,
        face_score=face_result.similarity_score,
        metadata_score=70.0 if tampering_result.metadata_status == "WARNING" else 10.0,
        has_photo_tampering=(tampering_result.photo_status == "POTENTIAL MANIPULATION"),
        has_text_tampering=(tampering_result.text_status == "POTENTIAL MANIPULATION"),
        has_stamp_anomaly=(tampering_result.stamp_status == "REVIEW REQUIRED"),
        has_metadata_warning=(tampering_result.metadata_status == "WARNING"),
        mrz_match=mrz_result.consistency_passed,
        face_match_confidence=face_result.similarity_score,
        full_analysis_json=json.dumps(full_payload),
        blockchain_block_id=block.block_number,
        blockchain_hash=block.current_hash,
        created_at=datetime.utcnow()
    )
    db.add(record)
    db.commit()
    
    return ScreeningFullResponse(
        screening_id=screening_id,
        created_at=record.created_at,
        document_type=doc_type,
        person_name=person_name,
        document_number=doc_num,
        nationality=nationality,
        dob=dob,
        expiry_date=expiry,
        quality=quality,
        classification=classification,
        ocr=ocr_result,
        mrz=mrz_result,
        validation=validation_result,
        tampering=tampering_result,
        face=face_result,
        risk=risk_result,
        blockchain_block_id=block.block_number,
        blockchain_hash=block.current_hash
    )

@router.get("/screenings", response_model=List[ScreeningSummaryItem])
def get_screenings(
    search: Optional[str] = None,
    risk_level: Optional[str] = None,
    doc_type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Fetches list of historical screenings with optional search and filters."""
    query = db.query(ScreeningRecord).order_by(ScreeningRecord.created_at.desc())
    
    if search:
        s = f"%{search}%"
        query = query.filter(
            (ScreeningRecord.id.ilike(s)) |
            (ScreeningRecord.person_name.ilike(s)) |
            (ScreeningRecord.document_number.ilike(s))
        )
    if risk_level and risk_level != "ALL":
        query = query.filter(ScreeningRecord.risk_level == risk_level)
    if doc_type and doc_type != "ALL":
        query = query.filter(ScreeningRecord.document_type == doc_type)
        
    records = query.limit(50).all()
    return [
        ScreeningSummaryItem(
            screening_id=r.id,
            created_at=r.created_at,
            document_type=r.document_type,
            person_name=r.person_name,
            document_number=r.document_number,
            overall_risk=r.overall_risk,
            risk_level=r.risk_level,
            recommendation=r.recommendation,
            blockchain_hash=r.blockchain_hash
        )
        for r in records
    ]

@router.get("/screening/{id}")
def get_screening_by_id(id: str, db: Session = Depends(get_db)):
    """Retrieves full analysis payload for a specific screening ID."""
    record = db.query(ScreeningRecord).filter(ScreeningRecord.id == id).first()
    if not record:
        raise HTTPException(status_code=404, detail=f"Screening '{id}' not found")
        
    analysis = json.loads(record.full_analysis_json) if record.full_analysis_json else {}
    return {
        "screening_id": record.id,
        "created_at": record.created_at,
        "document_type": record.document_type,
        "person_name": record.person_name,
        "document_number": record.document_number,
        "nationality": record.nationality,
        "dob": record.dob,
        "expiry_date": record.expiry_date,
        "overall_risk": record.overall_risk,
        "risk_level": record.risk_level,
        "recommendation": record.recommendation,
        "blockchain_block_id": record.blockchain_block_id,
        "blockchain_hash": record.blockchain_hash,
        "analysis": analysis
    }
