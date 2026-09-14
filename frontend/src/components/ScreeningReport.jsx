import React from 'react';
import { Printer, Download, ShieldCheck, Lock, CheckCircle2, AlertTriangle, FileText, User } from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function ScreeningReport({ screening, onClose }) {
  if (!screening) return null;

  const {
    screening_id,
    created_at,
    document_type,
    person_name,
    document_number,
    nationality,
    dob,
    expiry_date,
    overall_risk,
    risk_level,
    recommendation,
    tampering,
    mrz,
    validation,
    face,
    risk,
    blockchain_hash,
    blockchain_block_id
  } = screening;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Bar (Hidden during print) */}
      <div className="no-print flex items-center justify-between glass-panel p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-bold text-white uppercase tracking-wider">
            Official Document Screening Report [{screening_id}]
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-glow-cyan"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Printable Report Document Sheet */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-700 bg-slate-900/90 text-slate-100 space-y-6 shadow-2xl">
        {/* Official Header */}
        <div className="border-b-2 border-slate-700 pb-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-extrabold tracking-wider text-white">
                SecureID <span className="text-cyan-400 font-mono">AI</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              BORDER & TRAVEL DOCUMENT INTELLIGENCE FORENSIC REPORT
            </p>
          </div>

          <div className="text-right space-y-1 font-mono text-xs">
            <div className="text-slate-300">
              Report ID: <strong className="text-cyan-400">{screening_id}</strong>
            </div>
            <div className="text-slate-400">
              Timestamp: {new Date(created_at).toLocaleString()}
            </div>
            <div className="text-slate-400">
              Screening Node: SEC-NODE-014 (Auto-Audit)
            </div>
          </div>
        </div>

        {/* Executive Summary & Recommendation Banner */}
        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          overall_risk <= 25 
            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
            : overall_risk <= 50 
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' 
              : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
        }`}>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">
              Screening Recommendation
            </span>
            <div className="text-lg font-extrabold font-mono text-white mt-0.5">
              {recommendation}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">
              Calculated Composite Risk
            </span>
            <div className="text-2xl font-extrabold font-mono">
              {overall_risk.toFixed(1)} / 100
            </div>
          </div>
        </div>

        {/* Subject & Document VIZ Grid */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1">
            1. Document & Subject Profile (VIZ Extracted)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono pt-1">
            <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Full Name</span>
              <strong className="text-slate-200">{person_name}</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Document Type</span>
              <strong className="text-slate-200">{document_type}</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Document Number</span>
              <strong className="text-cyan-300">{document_number}</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Nationality</span>
              <strong className="text-slate-200">{nationality}</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Date of Birth</span>
              <strong className="text-slate-200">{dob}</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Expiry Date</span>
              <strong className="text-slate-200">{expiry_date}</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block">MRZ Optical Consistency</span>
              <strong className={mrz?.consistency_passed ? 'text-emerald-400' : 'text-rose-400'}>
                {mrz?.consistency_passed ? '✓ PASSED' : '✕ MISMATCH'}
              </strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Facial Match Score</span>
              <strong className={face?.similarity_score >= 70 ? 'text-emerald-400' : 'text-rose-400'}>
                {face?.similarity_score?.toFixed(0)}% Similarity
              </strong>
            </div>
          </div>
        </div>

        {/* Forensic & Validation Findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              2. Forensic Inspection Findings
            </h4>
            <ul className="text-xs text-slate-300 space-y-1 font-mono">
              <li>• Photo Integrity: {tampering?.photo_status || 'LIKELY AUTHENTIC'} ({tampering?.photo_integrity?.toFixed(0)}%)</li>
              <li>• Text Rasterization: {tampering?.text_status || 'LIKELY AUTHENTIC'} ({tampering?.text_integrity?.toFixed(0)}%)</li>
              <li>• Stamp Consistency: {tampering?.stamp_status || 'NORMAL'}</li>
              <li>• Metadata Stream: {tampering?.metadata_status || 'NORMAL'}</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              3. Regulatory Compliance
            </h4>
            <ul className="text-xs text-slate-300 space-y-1 font-mono">
              <li>• ICAO Format Validation: {validation?.overall_status || 'VALID'}</li>
              <li>• Statutory Rules Passed: {validation?.passed_checks || 5} of {validation?.total_checks || 5}</li>
              <li>• Demo Watchlist Status: {validation?.watchlist_alert ? 'MATCH DETECTED' : 'CLEAR'}</li>
              <li>• Biometric Retention: EPHEMERAL (Zero storage)</li>
            </ul>
          </div>
        </div>

        {/* Cryptographic Proof & Ledger Stamp */}
        <div className="border-t border-slate-800 pt-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>SHA-256 Tamper-Evident Audit Ledger Reference</span>
            </span>
            <span>Block #{blockchain_block_id || 4}</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded border border-cyan-500/20 text-cyan-300 text-[10px] break-all">
            {blockchain_hash}
          </div>
        </div>

        {/* Officer Signature & Final Review Block */}
        <div className="border-t-2 border-slate-800 pt-6 grid grid-cols-2 gap-8 text-xs font-mono">
          <div>
            <p className="text-slate-400 text-[10px]">AUTHORIZED SCREENING OFFICER:</p>
            <div className="h-10 border-b border-slate-600 mt-4"></div>
            <p className="text-slate-500 text-[10px] mt-1">Badge ID / Signature</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px]">FINAL VERIFICATION DETERMINATION:</p>
            <div className="flex items-center gap-4 mt-4 text-[11px]">
              <span>[ ] ADMIT</span>
              <span>[ ] SECONDARY INSPECTION</span>
              <span>[ ] ESCALATED</span>
            </div>
          </div>
        </div>

        {/* Statutory Legal Disclaimer */}
        <div className="text-[10px] text-slate-500 text-center leading-relaxed border-t border-slate-800/80 pt-3">
          <strong>LEGAL NOTICE:</strong> This document is an AI-assisted screening recommendation produced for authorized border and security officers. In accordance with identity governance standards, AI outputs must not be used as automated final identity determinations without human verification.
        </div>
      </div>
    </div>
  );
}
