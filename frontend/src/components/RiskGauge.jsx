import React from 'react';

export default function RiskGauge({ score = 0, size = 180, showLabel = true }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(100, Math.max(0, score));
  
  // 3/4 circle meter (270 degrees)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (clampedScore / 100) * arcLength;

  const getColor = () => {
    if (clampedScore <= 25) return '#10b981'; // Emerald
    if (clampedScore <= 50) return '#f59e0b'; // Amber
    if (clampedScore <= 75) return '#f97316'; // Orange
    return '#ef4444'; // Rose
  };

  const color = getColor();

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg width={size} height={size} viewBox="0 0 180 180" className="transform -rotate-135">
        {/* Background Track */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="12"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />
        {/* Active Progress Arc */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${color}80)`
          }}
        />
      </svg>
      {/* Center Label */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-extrabold font-mono tracking-tight" style={{ color }}>
          {clampedScore.toFixed(0)}
        </span>
        <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-1">
          / 100 Risk
        </span>
      </div>
      {showLabel && (
        <div className="mt-2 text-xs font-mono font-medium text-slate-400">
          {clampedScore <= 25 ? 'CLEAR' : clampedScore <= 50 ? 'ELEVATED' : clampedScore <= 75 ? 'HIGH RISK' : 'CRITICAL'}
        </div>
      )}
    </div>
  );
}
