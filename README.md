# SecureID AI — AI-Powered Fake Identity & Document Screening Platform

### Theme: Blockchain & CyberSecurity

**SecureID AI** is an enterprise-grade, hackathon-ready cybersecurity and border-security screening application designed to assist authorized border and security personnel in screening identity and travel documents (passports, visas, national IDs, driving licenses, and travel permits).

The system seamlessly combines:
**OCR + MRZ Analysis + Rule-Based Document Validation + AI-Assisted Document Forensics + Biometric Face Verification + Explainable 0–100 Risk Engine + Tamper-Evident SHA-256 Blockchain Audit Ledger**.

> **Important Operational Principle:**  
> The system operates strictly as an **AI-assisted screening recommendation tool for authorized human review**. It does not make automated immigration, legal, or law-enforcement decisions. All demo data is strictly synthetic with zero real-world PII or permanent biometric retention.

---

## 1. High-Level Architecture

```text
                     ┌─────────────────────────────┐
                     │       SECURITY OFFICER      │
                     │        React Web UI         │
                     └──────────────┬──────────────┘
                                    │
                                    ▼
                     ┌─────────────────────────────┐
                     │       SCREENING WIZARD      │
                     │ Document + Face Upload      │
                     └──────────────┬──────────────┘
                                    │
                                    ▼
               ┌─────────────────────────────────────────┐
               │         DOCUMENT PROCESSING             │
               │ Image Preprocessing & Classification   │
               │ Quality Assessment (Blur/Contrast)      │
               └────────────────────┬────────────────────┘
                                    │
                                    ▼
               ┌─────────────────────────────────────────┐
               │            OCR + MRZ ENGINE             │
               │ Visual Inspection Zone (VIZ) OCR        │
               │ ICAO 9303 MRZ Parsing (TD1/TD2/TD3)     │
               │ 7-3-1 Modulus 10 Check-Digit Validation │
               │ Visual Field ↔ MRZ Cross-Consistency    │
               └────────────────────┬────────────────────┘
                                    │
                                    ▼
               ┌─────────────────────────────────────────┐
               │       DOCUMENT VALIDATION ENGINE        │
               │ Statutory Rules & Chronological Checks  │
               │ Expiry Check & Synthetic Demo Watchlist │
               └────────────────────┬────────────────────┘
                                    │
                                    ▼
               ┌─────────────────────────────────────────┐
               │       AI-ASSISTED DOCUMENT FORENSICS    │
               │ Error Level Analysis (ELA Recompression)│
               │ Photo Splicing & Edge Discontinuity     │
               │ Text Manipulation & Baseline Jitter     │
               │ Stamp/Seal Contour Anomaly Detection    │
               │ EXIF & Editing Software Metadata Tags   │
               │ Interactive Dual-Pane Overlay Viewer    │
               └────────────────────┬────────────────────┘
                                    │
                                    ▼
               ┌─────────────────────────────────────────┐
               │           FACE VERIFICATION              │
               │ Document Crop vs Live Presented Face    │
               │ 1:1 Similarity Estimation (0–100%)      │
               │ Ephemeral Biometric Buffer              │
               └────────────────────┬────────────────────┘
                                    │
                                    ▼
               ┌─────────────────────────────────────────┐
               │       EXPLAINABLE RISK ENGINE            │
               │ Tampering (35%) + Validation (20%) +    │
               │ MRZ (15%) + Face (20%) + Metadata (10%) │
               │ Composite Risk Score (0–100)            │
               │ Positive & Risk Indicators Breakdown    │
               └────────────────────┬────────────────────┘
                                    │
                                    ▼
               ┌─────────────────────────────────────────┐
               │       HUMAN REVIEW RECOMMENDATION        │
               │ CLEAR / REVIEW REQUIRED / HIGH RISK /   │
               │ MANUAL INSPECTION REQUIRED              │
               └────────────────────┬────────────────────┘
                                    │
                                    ▼
               ┌─────────────────────────────────────────┐
               │       SHA-256 AUDIT LEDGER              │
               │ Sequential Cryptographic Block Chain    │
               │ Tamper Detection & Auto-Repair Simulator│
               │ Cryptographically Signed PDF Report     │
               └─────────────────────────────────────────┘
```

---

## 2. Two-Layer AI & Demonstration Architecture

The application implements a robust **Two-Layer Architecture**:

