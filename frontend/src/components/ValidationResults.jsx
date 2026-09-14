import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Database } from 'lucide-react';

export default function ValidationResults({ validation }) {
  if (!validation) return null;

  const rules = validation.rules || [];

  return (
    <div className="space-y-5">
      {/* Overall Validation Score Card */}
      <div className="glass-panel rounded-xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Rule Validation Engine Status
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
              validation.overall_status === 'VALID'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : validation.overall_status === 'SUSPICIOUS'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
              {validation.overall_status}
            </span>
          </div>
          <div className="text-xl font-extrabold text-white font-mono">
            {validation.passed_checks} of {validation.total_checks} Checks Passed
          </div>
          <p className="text-xs text-slate-400">
            Automated statutory compliance and synthetic database lookup.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-slate-400">Compliance Score</div>
            <div className="text-2xl font-bold font-mono text-cyan-400">{validation.validation_score.toFixed(0)}%</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Synthetic Watchlist Warning if active */}
      {validation.watchlist_alert && (
        <div className="bg-rose-500/15 border border-rose-500/40 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-300">
              Synthetic Security Watchlist Hit
            </div>
            <p className="text-xs text-rose-200">
              {validation.watchlist_alert}
            </p>
            <span className="text-[10px] font-mono text-rose-400 block pt-1">
              * Synthetic demonstration data only. Does not query real law-enforcement databases.
            </span>
          </div>
        </div>
      )}

      {/* Rules Checklist */}
      <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2.5">
          Standard Statutory Rule Inspections
        </h3>

        <div className="space-y-2.5">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-lg border flex items-start justify-between gap-4 transition-all ${
                rule.status === 'PASS'
                  ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                  : rule.status === 'WARNING'
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-rose-500/10 border-rose-500/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {rule.status === 'PASS' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {rule.status === 'WARNING' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                  {rule.status === 'FAIL' && <XCircle className="w-4 h-4 text-rose-400" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-100 font-sans">{rule.rule_name}</span>
                    <span className="text-[9px] font-mono uppercase bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                      {rule.rule_category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  rule.status === 'PASS'
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : rule.status === 'WARNING'
                      ? 'text-amber-400 bg-amber-500/10'
                      : 'text-rose-400 bg-rose-500/10'
                }`}>
                  {rule.status}
                </span>
                {rule.risk_points > 0 && (
                  <div className="text-[10px] text-rose-400 font-mono font-bold mt-1">
                    +{rule.risk_points} Risk
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
