import React from 'react';
import { 
  X, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Building, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  Printer
} from 'lucide-react';
import { LandParcel } from '../../types/landsync';

interface ParcelDetailModalProps {
  parcel: LandParcel | null;
  onClose: () => void;
  onStartVerification: (parcel: LandParcel) => void;
}

export const ParcelDetailModal: React.FC<ParcelDetailModalProps> = ({
  parcel,
  onClose,
  onStartVerification,
}) => {
  if (!parcel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-y-auto p-6 sm:p-8 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-[#0F172A] font-heading font-mono">
                {parcel.id}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                parcel.status === 'Integrated'
                  ? 'bg-[#DCFCE7] text-[#16A34A]'
                  : parcel.status === 'Conflict'
                  ? 'bg-[#FEF3C7] text-[#B45309]'
                  : 'bg-[#EFF6FF] text-[#2563EB]'
              }`}>
                {parcel.status}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Integrated Land Information Record • Survey #{parcel.surveyNumber}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#0F172A] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="py-6 space-y-6">
          
          {/* AI Conflation Summary Banner */}
          <div className="bg-[#EFF6FF] border border-[#DBEAFE] p-4 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wide">
                Unified Master Record Status
              </span>
              <div className="text-sm font-bold text-[#0F172A] mt-0.5">
                AI Composite Confidence: {parcel.confidence}% (Spatial Overlap 98.4%)
              </div>
            </div>
            <span className="text-xs font-bold text-[#16A34A] bg-white px-2.5 py-1 rounded-xl shadow-2xs">
              Verified Title
            </span>
          </div>

          {/* Core Attributes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B] block font-medium">Survey Number</span>
              <span className="font-bold text-[#0F172A] font-mono text-sm">{parcel.surveyNumber}</span>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B] block font-medium">Municipal ULB ID</span>
              <span className="font-bold text-[#0F172A] font-mono text-sm">{parcel.municipalId}</span>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B] block font-medium">Conflated Area</span>
              <span className="font-bold text-[#0F172A] font-mono text-sm">{parcel.areaSqMeters} m²</span>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B] block font-medium">Land Use</span>
              <span className="font-bold text-[#0F172A] text-sm">{parcel.landUse}</span>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B] block font-medium">Building Footprints</span>
              <span className="font-bold text-[#0F172A] text-sm">{parcel.buildingCount} structure</span>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B] block font-medium">Ward Jurisdiction</span>
              <span className="font-bold text-[#0F172A] text-sm">{parcel.ward}</span>
            </div>
          </div>

          {/* Agency Cross-Validation Matrix */}
          <div>
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
              Multi-Agency Source Audit
            </h3>
            <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Source Agency</th>
                    <th className="py-2.5 px-4 font-semibold">Registered Title</th>
                    <th className="py-2.5 px-4 font-semibold">Area</th>
                    <th className="py-2.5 px-4 font-semibold">Identifier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-[#2563EB]">Cadastral Revenue Dept</td>
                    <td className="py-2.5 px-4">{parcel.sources.cadastral.owner}</td>
                    <td className="py-2.5 px-4 font-mono font-bold">{parcel.sources.cadastral.area} m²</td>
                    <td className="py-2.5 px-4 font-mono">Survey #{parcel.sources.cadastral.surveyNo}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-[#0284C7]">Municipal Corporation (ULB)</td>
                    <td className="py-2.5 px-4">{parcel.sources.municipal.owner}</td>
                    <td className="py-2.5 px-4 font-mono font-bold">{parcel.sources.municipal.area} m²</td>
                    <td className="py-2.5 px-4 font-mono">{parcel.sources.municipal.propertyNo}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-[#7C3AED]">Drone AI Orthomosaic</td>
                    <td className="py-2.5 px-4">Detected Roof Footprint</td>
                    <td className="py-2.5 px-4 font-mono font-bold">{parcel.sources.drone.footprintArea} m²</td>
                    <td className="py-2.5 px-4 font-mono">{parcel.sources.drone.flightDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E2E8F0]">
          <button
            type="button"
            onClick={() => alert(`Printing official LandSync parcel cert for ${parcel.id}...`)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Print Land Record</span>
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartVerification(parcel);
              }}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] font-bold text-xs transition-colors cursor-pointer"
            >
              Verify On Ground
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
