/**
 * SecureID AI - Synthetic Demonstration Document Profiles
 * Fictional identities only. Zero real-world PII or biometric data.
 */

export const DEMO_SCENARIOS = {
  valid_passport: {
    id: "SCENARIO-1",
    key: "valid_passport",
    title: "Scenario 1: Valid Passport",
    subtitle: "Clean ICAO TD3 Passport with matching MRZ & biometrics",
    documentType: "Passport",
    subjectName: "KUMAR, ARUN",
    documentNumber: "DEMO-IN-482913",
    nationality: "IND",
    dob: "15-04-1998",
    expiryDate: "09-01-2031",
    documentImage: "/demo/sample_passport_valid.png",
    presentedFace: "/demo/presented_face_match.png",
    expectedRisk: 18,
    expectedRecommendation: "CLEAR — LOW RISK",
    badgeColor: "emerald",
    tags: ["ICAO Compliant", "MRZ Match", "Biometric Match", "Zero Tampering"]
  },
  tampered_visa: {
    id: "SCENARIO-2",
    key: "tampered_visa",
    title: "Scenario 2: Tampered Visa",
    subtitle: "Spliced validity date, photo boundary anomaly & metadata tag",
    documentType: "Visa",
    subjectName: "VANCE, ELENA",
    documentNumber: "DEMO-EU-739421",
    nationality: "FRA",
    dob: "24-07-1989",
    expiryDate: "31-12-2029",
    documentImage: "/demo/sample_visa_tampered.png",
    presentedFace: "/demo/presented_face_mismatch.png",
    expectedRisk: 78,
    expectedRecommendation: "HIGH RISK — MANUAL INSPECTION REQUIRED",
    badgeColor: "rose",
    tags: ["Photo Splicing", "Date Altered", "MRZ Mismatch", "Metadata Alert"]
  },
  id_mismatch: {
    id: "SCENARIO-3",
    key: "id_mismatch",
    title: "Scenario 3: Identity Mismatch",
    subtitle: "Authentic National ID presented by an unauthorized individual",
    documentType: "National ID",
    subjectName: "CHEN, MARCUS",
    documentNumber: "DEMO-ID-582914",
    nationality: "SGP",
    dob: "22-09-1994",
    expiryDate: "14-02-2030",
    documentImage: "/demo/sample_id_mismatch.png",
    presentedFace: "/demo/presented_face_mismatch.png",
    expectedRisk: 68,
    expectedRecommendation: "REVIEW REQUIRED",
    badgeColor: "amber",
    tags: ["Valid ID Card", "Low Facial Match (42%)", "Impersonation Risk"]
  }
};
