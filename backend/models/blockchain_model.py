from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, Text
from datetime import datetime
from database import Base

class AuditBlock(Base):
    __tablename__ = "audit_blocks"

    block_number = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    screening_id = Column(String, index=True)
    document_type = Column(String, default="Passport")
    person_name = Column(String, default="N/A")
    risk_score = Column(Float, default=0.0)
    recommendation = Column(String, default="CLEAR")
    event_type = Column(String, default="DOCUMENT_SCREENING_VERIFIED")
    
    # Cryptographic integrity hashes
    previous_hash = Column(String, default="")
    current_hash = Column(String, index=True)
    nonce = Column(Integer, default=0)
    merkle_root = Column(String, default="")
    
    # Tampering simulation tracking
    is_tampered = Column(Boolean, default=False)
    original_hash = Column(String, nullable=True)
    raw_payload_json = Column(Text, default="{}")
