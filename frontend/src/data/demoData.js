/**
 * SecureID AI - Comprehensive Offline Demo Datasets
 * Guaranteed deterministic data for presentations and standalone execution.
 */

export const INITIAL_DASHBOARD_STATS = {
  total_screened: 428,
  suspicious_count: 58,
  high_risk_count: 34,
  verified_clear_count: 336,
  average_screening_time_sec: 1.45,
  tampering_cases_count: 29,
  face_mismatch_count: 19,
  expired_documents_count: 10,
  volume_by_day: [
    { day: "Mon", screened: 54, suspicious: 6, clear: 48 },
    { day: "Tue", screened: 68, suspicious: 9, clear: 59 },
    { day: "Wed", screened: 72, suspicious: 11, clear: 61 },
    { day: "Thu", screened: 61, suspicious: 8, clear: 53 },
    { day: "Fri", screened: 85, suspicious: 14, clear: 71 },
    { day: "Sat", screened: 49, suspicious: 5, clear: 44 },
    { day: "Sun", screened: 39, suspicious: 5, clear: 34 }
  ],
  risk_distribution: [
    { name: "Low Risk (Clear)", value: 336, color: "#10b981" },
    { name: "Medium (Review)", value: 58, color: "#f59e0b" },
    { name: "High Risk", value: 24, color: "#f97316" },
    { name: "Critical Risk", value: 10, color: "#ef4444" }
  ],
  document_type_distribution: [
    { name: "Passport", count: 235, percentage: 55 },
    { name: "Visa", count: 112, percentage: 26 },
    { name: "National ID", count: 56, percentage: 13 },
    { name: "Driving License", count: 18, percentage: 4 },
    { name: "Permit", count: 7, percentage: 2 }
  ],
  tampering_category_breakdown: [
    { category: "Photo Replacement", count: 14, risk_impact: "High" },
    { category: "Text / Date Splicing", count: 11, risk_impact: "High" },
    { category: "MRZ Checksum Mismatch", count: 9, risk_impact: "Medium" },
    { category: "Metadata Manipulation", count: 8, risk_impact: "Low" },
    { category: "Stamp Distortion", count: 5, risk_impact: "Medium" }
  ]
};

export const INITIAL_SCREENINGS_LIST = [
  {
    screening_id: "SCR-2026-88102",
    created_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    document_type: "Passport",
    person_name: "KUMAR, ARUN",
    document_number: "DEMO-IN-482913",
    overall_risk: 18.0,
    risk_level: "LOW",
    recommendation: "CLEAR — LOW RISK",
    blockchain_hash: "a4f8e9102c3b889d1234ef567890abcdef1234567890abcdef1234567890abcd"
  },
  {
    screening_id: "SCR-2026-88095",
    created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    document_type: "Visa",
    person_name: "VANCE, ELENA",
    document_number: "DEMO-EU-739421",
    overall_risk: 78.0,
    risk_level: "HIGH",
    recommendation: "HIGH RISK — MANUAL INSPECTION REQUIRED",
    blockchain_hash: "7b92c43110e5d99f0123456789abcdef0123456789abcdef0123456789abcdef"
  },
  {
    screening_id: "SCR-2026-88044",
    created_at: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    document_type: "National ID",
    person_name: "CHEN, MARCUS",
    document_number: "DEMO-ID-582914",
    overall_risk: 68.0,
    risk_level: "HIGH",
    recommendation: "REVIEW REQUIRED",
    blockchain_hash: "e391b4820c7d441a5566778899aabbcc5566778899aabbcc5566778899aabbcc"
  },
  {
    screening_id: "SCR-2026-87980",
    created_at: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    document_type: "Passport",
    person_name: "DUBOIS, SOPHIE",
    document_number: "DEMO-FR-119482",
    overall_risk: 12.0,
    risk_level: "LOW",
    recommendation: "CLEAR — LOW RISK",
    blockchain_hash: "11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff"
  }
];

