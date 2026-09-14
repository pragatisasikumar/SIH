import React, { useState } from 'react';
import { Layers, Eye, AlertTriangle, Scan, ZoomIn, Info } from 'lucide-react';

export default function ForensicViewer({ documentImage, tampering, ocr, mrz }) {
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showSuspicious, setShowSuspicious] = useState(true);
  const [showOCRRegions, setShowOCRRegions] = useState(false);
  const [showFaceRegion, setShowFaceRegion] = useState(true);
  const [showMRZRegion, setShowMRZRegion] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const suspiciousRegions = tampering?.suspicious_regions || [];
  const ocrFields = ocr?.structured_fields || [];

  return (
    <div className="space-y-4">
      {/* Forensic Overlays Toggle Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 glass-panel p-3.5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Forensic Inspection Overlays</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Suspicious Regions Toggle */}
          <button
            type="button"
            onClick={() => setShowSuspicious(!showSuspicious)}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium border transition-all ${
              showSuspicious 
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-glow-rose/20' 
                : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            Suspicious Regions ({suspiciousRegions.length})
          </button>

          {/* Heatmap ELA Toggle */}
          <button
            type="button"
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium border transition-all ${
              showHeatmap 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-glow-amber/20' 
                : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            Heatmap / ELA
          </button>

          {/* OCR Regions Toggle */}
          <button
            type="button"
            onClick={() => setShowOCRRegions(!showOCRRegions)}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium border transition-all ${
              showOCRRegions 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-glow-cyan/20' 
                : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            OCR Text Fields
          </button>

          {/* Face Region Toggle */}
          <button
            type="button"
            onClick={() => setShowFaceRegion(!showFaceRegion)}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium border transition-all ${
              showFaceRegion 
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/50' 
                : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            Face Portrait
          </button>

          {/* MRZ Region Toggle */}
          <button
            type="button"
            onClick={() => setShowMRZRegion(!showMRZRegion)}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium border transition-all ${
              showMRZRegion 
                ? 'bg-violet-500/20 text-violet-300 border-violet-500/50' 
                : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            MRZ Zone
          </button>
        </div>
      </div>

      {/* Dual Pane Interactive Viewer: Left = Original, Right = AI Forensic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Original Document */}
        <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Original Document Scan
            </span>
            <span className="text-[10px] font-mono text-slate-500">Substrate 100% Optical View</span>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 aspect-[850/560] flex items-center justify-center">
            {documentImage ? (
              <img src={documentImage} alt="Original Document" className="w-full h-full object-contain" />
            ) : (
              <span className="text-xs text-slate-500 font-mono">No document loaded</span>
            )}
          </div>
        </div>

        {/* Right: AI Forensic Analysis Pane with Overlays */}
        <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Scan className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Forensic Analysis & Overlays</span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              Interactive Layer Active
            </span>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-cyan-500/30 bg-slate-950 aspect-[850/560]">
            {documentImage && (
              <img 
                src={documentImage} 
                alt="Forensic Base" 
                className={`w-full h-full object-contain transition-all duration-300 ${
                  showHeatmap ? 'filter saturate-200 contrast-150 brightness-75' : ''
                }`} 
              />
            )}

            {/* Heatmap Error Level Simulation Layer */}
            {showHeatmap && (
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-rose-500/10 to-transparent pointer-events-none mix-blend-overlay animate-pulse" />
            )}

            {/* Face Bounding Box (45, 100, 170, 220 in 850x560 space) */}
            {showFaceRegion && (
              <div 
                className="absolute border-2 border-blue-400 bg-blue-500/10 rounded pointer-events-none"
                style={{
                  left: `${(45 / 850) * 100}%`,
                  top: `${(100 / 560) * 100}%`,
                  width: `${(170 / 850) * 100}%`,
                  height: `${(220 / 560) * 100}%`
                }}
              >
                <span className="absolute -top-4 left-0 bg-blue-500 text-slate-950 font-mono font-bold text-[8px] px-1 rounded">
                  FACE CROP
                </span>
              </div>
            )}

            {/* MRZ Bounding Box (0, 430, 850, 130) */}
            {showMRZRegion && (
              <div 
                className="absolute border-2 border-violet-400 bg-violet-500/10 rounded pointer-events-none"
                style={{
                  left: '0%',
                  top: `${(430 / 560) * 100}%`,
                  width: '100%',
                  height: `${(130 / 560) * 100}%`
                }}
              >
                <span className="absolute -top-4 left-2 bg-violet-500 text-slate-950 font-mono font-bold text-[8px] px-1 rounded">
                  ICAO MRZ ZONE
                </span>
              </div>
            )}

            {/* OCR Regions Bounding Boxes */}
            {showOCRRegions && ocrFields.map((f, idx) => {
              if (!f.bounding_box) return null;
              const [x, y, w, h] = f.bounding_box;
              return (
                <div
                  key={idx}
                  className="absolute border border-cyan-400/80 bg-cyan-400/10 pointer-events-none"
                  style={{
                    left: `${(x / 850) * 100}%`,
                    top: `${(y / 560) * 100}%`,
                    width: `${(w / 850) * 100}%`,
                    height: `${(h / 560) * 100}%`
                  }}
                >
                  <span className="absolute -top-3 left-0 text-[7px] font-mono text-cyan-300 bg-slate-900/90 px-0.5">
                    {f.key}
                  </span>
                </div>
              );
            })}

            {/* Suspicious Regions Overlays (Red Box with Pulsing Glow & Clickable Tooltip) */}
            {showSuspicious && suspiciousRegions.map((reg, idx) => {
              const [x, y, w, h] = reg.bounding_box;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedRegion(reg)}
                  className="absolute border-2 border-rose-500 bg-rose-500/20 cursor-pointer hover:bg-rose-500/30 transition-all animate-pulse"
                  style={{
                    left: `${(x / 850) * 100}%`,
                    top: `${(y / 560) * 100}%`,
                    width: `${(w / 850) * 100}%`,
                    height: `${(h / 560) * 100}%`
                  }}
                >
                  <div className="absolute -top-5 left-0 bg-rose-600 text-white font-mono font-bold text-[9px] px-1.5 py-0.5 rounded shadow">
                    Potential Manipulation ({(reg.confidence * 100).toFixed(0)}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Suspicious Region Inspector Card */}
      {selectedRegion && (
        <div className="glass-panel rounded-xl p-4 border border-rose-500/40 bg-slate-900/90 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-bold font-mono text-rose-300 flex items-center gap-2">
                <span>Potential Manipulation Detected: [{selectedRegion.region_id}]</span>
                <span className="bg-rose-500/20 text-rose-400 text-[10px] px-2 py-0.5 rounded">
                  {(selectedRegion.confidence * 100).toFixed(0)}% AI Confidence
                </span>
              </div>
              <p className="text-xs text-slate-300">
                <strong>Reason:</strong> {selectedRegion.reason}
              </p>
              <div className="text-[10px] text-slate-400 font-mono">
                Category: {selectedRegion.category} | Severity: {selectedRegion.severity}
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedRegion(null)}
            className="text-slate-400 hover:text-white text-xs font-mono"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
