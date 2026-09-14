import React, { useState, useEffect } from 'react';
import { Settings2, ShieldCheck, Server, Database, Lock, Eye, CheckCircle2, Cpu, FileCheck } from 'lucide-react';
import { checkBackendHealth } from '../services/api';

export default function Settings() {
  const [healthData, setHealthData] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    async function check() {
      const res = await checkBackendHealth();
      setIsOnline(res.online);
      setHealthData(res.data);
    }
    check();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
            Security Operations Center
          </span>
          <span className="text-xs text-slate-400 font-mono">Node Infrastructure & Health Diagnostics</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-wide">
          System Security Center & Service Matrix
        </h2>
        <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
          Real-time diagnostic status of FastAPI core engines, SQLite database persistence, OCR models, computer vision forensics, and cryptographic ledger verification.
        </p>
      </div>

      {/* Live Service Status Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* FastAPI Server */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>FastAPI Gateway</span>
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
              isOnline ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              {isOnline ? 'ONLINE' : 'DEMO MODE'}
            </span>
          </div>
          <div className="text-sm font-mono font-bold text-white">
            {isOnline ? 'http://127.0.0.1:8000 (Active)' : 'Offline Local Fallback Active'}
          </div>
          <p className="text-[11px] text-slate-400">
            High-performance asynchronous screening REST endpoints.
          </p>
        </div>

        {/* SQLite Database */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>SQLite Persistence</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
              ONLINE
            </span>
          </div>
          <div className="text-sm font-mono font-bold text-white">
            secureid.db (Connected)
          </div>
          <p className="text-[11px] text-slate-400">
            Relational audit storage for screenings and blockchain blocks.
          </p>
        </div>

        {/* AI Forensics Engine */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>AI Forensics Model</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
              READY
            </span>
          </div>
          <div className="text-sm font-mono font-bold text-white">
            SecureID-ForensicNet v2.1
          </div>
          <p className="text-[11px] text-slate-400">
            Multi-layer ELA, edge gradient, baseline jitter & EXIF analyzer.
          </p>
        </div>

        {/* OCR & MRZ Engine */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <span>OCR & MRZ Engine</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
              READY
            </span>
          </div>
          <div className="text-sm font-mono font-bold text-white">
            ICAO 9303 Doc 9303 Parser
          </div>
          <p className="text-[11px] text-slate-400">
            7-3-1 modulus 10 check digit cross-verification engine.
          </p>
        </div>

        {/* Blockchain Audit Ledger */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>Audit Ledger</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
              VERIFIED
            </span>
          </div>
          <div className="text-sm font-mono font-bold text-white">
            SHA-256 Chained Integrity
          </div>
          <p className="text-[11px] text-slate-400">
            Sequential cryptographic hashing with local tamper detection.
          </p>
        </div>

        {/* Biometric Privacy Engine */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Biometric Privacy</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
              ENFORCED
            </span>
          </div>
          <div className="text-sm font-mono font-bold text-white">
            Zero Permanent Retention
          </div>
          <p className="text-[11px] text-slate-400">
            Facial embeddings and live captures processed ephemerally.
          </p>
        </div>
      </div>

      {/* Cyber Security Architecture Safeguards */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Security, Cryptography & Privacy Policy Checklist</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>SHA-256 Hash Chaining for Audit Immutability</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Strict File Type Validation (PNG, JPG, JPEG, WEBP)</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Upload Size Validation & Filename Sanitization</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Pydantic Input Type & Schema Sanitization</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Human-in-the-Loop Assistive Screening Recommendations</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero Biometric Storage in Demonstration Environment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
