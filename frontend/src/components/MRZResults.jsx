import React from 'react';
import { Terminal, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, ArrowRightLeft } from 'lucide-react';

export default function MRZResults({ mrz }) {
  if (!mrz) return null;

  const rawLines = mrz.raw_lines || [];
  const checkDigits = mrz.check_digits || [];
  const visualComparisons = mrz.visual_comparisons || [];

  return (
    <div className="space-y-5">
      {/* Raw MRZ Optical Stream Box */}
      <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Machine Readable Zone (MRZ ICAO 9303 {mrz.mrz_type})
            </h3>
          </div>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
            mrz.consistency_passed 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse'
          }`}>
            {mrz.consistency_passed ? '✓ VIZ & MRZ CONSISTENT' : '✕ DISCREPANCY DETECTED'}
          </span>
        </div>

        {/* Monospaced Raw MRZ Display */}
        <div className="bg-slate-950 p-4 rounded-lg border border-cyan-500/20 font-mono text-xs text-cyan-300 tracking-widest space-y-1 overflow-x-auto selection:bg-cyan-500/40">
          {rawLines.map((line, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-slate-600 text-[10px] select-none">L{idx + 1}</span>
              <span className="font-semibold text-slate-100">{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Inspection Zone ↔ MRZ Cross-Check Comparison Table */}
      <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Visual Field ↔ MRZ Optical Consistency Verification
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Cross-Verification Matrix
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                <th className="pb-2">Field Inspected</th>
                <th className="pb-2">Visual Inspection (VIZ)</th>
                <th className="pb-2">MRZ Optical Stream</th>
                <th className="pb-2">Verification Status</th>
                <th className="pb-2 text-right">Risk Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {visualComparisons.map((item, idx) => (
                <tr key={idx} className={`transition-colors ${!item.match ? 'bg-rose-500/10' : 'hover:bg-slate-900/40'}`}>
                  <td className="py-2.5 font-sans font-semibold text-slate-200">
                    {item.field_name}
                  </td>
                  <td className="py-2.5 text-slate-300 font-bold">
                    {item.visual_value}
                  </td>
                  <td className="py-2.5 text-cyan-300">
                    {item.mrz_value}
                  </td>
                  <td className="py-2.5">
                    {item.match ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> MATCH
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-400 font-bold text-[11px]">
                        <XCircle className="w-3.5 h-3.5" /> MISMATCH
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 text-right">
                    {item.risk_impact > 0 ? (
                      <span className="text-rose-400 font-bold">+{item.risk_impact} Risk</span>
                    ) : (
                      <span className="text-emerald-400">0 (Clean)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7-3-1 Modulus 10 Check Digits Audit */}
      <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>ICAO 7-3-1 Modulus 10 Check-Digit Verification</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Algorithm: [7, 3, 1] Mod 10</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {checkDigits.map((cd, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-semibold text-slate-400">{cd.field_name}</div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span>Value: <strong className="text-white">{cd.extracted_value}</strong></span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Digit: {cd.check_digit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
