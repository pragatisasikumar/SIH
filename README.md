# SecureID AI — AI-Powered Fake Identity & Document Screening Platform

### Theme: Blockchain & CyberSecurity

**SecureID AI** is an AI-assisted cybersecurity and border-security screening platform designed to help authorized security and border personnel identify potentially fraudulent identity and travel documents.

The system combines:

* OCR and document text extraction
* MRZ analysis and validation
* Rule-based document validation
* AI-assisted document forensics
* Facial verification
* Explainable 0–100 risk scoring
* Tamper-evident SHA-256 blockchain-style audit logging
* Human-in-the-loop review

> **Important:** SecureID AI is an AI-assisted screening recommendation system. It does not make automated immigration, legal, or law-enforcement decisions. Final decisions remain with authorized human officers. All demonstration data is synthetic.

---

## 1. Problem Statement

Fraudulent identity documents and manipulated travel documents can create serious security risks at border checkpoints.

Traditional verification processes may require:

* Manual document inspection
* Separate identity verification systems
* Time-consuming forensic analysis
* Manual comparison of document information
* Limited auditability of screening activities

This can result in slower processing and difficulty identifying sophisticated document manipulation.

SecureID AI provides a unified screening workflow that analyzes the document, extracts identity information, checks document consistency, performs forensic analysis, verifies the face, calculates an explainable risk score, and records the screening activity in a tamper-evident audit ledger.

---

## 2. Proposed Solution

SecureID AI follows a multi-stage screening pipeline:

```text
┌─────────────────────────────┐
│      Security Officer       │
│        React Web UI         │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Screening Wizard       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│    Document Processing      │
└──────────────┬──────────────┘
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
     OCR      MRZ     Image
    Engine   Engine   Analysis
       │       │        │
       └───────┼────────┘
               ▼
┌─────────────────────────────┐
│ Document Validation Engine  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ AI-Assisted Forensic        │
│ Document Analysis           │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│     Face Verification       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Explainable Risk Engine   │
│         0 – 100             │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Human Review Recommendation │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ SHA-256 Tamper-Evident      │
│ Audit Ledger                │
└─────────────────────────────┘
```

---

## 3. Key Features

### 3.1 OCR Processing

The system extracts important information from identity documents such as:

* Name
* Date of birth
* Nationality
* Document number
* Date of issue
* Date of expiry
* Other visible document fields

The extracted information is used for further validation.

---

### 3.2 MRZ Analysis

SecureID AI supports machine-readable zone analysis based on **ICAO 9303** principles.

The system analyzes:

* TD1 documents
* TD2 documents
* TD3 documents
* MRZ structure
* Check digits
* Document number
* Date of birth
* Expiry date
* Nationality
* Personal information

The check-digit system follows the **7-3-1 weighting principle**.

---

### 3.3 Document Validation

The validation engine compares information obtained from different document sources.

Examples include:

```text
Visible Expiry Date
        │
        ▼
      Compare
        ▲
        │
MRZ Expiry Date
```

If the values do not match, the system generates a validation warning.

Other validation checks include:

* Missing fields
* Invalid dates
* Expired documents
* MRZ inconsistencies
* Document number mismatches
* Structural inconsistencies

---

### 3.4 AI-Assisted Document Forensics

The forensic analysis module searches for visual indicators that may suggest document manipulation.

The system can analyze:

* Error Level Analysis (ELA)
* Image compression inconsistencies
* Edge gradients
* Image artifacts
* Metadata warnings
* Suspicious regions
* Visual inconsistencies

The forensic result contributes to the overall screening risk.

---

### 3.5 Facial Verification

The system compares the face presented in the document with a verification image.

The result produces a face-match score.

Example:

```text
Document Face
      │
      ▼
┌───────────────┐
│ Face Analysis │
└───────┬───────┘
        │
        ▼
Verification Face
        │
        ▼
 Face Match Score
```

A low similarity score can increase the screening risk and trigger manual review.

---

### 3.6 Explainable Risk Engine

SecureID AI produces an overall risk score between **0 and 100**.

The scoring model is:

