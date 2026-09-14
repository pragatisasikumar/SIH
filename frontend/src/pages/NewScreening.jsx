import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  Printer, 
  FileText, 
  Scan, 
  Shield, 
  Layers, 
  UserCheck, 
  Lock,
  Sparkles
} from 'lucide-react';
import DocumentUploader from '../components/DocumentUploader';
import OCRResults from '../components/OCRResults';
import MRZResults from '../components/MRZResults';
import ValidationResults from '../components/ValidationResults';
import TamperingResults from '../components/TamperingResults';
import ForensicViewer from '../components/ForensicViewer';
import FaceVerification from '../components/FaceVerification';
import RiskFactors from '../components/RiskFactors';
import ScreeningReport from '../components/ScreeningReport';
import { api } from '../services/api';
import { DEMO_SCENARIOS } from '../data/syntheticDocuments';

export default function NewScreening() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPreset, setSelectedPreset] = useState('valid_passport');
  const [documentType, setDocumentType] = useState('Passport');
  const [documentImage, setDocumentImage] = useState('/demo/sample_passport_valid.png');
  const [presentedFace, setPresentedFace] = useState('/demo/presented_face_match.png');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const steps = [
    { num: 1, label: 'Upload & Preset', icon: FileText },
    { num: 2, label: 'OCR & VIZ', icon: Scan },
    { num: 3, label: 'MRZ & Validation', icon: Shield },
    { num: 4, label: 'AI Forensics', icon: Layers },
    { num: 5, label: 'Face Verification', icon: UserCheck },
    { num: 6, label: 'Risk Assessment', icon: AlertTriangle },
    { num: 7, label: 'Audit & Report', icon: Lock },
  ];

  // Handle preset selection
  const handleSelectPreset = (presetKey) => {
    setSelectedPreset(presetKey);
    const scen = DEMO_SCENARIOS[presetKey];
    if (scen) {
      setDocumentType(scen.documentType);
      setDocumentImage(scen.documentImage);
      setPresentedFace(scen.presentedFace);
      setAnalysisResult(null);
      setCurrentStep(1);
    }
  };

  // Run full screening pipeline
  const runScreeningAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const payload = {
        document_type: documentType,
        scenario_preset: selectedPreset,
        document_image_base64: documentImage,
        presented_face_base64: presentedFace
      };
      const result = await api.createScreening(payload);
      setAnalysisResult(result);
      setCurrentStep(2); // Move to results inspection
    } catch (err) {
      console.error("Screening error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    handleSelectPreset('valid_passport');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Step Progress Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
                Interactive Wizard
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Screening Flow (30–60s Presentation Ready)
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide mt-1">
              Identity Document Screening & Risk Inspection
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={runScreeningAnalysis}
              disabled={isAnalyzing}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-glow-cyan transition-all disabled:opacity-50 uppercase tracking-wider"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isAnalyzing ? 'Analyzing...' : 'Run Full AI Screening'}</span>
            </button>
          </div>
        </div>

        {/* 7-Step Horizontal Stepper Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 border-t border-slate-800">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            const isAccessible = analysisResult !== null || step.num === 1;

            return (
              <button
                key={step.num}
                type="button"
                disabled={!isAccessible}
                onClick={() => isAccessible && setCurrentStep(step.num)}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                  isCurrent 
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-glow-cyan/10 ring-1 ring-cyan-400/40 font-bold' 
                    : isCompleted 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15' 
                      : 'bg-slate-900/40 border-slate-800 text-slate-500 disabled:opacity-40'
                }`}
              >
                <div className={`p-1 rounded ${
                  isCurrent 
                    ? 'bg-cyan-400 text-slate-950 font-bold' 
                    : isCompleted 
                      ? 'bg-emerald-400 text-slate-950' 
                      : 'bg-slate-800 text-slate-400'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <div className="text-[9px] font-mono uppercase text-slate-400">Step {step.num}</div>
                  <div className="text-xs truncate">{step.label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="min-h-[420px]">
        {/* Step 1: Upload & Scenario Selection */}
        {currentStep === 1 && (
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <DocumentUploader
              documentType={documentType}
              setDocumentType={setDocumentType}
              documentImage={documentImage}
              setDocumentImage={setDocumentImage}
              presentedFace={presentedFace}
              setPresentedFace={setPresentedFace}
              onSelectPreset={handleSelectPreset}
              selectedPreset={selectedPreset}
              loading={isAnalyzing}
            />

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={runScreeningAnalysis}
                disabled={isAnalyzing}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-glow-cyan transition-all uppercase tracking-wider"
              >
                <span>Proceed to Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: OCR & VIZ */}
        {currentStep === 2 && analysisResult && (
          <div className="space-y-6">
            <OCRResults ocr={analysisResult.ocr} classification={analysisResult.classification} />
            <div className="flex justify-between">
              <button onClick={() => setCurrentStep(1)} className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              <button onClick={() => setCurrentStep(3)} className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5">
                Next: MRZ & Validation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: MRZ & Validation */}
        {currentStep === 3 && analysisResult && (
          <div className="space-y-6">
            <MRZResults mrz={analysisResult.mrz} />
            <ValidationResults validation={analysisResult.validation} />
            <div className="flex justify-between">
              <button onClick={() => setCurrentStep(2)} className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              <button onClick={() => setCurrentStep(4)} className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5">
                Next: AI Forensics <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: AI Forensics & Interactive Dual Pane */}
        {currentStep === 4 && analysisResult && (
          <div className="space-y-6">
            <ForensicViewer
              documentImage={documentImage}
              tampering={analysisResult.tampering}
              ocr={analysisResult.ocr}
              mrz={analysisResult.mrz}
            />
            <TamperingResults tampering={analysisResult.tampering} />
            <div className="flex justify-between">
              <button onClick={() => setCurrentStep(3)} className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              <button onClick={() => setCurrentStep(5)} className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5">
                Next: Face Verification <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Face Verification */}
        {currentStep === 5 && analysisResult && (
          <div className="space-y-6">
            <FaceVerification
              face={analysisResult.face}
              documentImage={documentImage}
              presentedFace={presentedFace}
            />
            <div className="flex justify-between">
              <button onClick={() => setCurrentStep(4)} className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              <button onClick={() => setCurrentStep(6)} className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5">
                Next: Explainable Risk Engine <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Risk Assessment Engine */}
        {currentStep === 6 && analysisResult && (
          <div className="space-y-6">
            <RiskFactors risk={analysisResult.risk} />
            <div className="flex justify-between">
              <button onClick={() => setCurrentStep(5)} className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              <button onClick={() => setCurrentStep(7)} className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5">
                Next: Audit Ledger & Final Report <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 7: Final Audit & Printable Report */}
        {currentStep === 7 && analysisResult && (
          <div className="space-y-6">
            <ScreeningReport screening={analysisResult} />
            <div className="flex justify-start">
              <button onClick={() => setCurrentStep(6)} className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Back to Risk Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
