import React, { useState } from 'react';
import { ShieldAlert, Sliders, Info, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import RiskGauge from '../components/RiskGauge';
import RiskBadge from '../components/RiskBadge';
import RiskFactors from '../components/RiskFactors';
import { DEMO_SCENARIOS } from '../data/syntheticDocuments';
import { api } from '../services/api';

export default function RiskAssessmentPage() {
  const [selectedScenario, setSelectedScenario] = useState('tampered_visa');
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
    loadScenario('tampered_visa');
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
            Explainable AI Engine
          </span>
          <span className="text-xs text-slate-400 font-mono">Transparent Multi-Factor Risk Assessment</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-wide">
          Explainable Risk Engine & Recommendation Simulator
        </h2>
        <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
          Aggregates five independent forensic vectors: Tampering (35%), Document Rules (20%), MRZ Consistency (15%), Biometric Alignment (20%), and Metadata (10%) into an explainable 0–100 risk score.
        </p>
      </div>

      {/* Scenario Selector */}
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
              <RiskBadge level={scen.expectedRisk <= 25 ? 'LOW' : scen.expectedRisk <= 70 ? 'HIGH' : 'HIGH'} score={scen.expectedRisk} />
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1">{scen.subtitle}</p>
          </button>
        ))}
      </div>

      {/* Risk Factors Breakdown */}
      {analysis && (
        <RiskFactors risk={analysis.risk} />
      )}
    </div>
  );
}
