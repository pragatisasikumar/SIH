import React from 'react';
import { Lock, AlertOctagon, CheckCircle2, ArrowDown, Hash, Calendar, FileText, User } from 'lucide-react';

export default function BlockchainBlock({ block, isLast = false, onTamper }) {
  if (!block) return null;

  const isGenesis = block.block_number === 0;
  const isTampered = block.is_tampered;

  return (
    <div className="relative flex flex-col items-center">
      {/* Block Card */}
      <div className={`w-full glass-panel rounded-xl p-5 border transition-all relative overflow-hidden ${
        isTampered 
          ? 'border-rose-500 bg-rose-500/10 shadow-glow-rose/30 ring-1 ring-rose-500' 
          : isGenesis 
            ? 'border-violet-500/40 bg-violet-500/5' 
            : 'border-slate-800 hover:border-cyan-500/40'
      }`}>
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg border ${
              isTampered 
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                : isGenesis 
                  ? 'bg-violet-500/20 text-violet-400 border-violet-500/40' 
                  : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
            }`}>
              {isTampered ? <AlertOctagon className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-white">
                Block #{block.block_number}
              </span>
              <span className="text-[10px] font-mono text-slate-500 ml-2">
                {isGenesis ? 'GENESIS ROOT' : block.event_type}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
              isTampered 
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse' 
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}>
              {isTampered ? '✕ INTEGRITY COMPROMISED' : '✓ SHA-256 VERIFIED'}
            </span>

            {!isGenesis && !isTampered && onTamper && (
              <button
                type="button"
                onClick={() => onTamper(block.block_number)}
                className="text-[10px] font-mono bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded transition-colors"
                title="Simulate modifying this block data to test chain integrity failure"
              >
                Simulate Tamper
              </button>
            )}
          </div>
        </div>

        {/* Block Payload Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono mb-3">
          <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Screening ID</span>
            <span className="text-slate-200 font-bold">{block.screening_id}</span>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Subject / Document</span>
            <span className="text-slate-200 font-bold truncate block">
              {block.person_name || 'N/A'} ({block.document_type})
            </span>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Recorded Risk Score</span>
            <span className={`font-bold ${block.risk_score <= 25 ? 'text-emerald-400' : block.risk_score <= 70 ? 'text-amber-400' : 'text-rose-400'}`}>
              {block.risk_score.toFixed(1)} / 100
            </span>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Timestamp</span>
            <span className="text-slate-300 text-[11px]">
              {new Date(block.timestamp).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Cryptographic Hashes */}
        <div className="space-y-1.5 text-[11px] font-mono bg-slate-950/80 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-slate-600 font-bold select-none">PREV:</span>
            <span className="text-slate-400 truncate">{block.previous_hash}</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="text-cyan-600 font-bold select-none">HASH:</span>
            <span className="text-cyan-300 font-bold truncate">{block.current_hash}</span>
          </div>
        </div>
      </div>

      {/* Chain Link Connector Arrow */}
      {!isLast && (
        <div className="my-2 flex flex-col items-center">
          <div className={`w-0.5 h-4 ${isTampered ? 'bg-rose-500' : 'bg-cyan-500/40'}`} />
          <ArrowDown className={`w-4 h-4 ${isTampered ? 'text-rose-400 animate-bounce' : 'text-cyan-400'}`} />
          <div className={`w-0.5 h-4 ${isTampered ? 'bg-rose-500' : 'bg-cyan-500/40'}`} />
        </div>
      )}
    </div>
  );
}
