import React from 'react';
import { UserCheck, UserX, AlertTriangle, Shield, CheckCircle2, Scan } from 'lucide-react';

export default function FaceVerification({ face, documentImage, presentedFace }) {
  if (!face) return null;

  const isMatch = face.similarity_score >= 70;

  return (
    <div className="space-y-5">
      {/* Side-by-Side Face Comparison Matrix */}
      <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Scan className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Biometric Facial Comparison & Similarity Analysis
            </h3>
          </div>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
            isMatch
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse'
          }`}>
            {face.match_status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* 1. Document Portrait */}
          <div className="space-y-2 text-center">
            <div className="text-xs font-mono uppercase text-slate-400">1. Extracted Document Face</div>
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 h-48 w-44 mx-auto flex items-center justify-center">
              {documentImage ? (
                <img src={documentImage} alt="Document Portrait" className="h-full object-cover w-full" />
              ) : (
                <div className="text-xs text-slate-500 font-mono">No doc image</div>
              )}
              <div className="absolute top-2 left-2 bg-slate-900/90 text-cyan-400 text-[9px] font-mono px-1.5 py-0.5 rounded border border-cyan-500/30">
                ICAO CROP
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-400">Quality: {face.quality_doc || 'OPTIMAL'}</div>
          </div>

          {/* 2. Biometric Similarity Match Gauge in Center */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Facial Feature Alignment
            </span>
            <div className="text-4xl font-extrabold font-mono" style={{ color: isMatch ? '#10b981' : '#ef4444' }}>
              {face.similarity_score.toFixed(0)}%
            </div>
            <div className={`text-xs font-bold font-mono px-3 py-1 rounded-full border ${
              isMatch 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
              {isMatch ? '✓ VERIFIED MATCH' : '✕ POTENTIAL MISMATCH'}
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              Border Threshold: 70.0%
            </div>
          </div>

          {/* 3. Live Presented Face */}
          <div className="space-y-2 text-center">
            <div className="text-xs font-mono uppercase text-slate-400">2. Live Presented Face</div>
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 h-48 w-44 mx-auto flex items-center justify-center">
              {presentedFace ? (
                <img src={presentedFace} alt="Presented Face" className="h-full object-cover w-full" />
              ) : (
                <div className="text-xs text-slate-500 font-mono">No live photo</div>
              )}
              <div className="absolute top-2 right-2 bg-slate-900/90 text-emerald-400 text-[9px] font-mono px-1.5 py-0.5 rounded border border-emerald-500/30">
                LIVE CAPTURE
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-400">Quality: {face.quality_live || 'OPTIMAL'}</div>
          </div>
        </div>
      </div>

      {/* Mandatory Biometric Privacy & Assistive Disclaimer */}
      <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-1 text-xs">
        <div className="text-amber-400 font-bold flex items-center gap-1.5 font-mono text-[11px] uppercase">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Biometric Assistive Decision Notice</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">
          {face.disclaimer || "AI-assisted similarity estimate — not a definitive identity determination."}
        </p>
      </div>
    </div>
  );
}
