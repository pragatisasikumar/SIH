import React, { useState, useEffect } from 'react';
import { ShieldCheck, Wifi, WifiOff, Clock, Terminal, Bell, Lock } from 'lucide-react';
import { subscribeBackendStatus } from '../services/api';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOnline, setIsOnline] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const unsub = subscribeBackendStatus((status) => {
      setIsOnline(status);
    });
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      unsub();
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="h-16 border-b border-cyber-border bg-[#090e1a]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Branding & Node Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 p-0.5 flex items-center justify-center shadow-glow-cyan">
            <div className="w-full h-full bg-[#0b1120] rounded-[7px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
                SecureID <span className="text-cyan-400 font-mono">AI</span>
              </h1>
              <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                v2.1 SEC-OPS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Border & Travel Document Screening Node #014</p>
          </div>
        </div>
      </div>

      {/* Right: Operational Status, System Clock & Quick Actions */}
      <div className="flex items-center gap-4">
        {/* Backend Connection Badge */}
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border ${
          isOnline 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        }`}>
          {isOnline ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Wifi className="w-3.5 h-3.5" />
              <span>BACKEND CONNECTED</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <WifiOff className="w-3.5 h-3.5" />
              <span>OFFLINE DEMO MODE</span>
            </>
          )}
        </div>

        {/* SHA-256 Ledger Status */}
        <Link 
          to="/blockchain"
          className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>LEDGER: VERIFIED</span>
        </Link>

        {/* Clock */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{time}</span>
        </div>

        {/* New Screening Quick CTA */}
        <Link
          to="/new-screening"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg shadow-glow-cyan transition-all flex items-center gap-1.5 tracking-wider uppercase"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>New Screening</span>
        </Link>
      </div>
    </header>
  );
}