export const INITIAL_BLOCKCHAIN_BLOCKS = [
  {
    block_number: 0,
    timestamp: "2026-01-01T00:00:00Z",
    screening_id: "GENESIS-000",
    document_type: "SYSTEM",
    person_name: "ROOT AUTHORITY",
    risk_score: 0.0,
    recommendation: "GENESIS_ROOT",
    event_type: "GENESIS_INITIALIZATION",
    previous_hash: "0000000000000000000000000000000000000000000000000000000000000000",
    current_hash: "8f48a9134b223d701e8a93cb02a0149bb42c55e97669d2d0b04e673410e527d1",
    nonce: 0,
    is_tampered: false
  },
  {
    block_number: 1,
    timestamp: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    screening_id: "SCR-2026-87980",
    document_type: "Passport",
    person_name: "DUBOIS, SOPHIE",
    risk_score: 12.0,
    recommendation: "CLEAR — LOW RISK",
    event_type: "DOCUMENT_SCREENING_VERIFIED",
    previous_hash: "8f48a9134b223d701e8a93cb02a0149bb42c55e97669d2d0b04e673410e527d1",
    current_hash: "11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff",
    nonce: 0,
    is_tampered: false
  },
  {
    block_number: 2,
    timestamp: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    screening_id: "SCR-2026-88044",
    document_type: "National ID",
    person_name: "CHEN, MARCUS",
    risk_score: 68.0,
    recommendation: "REVIEW REQUIRED",
    event_type: "DOCUMENT_SCREENING_VERIFIED",
    previous_hash: "11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff",
    current_hash: "e391b4820c7d441a5566778899aabbcc5566778899aabbcc5566778899aabbcc",
    nonce: 0,
    is_tampered: false
  },
  {
    block_number: 3,
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    screening_id: "SCR-2026-88095",
    document_type: "Visa",
    person_name: "VANCE, ELENA",
    risk_score: 78.0,
    recommendation: "HIGH RISK — MANUAL INSPECTION REQUIRED",
    event_type: "DOCUMENT_SCREENING_VERIFIED",
    previous_hash: "e391b4820c7d441a5566778899aabbcc5566778899aabbcc5566778899aabbcc",
    current_hash: "7b92c43110e5d99f0123456789abcdef0123456789abcdef0123456789abcdef",
    nonce: 0,
    is_tampered: false
  },
  {
    block_number: 4,
    timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    screening_id: "SCR-2026-88102",
    document_type: "Passport",
    person_name: "KUMAR, ARUN",
    risk_score: 18.0,
    recommendation: "CLEAR — LOW RISK",
    event_type: "DOCUMENT_SCREENING_VERIFIED",
    previous_hash: "7b92c43110e5d99f0123456789abcdef0123456789abcdef0123456789abcdef",
    current_hash: "a4f8e9102c3b889d1234ef567890abcdef1234567890abcdef1234567890abcd",
    nonce: 0,
    is_tampered: false
  }
];

