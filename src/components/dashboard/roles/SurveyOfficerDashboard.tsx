import React from 'react';
import { 
  Compass, 
  Satellite, 
  MapPin, 
  CheckSquare, 
  AlertTriangle, 
  UploadCloud, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Camera, 
  Target,
  FileSpreadsheet
} from 'lucide-react';
import { UserProfile, NavigationTab } from '../../../types/landsync';

interface SurveyOfficerDashboardProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onOpenChangePhoto?: () => void;
}

export const SurveyOfficerDashboard: React.FC<SurveyOfficerDashboardProps> = ({
  user,
  onNavigate,
  onOpenChangePhoto
}) => {
  const kpis = [
    { label: 'Active Survey Tasks', value: '42', subtext: 'Field rovers deployed', icon: CheckSquare, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'GNSS / CORS Fixes', value: '1,840', subtext: 'RTK Fix 99.4% (±8mm)', icon: Satellite, color: 'text-[#16A34A]', bg: 'bg-[#F0FDF4]' },
    { label: 'Coordinate Discrepancies', value: '16', subtext: 'Datum shift / Projection', icon: Compass, color: 'text-[#DC2626]', bg: 'bg-[#FEF2F2]' },
    { label: 'Cadastral Boundary Checks', value: '24', subtext: 'GCP Triangulation', icon: Target, color: 'text-[#D97706]', bg: 'bg-[#FFFBEB]' },
    { label: 'Pending DGPS Surveys', value: '12', subtext: 'Banjara & Jubilee Hills', icon: MapPin, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Survey of India CORS Status', value: '4 Stations', subtext: 'HYD1, HYD2, SEC1, HITEC', icon: Satellite, color: 'text-[#16A34A]', bg: 'bg-[#F0FDF4]' },
  ];

  const surveyStations = [
    { code: 'CORS-HYD-01', location: 'Survey Bhavan, Uppal', status: 'RTK Streaming', latency: '0.4s', satellites: '28 SVs (GPS+GLONASS+Galileo)' },
    { code: 'CORS-HYD-02', location: 'GHMC Central, Tank Bund', status: 'RTK Streaming', latency: '0.3s', satellites: '31 SVs' },
    { code: 'CORS-SEC-01', location: 'Cantonment Geodetic Pillar', status: 'RTK Streaming', latency: '0.5s', satellites: '26 SVs' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <div 
            onClick={onOpenChangePhoto}
            className="relative shrink-0 cursor-pointer group"
            title="Click to update survey officer photo"
          >
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"}
              alt={user.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-[#2563EB] shadow-xs group-hover:ring-3 group-hover:ring-[#DBEAFE] transition-all"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#16A34A] ring-2 ring-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-heading">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                SURVEY / GNSS OFFICER
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F1F5F9] text-[#475569]">
                <Satellite className="w-3 h-3 text-[#2563EB]" /> Geodetic & CORS Reference
              </span>
            </div>
            <p className="text-sm text-[#64748B] mt-0.5">
              {user.department} • <span className="text-[#0F172A] font-medium">{user.designation || 'Principal GNSS/CORS Geodetic Surveyor'}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-srv-upload-gnss"
            type="button"
            onClick={() => alert('Opening GNSS RINEX / NMEA / CSV upload pipeline.')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <UploadCloud className="w-4 h-4 text-[#2563EB]" />
            <span>Upload GNSS Data</span>
          </button>

          <button
            id="btn-srv-validate-coords"
            type="button"
            onClick={() => onNavigate('coordinate-validation')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#2563EB]" />
            <span>Validate Coordinates</span>
          </button>

          <button
            id="btn-srv-assign-survey"
            type="button"
            onClick={() => onNavigate('ground-verification')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>Assign Field Rover Survey</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs hover:border-[#BFDBFE] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[#64748B]">{kpi.label}</span>
                <div className={`p-1.5 rounded-lg ${kpi.bg}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="text-xl font-bold text-[#0F172A] font-heading">{kpi.value}</div>
              <div className="text-[11px] text-[#64748B] mt-1 truncate">{kpi.subtext}</div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: CORS Stations & Geodetic Coordinate Auditing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <h3 className="text-base font-bold text-[#0F172A] font-heading flex items-center gap-2 mb-1">
              <Satellite className="w-4 h-4 text-[#2563EB]" />
              Continuous Operating Reference Stations (CORS Network)
            </h3>
            <p className="text-xs text-[#64748B] mb-4">
              Real-time kinematic (RTK) differential correction stream powering sub-centimeter land parcel boundary surveys
            </p>

            <div className="space-y-3">
              {surveyStations.map((st, i) => (
                <div key={i} className="p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                      <span className="font-mono text-[#2563EB]">{st.code}</span>
                      <span>• {st.location}</span>
                    </div>
                    <div className="text-[#64748B] text-[11px] mt-0.5">{st.satellites}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse"></span>
                      {st.status} ({st.latency})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-[#0F172A] font-heading mb-3">
              Boundary & Coordinate Validation
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="font-semibold text-[#0F172A]">Survey No 125 GCP Discrepancy</div>
                <div className="text-[11px] text-[#DC2626] font-medium mt-1">12mm baseline deviation between Cadastral Stone and GNSS Rover</div>
                <button 
                  onClick={() => onNavigate('map')}
                  className="mt-2 text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Inspect on RTK Layer →
                </button>
              </div>

              <div className="p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="font-semibold text-[#0F172A]">Survey No 188/B Boundary Fix</div>
                <div className="text-[11px] text-[#16A34A] font-medium mt-1">4 Corner Stones verified with Survey of India benchmark</div>
                <span className="mt-2 inline-block text-[11px] font-bold text-[#16A34A]">Accuracy: ±6mm</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
