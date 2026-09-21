import React, { useState } from 'react';
import { 
  SplitSquareVertical, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  FileText, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SpatialMatchItem } from '../../types/landsync';

interface SpatialMatchingViewProps {
  matches: SpatialMatchItem[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export const SpatialMatchingView: React.FC<SpatialMatchingViewProps> = ({
  matches,
  onAccept,
  onReject,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMatch = matches[currentIndex] || matches[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % matches.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + matches.length) % matches.length);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Conflation &amp; Entity Resolution</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading">
            Spatial Matching Comparison
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">
            Compare Cadastral vector parcel geometry with Municipal ULB property tax records.
          </p>
        </div>

        {/* Record Navigator */}
        <div className="flex items-center gap-2 bg-[#FFFFFF] p-1.5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 rounded-xl hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] cursor-pointer"
            title="Previous pair"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-[#0F172A] px-2 font-mono">
            Match {currentIndex + 1} of {matches.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 rounded-xl hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] cursor-pointer"
            title="Next pair"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SPLIT COMPARISON INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT: CADASTRAL RECORD */}
        <div className="lg:col-span-4 bg-[#FFFFFF] p-6 rounded-3xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-[#2563EB]"></span>
                <h2 className="text-sm font-bold text-[#0F172A] font-heading uppercase tracking-wide">
                  Cadastral Record
                </h2>
              </div>
              <span className="text-xs font-mono font-semibold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-md">
                EPSG:32644
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#64748B]">Survey Number</span>
                <div className="text-2xl font-extrabold text-[#0F172A] font-mono mt-0.5">
                  Survey {currentMatch.cadastralRecord.surveyNo}
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Official Area:</span>
                  <span className="font-bold text-[#0F172A] font-mono">{currentMatch.cadastralRecord.areaSqMeters} m²</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Registered Owner:</span>
                  <span className="font-bold text-[#0F172A]">{currentMatch.cadastralRecord.owner}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Sub-Division:</span>
                  <span className="font-semibold text-[#0F172A]">{currentMatch.cadastralRecord.subDivision}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Village / Unit:</span>
                  <span className="font-semibold text-[#0F172A]">{currentMatch.cadastralRecord.village}</span>
                </div>
              </div>

              {/* Boundary SVG diagram */}
              <div className="h-36 bg-[#EFF6FF]/40 rounded-2xl border border-[#DBEAFE] flex items-center justify-center p-3 relative">
                <svg className="w-full h-full" viewBox="0 0 200 120">
                  <polygon 
                    points="30,20 170,25 155,100 45,95" 
                    fill="#2563EB" 
                    fillOpacity="0.1" 
                    stroke="#2563EB" 
                    strokeWidth="2" 
                  />
                  <text x="100" y="65" textAnchor="middle" fill="#2563EB" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    Survey {currentMatch.cadastralRecord.surveyNo}
                  </text>
                </svg>
                <span className="absolute bottom-2 right-3 text-[10px] text-[#64748B] font-mono">
                  Vector Polygon
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>{currentMatch.cadastralRecord.coordinates}</span>
          </div>
        </div>

        {/* CENTER: AI MATCH & SIMILARITY BREAKDOWNS */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#EFF6FF] via-[#FFFFFF] to-[#F8FAFC] p-6 rounded-3xl border border-[#DBEAFE] shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-center pb-2">
              <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase font-heading">
                AI Conflation Result
              </span>
              
              {/* Large AI Match % */}
              <div className="my-3">
                <div className="text-5xl font-black text-[#0F172A] font-heading tracking-tight">
                  {currentMatch.overallMatch}%
                </div>
                <div className="inline-flex items-center gap-1 mt-1 text-xs font-bold px-3 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High Confidence Match
                </div>
              </div>
            </div>

            {/* Overlap Visualizer Diagram */}
            <div className="my-4 h-28 bg-white rounded-2xl border border-[#E2E8F0] flex items-center justify-center p-2 relative shadow-2xs">
              <svg className="w-full h-full" viewBox="0 0 200 90">
                {/* Cadastral (Blue) */}
                <polygon 
                  points="35,15 165,18 150,75 45,72" 
                  fill="#2563EB" 
                  fillOpacity="0.15" 
                  stroke="#2563EB" 
                  strokeWidth="2" 
                />
                {/* Municipal (Cyan dotted) */}
                <polygon 
                  points="38,17 162,20 152,78 48,74" 
                  fill="none" 
                  stroke="#0284C7" 
                  strokeWidth="2" 
                  strokeDasharray="4 3" 
                />
                <text x="100" y="48" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="bold">
                  98.2% Spatial IoU Overlap
                </text>
              </svg>
            </div>

            {/* Then Similarity breakdown metrics */}
            <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#E2E8F0]">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#64748B]">Spatial Similarity</span>
                  <span className="text-[#0F172A] font-mono font-bold">{currentMatch.spatialSimilarity}%</span>
                </div>
                <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${currentMatch.spatialSimilarity}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#64748B]">Attribute Similarity</span>
                  <span className="text-[#0F172A] font-mono font-bold">{currentMatch.attributeSimilarity}%</span>
                </div>
                <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${currentMatch.attributeSimilarity}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#64748B]">Geometry Similarity</span>
                  <span className="text-[#0F172A] font-mono font-bold">{currentMatch.geometrySimilarity}%</span>
                </div>
                <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${currentMatch.geometrySimilarity}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#64748B]">Area Similarity</span>
                  <span className="text-[#0F172A] font-mono font-bold">{currentMatch.areaSimilarity}%</span>
                </div>
                <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${currentMatch.areaSimilarity}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Accept Match, Review, Reject */}
          <div className="mt-5 space-y-2">
            <button
              id="btn-accept-match"
              type="button"
              onClick={() => onAccept(currentMatch.id)}
              className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Accept Match</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                id="btn-review-match"
                type="button"
                onClick={handleNext}
                className="py-2.5 px-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] font-semibold text-xs transition-colors cursor-pointer"
              >
                Review Next
              </button>
              <button
                id="btn-reject-match"
                type="button"
                onClick={() => onReject(currentMatch.id)}
                className="py-2.5 px-3 rounded-xl bg-[#FEE2E2]/60 hover:bg-[#FEE2E2] border border-[#FCA5A5] text-[#DC2626] font-semibold text-xs transition-colors cursor-pointer"
              >
                Reject
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: MUNICIPAL RECORD */}
        <div className="lg:col-span-4 bg-[#FFFFFF] p-6 rounded-3xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-[#3B82F6]"></span>
                <h2 className="text-sm font-bold text-[#0F172A] font-heading uppercase tracking-wide">
                  Municipal Record
                </h2>
              </div>
              <span className="text-xs font-mono font-semibold text-[#0284C7] bg-[#F0F9FF] px-2 py-0.5 rounded-md">
                ULB Property Register
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#64748B]">Municipal Property ID</span>
                <div className="text-2xl font-extrabold text-[#0F172A] font-mono mt-0.5">
                  Property {currentMatch.municipalRecord.propertyNo}
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Assessed Area:</span>
                  <span className="font-bold text-[#0F172A] font-mono">{currentMatch.municipalRecord.areaSqMeters} m²</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Door Number:</span>
                  <span className="font-bold text-[#0F172A]">{currentMatch.municipalRecord.doorNo}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Taxpayer Name:</span>
                  <span className="font-bold text-[#0F172A]">{currentMatch.municipalRecord.owner}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Tax Assessment #:</span>
                  <span className="font-mono text-[#0F172A]">{currentMatch.municipalRecord.taxAssessmentNo}</span>
                </div>
              </div>

              {/* Boundary SVG diagram */}
              <div className="h-36 bg-[#F0F9FF] rounded-2xl border border-[#BAE6FD] flex items-center justify-center p-3 relative">
                <svg className="w-full h-full" viewBox="0 0 200 120">
                  <polygon 
                    points="32,22 168,27 153,103 47,97" 
                    fill="#3B82F6" 
                    fillOpacity="0.12" 
                    stroke="#0284C7" 
                    strokeWidth="2" 
                    strokeDasharray="4 2"
                  />
                  <text x="100" y="65" textAnchor="middle" fill="#0284C7" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    {currentMatch.municipalRecord.propertyNo}
                  </text>
                </svg>
                <span className="absolute bottom-2 right-3 text-[10px] text-[#64748B] font-mono">
                  Municipal Layer
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>{currentMatch.municipalRecord.ward}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
