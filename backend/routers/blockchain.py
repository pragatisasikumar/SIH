from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from database import get_db
from models.blockchain_model import AuditBlock
from schemas.screening_schema import BlockChainBlockSchema
from services.blockchain_service import (
    verify_ledger_integrity,
    tamper_demo_block,
    repair_demo_chain
)

router = APIRouter(prefix="/api/blockchain", tags=["Blockchain Audit Ledger"])

class TamperDemoRequest(BaseModel):
    block_number: Optional[int] = None

@router.get("", response_model=List[BlockChainBlockSchema])
def get_blockchain_ledger(db: Session = Depends(get_db)):
    """Fetches all blocks in the tamper-evident audit ledger."""
    blocks = db.query(AuditBlock).order_by(AuditBlock.block_number.asc()).all()
    return [
        BlockChainBlockSchema(
            block_number=b.block_number,
            timestamp=b.timestamp,
            screening_id=b.screening_id,
            document_type=b.document_type,
            person_name=b.person_name,
            risk_score=b.risk_score,
            recommendation=b.recommendation,
            event_type=b.event_type,
            previous_hash=b.previous_hash,
            current_hash=b.current_hash,
            nonce=b.nonce,
            is_tampered=b.is_tampered
        )
        for b in blocks
    ]

@router.post("/verify")
def verify_blockchain(db: Session = Depends(get_db)):
    """Verifies cryptographic hash continuity across all blocks in the ledger."""
    return verify_ledger_integrity(db)

@router.post("/tamper-demo")
def tamper_demo(payload: TamperDemoRequest, db: Session = Depends(get_db)):
    """Simulates malicious ledger tampering on a block to demonstrate tamper detection."""
    return tamper_demo_block(db, block_number=payload.block_number)

@router.post("/repair-demo")
def repair_demo(db: Session = Depends(get_db)):
    """Recalculates cryptographic hashes to repair the demonstration ledger."""
    return repair_demo_chain(db)
