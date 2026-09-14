import React, { useState, useEffect } from 'react';
import { Blocks, ShieldCheck, AlertOctagon, Wrench, RefreshCw, Lock, CheckCircle2, Info } from 'lucide-react';
import BlockchainBlock from '../components/BlockchainBlock';
import { api } from '../services/api';

export default function BlockchainAudit() {
  const [blocks, setBlocks] = useState([]);
  const [integrityStatus, setIntegrityStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState(null);

  const fetchLedger = async () => {
    setLoading(true);
    const data = await api.getBlockchainLedger();
    setBlocks(data);
    const verify = await api.verifyBlockchain();
    setIntegrityStatus(verify);
    setLoading(false);
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  const handleVerify = async () => {
    const verify = await api.verifyBlockchain();
    setIntegrityStatus(verify);
    setActionMessage(verify.message);
  };

  const handleTamperSimulation = async (blockNum) => {
    const res = await api.tamperDemoBlock(blockNum);
    setActionMessage(res.message);
    fetchLedger();
  };

  const handleRepairChain = async () => {
    const res = await api.repairDemoChain();
    setActionMessage(res.message);
    fetchLedger();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
                Tamper-Evident Ledger
              </span>
              <span className="text-xs text-slate-400 font-mono">
                SHA-256 Sequential Cryptographic Hashing
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Blockchain-Style Audit Ledger Explorer
            </h2>
            <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
              Every document screening event is permanently committed to an immutable local cryptographic chain. Any unauthorized record modification breaks the SHA-256 hash pointer and invalidates downstream blocks.
            </p>
          </div>

          {/* Interactive Demonstration Controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleVerify}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Integrity</span>
            </button>

            <button
              onClick={() => handleTamperSimulation(blocks.length > 2 ? blocks[2].block_number : 1)}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Simulate Tampering</span>
            </button>

            <button
              onClick={handleRepairChain}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <Wrench className="w-4 h-4" />
              <span>Repair Ledger</span>
            </button>
          </div>
        </div>

        {/* Action Status Banner if active */}
        {actionMessage && (
          <div className={`p-3 rounded-lg border text-xs font-mono flex items-center gap-2 ${
            actionMessage.includes('FAILURE') || actionMessage.includes('Tamper')
              ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
              : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
          }`}>
            <Info className="w-4 h-4 shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}
      </div>

      {/* Global Ledger Verification Status Box */}
      <div className={`p-5 rounded-2xl border flex items-center justify-between ${
        integrityStatus?.is_valid
          ? 'glass-panel border-emerald-500/30 bg-emerald-500/5'
          : 'glass-panel border-rose-500/50 bg-rose-500/10 shadow-glow-rose/20'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`p-3 rounded-xl border ${
            integrityStatus?.is_valid
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
          }`}>
            {integrityStatus?.is_valid ? <CheckCircle2 className="w-6 h-6" /> : <AlertOctagon className="w-6 h-6" />}
          </div>
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-white font-mono">
              {integrityStatus?.is_valid ? '✓ Cryptographic Ledger Integrity Verified' : '⚠ Cryptographic Integrity Failure'}
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-mono">
              {integrityStatus?.message || `All ${blocks.length} blocks correctly linked via SHA-256.`}
            </p>
          </div>
        </div>

        <div className="text-right font-mono text-xs">
          <span className="text-slate-400">Total Committed Blocks:</span>
          <div className="text-xl font-bold text-white">{blocks.length}</div>
        </div>
      </div>

      {/* Sequential Blocks Stream */}
      <div className="space-y-1">
        {blocks.map((block, idx) => (
          <BlockchainBlock
            key={block.block_number}
            block={block}
            isLast={idx === blocks.length - 1}
            onTamper={handleTamperSimulation}
          />
        ))}
      </div>

      {/* Statutory Architecture Disclosure */}
      <div className="text-[11px] text-slate-500 font-mono text-center border-t border-slate-800/80 pt-4 leading-relaxed">
        * <strong>Architecture Note:</strong> Prototype blockchain-style audit ledger using SHA-256 cryptographic chaining. Designed for tamper-evident border security logging without reliance on public cryptocurrency networks.
      </div>
    </div>
  );
}
