import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def run_tests():
    print("=== STARTING SECUREID AI ENDPOINT TEST SUITE ===")
    
    # 1. Health Check
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("[PASS] Health Check:", res.json()["status"])

    # 2. Dashboard Statistics
    res = client.get("/api/dashboard/statistics")
    assert res.status_code == 200, f"Stats failed: {res.text}"
    data = res.json()
    assert "total_screened" in data
    print("[PASS] Dashboard Statistics: Total screened =", data["total_screened"])

    # 3. Document Classification
    res = client.post("/api/document/classify", json={"filename": "sample_passport_valid.png"})
    assert res.status_code == 200
    assert res.json()["document_type"] == "Passport"
    print("[PASS] Document Classification:", res.json()["document_type"])

    # 4. OCR Extraction
    res = client.post("/api/ocr/extract", json={"document_type": "Passport", "scenario_preset": "valid_passport"})
    assert res.status_code == 200
    ocr_data = res.json()
    assert ocr_data["fields"]["passport_number"] == "DEMO-IN-482913"
    print("[PASS] OCR Extraction: Passport No =", ocr_data["fields"]["passport_number"])

    # 5. MRZ Analysis
    res = client.post("/api/mrz/analyze", json={"document_type": "Passport", "scenario_preset": "valid_passport", "visual_fields": ocr_data["fields"]})
    assert res.status_code == 200
    mrz_data = res.json()
    assert mrz_data["consistency_passed"] == True
    print("[PASS] MRZ Analysis: Consistency =", mrz_data["consistency_passed"])

    # 6. Document Validation
    res = client.post("/api/document/validate", json={"document_type": "Passport", "fields": ocr_data["fields"], "scenario_preset": "valid_passport"})
    assert res.status_code == 200
    val_data = res.json()
    assert val_data["overall_status"] == "VALID"
    print("[PASS] Document Validation: Status =", val_data["overall_status"])

    # 7. AI Tampering Analysis
    res = client.post("/api/tampering/analyze", json={"document_type": "Passport", "scenario_preset": "valid_passport"})
    assert res.status_code == 200
    tamp_data = res.json()
    assert tamp_data["classification"] == "likely_authentic"
    print("[PASS] Tampering Analysis: Classification =", tamp_data["classification"])

    # 8. Face Verification
    res = client.post("/api/face/verify", json={"scenario_preset": "valid_passport"})
    assert res.status_code == 200
    face_data = res.json()
    assert face_data["similarity_score"] >= 90.0
    print("[PASS] Face Verification: Similarity =", face_data["similarity_score"])

    # 9. Explainable Risk Engine
    res = client.post("/api/risk/calculate", json={
        "tampering": tamp_data,
        "validation": val_data,
        "mrz": mrz_data,
        "face": face_data,
        "scenario_preset": "valid_passport"
    })
    assert res.status_code == 200
    risk_data = res.json()
    assert risk_data["overall_risk"] == 18.0
    print(f"[PASS] Explainable Risk Engine: Score = {risk_data['overall_risk']}/100, Rec = {risk_data['recommendation']}")

    # 10. Full Screening Pipeline (Scenario 2: Tampered Visa)
    res = client.post("/api/screening/create", json={
        "document_type": "Visa",
        "scenario_preset": "tampered_visa"
    })
    assert res.status_code == 200
    scr2 = res.json()
    assert scr2["risk"]["overall_risk"] == 78.0
    assert "MANUAL INSPECTION REQUIRED" in scr2["risk"]["recommendation"]
    print(f"[PASS] Full Screening (Tampered Visa): ID = {scr2['screening_id']}, Risk = {scr2['risk']['overall_risk']}")

    # 11. Full Screening Pipeline (Scenario 3: ID Mismatch)
    res = client.post("/api/screening/create", json={
        "document_type": "National ID",
        "scenario_preset": "id_mismatch"
    })
    assert res.status_code == 200
    scr3 = res.json()
    assert scr3["face"]["similarity_score"] == 42.0
    print(f"[PASS] Full Screening (ID Mismatch): ID = {scr3['screening_id']}, Face Match = {scr3['face']['similarity_score']}%")

    # 12. Blockchain Ledger & Verification
    res = client.get("/api/blockchain")
    assert res.status_code == 200
    blocks = res.json()
    print(f"[PASS] Blockchain Ledger Retrieval: Total Blocks = {len(blocks)}")

    res = client.post("/api/blockchain/verify")
    assert res.status_code == 200
    assert res.json()["is_valid"] == True
    print("[PASS] Blockchain Integrity Check: Valid =", res.json()["is_valid"])

    # 13. Blockchain Tamper Demo
    res = client.post("/api/blockchain/tamper-demo", json={"block_number": blocks[-1]["block_number"]})
    assert res.status_code == 200
    print("[PASS] Blockchain Tamper Simulation Triggered:", res.json()["message"])

    # Verify that integrity check now detects tampering
    res = client.post("/api/blockchain/verify")
    assert res.status_code == 200
    assert res.json()["is_valid"] == False
    print("[PASS] Blockchain Tamper Detection Verified: Chain Broken =", (not res.json()["is_valid"]))

    # 14. Blockchain Repair Demo
    res = client.post("/api/blockchain/repair-demo")
    assert res.status_code == 200
    print("[PASS] Blockchain Repair Executed:", res.json()["message"])

    # Verify that integrity is restored
    res = client.post("/api/blockchain/verify")
    assert res.status_code == 200
    assert res.json()["is_valid"] == True
    print("[PASS] Blockchain Restored Integrity Check: Valid =", res.json()["is_valid"])

    print("\n========================================================")
    print("ALL 14 SECUREID AI ENDPOINT TESTS PASSED PERFECTLY!")
    print("========================================================")

if __name__ == "__main__":
    run_tests()