```text
Overall Risk =
(0.35 × Tampering)
+ (0.20 × Validation)
+ (0.15 × MRZ)
+ (0.20 × Face)
+ (0.10 × Metadata)
```

The score is designed to be explainable rather than simply producing a black-box prediction.

Example:

```text
0 – 30    → LOW RISK
31 – 60   → MEDIUM RISK
61 – 100  → HIGH RISK
```

The risk score is a recommendation for human review and does not represent an automated legal decision.

---

## 4. Demonstration Scenarios

The application includes deterministic synthetic demonstration scenarios for testing and presentation.

### Scenario 1 — Valid Passport

**Demo Person:** Arun Kumar

```text
Demo ID:       DEMO-IN-482913
Face Match:    92%
Risk Score:    18 / 100
Result:        CLEAR — LOW RISK
```

The document passes the major validation and forensic checks.

---

### Scenario 2 — Tampered Visa

**Demo Person:** Elena Vance

Example inconsistency:

```text
Visual Expiry Date: 31-12-2029
MRZ Expiry Date:    12-11-2023
```

Additional indicators include:

* High forensic risk
* Metadata warning
* Document inconsistency

```text
Face Match:    89%
Risk Score:    78 / 100

Result:
HIGH RISK — MANUAL INSPECTION REQUIRED
```

---

### Scenario 3 — Identity Mismatch

**Demo Person:** Marcus Chen

The document itself is valid, but the biometric comparison produces a low match.

```text
Face Match:    42%
Risk Score:    68 / 100

Result:
REVIEW REQUIRED
```

This demonstrates that a valid document does not automatically guarantee that the presented person is the legitimate document holder.

---

## 5. Two-Layer AI & Demonstration Architecture

SecureID AI uses two complementary operating layers.

### Layer A — Real Analysis

The backend performs actual analysis using available libraries and algorithms.

Examples include:

* Python image processing
* OpenCV/Pillow-based analysis
* Real ELA analysis
* Edge-gradient analysis
* ICAO-style MRZ check-digit validation
* Facial structural comparison
* SQLite audit ledger hashing

---

### Layer B — Deterministic Offline Demo Mode

For hackathon demonstrations, the application can use deterministic synthetic scenarios.

The frontend contains predefined demonstration data that allows the application to operate predictably even when external AI services or real identity documents are unavailable.

This makes the system:

* Offline-demo friendly
* Reproducible
* Safe for presentations
* Free from real personal data

---

## 6. Interactive Forensic Viewer

The application provides a dual-pane forensic interface.

```text
┌──────────────────────┬──────────────────────┐
│                      │                      │
│   Original Document  │   Forensic Analysis  │
│                      │                      │
│      Document        │   ELA / Edges /      │
│       Image          │   Suspicious Areas   │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

This allows officers to visually inspect the document while reviewing the analytical results.

---

## 7. Audit Ledger

Every screening activity can be recorded in a tamper-evident SHA-256 audit ledger.

The ledger uses chained hashes:

```text
Block 1
   │
   ▼
Hash 1
   │
   ▼
Block 2
   │
   ▼
Hash 2
   │
   ▼
Block 3
   │
   ▼
Hash 3
```

The hash calculation follows the concept:

```text
Current Hash =
SHA256(Block Data + Previous Hash)
```

If historical block data is modified, the hash chain can be detected as inconsistent.

### Purpose

The ledger provides:

* Tamper-evident audit records
* Screening history
* Integrity verification
* Traceability
* Accountability

For the hackathon implementation, SQLite is used as the local ledger storage. The architecture can later be extended to a distributed blockchain platform.

---

## 8. System Architecture

```text
                    ┌──────────────────────┐
                    │   Security Officer   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Web Client   │
                    │      + Vite          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      FastAPI         │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
   │ OCR + MRZ   │      │  Document   │      │   Face      │
   │   Engine    │      │  Forensics  │      │ Verification│
   └──────┬──────┘      └──────┬──────┘      └──────┬──────┘
          │                    │                    │
          └────────────────────┼────────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │   Risk Score Engine  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──
```
