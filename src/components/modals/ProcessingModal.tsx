import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  RefreshCw, 
  Circle, 
  X, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const ProcessingModal: React.FC<ProcessingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [progress, setProgress] = useState(87);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(87);
      setIsFinished(false);
      return;
    }

    // Auto animate progress slightly to show live activity
    const timer = setTimeout(() => {
      setProgress(94);
      const finishTimer = setTimeout(() => {
        setProgress(100);
        setIsFinished(true);
      }, 1800);
      return () => clearTimeout(finishTimer);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.15)] overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-[#DBEAFE]">
              <Cpu className="w-6 h-6 text-[#2563EB]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                Integrating your datasets
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                LandSync is analyzing spatial and non-spatial relationships.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#0F172A] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="my-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
              {isFinished ? 'Integration Completed' : 'Batch Conflation Active'}
            </span>
            <span className="text-xl font-extrabold text-[#0F172A] font-mono">
              {progress}%
            </span>
          </div>

          <div className="w-full h-3 bg-[#EFF6FF] rounded-full overflow-hidden border border-[#DBEAFE]">
            <div 
              className="h-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Live Activity Log */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 space-y-3">
          <div className="text-xs font-bold text-[#0F172A] mb-2 uppercase tracking-wide">
            Live Conflation Steps
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center gap-2.5 text-[#0F172A]">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>Cadastral dataset analyzed (3,820 records)</span>
            </div>

            <div className="flex items-center gap-2.5 text-[#0F172A]">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>CRS transformation completed (EPSG:32644)</span>
            </div>

            <div className="flex items-center gap-2.5 text-[#0F172A]">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>Building features extracted from 5cm Orthomosaic</span>
            </div>

            <div className="flex items-center gap-2.5 text-[#0F172A]">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>Spatial matching completed (7,932 pairs matched)</span>
            </div>

            <div className="flex items-center gap-2.5">
              {progress >= 94 ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span className="text-[#0F172A]">183 conflicts identified and categorized</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 text-[#2563EB] animate-spin shrink-0" />
                  <span className="text-[#2563EB] font-medium">Detecting conflicts...</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              {progress >= 100 ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span className="text-[#0F172A]">Confidence scoring finalized (91% overall)</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-[#CBD5E1] shrink-0" />
                  <span className="text-[#94A3B8]">Confidence scoring</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
          >
            Run in Background
          </button>

          <button
            id="btn-processing-complete-action"
            type="button"
            onClick={() => {
              onComplete();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span>{isFinished ? 'View Updated GIS Map' : 'Go to GIS Map'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
