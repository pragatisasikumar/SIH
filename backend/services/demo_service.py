import uuid
import json
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models.screening_model import ScreeningRecord
from models.blockchain_model import AuditBlock
from services.blockchain_service import add_screening_block, initialize_genesis_block

def seed_demo_history(db: Session):
    """Seeds realistic historical screenings if the database is newly initialized."""
    count = db.query(ScreeningRecord).count()
    if count > 0:
        return

    initialize_genesis_block(db)

    now = datetime.utcnow()
    historical_cases = [
        {
            "id": "SCR-2026-88102",
            "document_type": "Passport",
            "person_name": "KUMAR, ARUN",
            "document_number": "DEMO-IN-482913",
            "nationality": "IND",
            "dob": "15-04-1998",
            "expiry_date": "09-01-2031",
            "overall_risk": 18.0,
            "risk_level": "LOW",
            "recommendation": "CLEAR — LOW RISK",
            "tampering_score": 10.0,
            "validation_score": 100.0,
            "mrz_score": 100.0,
            "face_score": 92.0,
            "metadata_score": 10.0,
            "has_photo_tampering": False,
            "has_text_tampering": False,
            "has_stamp_anomaly": False,
            "has_metadata_warning": False,
            "mrz_match": True,
            "face_match_confidence": 92.0,
            "created_at": now - timedelta(hours=3, minutes=15)
        },
        {
            "id": "SCR-2026-88095",
            "document_type": "Visa",
            "person_name": "VANCE, ELENA",
            "document_number": "DEMO-EU-739421",
            "nationality": "FRA",
            "dob": "24-07-1989",
            "expiry_date": "31-12-2029",
            "overall_risk": 78.0,
            "risk_level": "HIGH",
            "recommendation": "HIGH RISK — MANUAL INSPECTION REQUIRED",
            "tampering_score": 82.0,
            "validation_score": 65.0,
            "mrz_score": 60.0,
            "face_score": 89.0,
            "metadata_score": 70.0,
            "has_photo_tampering": True,
            "has_text_tampering": True,
            "has_stamp_anomaly": True,
            "has_metadata_warning": True,
            "mrz_match": False,
            "face_match_confidence": 89.0,
            "created_at": now - timedelta(hours=5, minutes=40)
        },
        {
            "id": "SCR-2026-88044",
            "document_type": "National ID",
            "person_name": "CHEN, MARCUS",
            "document_number": "DEMO-ID-582914",
            "nationality": "SGP",
            "dob": "22-09-1994",
            "expiry_date": "14-02-2030",
            "overall_risk": 68.0,
            "risk_level": "HIGH",
            "recommendation": "REVIEW REQUIRED",
            "tampering_score": 15.0,
            "validation_score": 100.0,
            "mrz_score": 100.0,
            "face_score": 42.0,
            "metadata_score": 10.0,
            "has_photo_tampering": False,
            "has_text_tampering": False,
            "has_stamp_anomaly": False,
            "has_metadata_warning": False,
            "mrz_match": True,
            "face_match_confidence": 42.0,
            "created_at": now - timedelta(hours=8, minutes=10)
        },
        {
            "id": "SCR-2026-87980",
            "document_type": "Passport",
            "person_name": "DUBOIS, SOPHIE",
            "document_number": "DEMO-FR-119482",
            "nationality": "FRA",
            "dob": "10-11-1990",
            "expiry_date": "12-08-2028",
            "overall_risk": 12.0,
            "risk_level": "LOW",
            "recommendation": "CLEAR — LOW RISK",
            "tampering_score": 8.0,
            "validation_score": 100.0,
            "mrz_score": 100.0,
            "face_score": 96.0,
            "metadata_score": 5.0,
            "has_photo_tampering": False,
            "has_text_tampering": False,
            "has_stamp_anomaly": False,
            "has_metadata_warning": False,
            "mrz_match": True,
            "face_match_confidence": 96.0,
            "created_at": now - timedelta(days=1, hours=2)
        }
    ]

    for case in historical_cases:
        # Create blockchain audit block
        block = add_screening_block(
            db=db,
            screening_id=case["id"],
            document_type=case["document_type"],
            person_name=case["person_name"],
            risk_score=case["overall_risk"],
            recommendation=case["recommendation"]
        )
        
        # Serialize without raw datetime
        serializable_case = {k: (v.isoformat() if isinstance(v, datetime) else v) for k, v in case.items()}
        
        record = ScreeningRecord(
            id=case["id"],
            document_type=case["document_type"],
            person_name=case["person_name"],
            document_number=case["document_number"],
            nationality=case["nationality"],
            dob=case["dob"],
            expiry_date=case["expiry_date"],
            overall_risk=case["overall_risk"],
            risk_level=case["risk_level"],
            recommendation=case["recommendation"],
            tampering_score=case["tampering_score"],
            validation_score=case["validation_score"],
            mrz_score=case["mrz_score"],
            face_score=case["face_score"],
            metadata_score=case["metadata_score"],
            has_photo_tampering=case["has_photo_tampering"],
            has_text_tampering=case["has_text_tampering"],
            has_stamp_anomaly=case["has_stamp_anomaly"],
            has_metadata_warning=case["has_metadata_warning"],
            mrz_match=case["mrz_match"],
            face_match_confidence=case["face_match_confidence"],
            full_analysis_json=json.dumps({"seeded": True, "details": serializable_case}),
            blockchain_block_id=block.block_number,
            blockchain_hash=block.current_hash,
            created_at=case["created_at"]
        )
        db.add(record)
        
    db.commit()
