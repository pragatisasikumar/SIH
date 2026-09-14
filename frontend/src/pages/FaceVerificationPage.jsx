import React, { useState } from 'react';
import { UserCheck, UserX, AlertTriangle, Scan, Sliders, ShieldCheck, Camera } from 'lucide-react';
import FaceVerification from '../components/FaceVerification';
import { DEMO_SCENARIOS } from '../data/syntheticDocuments';
import { api } from '../services/api';

export default function FaceVerificationPage() {
  const [selectedScenario, setSelectedScenario] = useState('valid_passport');
  const [threshold, setThreshold] = useState(70);
  const [analysis, setAnalysis] = useState(null);

  const loadScenario = async (preset) => {
    setSelectedScenario(preset);
    const scen = DEMO_SCENARIOS[preset];
    if (scen) {
      const res = await api.createScreening({
        document_type: scen.documentType,
        scenario_preset: preset,
        document_image_base64: scen.documentImage,
        presented_face_base64: scen.presentedFace
      });
      setAnalysis(res);
    }
  };

  React.useEffect(() => {
    loadScenario('valid_passport');
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
            Biometric Workbench
          </span>
          <span className="text-xs text-slate-400 font-mono">1:1 Document vs Live Portrait Similarity</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-wide">
          Facial Biometric Verification & Impersonation Detection
        </h2>
        <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
          Compares facial features extracted from the physical document portrait against the live webcam capture to detect identity mismatch and proxy travelers.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {Object.values(DEMO_SCENARIOS).map((scen) => (
          <button
            key={scen.key}
            onClick={() => loadScenario(scen.key)}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedScenario === scen.key 
                ? 'bg-cyan-500/15 border-cyan-400 shadow-glow-cyan/20 ring-1 ring-cyan-400/40' 
                : 'glass-panel glass-panel-hover border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
              <span>{scen.title}</span>
              <span className="text-[10px] font-mono text-cyan-400">
                {scen.key === 'id_mismatch' ? 'Impersonator Test' : 'Match Test'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1">{scen.subtitle}</p>
          </button>
        ))}
      </div>

      {/* Main Face Comparison Display */}
      {analysis && (
        <FaceVerification
          face={analysis.face}
          documentImage={analysis.ocr?.document_type === 'Passport' ? '/demo/sample_passport_valid.png' : analysis.ocr?.document_type === 'Visa' ? '/demo/sample_visa_tampered.png' : '/demo/sample_id_mismatch.png'}
          presentedFace={analysis.face?.similarity_score < 70 ? '/demo/presented_face_mismatch.png' : '/demo/presented_face_match.png'}
        />
      )}
    </div>
  );
}
