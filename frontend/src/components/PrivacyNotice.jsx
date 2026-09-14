import React, { useState } from 'react';
import { ShieldAlert, X, Info } from 'lucide-react';

export default function PrivacyNotice({ compact = false }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (compact) {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 px-3 flex items-center justify-between text-xs text-amber-300">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            <strong>Synthetic Data Only:</strong> Do not upload real identity documents. Biometric images processed ephemerally.
          </span>
        </div>
        <button onClick={() => setDismissed(true)} className="text-amber-400 hover:text-white p-1">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-cyan-500/10 border border-amber-500/40 rounded-xl p-4 shadow-glass relative">
      <button 
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 transition-colors"
        title="Dismiss notice"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1 pr-6">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <span>Official Demonstration Privacy & Governance Notice</span>
            <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded">MANDATORY</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            This prototype operates strictly on <strong>synthetic identity data</strong>. Do not upload real passports, Aadhaar cards, government IDs, or sensitive biometric records into the demonstration environment.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 pt-1 font-mono">
            <span>• Biometric images processed ephemerally (Zero permanent retention)</span>
            <span>• AI outputs are assistive screening indicators</span>
            <span>• Final verification reserved for authorized personnel</span>
          </div>
        </div>
      </div>
    </div>
  );
}
