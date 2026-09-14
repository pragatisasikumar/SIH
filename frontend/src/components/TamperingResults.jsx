import React from 'react';
import { ScanEye, AlertTriangle, CheckCircle2, FileCode, Layers, Stamp, Image as ImageIcon } from 'lucide-react';

export default function TamperingResults({ tampering }) {
  if (!tampering) return null;

  const suspiciousRegions = tampering.suspicious_regions || [];
  const explanations = tampering.explanations || [];
  const metadata = tampering.metadata_details || {};

  return (
    <div className="space-y-5">
      {/* 4 Major Forensic Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* A. Photo Replacement */}
        <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Photo Integrity</span>
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
              tampering.photo_status === 'LIKELY AUTHENTIC'
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-rose-500/10 text-rose-400 animate-pulse'
            }`}>
              {tampering.photo_status}
            </span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            {tampering.photo_integrity?.toFixed(0)}%
          </div>
          <p className="text-[11px] text-slate-400">
            {tampering.photo_status === 'LIKELY AUTHENTIC'
              ? 'Seamless edge gradient and continuous substrate.'
              : 'Potential photo replacement / splicing anomaly.'}
          </p>
        </div>

        {/* B. Text Manipulation */}
        <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Text Manipulation</span>
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
              tampering.text_status === 'LIKELY AUTHENTIC'
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-rose-500/10 text-rose-400 animate-pulse'
            }`}>
              {tampering.text_status}
            </span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            {tampering.text_integrity?.toFixed(0)}%
          </div>
          <p className="text-[11px] text-slate-400">
            {tampering.text_status === 'LIKELY AUTHENTIC'
              ? 'Uniform font rasterization and baseline grid.'
              : 'Font weight variance & baseline tilt detected.'}
          </p>
        </div>

        {/* C. Stamp / Seal Analysis */}
        <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <Stamp className="w-3.5 h-3.5 text-cyan-400" />
              <span>Stamp / Seal</span>
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
              tampering.stamp_status === 'NORMAL'
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-amber-500/10 text-amber-400'
            }`}>
              {tampering.stamp_status}
            </span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            {tampering.stamp_consistency?.toFixed(0)}%
          </div>
          <p className="text-[11px] text-slate-400">
            {tampering.stamp_detected 
              ? 'Official circular seal contour detected.' 
              : 'No statutory physical stamp present.'}
          </p>
        </div>

        {/* D. Metadata Analysis */}
        <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>Metadata Stream</span>
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
              tampering.metadata_status === 'NORMAL'
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-amber-500/10 text-amber-400'
            }`}>
              {tampering.metadata_status}
            </span>
          </div>
          <div className="text-sm font-bold font-mono text-white truncate pt-1">
            {metadata.software_signature || 'Standard Scanner'}
          </div>
          <p className="text-[11px] text-slate-400">
            {tampering.metadata_warning || 'Clean camera/scanner optical stream.'}
          </p>
        </div>
      </div>

      {/* Suspicious Regions Alert & Explanations */}
      {suspiciousRegions.length > 0 ? (
        <div className="glass-panel rounded-xl p-5 border border-rose-500/40 bg-rose-500/5 space-y-3">
          <div className="flex items-center justify-between border-b border-rose-500/20 pb-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Potential Manipulation Regions Detected ({suspiciousRegions.length})</span>
            </div>
            <span className="text-[10px] font-mono text-rose-300">Classification: Potential Manipulation</span>
          </div>

          <div className="space-y-2.5">
            {suspiciousRegions.map((reg, idx) => (
              <div key={idx} className="p-3 bg-slate-950/80 rounded-lg border border-rose-500/30 flex items-start justify-between gap-3 text-xs font-mono">
                <div>
                  <div className="text-slate-200 font-bold flex items-center gap-2">
                    <span className="text-rose-400 font-mono">[{reg.region_id}]</span>
                    <span className="capitalize">{reg.category.replace('_', ' ')}</span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs mt-1">
                    {reg.reason}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-rose-400 font-bold">{(reg.confidence * 100).toFixed(0)}% Conf</span>
                  <div className="text-[10px] text-slate-500">Box: [{reg.bounding_box.join(', ')}]</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-xl p-4 border border-emerald-500/30 bg-emerald-500/5 flex items-center gap-3 text-xs text-emerald-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Likely Authentic Document Substrate:</strong> Zero spatial compression anomalies, spliced edge gradients, or editing software tags detected.
          </span>
        </div>
      )}

      {/* Forensic Explanations List */}
      <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white">
          AI Forensic Reasoning & Evidence Log
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-300">
          {explanations.map((exp, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span className="leading-relaxed">{exp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
