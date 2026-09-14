import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, ShieldAlert, Sliders } from 'lucide-react';
import RiskBadge from './RiskBadge';
import RiskGauge from './RiskGauge';

export default function RiskFactors({ risk }) {
  if (!risk) return null;

  const positives = risk.positive_indicators || [];
  const risks = risk.risk_indicators || [];

  return (
    <div className="space-y-6">
      {/* Executive Risk Score Header with Gauge & Recommendation */}
      <div className="glass-panel rounded-xl p-6 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex justify-center">
          <RiskGauge score={risk.overall_risk} size={190} showLabel={false} />
        </div>

        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              AI-Assisted Screening Assessment
            </span>
            <RiskBadge level={risk.risk_level} recommendation={risk.recommendation} />
          </div>

          <div className="text-2xl font-extrabold text-white font-mono">
            {risk.recommendation}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {risk.summary_explanation}
          </p>

          <div className="text-[11px] font-mono text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            * Screening recommendations are assistive indicators for authorized border & security officers.
          </div>
        </div>
      </div>

      {/* Weighted 5-Component Contribution Breakdown */}
      <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Weighted Component Risk Breakdown</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Normalized 0–100 Scale</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
          {/* 1. Tampering */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[10px] uppercase text-slate-400 font-semibold">
              <span>Tampering</span>
              <span className="text-cyan-400 font-mono">35% Wt</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {risk.tampering_component?.toFixed(0)}/100
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-400 rounded-full" 
                style={{ width: `${Math.min(100, risk.tampering_component || 0)}%` }} 
              />
            </div>
          </div>

          {/* 2. Validation */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[10px] uppercase text-slate-400 font-semibold">
              <span>Validation</span>
              <span className="text-cyan-400 font-mono">20% Wt</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {risk.validation_component?.toFixed(0)}/100
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-400 rounded-full" 
                style={{ width: `${Math.min(100, risk.validation_component || 0)}%` }} 
              />
            </div>
          </div>

          {/* 3. MRZ */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[10px] uppercase text-slate-400 font-semibold">
              <span>MRZ Consistency</span>
              <span className="text-cyan-400 font-mono">15% Wt</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {risk.mrz_component?.toFixed(0)}/100
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-400 rounded-full" 
                style={{ width: `${Math.min(100, risk.mrz_component || 0)}%` }} 
              />
            </div>
          </div>

          {/* 4. Face Similarity */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[10px] uppercase text-slate-400 font-semibold">
              <span>Face Match</span>
              <span className="text-cyan-400 font-mono">20% Wt</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {risk.face_component?.toFixed(0)}/100
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-violet-400 rounded-full" 
                style={{ width: `${Math.min(100, risk.face_component || 0)}%` }} 
              />
            </div>
          </div>

          {/* 5. Metadata */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[10px] uppercase text-slate-400 font-semibold">
              <span>Metadata</span>
              <span className="text-cyan-400 font-mono">10% Wt</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {risk.metadata_component?.toFixed(0)}/100
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 rounded-full" 
                style={{ width: `${Math.min(100, risk.metadata_component || 0)}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Itemized Explainable Positive & Risk Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Positive Indicators */}
        <div className="glass-panel rounded-xl p-5 border border-emerald-500/30 bg-emerald-500/5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Positive Authenticity Indicators ({positives.length})</span>
          </h4>

          {positives.length === 0 ? (
            <p className="text-xs text-slate-400 font-mono">No positive indicators recorded.</p>
          ) : (
            <div className="space-y-2.5">
              {positives.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-emerald-500/20 text-xs font-mono flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-emerald-300 flex items-center gap-1.5 font-sans">
                      <span>✓</span>
                      <span>{item.label}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] font-sans mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-emerald-400 font-bold shrink-0">
                    {item.impact_points} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Risk Indicators */}
        <div className="glass-panel rounded-xl p-5 border border-rose-500/30 bg-rose-500/5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Risk Indicators & Anomalies ({risks.length})</span>
          </h4>

          {risks.length === 0 ? (
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-emerald-400 font-mono">
              ✓ Zero risk indicators triggered. Document appears clean.
            </div>
          ) : (
            <div className="space-y-2.5">
              {risks.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-rose-500/30 text-xs font-mono flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-rose-300 flex items-center gap-1.5 font-sans">
                      <span>✕</span>
                      <span>{item.label}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] font-sans mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-rose-400 font-bold shrink-0">
                    +{item.impact_points} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
