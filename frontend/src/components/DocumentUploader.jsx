import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertTriangle, Sparkles, User, Image as ImageIcon } from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/syntheticDocuments';

export default function DocumentUploader({
  documentType,
  setDocumentType,
  documentImage,
  setDocumentImage,
  presentedFace,
  setPresentedFace,
  onSelectPreset,
  selectedPreset,
  loading
}) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setDocumentImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFaceInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setPresentedFace(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* 3 Fixed Demo Scenarios Quick-Selector Bar */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>1-Click Presentation Demo Scenarios</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Instant Pre-Loaded Assets</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.values(DEMO_SCENARIOS).map((scen) => {
            const isSelected = selectedPreset === scen.key;
            return (
              <button
                key={scen.key}
                type="button"
                onClick={() => onSelectPreset(scen.key)}
                className={`text-left p-3.5 rounded-xl border transition-all relative overflow-hidden group ${
                  isSelected 
                    ? 'bg-cyan-500/15 border-cyan-400 shadow-glow-cyan/20 ring-1 ring-cyan-400/50' 
                    : 'glass-panel glass-panel-hover border-slate-700/60 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {scen.title}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    scen.expectedRisk <= 25 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : scen.expectedRisk <= 70 
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    Risk: {scen.expectedRisk}/100
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2">
                  {scen.subtitle}
                </p>
                <div className="flex flex-wrap gap-1">
                  {scen.tags.map((tag, idx) => (
                    <span key={idx} className="text-[9px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Zone & Document Classification */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Document Upload Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              1. Document Image (High-Resolution Scan / Capture)
            </label>
            {/* Document Type Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Class:</span>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="bg-slate-900 text-cyan-300 text-xs font-mono font-medium rounded-lg border border-slate-700 px-3 py-1.5 focus:border-cyan-400 focus:outline-none"
              >
                <option value="Passport">Passport (ICAO TD3)</option>
                <option value="Visa">Visa Entry Permit</option>
                <option value="National ID">National ID Card (TD1)</option>
                <option value="Driving License">Driving License</option>
                <option value="Permit">Travel Permit</option>
              </select>
            </div>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all relative overflow-hidden min-h-[220px] flex flex-col items-center justify-center ${
              dragActive 
                ? 'border-cyan-400 bg-cyan-500/10' 
                : documentImage 
                  ? 'border-cyan-500/30 bg-slate-900/50' 
                  : 'border-slate-700 bg-slate-900/30 hover:border-slate-500'
            }`}
          >
            {documentImage ? (
              <div className="w-full space-y-3">
                <div className="relative rounded-lg overflow-hidden border border-cyan-500/30 max-h-56 bg-slate-950 flex items-center justify-center">
                  <img
                    src={documentImage}
                    alt="Document Preview"
                    className="max-h-56 object-contain w-auto rounded"
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/90 text-cyan-400 text-[10px] font-mono px-2 py-1 rounded border border-cyan-500/30">
                    PREVIEW READY
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <label className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer underline">
                    Replace Document Image
                    <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    Drag and drop document scan here, or <label className="text-cyan-400 hover:underline cursor-pointer">browse file<input type="file" accept="image/*" onChange={handleFileInput} className="hidden" /></label>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, JPEG, WEBP (Max 15MB)</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Presented Face Image (Live Capture / Webcam Photo) */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
            2. Live Presented Face (Webcam / Kiosk)
          </label>

          <div className="border border-slate-700/80 rounded-xl p-4 bg-slate-900/40 min-h-[220px] flex flex-col justify-between">
            {presentedFace ? (
              <div className="space-y-2">
                <div className="relative rounded-lg overflow-hidden border border-slate-700 h-40 bg-slate-950 flex items-center justify-center">
                  <img
                    src={presentedFace}
                    alt="Presented Face"
                    className="h-full object-cover w-full rounded"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-900/90 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                    LIVE PORTRAIT
                  </div>
                </div>
                <label className="text-xs text-cyan-400 hover:underline cursor-pointer block text-center pt-1 font-medium">
                  Change Live Photo
                  <input type="file" accept="image/*" onChange={handleFaceInput} className="hidden" />
                </label>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-300 font-medium">No live portrait loaded</p>
                <p className="text-[11px] text-slate-500">Auto-populated by demo presets or upload custom</p>
                <label className="text-xs text-cyan-400 hover:underline cursor-pointer font-medium pt-2">
                  Upload Live Selfie
                  <input type="file" accept="image/*" onChange={handleFaceInput} className="hidden" />
                </label>
              </div>
            )}

            <div className="text-[10px] text-slate-500 font-mono text-center border-t border-slate-800 pt-2">
              Ephemeral biometric buffer (No permanent cloud storage)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
