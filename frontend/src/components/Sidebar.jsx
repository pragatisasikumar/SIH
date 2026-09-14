import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileSearch, 
  ScanEye, 
  UserCheck, 
  ShieldAlert, 
  History, 
  Blocks, 
  BarChart3, 
  Settings2,
  Lock,
  Cpu
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { to: '/', label: 'SOC Dashboard', icon: LayoutDashboard, badge: 'LIVE' },
    { to: '/new-screening', label: 'Screening Wizard', icon: FileSearch, highlight: true },
    { to: '/document-analysis', label: 'Document Forensics', icon: ScanEye },
    { to: '/face-verification', label: 'Face Verification', icon: UserCheck },
    { to: '/risk-assessment', label: 'Risk Engine', icon: ShieldAlert },
    { to: '/history', label: 'Screening History', icon: History },
    { to: '/blockchain', label: 'Blockchain Ledger', icon: Blocks, badge: 'SHA-256' },
    { to: '/analytics', label: 'Intelligence Analytics', icon: BarChart3 },
    { to: '/settings', label: 'Security & Node', icon: Settings2 },
  ];

  return (
    <aside className="w-64 bg-[#090e1a] border-r border-cyber-border flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        {/* Navigation Group */}
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold px-3 mb-2">
            Screening Operations
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all group
                    ${isActive 
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-glow-cyan/10 font-semibold' 
                      : item.highlight 
                        ? 'text-white bg-slate-800/60 hover:bg-slate-800 hover:text-cyan-300 border border-slate-700/50' 
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${item.highlight ? 'text-cyan-400' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer System Status Card */}
      <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI ENGINE</span>
          </span>
          <span className="text-emerald-400 font-bold">READY</span>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>IMMUTABLE LEDGER</span>
          </span>
          <span className="text-cyan-400 font-bold">SYNCED</span>
        </div>
        <div className="pt-1 text-[9px] text-slate-500 border-t border-slate-800/80 leading-tight">
          Assistive human review protocol active.
        </div>
      </div>
    </aside>
  );
}