* **Layer A — Real Analysis**: When backend libraries and OpenCV/Pillow services are connected, the platform performs real Error Level Analysis (ELA), edge gradient convolution, ICAO 9303 checksum verification, facial structural comparisons, and SQLite ledger hashing.
* **Layer B — Deterministic Offline Demo Mode**: If backend services are offline or disconnected during a presentation, the frontend automatically falls back without delay to deterministic demo datasets (`demoData.js`) ensuring zero downtime during live demonstrations.

---

## 3. The Three Deterministic Demo Scenarios

The system includes 1-click preloaded presentation scenarios:

### Scenario 1 — Valid Passport (Arun Kumar)
* **Document**: Republic of Antigrav-Land ICAO TD3 Passport (`DEMO-IN-482913`)
* **OCR & VIZ**: PASS (All mandatory fields valid)
* **MRZ Analysis**: PASS (All 7-3-1 check digits verified; VIZ dates match optical lines)
* **Forensics**: LOW (Uniform compression levels, intact substrate guilloche pattern)
* **Face Match**: 92.0% (Strong biometric alignment)
* **Metadata**: NORMAL (Authentic encoder signature)
* **Risk Score**: `18 / 100`
* **Recommendation**: `CLEAR — LOW RISK`

### Scenario 2 — Tampered Visa (Elena Vance)
* **Document**: Schengen Tourist Visa (`DEMO-EU-739421`)
* **OCR & VIZ**: Extracted visual validity date altered to `31-12-2029`
* **MRZ Analysis**: ✕ **MISMATCH** (MRZ optical line specifies expiration `12-11-2023`, conflicting with visual `2029`)
* **Forensics**: **HIGH RISK** (Edge gradient discontinuity around photo perimeter; font baseline jitter on date box)
* **Metadata**: **WARNING** (Adobe Photoshop CC signature detected in stream)
* **Face Match**: 89.0%
* **Risk Score**: `78 / 100`
* **Recommendation**: `HIGH RISK — MANUAL INSPECTION REQUIRED`

### Scenario 3 — Identity Mismatch (Marcus Chen)
* **Document**: National Citizen ID Card (`DEMO-ID-582914`)
* **OCR & VIZ**: PASS (Valid statutory ID card)
* **MRZ Analysis**: PASS (TD1 3-line format matches)
* **Forensics**: LOW (Substrate and microprint lines continuous)
* **Face Match**: ✕ **42.0% POTENTIAL MISMATCH** (Presented live face differs significantly from ID card portrait)
* **Risk Score**: `68 / 100`
* **Recommendation**: `REVIEW REQUIRED` (Impersonation / Proxy Risk)

---

## 4. Key Platform Capabilities

1. **Interactive Dual-Pane Forensic Viewer**:
   * Side-by-side comparison of original document vs AI forensic analysis.
   * Interactive layer toggles: **[Suspicious Regions]**, **[Heatmap / ELA]**, **[OCR Regions]**, **[Face Region]**, **[MRZ Zone]**.
   * Clickable bounding box tooltips showing confidence and forensic explanation without declaring definitive legal guilt.
2. **ICAO 9303 MRZ Engine**:
   * Supports TD1 (3-line), TD2 (2-line), and TD3 (2-line Passport) standards.
   * Computes 7-3-1 weighting modulus 10 check digits for document number, DOB, expiry, and composite.
3. **Explainable 0–100 Risk Engine**:
   * Transparent formula:
     $$\text{Overall Risk} = (0.35 \times \text{Tampering}) + (0.20 \times \text{Validation}) + (0.15 \times \text{MRZ}) + (0.20 \times \text{Face}) + (0.10 \times \text{Metadata})$$
   * Itemized green positive indicators (e.g. `-15 pts`) and red risk indicators (e.g. `+30 pts`).
4. **SHA-256 Tamper-Evident Blockchain Audit Ledger**:
   * Every screening event is committed to a sequential cryptographic block chain:
     $$\text{Current Hash} = \text{SHA256}(\text{Block Data} + \text{Previous Hash})$$
   * **Verify Chain Integrity**: Cryptographically verifies all block linkages.
   * **Simulate Block Tampering**: Mutates a block payload, demonstrating immediate detection of broken cryptographic links in red.
   * **Repair Ledger**: Recalculates cryptographic hashes from the corrupted block onward, restoring integrity.
