import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  RefreshCw, 
  Circle, 
  Cpu, 
  Layers, 
  Database, 
  Play, 
  Check, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  X
} from 'lucide-react';

interface AiIntegrationViewProps {
  onOpenProcessingModal: () => void;
  isProcessing: boolean;
  processingProgress: number;
}

export const AiIntegrationView: React.FC<AiIntegrationViewProps> = ({
  onOpenProcessingModal,
  isProcessing,
  processingProgress,
}) => {
  // 10 pipeline steps
  const steps = [
    {
      step: '01',
      title: 'Data Ingestion',
      desc: 'Parse Shapefiles, GeoJSON, KML & PostGIS registers',
      status: 'completed',
    },
    {
      step: '02',
      title: 'Data Profiling',
      desc: 'Scan metadata, geometry validity & null-attribute counts',
      status: 'completed',
    },
    {
      step: '03',
      title: 'CRS Transformation',
      desc: 'Harmonize UTM Zone 44N & WGS84 to unified projection',
      status: 'completed',
    },
    {
      step: '04',
      title: 'AI Feature Extraction',
      desc: 'Detect building footprints & boundary walls from 5cm imagery',
      status: 'completed',
    },
    {
      step: '05',
      title: 'Spatial Matching',
      desc: 'Bilinear polygon intersection & centroid proximity scoring',
      status: 'completed',
    },
    {
      step: '06',
      title: 'Attribute Mapping',
      desc: 'Fuzzy string phonetic matching on title deeds vs tax rolls',
      status: 'completed',
    },
    {
      step: '07',
      title: 'Topology Validation',
      desc: 'Verify gap, overlap & sliver polygon constraints',
      status: 'processing',
    },
    {
      step: '08',
      title: 'Conflict Detection',
      desc: 'Flag area deviations > 5% & right-of-way buffer breaches',
      status: 'pending',
    },
    {
      step: '09',
      title: 'Confidence Scoring',
      desc: 'Compute weighted composite index (0-100%) for each parcel',
      status: 'pending',
    },
    {
      step: '10',
      title: 'Human Review',
      desc: 'Route disputed properties to senior GIS officer dashboard',
      status: 'pending',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#EFF6FF] via-[#DBEAFE]/40 to-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#DBEAFE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#2563EB] text-xs font-semibold border border-[#DBEAFE] mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Autonomous Geospatial Conflation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading">
            AI Integration Engine
          </h1>
          <p className="text-sm sm:text-base text-[#64748B] mt-2 leading-relaxed">
            Transform fragmented geospatial datasets into a unified land information layer with automated CRS normalization, machine learning polygon alignment, and topology reconciliation.
          </p>
        </div>

        <div>
          <button
            id="btn-run-intelligent-integration"
            type="button"
            onClick={onOpenProcessingModal}
            className="px-6 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-bold text-sm transition-all shadow-[0_4px_15px_rgba(37,99,235,0.25)] flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Run Intelligent Integration</span>
          </button>
        </div>
      </div>

      {/* 10 Pipeline Steps Grid with Connected Blue Lines */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[#0F172A] font-heading">
            10-Stage Geospatial Integration Pipeline
          </h2>
          <span className="text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-lg">
            Status: 6 Completed • 1 Processing • 3 Pending
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {steps.map((item, index) => {
            const isCompleted = item.status === 'completed';
            const isCurrent = item.status === 'processing';
            const isPending = item.status === 'pending';

            return (
              <div
                key={item.step}
                className={`relative p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#EFF6FF] border-[#2563EB] shadow-[0_4px_20px_rgba(37,99,235,0.12)] ring-2 ring-[#2563EB]/20'
                    : isCompleted
                    ? 'bg-[#FFFFFF] border-[#E2E8F0] shadow-xs'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] opacity-80'
                }`}
              >
                {/* Step number badge & status icon */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                      isCurrent ? 'bg-[#2563EB] text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                    }`}>
                      {item.step}
                    </span>

                    {isCompleted && (
                      <div className="w-6 h-6 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                      </div>
                    )}

                    {isCurrent && (
                      <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center animate-spin">
                        <RefreshCw className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {isPending && (
                      <div className="w-6 h-6 rounded-full bg-[#F1F5F9] text-[#94A3B8] flex items-center justify-center">
                        <Circle className="w-3 h-3 text-[#CBD5E1]" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-[#0F172A] font-heading mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Status indicator line */}
                <div className="mt-4 pt-3 border-t border-[#E2E8F0]/60 flex items-center justify-between text-[10px] font-semibold">
                  <span className={
                    isCurrent ? 'text-[#2563EB]' : isCompleted ? 'text-[#16A34A]' : 'text-[#94A3B8]'
                  }>
                    {isCurrent ? 'Processing...' : isCompleted ? 'Validated ✓' : 'Queue'}
                  </span>
                  <span className="text-[#94A3B8] font-mono">Stage {index + 1}/10</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Engine Metrics & Conflation Architecture Box */}
      <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E2E8F0] shadow-xs">
        <h2 className="text-base font-bold text-[#0F172A] font-heading mb-4">
          Conflation Engine Parameters &amp; Accuracy Guarantees
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="text-xs font-semibold text-[#64748B]">
              CRS Standardization
            </div>
            <div className="text-lg font-extrabold text-[#0F172A] font-heading mt-1">
              EPSG:32644 (UTM 44N)
            </div>
            <div className="text-xs text-[#64748B] mt-1">
              Transforms local cadastral coordinates with sub-meter datum transformation.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="text-xs font-semibold text-[#64748B]">
              Spatial Intersection Buffer
            </div>
            <div className="text-lg font-extrabold text-[#0F172A] font-heading mt-1">
              ± 0.50 Meters
            </div>
            <div className="text-xs text-[#64748B] mt-1">
              Boundary snap tolerance to eliminate false topology sliver gaps.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="text-xs font-semibold text-[#64748B]">
              Confidence Threshold
            </div>
            <div className="text-lg font-extrabold text-[#0F172A] font-heading mt-1">
              90.0% Minimum
            </div>
            <div className="text-xs text-[#64748B] mt-1">
              Parcels scoring below 90% are flagged into the Conflicts management queue.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
