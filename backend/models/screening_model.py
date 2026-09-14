from sqlalchemy import Column, String, Integer, Float, DateTime, Text, Boolean
from datetime import datetime
from database import Base

class ScreeningRecord(Base):
    __tablename__ = "screenings"

    id = Column(String, primary_key=True, index=True)
    document_type = Column(String, index=True) # Passport, Visa, National ID, Driving License, Permit
    person_name = Column(String, index=True)
    document_number = Column(String, index=True)
    nationality = Column(String, default="N/A")
    dob = Column(String, default="N/A")
    expiry_date = Column(String, default="N/A")
    
    # Risk Metrics
    overall_risk = Column(Float, default=0.0) # 0 to 100
    risk_level = Column(String, default="LOW") # LOW, MEDIUM, HIGH, CRITICAL
    recommendation = Column(String, default="CLEAR") # CLEAR, REVIEW REQUIRED, HIGH RISK, MANUAL INSPECTION REQUIRED
    
    # Individual Component Scores (0-100)
    tampering_score = Column(Float, default=0.0)
    validation_score = Column(Float, default=0.0)
    mrz_score = Column(Float, default=0.0)
    face_score = Column(Float, default=0.0)
    metadata_score = Column(Float, default=0.0)
    
    # Forensic status
    has_photo_tampering = Column(Boolean, default=False)
    has_text_tampering = Column(Boolean, default=False)
    has_stamp_anomaly = Column(Boolean, default=False)
    has_metadata_warning = Column(Boolean, default=False)
    mrz_match = Column(Boolean, default=True)
    face_match_confidence = Column(Float, default=100.0)
    
    # Full JSON Analysis Payload for deep inspection & reporting
    full_analysis_json = Column(Text, default="{}")
    
    # Cryptographic & Audit reference
    blockchain_block_id = Column(Integer, nullable=True)
    blockchain_hash = Column(String, default="")
    created_at = Column(DateTime, default=datetime.utcnow)
