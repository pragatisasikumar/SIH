import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan', trend }) {
  const colorStyles = {
    cyan: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10 shadow-glow-cyan/20',
    emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 shadow-glow-emerald/20',
    amber: 'border-amber-500/30 text-amber-400 bg-amber-500/10 shadow-glow-amber/20',
    rose: 'border-rose-500/30 text-rose-400 bg-rose-500/10 shadow-glow-rose/20',
    blue: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  };

  const currentStyle = colorStyles[color] || colorStyles.cyan;

  return (
    <div className="glass-panel glass-panel-hover rounded-xl p-5 border relative overflow-hidden flex flex-col justify-between">
      {/* Background soft glow accent */}
      <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-20 ${currentStyle.split(' ')[2]}`} />
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-lg border ${currentStyle}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div>
        <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
          {value}
        </div>
        {subtitle && (
          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>{subtitle}</span>
            {trend && (
              <span className="font-mono text-emerald-400 font-medium">{trend}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
