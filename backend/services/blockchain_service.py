import hashlib
import json
from datetime import datetime
from typing import List, Dict, Any, Tuple, Optional
from sqlalchemy.orm import Session
from models.blockchain_model import AuditBlock

def format_time_for_hash(ts) -> str:
    """Standardizes timestamp string format to seconds precision for deterministic hashing."""
    if isinstance(ts, str):
        return ts[:19]
    return ts.strftime("%Y-%m-%dT%H:%M:%S")

def compute_block_hash(
    block_number: int,
    timestamp_input,
    screening_id: str,
    risk_score: float,
    recommendation: str,
    event_type: str,
    prev_hash: str,
    nonce: int = 0
) -> str:
    """Calculates SHA-256 cryptographic hash of the block payload."""
    time_str = format_time_for_hash(timestamp_input)
    payload = f"{block_number}|{time_str}|{screening_id}|{risk_score:.2f}|{recommendation}|{event_type}|{prev_hash}|{nonce}"
    return hashlib.sha256(payload.encode('utf-8')).hexdigest()

def initialize_genesis_block(db: Session):
    """Initializes the immutable Genesis Block (#0) if database is fresh."""
    count = db.query(AuditBlock).count()
    if count == 0:
        genesis_time = datetime(2026, 1, 1, 0, 0, 0)
        prev_hash = "0" * 64
        genesis_hash = compute_block_hash(
            0,
            genesis_time,
            "GENESIS-000",
            0.0,
            "GENESIS_ROOT",
            "GENESIS_INITIALIZATION",
            prev_hash,
            0
        )
        
        block = AuditBlock(
            block_number=0,
            timestamp=genesis_time,
            screening_id="GENESIS-000",
            document_type="SYSTEM",
            person_name="ROOT AUTHORITY",
            risk_score=0.0,
            recommendation="GENESIS_ROOT",
            event_type="GENESIS_INITIALIZATION",
            previous_hash=prev_hash,
            current_hash=genesis_hash,
            nonce=0,
            is_tampered=False,
            raw_payload_json=json.dumps({"info": "SecureID AI Audit Ledger Genesis Root"})
        )
        db.add(block)
        db.commit()

def add_screening_block(
    db: Session,
    screening_id: str,
    document_type: str,
    person_name: str,
    risk_score: float,
    recommendation: str,
    timestamp: Optional[datetime] = None
) -> AuditBlock:
    """Appends a new verified screening event block to the tamper-evident chain."""
    last_block = db.query(AuditBlock).order_by(AuditBlock.block_number.desc()).first()
    prev_hash = last_block.current_hash if last_block else ("0" * 64)
    next_num = (last_block.block_number + 1) if last_block else 0
    
    block_time = timestamp or datetime.utcnow()
    current_hash = compute_block_hash(
        next_num,
        block_time,
        screening_id,
        risk_score,
        recommendation,
        "DOCUMENT_SCREENING_VERIFIED",
        prev_hash,
        0
    )
    
    block = AuditBlock(
        block_number=next_num,
        timestamp=block_time,
        screening_id=screening_id,
        document_type=document_type,
        person_name=person_name,
        risk_score=risk_score,
        recommendation=recommendation,
        event_type="DOCUMENT_SCREENING_VERIFIED",
        previous_hash=prev_hash,
        current_hash=current_hash,
        nonce=0,
        is_tampered=False,
        raw_payload_json=json.dumps({
            "screening_id": screening_id,
            "document_type": document_type,
            "person_name": person_name,
            "risk_score": risk_score,
            "recommendation": recommendation
        })
    )
    db.add(block)
    db.commit()
    db.refresh(block)
    return block

def verify_ledger_integrity(db: Session) -> Dict[str, Any]:
    """
    Validates cryptographic continuity across all blocks in the ledger.
    Checks that every block's current_hash matches SHA256(data + prev_hash)
    and that block[i].previous_hash == block[i-1].current_hash.
    """
    blocks = db.query(AuditBlock).order_by(AuditBlock.block_number.asc()).all()
    if not blocks:
        return {"is_valid": True, "total_blocks": 0, "status": "EMPTY", "message": "Ledger is empty"}

    for i, b in enumerate(blocks):
        # 1. Verify previous hash pointer
        if i > 0:
            prev_b = blocks[i - 1]
            if b.previous_hash != prev_b.current_hash:
                return {
                    "is_valid": False,
                    "tampered_block_number": b.block_number,
                    "total_blocks": len(blocks),
                    "status": "CHAIN_BROKEN",
                    "message": f"⚠ CHAIN INTEGRITY FAILURE: Block #{b.block_number} has broken previous hash link! (Expected: {prev_b.current_hash[:16]}..., Found: {b.previous_hash[:16]}...)"
                }
        
        # 2. Verify current block hash matches recalculation
        expected_hash = compute_block_hash(
            b.block_number,
            b.timestamp,
            b.screening_id,
            b.risk_score,
            b.recommendation,
            b.event_type,
            b.previous_hash,
            b.nonce
        )
        if b.current_hash != expected_hash or b.is_tampered:
            return {
                "is_valid": False,
                "tampered_block_number": b.block_number,
                "total_blocks": len(blocks),
                "status": "DATA_CORRUPTED",
                "message": f"⚠ CHAIN INTEGRITY FAILURE: Block #{b.block_number} content has been modified! SHA-256 cryptographic signature is invalid."
            }

    return {
        "is_valid": True,
        "total_blocks": len(blocks),
        "status": "VERIFIED",
        "message": f"✓ Ledger Integrity Verified. All {len(blocks)} blocks are correctly linked cryptographically."
    }

def tamper_demo_block(db: Session, block_number: int = None) -> Dict[str, Any]:
    """
    Simulates malicious record manipulation by altering a block's risk score
    without recalculating cryptographic hashes, demonstrating tamper detection.
    """
    if block_number is None:
        target = db.query(AuditBlock).filter(AuditBlock.block_number > 0).first()
    else:
        target = db.query(AuditBlock).filter(AuditBlock.block_number == block_number).first()
        
    if not target or target.block_number == 0:
        return {"success": False, "message": "No non-genesis block available to tamper."}
        
    target.is_tampered = True
    target.original_hash = target.current_hash
    target.risk_score = 0.0 # Maliciously altered risk score to 0 (fake clearance)
    target.recommendation = "CLEAR (UNAUTHORIZED MODIFICATION)"
    db.commit()
    
    return {
        "success": True,
        "tampered_block": target.block_number,
        "message": f"Simulated tampering on Block #{target.block_number}: Risk score altered to 0.0 without cryptographic re-signing."
    }

def repair_demo_chain(db: Session) -> Dict[str, Any]:
    """
    Recalculates all cryptographic hashes from the first block onward,
    restoring mathematical continuity across the demonstration chain.
    """
    blocks = db.query(AuditBlock).order_by(AuditBlock.block_number.asc()).all()
    if not blocks:
        return {"success": False, "message": "No blocks to repair."}

    for i, b in enumerate(blocks):
        b.is_tampered = False
        if i == 0:
            b.previous_hash = "0" * 64
        else:
            b.previous_hash = blocks[i - 1].current_hash
            
        b.current_hash = compute_block_hash(
            b.block_number,
            b.timestamp,
            b.screening_id,
            b.risk_score,
            b.recommendation,
            b.event_type,
            b.previous_hash,
            b.nonce
        )
    db.commit()
    
    return {
        "success": True,
        "total_repaired": len(blocks),
        "message": f"✓ Blockchain repaired. Successfully recomputed cryptographic hashes for all {len(blocks)} blocks."
    }
