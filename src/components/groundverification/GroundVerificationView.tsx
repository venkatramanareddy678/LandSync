import React, { useState } from 'react';
import { 
  Navigation, 
  Camera, 
  CheckSquare, 
  Square, 
  MapPin, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  Smartphone,
  Radio,
  FileText
} from 'lucide-react';
import { LandParcel } from '../../types/landsync';

interface GroundVerificationViewProps {
  parcel: LandParcel;
  onApprove: () => void;
  onFlagResurvey: () => void;
}

export const GroundVerificationView: React.FC<GroundVerificationViewProps> = ({
  parcel,
  onApprove,
  onFlagResurvey,
}) => {
  const [checklist, setChecklist] = useState({
    boundaryMarkersVerified: true,
    buildingCountConfirmed: true,
    photoCaptured: true,
    ownerIdentityChecked: false,
    utilityEncroachmentChecked: false,
  });

  const [officerNotes, setOfficerNotes] = useState(
    'Inspected northern boundary corner pegs. RTK GNSS confirmed 0.04m alignment with cadastral stone marker. Building count is 1 primary residential unit.'
  );

  const [hasPhoto, setHasPhoto] = useState(true);

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] text-xs font-semibold mb-2">
            <Navigation className="w-3.5 h-3.5" />
            <span>Field GNSS Rover Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading">
            Ground Verification
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">
            Mobile field survey &amp; RTK validation workflow for Revenue and Municipal officers.
          </p>
        </div>

        {/* RTK GPS Status */}
        <div className="flex items-center gap-2.5 bg-[#FFFFFF] border border-[#DCFCE7] px-3.5 py-2 rounded-2xl shadow-2xs">
          <Radio className="w-4 h-4 text-[#16A34A] animate-pulse" />
          <div>
            <div className="text-xs font-bold text-[#16A34A]">RTK Fixed (±0.8 cm)</div>
            <div className="text-[10px] text-[#64748B] font-mono">18 Satellites Locked</div>
          </div>
        </div>
      </div>

      {/* Main Verification Card */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-[0_4px_25px_rgba(15,23,42,0.06)] overflow-hidden">
        
        {/* Top Info Banner */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#EFF6FF] to-white border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-[#0F172A] font-heading font-mono">
                {parcel.id}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white text-[#2563EB] border border-[#DBEAFE]">
                Survey #{parcel.surveyNumber}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1 font-medium">
              Ward: {parcel.ward} • Registered Owner: {parcel.owner}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#0F172A]">
            <div className="bg-white px-3 py-1.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B] block text-[10px]">Cadastral Area</span>
              <span className="font-bold">{parcel.areaSqMeters} m²</span>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B] block text-[10px]">Coordinates</span>
              <span className="font-bold">{parcel.coordinates[0].x.toFixed(1)}, {parcel.coordinates[0].y.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Map Snippet & Photo Capture Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Map Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                Cadastral Map Snippet
              </span>
              <div className="h-52 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-3 flex items-center justify-center relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 200 130">
                  <polygon 
                    points="30,20 170,25 155,110 45,105" 
                    fill="#EFF6FF" 
                    stroke="#2563EB" 
                    strokeWidth="2.5" 
                  />
                  {/* Building */}
                  <rect x="75" y="45" width="50" height="40" fill="#3B82F6" fillOpacity="0.4" stroke="#1D4ED8" strokeWidth="1.5" rx="2" />
                  {/* GNSS Rover Pin */}
                  <circle cx="95" cy="65" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="95" cy="65" r="14" fill="#EF4444" fillOpacity="0.2" className="animate-ping" />
                  <text x="100" y="20" textAnchor="middle" fill="#2563EB" fontSize="10" fontWeight="bold">
                    Survey {parcel.surveyNumber}
                  </text>
                </svg>
                <div className="absolute bottom-2 left-3 text-[10px] text-[#64748B] bg-white/90 px-2 py-0.5 rounded-md">
                  RTK Rover Position: On Site
                </div>
              </div>
            </div>

            {/* Field Photo Capture Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                Geo-Tagged Photo
              </span>
              <div className="h-52 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-4 flex flex-col items-center justify-center relative overflow-hidden text-center">
                {hasPhoto ? (
                  <div className="w-full h-full relative rounded-xl overflow-hidden bg-slate-800 flex flex-col justify-between p-3 text-white">
                    {/* Simulated Camera Feed / Captured Photo */}
                    <div className="flex justify-between items-center text-[10px] font-mono bg-black/50 px-2 py-1 rounded-md">
                      <span>LAT: 12.9716° N</span>
                      <span>LON: 77.5946° E</span>
                    </div>

                    <div className="flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white/70" />
                    </div>

                    <div className="flex justify-between items-center text-[10px] bg-black/60 px-2 py-1 rounded-md">
                      <span>Property Corner Peg #1</span>
                      <span className="text-emerald-400 font-bold">✓ Geo-Tagged</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setHasPhoto(true)}
                    className="flex flex-col items-center gap-2 text-[#64748B] hover:text-[#2563EB]"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold">Tap to capture live field photo</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Verification Checklist */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
              Field Officer Checklist
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label 
                onClick={() => toggleCheck('boundaryMarkersVerified')}
                className="flex items-center gap-3 p-3 rounded-2xl border border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
              >
                {checklist.boundaryMarkersVerified ? (
                  <CheckSquare className="w-5 h-5 text-[#2563EB]" />
                ) : (
                  <Square className="w-5 h-5 text-[#94A3B8]" />
                )}
                <span className="text-xs font-semibold text-[#0F172A]">
                  Physical boundary markers &amp; stones verified
                </span>
              </label>

              <label 
                onClick={() => toggleCheck('buildingCountConfirmed')}
                className="flex items-center gap-3 p-3 rounded-2xl border border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
              >
                {checklist.buildingCountConfirmed ? (
                  <CheckSquare className="w-5 h-5 text-[#2563EB]" />
                ) : (
                  <Square className="w-5 h-5 text-[#94A3B8]" />
                )}
                <span className="text-xs font-semibold text-[#0F172A]">
                  Building count ({parcel.buildingCount}) and story height confirmed
                </span>
              </label>

              <label 
                onClick={() => toggleCheck('photoCaptured')}
                className="flex items-center gap-3 p-3 rounded-2xl border border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
              >
                {checklist.photoCaptured ? (
                  <CheckSquare className="w-5 h-5 text-[#2563EB]" />
                ) : (
                  <Square className="w-5 h-5 text-[#94A3B8]" />
                )}
                <span className="text-xs font-semibold text-[#0F172A]">
                  4-corner GPS photos captured with timestamp
                </span>
              </label>

              <label 
                onClick={() => toggleCheck('ownerIdentityChecked')}
                className="flex items-center gap-3 p-3 rounded-2xl border border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
              >
                {checklist.ownerIdentityChecked ? (
                  <CheckSquare className="w-5 h-5 text-[#2563EB]" />
                ) : (
                  <Square className="w-5 h-5 text-[#94A3B8]" />
                )}
                <span className="text-xs font-semibold text-[#0F172A]">
                  Owner title deed or utility bill cross-examined
                </span>
              </label>
            </div>
          </div>

          {/* Officer Notes Textarea */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
              Survey Officer Field Notes
            </span>
            <textarea
              rows={3}
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              className="w-full px-4 py-2.5 text-xs text-[#0F172A] rounded-2xl border border-[#E2E8F0] focus:outline-hidden focus:border-[#2563EB]"
              placeholder="Record any on-ground encroachment, dispute observations, or boundary offsets..."
            />
          </div>

          {/* Final Action Buttons: Approve / Flag for resurvey */}
          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              id="btn-flag-resurvey"
              type="button"
              onClick={onFlagResurvey}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#B45309] font-bold text-xs transition-colors border border-[#FDE68A] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Flag for Resurvey</span>
            </button>

            <button
              id="btn-approve-ground-verification"
              type="button"
              onClick={onApprove}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve &amp; Confirm Integration</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
