import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, ShieldAlert, Clock, ScanEye, UserCheck, Layers, FileText } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import StatCard from '../components/StatCard';
import { api } from '../services/api';

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('7_days');
  const [analytics, setAnalytics] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [analyticsData, statsData] = await Promise.all([
        api.getAnalytics(timeframe),
        api.getDashboardStats()
      ]);
      setAnalytics(analyticsData);
      setStats(statsData);
      setLoading(false);
    }
    loadData();
  }, [timeframe]);

  return (
    <div className="space-y-6">
      {/* Header with Timeframe Selector */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
              Cyber Intelligence
            </span>
            <span className="text-xs text-slate-400 font-mono">Operations Analytics & Tampering Patterns</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            Screening Throughput & Threat Intelligence
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Aggregate metrics on fraudulent manipulation vectors, facial verification pass-rates, and checkpoint processing latency.
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-700 shrink-0">
          {[
            { key: 'today', label: 'Today' },
            { key: '7_days', label: '7 Days' },
            { key: '30_days', label: '30 Days' },
          ].map((tf) => (
            <button
              key={tf.key}
              onClick={() => setTimeframe(tf.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                timeframe === tf.key 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Throughput Rate"
          value={`${analytics?.throughput_per_minute || 24.5}/min`}
          subtitle="Real-Time Screening Rate"
          icon={TrendingUp}
          color="cyan"
        />
        <StatCard
          title="Tamper Detection"
          value={analytics?.tamper_detection_rate || "98.4%"}
          subtitle="Model Confidence Accuracy"
          icon={ScanEye}
          color="emerald"
        />
        <StatCard
          title="Avg OCR Confidence"
          value={analytics?.average_ocr_confidence || "97.8%"}
          subtitle="Optical Zone Parsing"
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Face Match Accuracy"
          value={analytics?.face_match_accuracy || "96.5%"}
          subtitle="1:1 Verification Metric"
          icon={UserCheck}
          color="violet"
        />
      </div>

      {/* Hourly Screening Traffic & Document Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Traffic Bar Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Checkpoint Hourly Screening Traffic</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">24-Hour Operating Clock</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.hourly_distribution || []}>
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0b1120',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Documents Screened" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Document Classification Distribution */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Document Types</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Breakdown</span>
          </div>

          <div className="space-y-3 pt-1">
            {(stats?.document_type_distribution || []).map((doc, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">{doc.name}</span>
                  <span className="text-cyan-400 font-bold">{doc.count} ({doc.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${doc.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tampering Detection Categories Breakdown Table */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Forensic Threat Vector Breakdown</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Total Cases: {stats?.tampering_cases_count || 29}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Threat / Tampering Category</th>
                <th className="pb-3">Detected Incidents</th>
                <th className="pb-3">Risk Impact Severity</th>
                <th className="pb-3">Primary Detection Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {(stats?.tampering_category_breakdown || []).map((cat, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 text-slate-100 font-bold font-sans">
                    {cat.category}
                  </td>
                  <td className="py-3 text-cyan-400 font-bold">
                    {cat.count} cases
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      cat.risk_impact === 'High' 
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {cat.risk_impact} Risk
                    </span>
                  </td>
                  <td className="py-3 text-slate-400 text-[11px]">
                    {cat.category === 'Photo Replacement' && 'Edge gradient discontinuity & ELA recompression'}
                    {cat.category === 'Text / Date Splicing' && 'Font baseline jitter & character bounding box variance'}
                    {cat.category === 'MRZ Checksum Mismatch' && 'ICAO 9303 7-3-1 modulus 10 mathematical verification'}
                    {cat.category === 'Metadata Manipulation' && 'EXIF stream parsing & editing software signatures'}
                    {cat.category === 'Stamp Distortion' && 'Contour circularity & color histogram anomaly'}
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
