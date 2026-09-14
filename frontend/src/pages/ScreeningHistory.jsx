import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { History, Search, Filter, ArrowUpDown, Eye, Download, FileText, Lock, X } from 'lucide-react';
import RiskBadge from '../components/RiskBadge';
import ScreeningReport from '../components/ScreeningReport';
import { api } from '../services/api';

export default function ScreeningHistory() {
  const [searchParams] = useSearchParams();
  const [screenings, setScreenings] = useState([]);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [docFilter, setDocFilter] = useState('ALL');
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchScreenings = async () => {
    setLoading(true);
    const data = await api.getScreenings({
      search,
      risk_level: riskFilter,
      doc_type: docFilter
    });
    setScreenings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchScreenings();
  }, [search, riskFilter, docFilter]);

  // Check if a specific screening ID was requested in query params
  useEffect(() => {
    const requestedId = searchParams.get('select');
    if (requestedId) {
      inspectScreening(requestedId);
    }
  }, [searchParams]);

  const inspectScreening = async (id) => {
    const full = await api.getScreeningById(id);
    setSelectedScreening(full);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
            Audit Trail
          </span>
          <span className="text-xs text-slate-400 font-mono">Immutable Screening Records</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-wide">
          Historical Screening Ledger & Forensic Records
        </h2>
        <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
          Search, filter, and inspect past identity document screening events. Each record is cryptographically committed to the local SHA-256 audit ledger.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, Name, Document #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/80 text-xs font-mono text-white rounded-lg border border-slate-700 pl-9 pr-3 py-2 focus:border-cyan-400 focus:outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Risk:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-slate-900 text-xs font-mono text-cyan-300 rounded-lg border border-slate-700 px-3 py-1.5 focus:border-cyan-400 focus:outline-none"
            >
              <option value="ALL">All Levels</option>
              <option value="LOW">Low (Clear)</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High Risk</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Doc:</span>
            <select
              value={docFilter}
              onChange={(e) => setDocFilter(e.target.value)}
              className="bg-slate-900 text-xs font-mono text-cyan-300 rounded-lg border border-slate-700 px-3 py-1.5 focus:border-cyan-400 focus:outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="Passport">Passport</option>
              <option value="Visa">Visa</option>
              <option value="National ID">National ID</option>
              <option value="Driving License">Driving License</option>
              <option value="Permit">Permit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Screenings Table */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Screening ID</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Subject Name</th>
                <th className="pb-3">Document Number</th>
                <th className="pb-3">Risk Assessment</th>
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Ledger Hash</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {screenings.map((item) => (
                <tr key={item.screening_id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 text-cyan-400 font-bold">
                    {item.screening_id}
                  </td>
                  <td className="py-3.5 text-slate-300 font-medium">
                    {item.document_type}
                  </td>
                  <td className="py-3.5 font-sans font-semibold text-white">
                    {item.person_name}
                  </td>
                  <td className="py-3.5 text-slate-400">
                    {item.document_number}
                  </td>
                  <td className="py-3.5">
                    <RiskBadge level={item.risk_level} recommendation={item.recommendation} score={item.overall_risk} />
                  </td>
                  <td className="py-3.5 text-slate-400 text-[11px]">
                    {new Date(item.created_at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3.5 text-slate-500 truncate max-w-[120px]" title={item.blockchain_hash}>
                    {item.blockchain_hash ? `${item.blockchain_hash.slice(0, 12)}...` : 'N/A'}
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => inspectScreening(item.screening_id)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 text-xs font-mono transition-all flex items-center gap-1.5 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Report</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Screening Report Modal */}
      {selectedScreening && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 md:p-8 overflow-y-auto flex items-center justify-center">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <ScreeningReport
              screening={selectedScreening}
              onClose={() => setSelectedScreening(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
