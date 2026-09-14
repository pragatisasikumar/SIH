import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import NewScreening from './pages/NewScreening';
import DocumentAnalysis from './pages/DocumentAnalysis';
import FaceVerificationPage from './pages/FaceVerificationPage';
import RiskAssessmentPage from './pages/RiskAssessmentPage';
import ScreeningHistory from './pages/ScreeningHistory';
import BlockchainAudit from './pages/BlockchainAudit';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="flex h-screen bg-[#060913] text-slate-100 overflow-hidden font-sans">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-screening" element={<NewScreening />} />
            <Route path="/document-analysis" element={<DocumentAnalysis />} />
            <Route path="/face-verification" element={<FaceVerificationPage />} />
            <Route path="/risk-assessment" element={<RiskAssessmentPage />} />
            <Route path="/history" element={<ScreeningHistory />} />
            <Route path="/blockchain" element={<BlockchainAudit />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
