import React from 'react';
import { 
  Database, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  UploadCloud, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Cpu, 
  ExternalLink,
  ChevronRight,
  FileText,
  Camera
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../../types/landsync';

interface DashboardViewProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onOpenUploadModal: () => void;
  onOpenIntegrationModal: () => void;
  conflictsCount?: number;
  onOpenChangePhoto?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onNavigate,
  onOpenUploadModal,
  onOpenIntegrationModal,
  conflictsCount = 183,
  onOpenChangePhoto,
}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-4">
          <div 
            onClick={onOpenChangePhoto}
            className="relative shrink-0 cursor-pointer group"
            title="Click to change your profile photo"
          >
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading">
                Good morning, {user.name} 👋
              </h1>
              {onOpenChangePhoto && (
                <button
                  type="button"
                  onClick={onOpenChangePhoto}
                  className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#DBEAFE] transition-colors cursor-pointer"
                >
                  <Camera className="w-3 h-3" />
                  <span>Change photo</span>
                </button>
              )}
            </div>
            <p className="text-sm text-[#64748B] mt-0.5 font-medium">
              {user.designation} • {user.organization}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-dash-run-engine"
            type="button"
            onClick={onOpenIntegrationModal}
            className="px-4 py-2.5 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] font-semibold text-xs transition-colors border border-[#DBEAFE] flex items-center gap-2 cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-[#2563EB]" />
            <span>AI Pipeline</span>
          </button>

          <button
            id="btn-dash-upload-dataset"
            type="button"
            onClick={onOpenUploadModal}
            className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4 text-white" />
            <span>+ Upload Dataset</span>
          </button>
        </div>
      </div>

      {/* 4 STATISTICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Datasets */}
        <div 
          onClick={() => onNavigate('datasets')}
          className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:border-[#2563EB]/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#64748B]">
              Total Datasets
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0F172A] font-heading">
              12
            </span>
            <span className="inline-flex items-center text-xs font-semibold text-[#16A34A]">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +8.4%
            </span>
          </div>
          <div className="text-xs text-[#64748B] mt-1 font-medium">
            this month across 5 formats
          </div>
        </div>

        {/* Card 2: Land Parcels */}
        <div 
          onClick={() => onNavigate('map')}
          className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:border-[#2563EB]/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#64748B]">
              Land Parcels
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0F172A] font-heading">
              8,420
            </span>
          </div>
          <div className="text-xs text-[#64748B] mt-1 font-medium">
            Processed &amp; Conflated
          </div>
        </div>

        {/* Card 3: Matched Records */}
        <div 
          onClick={() => onNavigate('spatial-matching')}
          className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:border-[#2563EB]/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#64748B]">
              Matched Records
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#16A34A] group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0F172A] font-heading">
              7,932
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A]">
              91% confidence
            </span>
          </div>
          <div className="text-xs text-[#64748B] mt-1 font-medium">
            Synchronized to Master Layer
          </div>
        </div>

        {/* Card 4: Conflicts */}
        <div 
          onClick={() => onNavigate('conflicts')}
          className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:border-[#F59E0B]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#64748B]">
              Conflicts
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#B45309] group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0F172A] font-heading">
              {conflictsCount}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309]">
              Needs attention
            </span>
          </div>
          <div className="text-xs text-[#64748B] mt-1 font-medium">
            Boundary &amp; area deviations
          </div>
        </div>

      </div>

      {/* DASHBOARD GRID: Integration Overview chart + Data Quality card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Integration Overview chart */}
        <div className="lg:col-span-8 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] font-heading">
                Geospatial Conflation &amp; Ingestion Trend
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Monthly parcel synchronization volume across multi-source datasets
              </p>
            </div>
            <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-xl">
              2026 Fiscal Year
            </span>
          </div>

          {/* SVG Multi-layer Bar / Trend Chart */}
          <div className="py-6">
            <div className="h-56 w-full flex items-end justify-between gap-2 sm:gap-4 px-2">
              {[
                { month: 'Apr', cadastral: 1100, municipal: 980, drone: 800 },
                { month: 'May', cadastral: 1450, municipal: 1320, drone: 1150 },
                { month: 'Jun', cadastral: 1900, municipal: 1740, drone: 1580 },
                { month: 'Jul', cadastral: 2400, municipal: 2200, drone: 2100 },
                { month: 'Aug', cadastral: 3100, municipal: 2900, drone: 2850 },
                { month: 'Sep', cadastral: 3820, municipal: 3410, drone: 3200 },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1 h-44">
                    {/* Cadastral bar */}
                    <div 
                      className="w-1/3 bg-[#2563EB] rounded-t-md transition-all group-hover:brightness-110"
                      style={{ height: `${(item.cadastral / 4000) * 100}%` }}
                      title={`Cadastral: ${item.cadastral}`}
                    ></div>
                    {/* Municipal bar */}
                    <div 
                      className="w-1/3 bg-[#3B82F6] rounded-t-md transition-all group-hover:brightness-110"
                      style={{ height: `${(item.municipal / 4000) * 100}%` }}
                      title={`Municipal: ${item.municipal}`}
                    ></div>
                    {/* Drone bar */}
                    <div 
                      className="w-1/3 bg-[#93C5FD] rounded-t-md transition-all group-hover:brightness-110"
                      style={{ height: `${(item.drone / 4000) * 100}%` }}
                      title={`Drone AI: ${item.drone}`}
                    ></div>
                  </div>
                  <span className="text-xs font-semibold text-[#64748B]">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-[#E2E8F0] text-xs font-semibold text-[#64748B]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#2563EB]"></span>
                <span>Cadastral Records (3,820)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#3B82F6]"></span>
                <span>Municipal Tax Master (3,410)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#93C5FD]"></span>
                <span>Drone AI Segments (3,200)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Data Quality Score Card */}
        <div className="lg:col-span-4 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h2 className="text-base font-bold text-[#0F172A] font-heading">
                Data Quality Score
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#16A34A]">
                Validated
              </span>
            </div>

            {/* Circular Progress Indicator */}
            <div className="flex flex-col items-center my-6">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#EFF6FF"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#2563EB"
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.91)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-[#0F172A] font-heading">
                    91%
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Overall Quality
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#64748B]">Spatial Integrity</span>
                  <span className="text-[#0F172A]">94%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#64748B]">Attribute Completeness</span>
                  <span className="text-[#0F172A]">89%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#64748B]">Geometry Validity</span>
                  <span className="text-[#0F172A]">92%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <button
            id="btn-view-quality-report"
            type="button"
            onClick={() => onNavigate('reports')}
            className="w-full mt-5 py-2.5 px-4 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] font-semibold text-xs transition-colors border border-[#DBEAFE] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Quality Report</span>
          </button>
        </div>

      </div>

      {/* BELOW GRID: Recent Activity + Pending Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Recent Activity Timeline */}
        <div className="lg:col-span-7 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <h2 className="text-base font-bold text-[#0F172A] font-heading">
              Recent Activity
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('audit-logs')}
              className="text-xs text-[#2563EB] font-semibold hover:underline flex items-center gap-1"
            >
              <span>View Audit Logs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {/* Item 1 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-[#0F172A]">
                  Municipal GIS dataset processed
                </div>
                <div className="text-[11px] text-[#64748B]">
                  ULB Property Master (Ward 14) conflation batch completed.
                </div>
              </div>
              <span className="text-[11px] text-[#94A3B8] font-mono shrink-0">
                2 minutes ago
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-[#0F172A]">
                  1,245 records matched
                </div>
                <div className="text-[11px] text-[#64748B]">
                  Spatial similarity threshold &gt; 90% auto-confirmed.
                </div>
              </div>
              <span className="text-[11px] text-[#94A3B8] font-mono shrink-0">
                18 minutes ago
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-[#0F172A]">
                  18 topology conflicts detected
                </div>
                <div className="text-[11px] text-[#64748B]">
                  Flagged for boundary mismatch &amp; encroachment review.
                </div>
              </div>
              <span className="text-[11px] text-[#94A3B8] font-mono shrink-0">
                32 minutes ago
              </span>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-[#0F172A]">
                  Ground verification completed
                </div>
                <div className="text-[11px] text-[#64748B]">
                  RTK GPS survey confirmed boundary for Survey 120 (Health Centre).
                </div>
              </div>
              <span className="text-[11px] text-[#94A3B8] font-mono shrink-0">
                1 hour ago
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Pending Actions */}
        <div className="lg:col-span-5 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h2 className="text-base font-bold text-[#0F172A] font-heading">
                Pending Actions
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FEF3C7] text-[#B45309] rounded-full">
                4 Required
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div 
                onClick={() => onNavigate('conflicts')}
                className="p-3 bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#2563EB]/40 rounded-xl transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">
                    Review 183 Topology Conflicts
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    Requires GIS Officer manual conflation review
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#64748B]" />
              </div>

              <div 
                onClick={() => onNavigate('change-detection')}
                className="p-3 bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#2563EB]/40 rounded-xl transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">
                    Verify 3 New Drone Structures
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    Unregistered constructions detected in 2026 orthophoto
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#64748B]" />
              </div>

              <div 
                onClick={() => onNavigate('ground-verification')}
                className="p-3 bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#2563EB]/40 rounded-xl transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">
                    Dispatch Field GNSS Verification
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    Property PROP-00126 flagged for 18 m² area difference
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#64748B]" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] mt-4">
            <button
              type="button"
              onClick={() => onNavigate('map')}
              className="w-full py-2 px-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Open Full GIS Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
