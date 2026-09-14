import React, { useState } from 'react';
import { ScanEye, Upload, Layers, Sliders, ShieldCheck, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import ForensicViewer from '../components/ForensicViewer';
import TamperingResults from '../components/TamperingResults';
import { DEMO_SCENARIOS } from '../data/syntheticDocuments';
import { api } from '../services/api';

export default function DocumentAnalysis() {
  const [selectedScenario, setSelectedScenario] = useState('tampered_visa');
  const [documentImage, setDocumentImage] = useState('/demo/sample_visa_tampered.png');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const runAnalysis = async (preset) => {
    setSelectedScenario(preset);
    const scen = DEMO_SCENARIOS[preset];
    if (scen) {
      setDocumentImage(scen.documentImage);
      setLoading(true);
      const res = await api.createScreening({
        document_type: scen.documentType,
        scenario_preset: preset,
        document_image_base64: scen.documentImage,
        presented_face_base64: scen.presentedFace
      });
      setAnalysis(res);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    runAnalysis('tampered_visa');
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
            Forensic Laboratory
          </span>
          <span className="text-xs text-slate-400 font-mono">Deep Substrate & Edge Discontinuity Inspection</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-wide">
          AI-Assisted Document Forensics & Manipulation Lab
        </h2>
        <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
          Analyzes digital substrate consistency, Error Level Analysis (ELA) compression gradients, font baseline alignment, stamp circularity contours, and embedded editing software metadata.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {Object.values(DEMO_SCENARIOS).map((scen) => (
          <button
            key={scen.key}
            onClick={() => runAnalysis(scen.key)}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedScenario === scen.key 
                ? 'bg-cyan-500/15 border-cyan-400 shadow-glow-cyan/20 ring-1 ring-cyan-400/40' 
                : 'glass-panel glass-panel-hover border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
              <span>{scen.title}</span>
              <span className="text-[10px] font-mono text-cyan-400">{scen.documentType}</span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1">{scen.subtitle}</p>
          </button>
        ))}
      </div>

      {/* Forensic Dual Pane Viewer */}
      {analysis && (
        <div className="space-y-6">
          <ForensicViewer
            documentImage={documentImage}
            tampering={analysis.tampering}
            ocr={analysis.ocr}
            mrz={analysis.mrz}
          />
          <TamperingResults tampering={analysis.tampering} />
        </div>
      )}
    </div>
  );
}
