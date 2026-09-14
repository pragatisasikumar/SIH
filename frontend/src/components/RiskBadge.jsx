import React from 'react';

export default function RiskBadge({ level, recommendation, score }) {
  const getStyle = () => {
    switch (level?.toUpperCase()) {
      case 'LOW':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
          label: 'LOW RISK'
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
          label: 'MEDIUM RISK'
        };
      case 'HIGH':
        return {
          bg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
          dot: 'bg-orange-400',
          label: 'HIGH RISK'
        };
      case 'CRITICAL':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          dot: 'bg-rose-400 animate-ping',
          label: 'CRITICAL RISK'
        };
      default:
        return {
          bg: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
          dot: 'bg-slate-400',
          label: level || 'UNKNOWN'
        };
    }
  };

  const style = getStyle();

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-wider ${style.bg}`}>
      <span className={`w-2 h-2 rounded-full ${style.dot}`} />
      <span>{recommendation || style.label}</span>
      {score !== undefined && (
        <span className="opacity-75 font-mono">({score.toFixed(0)}/100)</span>
      )}
    </div>
  );
}
