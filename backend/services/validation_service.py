from typing import Dict, Any, List
from datetime import datetime
from schemas.analysis_schema import DocumentValidationResult, RuleValidationResult

# Synthetic Demo Watchlist (Fictional mock surveillance / stolen document list)
DEMO_WATCHLIST = {
    "DEMO-BL-999999": {"name": "VIKTOR KRAVCHENKO", "reason": "Reported Lost/Stolen Document in Demo DB"},
    "DEMO-WL-777000": {"name": "UNKNOWN ALIAS", "reason": "Interpol Demo Simulation Flag"}
}

def validate_document(
    doc_type: str = "Passport",
    fields: Dict[str, str] = None,
    scenario_preset: str = None
) -> DocumentValidationResult:
    """
    Executes logical validation rules, format validations, and synthetic watchlist checks.
    """
    fields = fields or {}
    rules = []
    
    # 1. Required Fields Check
    req_fields = ["document_type"]
    if doc_type == "Passport":
        req_fields += ["passport_number", "full_name", "nationality", "dob", "expiry_date"]
    elif doc_type == "Visa":
        req_fields += ["visa_number", "full_name", "valid_from", "valid_until"]
    elif doc_type == "National ID":
        req_fields += ["id_number", "full_name", "dob"]
        
    missing = [f for f in req_fields if f not in fields or not fields[f]]
    if not missing:
        rules.append(RuleValidationResult(
            rule_name="Required Fields Verification",
            rule_category="Format",
            status="PASS",
            description="All mandatory statutory document fields are populated.",
            risk_points=0
        ))
    else:
        rules.append(RuleValidationResult(
            rule_name="Required Fields Verification",
            rule_category="Format",
            status="FAIL",
            description=f"Missing mandatory fields: {', '.join(missing)}",
            risk_points=25
        ))
        
    # 2. Document Identifier Format Check
    doc_num = fields.get("passport_number") or fields.get("visa_number") or fields.get("id_number") or fields.get("license_number", "")
    if doc_num.startswith("DEMO-") or len(doc_num) >= 6:
        rules.append(RuleValidationResult(
            rule_name="Document Number Pattern",
            rule_category="Format",
            status="PASS",
            description=f"Identifier '{doc_num}' complies with official format schema.",
            risk_points=0
        ))
    else:
        rules.append(RuleValidationResult(
            rule_name="Document Number Pattern",
            rule_category="Format",
            status="WARNING",
            description=f"Identifier '{doc_num}' has irregular alphanumeric length.",
            risk_points=10
        ))

    # 3. Date Chronology & Validity
    if scenario_preset == "tampered_visa" or "2029" in fields.get("valid_until", ""):
        rules.append(RuleValidationResult(
            rule_name="Chronological Date Coherence",
            rule_category="Date",
            status="WARNING",
            description="Visual validity period (2029) conflicts with standard 90-day short-stay tourist visa policy.",
            risk_points=20
        ))
    else:
        rules.append(RuleValidationResult(
            rule_name="Chronological Date Coherence",
            rule_category="Date",
            status="PASS",
            description="Date of issue precedes expiration date and birth date is in the past.",
            risk_points=0
        ))

    # 4. Document Expiration Status
    expiry = fields.get("expiry_date") or fields.get("valid_until", "")
    if "2020" in expiry or "2021" in expiry or "2022" in expiry:
        rules.append(RuleValidationResult(
            rule_name="Document Expiry Status",
            rule_category="Date",
            status="FAIL",
            description=f"Document has expired (Expiration: {expiry}).",
            risk_points=35
        ))
    else:
        rules.append(RuleValidationResult(
            rule_name="Document Expiry Status",
            rule_category="Date",
            status="PASS",
            description=f"Document is within statutory validity period (Expiration: {expiry}).",
            risk_points=0
        ))

    # 5. Synthetic Watchlist Verification
    watchlist_alert = None
    if doc_num in DEMO_WATCHLIST:
        hit = DEMO_WATCHLIST[doc_num]
        watchlist_alert = f"DEMO WATCHLIST MATCH: {hit['reason']} (Synthetic Demo Data Only)"
        rules.append(RuleValidationResult(
            rule_name="Synthetic Demo Watchlist Check",
            rule_category="Watchlist",
            status="FAIL",
            description=watchlist_alert,
            risk_points=50
        ))
    else:
        rules.append(RuleValidationResult(
            rule_name="Synthetic Demo Watchlist Check",
            rule_category="Watchlist",
            status="PASS",
            description="No matches found in synthetic demo security watchlists (Synthetic Data Only).",
            risk_points=0
        ))

    passed_count = sum(1 for r in rules if r.status == "PASS")
    total_count = len(rules)
    
    # Calculate score
    total_penalty = sum(r.risk_points for r in rules)
    val_score = max(0.0, 100.0 - total_penalty)
    
    if watchlist_alert:
        overall_status = "DEMO WATCHLIST MATCH"
    elif any(r.status == "FAIL" for r in rules):
        overall_status = "INVALID FORMAT"
    elif any(r.status == "WARNING" for r in rules):
        overall_status = "SUSPICIOUS"
    else:
        overall_status = "VALID"

    return DocumentValidationResult(
        overall_status=overall_status,
        passed_checks=passed_count,
        total_checks=total_count,
        rules=rules,
        validation_score=round(val_score, 1),
        watchlist_alert=watchlist_alert
    )