5. **Printable / PDF Executive Screening Report**:
   * High-resolution official border inspection report with cryptographic audit hash stamp, officer signature lines, and statutory disclaimers.

---

## 5. Technology Stack

### Backend
* **Python 3.10+** (Tested on Python 3.14)
* **FastAPI**: Asynchronous REST API framework
* **Uvicorn**: ASGI web server
* **SQLAlchemy & SQLite**: Audit database persistence
* **Pillow (PIL) & NumPy**: Error Level Analysis (ELA), edge gradients, blur & quality scoring
* **Pydantic v2**: Type validation and schema sanitization

### Frontend
* **React 18 & Vite**
* **Tailwind CSS**: Custom CyberSecurity & Border Operations Dark Theme
* **Lucide React**: Modern iconography
* **Recharts**: Responsive area, bar, and donut charts
* **Axios**: Intelligent client with automatic offline fallback

---

## 6. Installation & Execution Guide (Windows PowerShell)

### Prerequisites
* Python 3.10+
* Node.js v18+ / v20+ and npm

### Step 1: Clone or Navigate to Project
```powershell
cd d:\SIH\Al-Fake-Identity
```

### Step 2: Generate Synthetic Demo Assets
```powershell
python demo/generate_demo_assets.py
```

### Step 3: Start the Backend (FastAPI)
```powershell
cd backend
python -m pip install -r requirements.txt
python main.py
```
* The backend will start on `http://127.0.0.1:8000`
* Interactive API Documentation (Swagger UI): `http://127.0.0.1:8000/docs`

### Step 4: Start the Frontend (Vite)
Open a new PowerShell terminal:
```powershell
cd d:\SIH\Al-Fake-Identity\frontend
npm install
npm run dev
```
* The web application will launch at: `http://localhost:5173`

---

## 7. Running the Automated Test Suite

To run the complete 14-point automated test suite covering all endpoints, algorithms, and blockchain tamper-detection:

```powershell
cd backend
python test_api.py
```

Expected output:
```text
=== STARTING SECUREID AI ENDPOINT TEST SUITE ===
[PASS] Health Check: ONLINE
[PASS] Dashboard Statistics: Total screened = 4
[PASS] Document Classification: Passport
[PASS] OCR Extraction: Passport No = DEMO-IN-482913
[PASS] MRZ Analysis: Consistency = True
[PASS] Document Validation: Status = VALID
[PASS] Tampering Analysis: Classification = likely_authentic
[PASS] Face Verification: Similarity = 92.0
[PASS] Explainable Risk Engine: Score = 18.0/100, Rec = CLEAR — LOW RISK
[PASS] Full Screening (Tampered Visa): ID = SCR-2026-XXXXXX, Risk = 78.0
[PASS] Full Screening (ID Mismatch): ID = SCR-2026-XXXXXX, Face Match = 42.0%
[PASS] Blockchain Ledger Retrieval: Total Blocks = 7
[PASS] Blockchain Integrity Check: Valid = True
[PASS] Blockchain Tamper Simulation Triggered: Block #6 altered
[PASS] Blockchain Tamper Detection Verified: Chain Broken = True
[PASS] Blockchain Repair Executed: Hashes recomputed
[PASS] Blockchain Restored Integrity Check: Valid = True

========================================================
ALL 14 SECUREID AI ENDPOINT TESTS PASSED PERFECTLY!
========================================================
```

---

## 8. Privacy, Security & Ethics Statement

* **Synthetic Data Only**: All demo identity profiles (`ARUN KUMAR`, `ELENA VANCE`, `MARCUS CHEN`) are entirely fictional.
* **Ephemeral Biometrics**: Facial portrait crops and live webcam images are processed in memory and never permanently stored in demonstration mode.
* **Human-in-the-Loop Assistive Decisions**: The platform categorizes risk as `CLEAR — LOW RISK`, `REVIEW REQUIRED`, `HIGH RISK — MANUAL INSPECTION REQUIRED`, or `CRITICAL RISK — ESCALATE FOR AUTHORIZED REVIEW`. Final border decisions remain strictly with authorized officers.

---

## 9. Future Enhancements

* Integration with permissioned enterprise hyperledgers (Hyperledger Fabric / Corda).
* Edge deployment on ruggedized handheld border-screening tablets.
* Hardware Security Module (HSM) integration for cryptographic key management.
* Multilingual OCR parsing for non-Latin travel documents.
