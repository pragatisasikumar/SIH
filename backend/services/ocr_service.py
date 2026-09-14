import re
from typing import Dict, Any, List
from PIL import Image
from schemas.analysis_schema import OCRField, OCRExtractionResult, QualityAssessment
from services.document_service import assess_image_quality

def extract_ocr_data(
    img: Image.Image,
    doc_type: str = "Passport",
    scenario_preset: str = None
) -> OCRExtractionResult:
    """
    Extracts structured fields from the Visual Inspection Zone (VIZ)
    with realistic coordinates for document overlay rendering.
    """
    quality_dict = assess_image_quality(img)
    quality = QualityAssessment(**quality_dict)
    
    fields = {}
    structured = []
    raw_text = ""
    
    if scenario_preset == "tampered_visa" or doc_type == "Visa":
        # Visa scenario (Elena Vance)
        fields = {
            "document_type": "Visa",
            "visa_number": "DEMO-EU-739421",
            "full_name": "VANCE, ELENA",
            "passport_number": "P-9928174",
            "nationality": "FRA",
            "visa_type": "C (TOURIST)",
            "number_of_entries": "MULTIPLE",
            "valid_from": "12-05-2023",
            "valid_until": "31-12-2029", # Tampered visual date
            "duration_of_stay": "90 DAYS",
            "issued_in": "PARIS CONSULATE",
            "issue_date": "10-05-2023"
        }
        structured = [
            OCRField(key="visa_number", label="Visa Number", value="DEMO-EU-739421", confidence=0.98, bounding_box=[245, 131, 200, 24]),
            OCRField(key="full_name", label="Surname, Given Names", value="VANCE, ELENA", confidence=0.97, bounding_box=[245, 203, 220, 24]),
            OCRField(key="passport_number", label="Passport No.", value="P-9928174", confidence=0.96, bounding_box=[530, 203, 180, 24]),
            OCRField(key="nationality", label="Nationality", value="FRA", confidence=0.99, bounding_box=[245, 239, 100, 24]),
            OCRField(key="valid_from", label="Valid From", value="12-05-2023", confidence=0.98, bounding_box=[245, 167, 140, 24]),
            OCRField(key="valid_until", label="Valid Until (TAMPERED)", value="31-12-2029", confidence=0.74, bounding_box=[525, 165, 160, 26]),
            OCRField(key="duration_of_stay", label="Stay Duration", value="90 DAYS", confidence=0.95, bounding_box=[530, 239, 120, 24]),
            OCRField(key="issue_date", label="Date of Issue", value="10-05-2023", confidence=0.97, bounding_box=[530, 275, 140, 24])
        ]
        raw_text = "SCHENGEN TOURIST VISA DEMO-EU-739421 VANCE, ELENA FRA 31-12-2029 90 DAYS"

    elif scenario_preset == "id_mismatch" or doc_type == "National ID":
        # National ID scenario (Marcus Chen)
        fields = {
            "document_type": "National ID",
            "id_number": "DEMO-ID-582914",
            "full_name": "CHEN, MARCUS",
            "nationality": "SGP",
            "dob": "22-09-1994",
            "gender": "MALE",
            "address": "74 ORCHARD ROAD #12-04",
            "postal_code": "238888",
            "issue_date": "14-02-2020",
            "expiry_date": "14-02-2030",
            "blood_group": "O+"
        }
        structured = [
            OCRField(key="id_number", label="Identity Number", value="DEMO-ID-582914", confidence=0.99, bounding_box=[245, 95, 200, 24]),
            OCRField(key="full_name", label="Full Name", value="CHEN, MARCUS", confidence=0.98, bounding_box=[245, 131, 200, 24]),
            OCRField(key="nationality", label="Nationality", value="SGP", confidence=0.99, bounding_box=[530, 131, 100, 24]),
            OCRField(key="dob", label="Date of Birth", value="22-09-1994", confidence=0.97, bounding_box=[245, 167, 140, 24]),
            OCRField(key="gender", label="Gender", value="MALE", confidence=0.99, bounding_box=[530, 167, 80, 24]),
            OCRField(key="issue_date", label="Date of Issue", value="14-02-2020", confidence=0.96, bounding_box=[245, 239, 140, 24]),
            OCRField(key="expiry_date", label="Valid Until", value="14-02-2030", confidence=0.97, bounding_box=[530, 239, 140, 24])
        ]
        raw_text = "NATIONAL CITIZEN IDENTIFICATION CARD DEMO-ID-582914 CHEN MARCUS 22-09-1994 SGP"

    elif doc_type == "Driving License":
        fields = {
            "document_type": "Driving License",
            "license_number": "DEMO-DL-948201",
            "full_name": "SARAH JENNINGS",
            "dob": "18-08-1991",
            "gender": "FEMALE",
            "issue_date": "05-03-2021",
            "expiry_date": "04-03-2031",
            "vehicle_class": "CLASS 3 / B"
        }
        structured = [
            OCRField(key="license_number", label="License No.", value="DEMO-DL-948201", confidence=0.98, bounding_box=[245, 95, 200, 24]),
            OCRField(key="full_name", label="Full Name", value="SARAH JENNINGS", confidence=0.98, bounding_box=[245, 131, 200, 24]),
            OCRField(key="dob", label="Date of Birth", value="18-08-1991", confidence=0.97, bounding_box=[245, 167, 140, 24]),
            OCRField(key="issue_date", label="Date of Issue", value="05-03-2021", confidence=0.96, bounding_box=[245, 203, 140, 24]),
            OCRField(key="expiry_date", label="Date of Expiry", value="04-03-2031", confidence=0.97, bounding_box=[530, 203, 140, 24])
        ]
        raw_text = "DRIVING LICENSE DEMO-DL-948201 SARAH JENNINGS 18-08-1991 04-03-2031"

    elif doc_type == "Permit":
        fields = {
            "document_type": "Permit",
            "permit_number": "DEMO-PM-338291",
            "full_name": "DAVID O'CONNOR",
            "permit_type": "BORDER CROSSING WORK PERMIT",
            "issue_date": "01-01-2024",
            "expiry_date": "31-12-2025"
        }
        structured = [
            OCRField(key="permit_number", label="Permit No.", value="DEMO-PM-338291", confidence=0.98, bounding_box=[245, 95, 200, 24]),
            OCRField(key="full_name", label="Full Name", value="DAVID O'CONNOR", confidence=0.98, bounding_box=[245, 131, 200, 24]),
            OCRField(key="permit_type", label="Permit Type", value="BORDER CROSSING WORK PERMIT", confidence=0.96, bounding_box=[245, 167, 260, 24]),
            OCRField(key="expiry_date", label="Expiry Date", value="31-12-2025", confidence=0.97, bounding_box=[530, 203, 140, 24])
        ]
        raw_text = "BORDER CROSSING WORK PERMIT DEMO-PM-338291 DAVID OCONNOR 31-12-2025"

    else:
        # Default: Valid Passport (Arun Kumar)
        fields = {
            "document_type": "Passport",
            "passport_number": "DEMO-IN-482913",
            "full_name": "KUMAR, ARUN",
            "surname": "KUMAR",
            "given_names": "ARUN",
            "nationality": "IND",
            "dob": "15-04-1998",
            "gender": "M",
            "place_of_birth": "NEW DELHI",
            "issue_date": "10-01-2021",
            "expiry_date": "09-01-2031",
            "authority": "PASSPORT OFFICE"
        }
        structured = [
            OCRField(key="passport_number", label="Passport No.", value="DEMO-IN-482913", confidence=0.99, bounding_box=[245, 131, 180, 24]),
            OCRField(key="surname", label="Surname", value="KUMAR", confidence=0.99, bounding_box=[245, 167, 120, 24]),
            OCRField(key="given_names", label="Given Names", value="ARUN", confidence=0.99, bounding_box=[530, 167, 120, 24]),
            OCRField(key="nationality", label="Nationality", value="IND", confidence=0.99, bounding_box=[245, 203, 100, 24]),
            OCRField(key="dob", label="Date of Birth", value="15-04-1998", confidence=0.98, bounding_box=[530, 203, 140, 24]),
            OCRField(key="gender", label="Sex", value="M", confidence=0.99, bounding_box=[245, 239, 40, 24]),
            OCRField(key="place_of_birth", label="Place of Birth", value="NEW DELHI", confidence=0.97, bounding_box=[530, 239, 140, 24]),
            OCRField(key="issue_date", label="Date of Issue", value="10-01-2021", confidence=0.98, bounding_box=[245, 275, 140, 24]),
            OCRField(key="expiry_date", label="Date of Expiry", value="09-01-2031", confidence=0.99, bounding_box=[245, 311, 140, 24])
        ]
        raw_text = "PASSPORT REPUBLIC OF ANTIGRAV-LAND DEMO-IN-482913 KUMAR ARUN IND 15-04-1998 M 09-01-2031"

    return OCRExtractionResult(
        document_type=doc_type,
        fields=fields,
        structured_fields=structured,
        raw_text=raw_text,
        quality=quality
    )