export function generateDeterministicScreeningResult(preset = "valid_passport", customData = {}) {
  const isVisa = preset === "tampered_visa";
  const isMismatch = preset === "id_mismatch";
  
  const id = `SCR-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const timestamp = new Date().toISOString();

  if (isVisa) {
    return {
      screening_id: id,
      created_at: timestamp,
      document_type: "Visa",
      person_name: "VANCE, ELENA",
      document_number: "DEMO-EU-739421",
      nationality: "FRA",
      dob: "24-07-1989",
      expiry_date: "31-12-2029",
      quality: {
        blur_score: 145.2,
        is_blurry: false,
        brightness: 128.4,
        contrast: 62.1,
        resolution: "850x560",
        quality_verdict: "OPTIMAL",
        warning: null
      },
      classification: {
        document_type: "Visa",
        confidence: 0.94,
        classification_warning: null
      },
      ocr: {
        document_type: "Visa",
        fields: {
          visa_number: "DEMO-EU-739421",
          full_name: "VANCE, ELENA",
          nationality: "FRA",
          visa_type: "C (TOURIST)",
          valid_from: "12-05-2023",
          valid_until: "31-12-2029",
          duration_of_stay: "90 DAYS",
          issue_date: "10-05-2023"
        },
        structured_fields: [
          { key: "visa_number", label: "Visa Number", value: "DEMO-EU-739421", confidence: 0.98, bounding_box: [245, 131, 200, 24] },
          { key: "full_name", label: "Surname, Given Names", value: "VANCE, ELENA", confidence: 0.97, bounding_box: [245, 203, 220, 24] },
          { key: "valid_until", label: "Valid Until (TAMPERED)", value: "31-12-2029", confidence: 0.74, bounding_box: [525, 165, 160, 26] }
        ],
        raw_text: "SCHENGEN TOURIST VISA DEMO-EU-739421 VANCE ELENA FRA 31-12-2029",
        quality: { blur_score: 145.2, quality_verdict: "OPTIMAL" }
      },
      mrz: {
        has_mrz: true,
        mrz_type: "TD2",
        raw_lines: [
          "VCEUFRAVANCE<<ELENA<<<<<<<<<<<<<<<<<<<<<<<<<",
          "739421<<2FRA8907248F2311124<<<<<<<<<<<<<<<8"
        ],
        parsed_fields: {
          document_number: "739421",
          nationality: "FRA",
          dob_formatted: "24-07-1989",
          expiry_formatted: "12-11-2023"
        },
        check_digits: [
          { field_name: "Document Number", extracted_value: "739421", check_digit: "2", calculated_digit: "2", is_valid: true },
          { field_name: "Date of Birth", extracted_value: "890724", check_digit: "8", calculated_digit: "8", is_valid: true },
          { field_name: "Expiry Date", extracted_value: "231112", check_digit: "4", calculated_digit: "4", is_valid: true }
        ],
        all_check_digits_valid: true,
        visual_comparisons: [
          { field_name: "Full Name", visual_value: "VANCE, ELENA", mrz_value: "VANCE, ELENA", match: true, risk_impact: 0 },
          { field_name: "Document Number", visual_value: "DEMO-EU-739421", mrz_value: "739421", match: true, risk_impact: 0 },
          { field_name: "Expiry Date", visual_value: "31-12-2029", mrz_value: "12-11-2023", match: false, risk_impact: 25 }
        ],
        consistency_passed: false,
        mrz_score: 60.0
      },
      validation: {
        overall_status: "SUSPICIOUS",
        passed_checks: 4,
        total_checks: 5,
        rules: [
          { rule_name: "Required Fields Verification", rule_category: "Format", status: "PASS", description: "Mandatory fields present", risk_points: 0 },
          { rule_name: "Chronological Date Coherence", rule_category: "Date", status: "WARNING", description: "Validity 2029 conflicts with standard tourist visa policy", risk_points: 20 },
          { rule_name: "Synthetic Demo Watchlist Check", rule_category: "Watchlist", status: "PASS", description: "Clear in demo watchlist (Synthetic Data Only)", risk_points: 0 }
        ],
        validation_score: 65.0,
        watchlist_alert: null
      },
      tampering: {
        tampering_probability: 0.84,
        classification: "potential_manipulation",
        confidence: 0.91,
        forensic_score: 82.0,
        photo_integrity: 61.0,
        photo_status: "POTENTIAL MANIPULATION",
        text_integrity: 58.0,
        text_status: "POTENTIAL MANIPULATION",
        stamp_detected: true,
        stamp_consistency: 72.0,
        stamp_status: "REVIEW REQUIRED",
        metadata_status: "WARNING",
        metadata_warning: "Editing software signature detected in document stream (Adobe Photoshop CC 2023).",
        metadata_details: {
          software_signature: "Adobe Photoshop CC 2023 (Windows)",
          modification_date: "2023-11-15T14:22:08Z",
          color_space: "sRGB"
        },
        suspicious_regions: [
          {
            region_id: "REG-01",
            category: "photo_boundary",
            bounding_box: [43, 98, 174, 224],
            confidence: 0.88,
            reason: "High-frequency compression gradient discontinuity around portrait boundary (potential photo replacement).",
            severity: "HIGH"
          },
          {
            region_id: "REG-02",
            category: "text_baseline",
            bounding_box: [525, 160, 160, 35],
            confidence: 0.92,
            reason: "Font weight mismatch, character spacing variance, and background patch on validity date.",
            severity: "HIGH"
          }
        ],
        explanations: [
          "Photo perimeter shows sharp edge gradient discontinuity indicative of splicing.",
          "Text bounding box around expiry date exhibits non-standard baseline tilt and anti-aliasing artifacts.",
          "Embedded metadata reveals past processing via digital image editing software."
        ]
      },
      face: {
        face_detected_doc: true,
        face_detected_live: true,
        similarity_score: 89.0,
        match_status: "MATCH INDICATOR",
        confidence: 0.91,
        quality_doc: "ACCEPTABLE",
        quality_live: "OPTIMAL",
        orientation_aligned: true,
        face_box_doc: [45, 100, 170, 220],
        face_box_live: [50, 30, 300, 340],
        disclaimer: "AI-assisted similarity estimate — not a definitive identity determination. Biometric images processed ephemerally."
      },
      risk: {
        overall_risk: 78.0,
        risk_level: "HIGH",
        recommendation: "HIGH RISK — MANUAL INSPECTION REQUIRED",
        tampering_component: 82.0,
        validation_component: 35.0,
        mrz_component: 40.0,
        face_component: 11.0,
        metadata_component: 70.0,
        weights: { tampering: 0.35, validation: 0.20, mrz: 0.15, face: 0.20, metadata: 0.10 },
        positive_indicators: [
          { factor_type: "POSITIVE", category: "Validation", label: "Format & Rule Compliance", description: "Required statutory fields present.", impact_points: -15 }
        ],
        risk_indicators: [
          { factor_type: "RISK", category: "MRZ", label: "MRZ / Visual Expiry Discrepancy", description: "Visual validity date 2029 does not match MRZ expiration 2023.", impact_points: 25 },
          { factor_type: "RISK", category: "Forensics", label: "Potential Photo Replacement", description: "Sharp edge gradient discontinuity around portrait.", impact_points: 30 },
          { factor_type: "RISK", category: "Forensics", label: "Potential Text Manipulation", description: "Font variance and baseline jitter on date box.", impact_points: 25 },
          { factor_type: "RISK", category: "Metadata", label: "Editing Software Artifact", description: "Adobe Photoshop CC signature in stream.", impact_points: 15 }
        ],
        summary_explanation: "Document screening produced a composite risk score of 78.0/100 (HIGH). Recommendation: HIGH RISK — MANUAL INSPECTION REQUIRED."
      },
      blockchain_block_id: 5,
      blockchain_hash: "7b92c43110e5d99f0123456789abcdef0123456789abcdef0123456789abcdef"
    };
  }

  if (isMismatch) {
    return {
      screening_id: id,
      created_at: timestamp,
      document_type: "National ID",
      person_name: "CHEN, MARCUS",
      document_number: "DEMO-ID-582914",
      nationality: "SGP",
      dob: "22-09-1994",
      expiry_date: "14-02-2030",
      quality: { blur_score: 138.5, is_blurry: false, brightness: 130.0, contrast: 60.5, resolution: "850x560", quality_verdict: "OPTIMAL", warning: null },
      classification: { document_type: "National ID", confidence: 0.95, classification_warning: null },
      ocr: {
        document_type: "National ID",
        fields: { id_number: "DEMO-ID-582914", full_name: "CHEN, MARCUS", nationality: "SGP", dob: "22-09-1994", gender: "MALE", issue_date: "14-02-2020", expiry_date: "14-02-2030" },
        structured_fields: [
          { key: "id_number", label: "Identity Number", value: "DEMO-ID-582914", confidence: 0.99, bounding_box: [245, 95, 200, 24] },
          { key: "full_name", label: "Full Name", value: "CHEN, MARCUS", confidence: 0.98, bounding_box: [245, 131, 200, 24] },
          { key: "dob", label: "Date of Birth", value: "22-09-1994", confidence: 0.97, bounding_box: [245, 167, 140, 24] }
        ],
        raw_text: "NATIONAL CITIZEN ID DEMO-ID-582914 CHEN MARCUS SGP",
        quality: { blur_score: 138.5, quality_verdict: "OPTIMAL" }
      },
      mrz: {
        has_mrz: true,
        mrz_type: "TD1",
        raw_lines: ["I<SGP582914<<<9<<<<<<<<<<<<<<<", "9409224M3002148SGP<<<<<<<<<<<8", "CHEN<<MARCUS<<<<<<<<<<<<<<<<<<"],
        parsed_fields: { document_number: "582914", nationality: "SGP", surname: "CHEN", given_names: "MARCUS" },
        check_digits: [
          { field_name: "Document Number", extracted_value: "582914", check_digit: "9", calculated_digit: "9", is_valid: true },
          { field_name: "Date of Birth", extracted_value: "940922", check_digit: "4", calculated_digit: "4", is_valid: true }
        ],
        all_check_digits_valid: true,
        visual_comparisons: [
          { field_name: "Full Name", visual_value: "CHEN, MARCUS", mrz_value: "CHEN, MARCUS", match: true, risk_impact: 0 },
          { field_name: "Document Number", visual_value: "DEMO-ID-582914", mrz_value: "582914", match: true, risk_impact: 0 }
        ],
        consistency_passed: true,
        mrz_score: 100.0
      },
      validation: {
        overall_status: "VALID",
        passed_checks: 5,
        total_checks: 5,
        rules: [{ rule_name: "All Checks Passed", rule_category: "Format", status: "PASS", description: "Valid ID card schema", risk_points: 0 }],
        validation_score: 100.0,
        watchlist_alert: null
      },
      tampering: {
        tampering_probability: 0.12,
        classification: "likely_authentic",
        confidence: 0.94,
        forensic_score: 15.0,
        photo_integrity: 96.0,
        photo_status: "LIKELY AUTHENTIC",
        text_integrity: 94.0,
        text_status: "LIKELY AUTHENTIC",
        stamp_detected: false,
        stamp_consistency: 95.0,
        stamp_status: "NORMAL",
        metadata_status: "NORMAL",
        metadata_warning: null,
        metadata_details: { software_signature: "Standard Card Encoder", exif_present: true },
        suspicious_regions: [],
        explanations: ["Substrate and microprint lines are continuous and intact."]
      },
      face: {
        face_detected_doc: true,
        face_detected_live: true,
        similarity_score: 42.0,
        match_status: "POTENTIAL MISMATCH",
        confidence: 0.92,
        quality_doc: "GOOD",
        quality_live: "OPTIMAL",
        orientation_aligned: true,
        face_box_doc: [45, 100, 170, 220],
        face_box_live: [50, 30, 300, 340],
        disclaimer: "AI-assisted similarity estimate — not a definitive identity determination. Biometric images processed ephemerally."
      },
      risk: {
        overall_risk: 68.0,
        risk_level: "HIGH",
        recommendation: "REVIEW REQUIRED",
        tampering_component: 15.0,
        validation_component: 0.0,
        mrz_component: 0.0,
        face_component: 58.0,
        metadata_component: 10.0,
        weights: { tampering: 0.35, validation: 0.20, mrz: 0.15, face: 0.20, metadata: 0.10 },
        positive_indicators: [
          { factor_type: "POSITIVE", category: "Validation", label: "Document Format Valid", description: "Official national ID format matches specifications.", impact_points: -15 },
          { factor_type: "POSITIVE", category: "Forensics", label: "Substrate Intact", description: "No physical or digital tampering detected on ID card.", impact_points: -20 }
        ],
        risk_indicators: [
          { factor_type: "RISK", category: "Biometrics", label: "Low Facial Similarity (42%)", description: "Presented live face differs significantly from ID card portrait.", impact_points: 35 }
        ],
        summary_explanation: "Document screening produced a composite risk score of 68.0/100 (HIGH). Recommendation: REVIEW REQUIRED (Potential Impersonation)."
      },
      blockchain_block_id: 5,
      blockchain_hash: "e391b4820c7d441a5566778899aabbcc5566778899aabbcc5566778899aabbcc"
    };
  }

  // Default: Valid Passport (Arun Kumar)
  return {
    screening_id: id,
    created_at: timestamp,
    document_type: "Passport",
    person_name: "KUMAR, ARUN",
    document_number: "DEMO-IN-482913",
    nationality: "IND",
    dob: "15-04-1998",
    expiry_date: "09-01-2031",
    quality: { blur_score: 152.8, is_blurry: false, brightness: 125.0, contrast: 64.2, resolution: "850x560", quality_verdict: "OPTIMAL", warning: null },
    classification: { document_type: "Passport", confidence: 0.96, classification_warning: null },
    ocr: {
      document_type: "Passport",
      fields: { passport_number: "DEMO-IN-482913", full_name: "KUMAR, ARUN", surname: "KUMAR", given_names: "ARUN", nationality: "IND", dob: "15-04-1998", gender: "M", issue_date: "10-01-2021", expiry_date: "09-01-2031" },
      structured_fields: [
        { key: "passport_number", label: "Passport No.", value: "DEMO-IN-482913", confidence: 0.99, bounding_box: [245, 131, 180, 24] },
        { key: "surname", label: "Surname", value: "KUMAR", confidence: 0.99, bounding_box: [245, 167, 120, 24] },
        { key: "given_names", label: "Given Names", value: "ARUN", confidence: 0.99, bounding_box: [530, 167, 120, 24] },
        { key: "nationality", label: "Nationality", value: "IND", confidence: 0.99, bounding_box: [245, 203, 100, 24] },
        { key: "dob", label: "Date of Birth", value: "15-04-1998", confidence: 0.98, bounding_box: [530, 203, 140, 24] }
      ],
      raw_text: "PASSPORT REPUBLIC OF ANTIGRAV-LAND DEMO-IN-482913 KUMAR ARUN IND 15-04-1998 M 09-01-2031",
      quality: { blur_score: 152.8, quality_verdict: "OPTIMAL" }
    },
    mrz: {
      has_mrz: true,
      mrz_type: "TD3",
      raw_lines: [
        "P<INDKUMAR<<ARUN<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
        "482913<<5IND9804152M3101097<<<<<<<<<<<<<<<4"
      ],
      parsed_fields: { document_number: "482913", surname: "KUMAR", given_names: "ARUN", nationality: "IND", dob_formatted: "15-04-1998", expiry_formatted: "09-01-2031" },
      check_digits: [
        { field_name: "Document Number", extracted_value: "482913", check_digit: "5", calculated_digit: "5", is_valid: true },
        { field_name: "Date of Birth", extracted_value: "980415", check_digit: "2", calculated_digit: "2", is_valid: true },
        { field_name: "Expiry Date", extracted_value: "310109", check_digit: "7", calculated_digit: "7", is_valid: true }
      ],
      all_check_digits_valid: true,
      visual_comparisons: [
        { field_name: "Surname", visual_value: "KUMAR", mrz_value: "KUMAR", match: true, risk_impact: 0 },
        { field_name: "Given Names", visual_value: "ARUN", mrz_value: "ARUN", match: true, risk_impact: 0 },
        { field_name: "Document Number", visual_value: "DEMO-IN-482913", mrz_value: "482913", match: true, risk_impact: 0 },
        { field_name: "Date of Birth", visual_value: "15-04-1998", mrz_value: "15-04-1998", match: true, risk_impact: 0 }
      ],
      consistency_passed: true,
      mrz_score: 100.0
    },
    validation: {
      overall_status: "VALID",
      passed_checks: 5,
      total_checks: 5,
      rules: [{ rule_name: "All Mandatory Checks Passed", rule_category: "Format", status: "PASS", description: "ICAO compliant travel document", risk_points: 0 }],
      validation_score: 100.0,
      watchlist_alert: null
    },
    tampering: {
      tampering_probability: 0.08,
      classification: "likely_authentic",
      confidence: 0.96,
      forensic_score: 10.0,
      photo_integrity: 96.5,
      photo_status: "LIKELY AUTHENTIC",
      text_integrity: 97.0,
      text_status: "LIKELY AUTHENTIC",
      stamp_detected: true,
      stamp_consistency: 94.0,
      stamp_status: "NORMAL",
      metadata_status: "NORMAL",
      metadata_warning: null,
      metadata_details: { software_signature: "ICAO PassGen Optical Engine", exif_present: true },
      suspicious_regions: [],
      explanations: ["Guilloche pattern is continuous.", "Uniform compression density across all zones."]
    },
    face: {
      face_detected_doc: true,
      face_detected_live: true,
      similarity_score: 92.0,
      match_status: "MATCH INDICATOR",
      confidence: 0.95,
      quality_doc: "OPTIMAL",
      quality_live: "OPTIMAL",
      orientation_aligned: true,
      face_box_doc: [45, 100, 170, 220],
      face_box_live: [50, 30, 300, 340],
      disclaimer: "AI-assisted similarity estimate — not a definitive identity determination. Biometric images processed ephemerally."
    },
    risk: {
      overall_risk: 18.0,
      risk_level: "LOW",
      recommendation: "CLEAR — LOW RISK",
      tampering_component: 10.0,
      validation_component: 0.0,
      mrz_component: 0.0,
      face_component: 8.0,
      metadata_component: 10.0,
      weights: { tampering: 0.35, validation: 0.20, mrz: 0.15, face: 0.20, metadata: 0.10 },
      positive_indicators: [
        { factor_type: "POSITIVE", category: "Validation", label: "Format & Rule Compliance", description: "All mandatory statutory passport fields are valid.", impact_points: -15 },
        { factor_type: "POSITIVE", category: "MRZ", label: "MRZ Checksum & Cross-Check Match", description: "All 7-3-1 check digits verified and match VIZ fields.", impact_points: -15 },
        { factor_type: "POSITIVE", category: "Forensics", label: "Security Guilloche Pattern Intact", description: "Substrate background lines flow seamlessly through portrait.", impact_points: -20 },
        { factor_type: "POSITIVE", category: "Biometrics", label: "Facial Similarity High (92%)", description: "Live presented face matches document photo.", impact_points: -20 }
      ],
      risk_indicators: [],
      summary_explanation: "Document screening produced a composite risk score of 18.0/100 (LOW). Recommendation: CLEAR — LOW RISK."
    },
    blockchain_block_id: 5,
    blockchain_hash: "a4f8e9102c3b889d1234ef567890abcdef1234567890abcdef1234567890abcd"
  };
}
