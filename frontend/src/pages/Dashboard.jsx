import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ScanEye, 
  UserX, 
  Clock, 
  Terminal, 
  ArrowUpRight, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Activity,
  Layers
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import StatCard from '../components/StatCard';
import RiskBadge from '../components/RiskBadge';
import PrivacyNotice from '../components/PrivacyNotice';
import { api } from '../services/api';
import { DEMO_SCENARIOS } from '../data/syntheticDocuments';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentScreenings, setRecentScreenings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [statsData, screeningsData] = await Promise.all([
        api.getDashboardStats(),
        api.getScreenings()
      ]);
      setStats(statsData);
      setRecentScreenings(screeningsData.slice(0, 6));
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Privacy Notice Banner */}
      <PrivacyNotice />

      {/* Top Welcome & Quick Action Hero */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              SOC NODE ACTIVE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Border Inspection Terminal
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            SecureID AI Screening Operations
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            AI-assisted identity document forensics, optical MRZ checksum cross-verification, biometric similarity estimation, and SHA-256 tamper-evident audit ledger.
          </p>
        </div>

        {/* Quick Launch Scenario Presets */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Link
            to="/new-screening"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-glow-cyan transition-all uppercase tracking-wider"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch Screening Wizard</span>
          </Link>
          <Link
            to="/blockchain"
            className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-400 border border-slate-700 hover:border-cyan-500/50 text-xs font-mono flex items-center gap-1.5 transition-all"
          >
            <span>Ledger Explorer</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 6 Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Screened"
          value={stats?.total_screened || 428}
          subtitle="All Travel Docs"
          icon={FileText}
          color="cyan"
          trend="+12% today"
        />
        <StatCard
          title="Verified Clear"
          value={stats?.verified_clear_count || 336}
          subtitle="Low Risk Status"
          icon={CheckCircle2}
          color="emerald"
          trend="78.5% rate"
        />
        <StatCard
          title="Suspicious Cases"
          value={stats?.suspicious_count || 58}
          subtitle="Manual Review Req."
          icon={AlertTriangle}
          color="amber"
          trend="13.5% rate"
        />
        <StatCard
          title="High Risk Alerts"
          value={stats?.high_risk_count || 34}
          subtitle="Escalated Cases"
          icon={ShieldCheck}
          color="rose"
          trend="7.9% rate"
        />
        <StatCard
          title="Tampering Detected"
          value={stats?.tampering_cases_count || 29}
          subtitle="Photo / Text Splicing"
          icon={ScanEye}
          color="rose"
        />
        <StatCard
          title="Avg Screen Time"
          value={`${stats?.average_screening_time_sec || 1.45}s`}
          subtitle="Real-Time Optical AI"
          icon={Clock}
          color="blue"
        />
      </div>

      {/* Analytics Charts Row: Volume by Day + Risk Distribution Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Screening Throughput Volume Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Screening Volume & Traffic Distribution</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">Daily through-flow across border checkpoint terminals</p>
            </div>
            <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
              7-Day Window
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.volume_by_day || []}>
                <defs>
                  <linearGradient id="colorClear" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorSuspicious" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0b1120',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#f8fafc'
                  }}
                />
                <Area type="monotone" dataKey="clear" stroke="#10b981" fillOpacity={1} fill="url(#colorClear)" name="Verified Clear" />
                <Area type="monotone" dataKey="suspicious" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSuspicious)" name="Review Required" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Donut Chart */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Risk Classification</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Ratio</span>
          </div>

          <div className="h-48 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.risk_distribution || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {(stats?.risk_distribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0b1120',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black font-mono text-white">428</span>
              <span className="text-[9px] font-mono text-slate-400 uppercase">Screenings</span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800">
            {(stats?.risk_distribution || []).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 text-[11px] truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Screenings Table with Quick Detail Drawer Link */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Recent Document Screenings Log</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">Live feed from checkpoint terminal nodes</p>
          </div>
          <Link
            to="/history"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View All History</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Screening ID</th>
                <th className="pb-3">Document Type</th>
                <th className="pb-3">Subject Name</th>
                <th className="pb-3">Document No.</th>
                <th className="pb-3">Risk Assessment</th>
                <th className="pb-3">Timestamp</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentScreenings.map((item) => (
                <tr key={item.screening_id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 text-cyan-400 font-bold">
                    {item.screening_id}
                  </td>
                  <td className="py-3 text-slate-200">
                    {item.document_type}
                  </td>
                  <td className="py-3 font-sans font-semibold text-white">
                    {item.person_name}
                  </td>
                  <td className="py-3 text-slate-400">
                    {item.document_number}
                  </td>
                  <td className="py-3">
                    <RiskBadge level={item.risk_level} recommendation={item.recommendation} score={item.overall_risk} />
                  </td>
                  <td className="py-3 text-slate-400 text-[11px]">
                    {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      to={`/history?select=${item.screening_id}`}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 text-[10px] font-mono transition-colors"
                    >
                      Inspect Analysis
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
