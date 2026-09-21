import React from 'react';
import { 
  Layers, 
  Database, 
  Cpu, 
  SplitSquareVertical, 
  AlertTriangle, 
  UploadCloud, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Map as MapIcon, 
  ShieldCheck, 
  Camera,
  Compass,
  FileSpreadsheet
} from 'lucide-react';
import { UserProfile, NavigationTab } from '../../../types/landsync';

interface GisOfficerDashboardProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onOpenUploadModal: () => void;
  onOpenIntegrationModal: () => void;
  onOpenChangePhoto?: () => void;
  conflictsCount?: number;
}

export const GisOfficerDashboard: React.FC<GisOfficerDashboardProps> = ({
  user,
  onNavigate,
  onOpenUploadModal,
  onOpenIntegrationModal,
  onOpenChangePhoto,
  conflictsCount = 183
}) => {
  const kpis = [
    { label: 'Active GIS Datasets', value: '12', subtext: 'Vector & Raster Layers', icon: Database, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Ingestion Pipelines', value: '3 Active', subtext: 'EPSG:32644 (UTM 44N)', icon: Cpu, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Spatial Matches', value: '842', subtext: '94.2% AI Confidence', icon: SplitSquareVertical, color: 'text-[#16A34A]', bg: 'bg-[#F0FDF4]' },
    { label: 'Topology Anomalies', value: '14', subtext: 'Overlaps & Slivers', icon: AlertTriangle, color: 'text-[#D97706]', bg: 'bg-[#FFFBEB]' },
    { label: 'Geometry Errors', value: '6', subtext: 'Self-intersections', icon: Compass, color: 'text-[#DC2626]', bg: 'bg-[#FEF2F2]' },
    { label: 'Conflation Quality', value: '94.2%', subtext: 'Cadastral + Drone ORI', icon: TrendingUp, color: 'text-[#16A34A]', bg: 'bg-[#F0FDF4]' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <div 
            onClick={onOpenChangePhoto}
            className="relative shrink-0 cursor-pointer group"
            title="Click to update GIS officer photo"
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
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-heading">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                GIS OFFICER
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F1F5F9] text-[#475569]">
                <Layers className="w-3 h-3 text-[#2563EB]" /> Spatial Processing Workspace
              </span>
            </div>
            <p className="text-sm text-[#64748B] mt-0.5">
              {user.department} • <span className="text-[#0F172A] font-medium">{user.district} ({user.municipality})</span>
            </p>
          </div>
        </div>

        {/* GIS Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-gis-upload-dataset"
            type="button"
            onClick={onOpenUploadModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <UploadCloud className="w-4 h-4 text-[#2563EB]" />
            <span>Upload Dataset</span>
          </button>

          <button
            id="btn-gis-run-integration"
            type="button"
            onClick={onOpenIntegrationModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#16A34A]" />
            <span>Run AI Pipeline</span>
          </button>

          <button
            id="btn-gis-spatial-matching"
            type="button"
            onClick={() => onNavigate('spatial-matching')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <SplitSquareVertical className="w-4 h-4 text-[#2563EB]" />
            <span>Spatial Matching</span>
          </button>

          <button
            id="btn-gis-open-map"
            type="button"
            onClick={() => onNavigate('map')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <MapIcon className="w-4 h-4" />
            <span>Open GIS Map</span>
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

      {/* Primary GIS Workspace Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: GIS Interactive Map Preview & Spatial Conflation */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <h2 className="text-base font-bold text-[#0F172A] font-heading flex items-center gap-2">
                  <MapIcon className="w-4 h-4 text-[#2563EB]" />
                  Interactive GIS Workspace (Primary Tool)
                </h2>
                <p className="text-xs text-[#64748B]">Active Ward: Banjara Hills (Ward 84) • Cadastral & Drone ORI Overlay</p>
              </div>
              <button
                onClick={() => onNavigate('map')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                <span>Full Map Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 h-72 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] p-4 relative overflow-hidden flex flex-col justify-between">
              {/* Map Layer Toolbar */}
              <div className="flex flex-wrap items-center gap-2 z-10 bg-white/95 backdrop-blur-xs p-2 rounded-lg border border-[#E2E8F0] shadow-2xs">
                <span className="text-[11px] font-bold text-[#475569]">Layers:</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">Cadastral Parcels</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]">Building Footprints</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FEE2E2]">18 Conflicts</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B]">Drone ORI 2026</span>
              </div>

              {/* Centered Property Card Preview */}
              <div className="my-auto mx-auto z-10 max-w-sm w-full bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-[#BFDBFE] shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#0F172A] font-mono">PROP-00125</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F0FDF4] text-[#16A34A]">
                    Integrated (91% AI)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-[#475569] mt-2 border-t border-[#F1F5F9] pt-2">
                  <div>Survey: <strong>125</strong></div>
                  <div>Municipal: <strong>M458</strong></div>
                  <div>Area: <strong>252 m²</strong></div>
                </div>
                <div className="mt-2 text-[10px] text-[#64748B] flex items-center justify-between">
                  <span>Owner: S. R. Venkat</span>
                  <button onClick={() => onNavigate('map')} className="text-[#2563EB] font-semibold hover:underline">
                    Inspect on Map →
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#64748B] z-10 bg-white/90 p-2 rounded-lg border border-[#E2E8F0]">
                <span>Scale: 1:1,000</span>
                <span>Projection: WGS 84 / UTM zone 44N (EPSG:32644)</span>
                <button onClick={() => onNavigate('map')} className="font-semibold text-[#2563EB] hover:underline">
                  Launch Split-View Map →
                </button>
              </div>
            </div>
          </div>

          {/* AI Integration Pipeline Status */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0F172A] font-heading flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#2563EB]" />
                Automated Conflation Pipeline
              </h3>
              <button 
                onClick={() => onNavigate('ai-integration')}
                className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
              >
                View Full Pipeline Details →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center gap-1.5 text-[#16A34A] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> CRS Transformation
                </div>
                <div className="text-[11px] text-[#64748B] mt-1">Reprojected to UTM 44N</div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center gap-1.5 text-[#16A34A] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Geometry Validation
                </div>
                <div className="text-[11px] text-[#64748B] mt-1">Topology verified</div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center gap-1.5 text-[#16A34A] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Spatial Matching
                </div>
                <div className="text-[11px] text-[#64748B] mt-1">842 parcels aligned</div>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
                <div className="flex items-center gap-1.5 text-[#D97706] font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" /> Conflict Detection
                </div>
                <div className="text-[11px] text-[#92400E] mt-1">18 items need review</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Quick Actions & Dataset Catalog */}
        <div className="space-y-6">
          
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-[#0F172A] font-heading mb-3">
              GIS Quick Actions
            </h3>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => onNavigate('spatial-matching')}
                className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-[#0F172A]">Run Spatial Conflation</div>
                  <div className="text-[11px] text-[#64748B]">Cross-reference Cadastral vs Municipal</div>
                </div>
                <SplitSquareVertical className="w-4 h-4 text-[#2563EB]" />
              </button>

              <button
                onClick={() => onNavigate('conflicts')}
                className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-[#0F172A]">Resolve Spatial Conflicts</div>
                  <div className="text-[11px] text-[#64748B]">{conflictsCount} boundary discrepancies</div>
                </div>
                <AlertTriangle className="w-4 h-4 text-[#D97706]" />
              </button>

              <button
                onClick={() => onNavigate('change-detection')}
                className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-[#0F172A]">Temporal Change Detection</div>
                  <div className="text-[11px] text-[#64748B]">2025 vs 2026 Drone ORI comparison</div>
                </div>
                <Layers className="w-4 h-4 text-[#2563EB]" />
              </button>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0F172A] font-heading">
                Supported Spatial Formats
              </h3>
              <span className="text-[10px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded">
                OGC Compliant
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['GeoJSON', 'Shapefile (SHP)', 'GeoTIFF', 'KML/KMZ', 'GeoPackage (GPKG)', 'CSV + XY', 'Cloud Optimized GeoTIFF (COG)'].map((fmt, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#475569] text-[11px] font-medium border border-[#E2E8F0]">
                  {fmt}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
