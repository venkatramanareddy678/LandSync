import React, { useState } from 'react';
import { 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  Maximize2,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { ChangeDetectionRecord } from '../../types/landsync';

interface ChangeDetectionViewProps {
  records: ChangeDetectionRecord[];
  onVerifyChange: (record: ChangeDetectionRecord) => void;
}

export const ChangeDetectionView: React.FC<ChangeDetectionViewProps> = ({
  records,
  onVerifyChange,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [selectedRecord, setSelectedRecord] = useState<ChangeDetectionRecord>(records[0]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Temporal Geospatial Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading">
            AI Satellite &amp; Drone Change Detection
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">
            Compare 2025 baseline cadastral orthomosaic against 2026 high-resolution 5cm aerial imagery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#0F172A] bg-white border border-[#E2E8F0] px-3 py-1.5 rounded-xl shadow-2xs">
            Viewing: 2025 vs 2026
          </span>
        </div>
      </div>

      {/* Hero Interactive Split Slider Visualizer */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] p-6 shadow-[0_4px_25px_rgba(15,23,42,0.06)] space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#EFF6FF] text-[#2563EB] font-bold text-xs rounded-xl">
              Property {selectedRecord.propertyId}
            </span>
            <h2 className="text-base font-bold text-[#0F172A] font-heading">
              {selectedRecord.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#64748B]">
              AI Confidence:
            </span>
            <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-md">
              {selectedRecord.confidence}%
            </span>
          </div>
        </div>

        {/* The Split Screen Map Canvas */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden select-none border border-[#E2E8F0] bg-[#0F172A]">
          
          {/* 2026 Image/Layer (Right / Full background) */}
          <div className="absolute inset-0 bg-[#0F172A]">
            <svg className="w-full h-full" viewBox="0 0 600 360">
              <rect width="600" height="360" fill="#0F172A" />
              {/* Roads */}
              <rect x="0" y="280" width="600" height="40" fill="#334155" />
              <text x="300" y="305" fill="#94A3B8" fontSize="11" textAnchor="middle" fontWeight="bold">
                18M Indiranagar Masterplan Corridor
              </text>
              {/* Land Parcels */}
              <polygon points="120,60 480,60 460,260 100,260" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
              {/* Original Old Building */}
              <rect x="150" y="90" width="100" height="80" fill="#475569" stroke="#64748B" strokeWidth="2" rx="4" />
              {/* NEW 2026 BUILDING DETECTED (Glowing Red/Amber) */}
              <rect x="290" y="90" width="130" height="120" fill="#EF4444" fillOpacity="0.4" stroke="#DC2626" strokeWidth="3" strokeDasharray="4 2" rx="6" />
              <text x="355" y="155" fill="#FFFFFF" fontSize="13" textAnchor="middle" fontWeight="black" fontFamily="Manrope, sans-serif">
                NEW STRUCTURE
              </text>
              <text x="355" y="175" fill="#FEE2E2" fontSize="10" textAnchor="middle" fontWeight="bold">
                +142 m² (2-Story RCC)
              </text>
            </svg>
            <div className="absolute top-3 right-4 px-3 py-1 bg-black/70 backdrop-blur-md rounded-xl text-xs font-bold text-white border border-white/20">
              2026 (Drone 5cm GSD)
            </div>
          </div>

          {/* 2025 Image/Layer (Left / Clipped by slider) */}
          <div 
            className="absolute inset-y-0 left-0 overflow-hidden bg-[#1E293B] border-r-2 border-white shadow-2xl"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="w-[800px] h-full relative">
              <svg className="w-[600px] h-[360px]" viewBox="0 0 600 360">
                <rect width="600" height="360" fill="#1E293B" />
                {/* Roads */}
                <rect x="0" y="280" width="600" height="40" fill="#334155" />
                <text x="300" y="305" fill="#94A3B8" fontSize="11" textAnchor="middle" fontWeight="bold">
                  18M Indiranagar Masterplan Corridor
                </text>
                {/* Land Parcels */}
                <polygon points="120,60 480,60 460,260 100,260" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                {/* Original Old Building Only */}
                <rect x="150" y="90" width="100" height="80" fill="#475569" stroke="#64748B" strokeWidth="2" rx="4" />
                {/* Open vacant space in 2025 */}
                <rect x="290" y="90" width="130" height="120" fill="#15803D" fillOpacity="0.2" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="3 3" rx="6" />
                <text x="355" y="155" fill="#86EFAC" fontSize="12" textAnchor="middle" fontWeight="bold">
                  Vacant Open Plot
                </text>
              </svg>
              <div className="absolute top-3 left-4 px-3 py-1 bg-black/70 backdrop-blur-md rounded-xl text-xs font-bold text-white border border-white/20">
                2025 (Historical Satellite)
              </div>
            </div>
          </div>

          {/* Draggable Slider Control */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-lg border-2 border-white pointer-events-auto">
              <Sliders className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Range Slider for Scrubbing */}
        <div className="flex items-center gap-4 px-2 pt-2">
          <span className="text-xs font-bold text-[#64748B]">2025 Baseline</span>
          <input
            id="slider-change-detection"
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="flex-1 accent-[#2563EB] cursor-pointer"
          />
          <span className="text-xs font-bold text-[#2563EB]">2026 Detection</span>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
          <p className="text-xs text-[#64748B] max-w-xl">
            {selectedRecord.description}
          </p>

          <button
            id="btn-verify-change"
            type="button"
            onClick={() => onVerifyChange(selectedRecord)}
            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verify Change</span>
          </button>
        </div>
      </div>

      {/* Change Detection Records List */}
      <div>
        <h2 className="text-base font-bold text-[#0F172A] font-heading mb-3">
          All Detected Changes in Current Ward
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {records.map((rec) => {
            const isSelected = selectedRecord.id === rec.id;
            return (
              <div
                key={rec.id}
                onClick={() => setSelectedRecord(rec)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#EFF6FF] border-[#2563EB] shadow-xs'
                    : 'bg-[#FFFFFF] border-[#E2E8F0] hover:border-[#2563EB]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-[#E2E8F0] text-[#0F172A]">
                    {rec.propertyId}
                  </span>
                  <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-md">
                    {rec.confidence}% Conf.
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#0F172A] font-heading mb-1">
                  {rec.title}
                </h3>

                <p className="text-xs text-[#64748B] line-clamp-2 mb-3">
                  {rec.description}
                </p>

                <div className="flex items-center justify-between text-[11px] font-semibold text-[#64748B] pt-2 border-t border-[#E2E8F0]/80">
                  <span>Change: +{rec.areaChangeSqMeters} m²</span>
                  <span className="text-[#2563EB] flex items-center gap-0.5">
                    View in Slider <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
