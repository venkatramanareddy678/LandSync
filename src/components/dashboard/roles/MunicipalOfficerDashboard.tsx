import React from 'react';
import { 
  Building2, 
  Home, 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  ArrowRight, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Camera,
  Map as MapIcon,
  Shield
} from 'lucide-react';
import { UserProfile, NavigationTab } from '../../../types/landsync';

interface MunicipalOfficerDashboardProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onOpenChangePhoto?: () => void;
}

export const MunicipalOfficerDashboard: React.FC<MunicipalOfficerDashboardProps> = ({
  user,
  onNavigate,
  onOpenChangePhoto
}) => {
  const municipality = user.municipality || 'GHMC Circle 5 (Khairatabad)';

  const kpis = [
    { label: 'Assessed Properties (PTIN)', value: '28,450', subtext: `${municipality}`, icon: Home, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Building Footprints', value: '22,180', subtext: 'GIS Vector Polygons', icon: Building2, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Utility Networks', value: '4 Layers', subtext: 'Water, Power, Storm, Sewer', icon: Zap, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'New Unassessed Structures', value: '142', subtext: 'Detected via Drone ORI', icon: AlertTriangle, color: 'text-[#D97706]', bg: 'bg-[#FFFBEB]' },
    { label: 'Property Tax Conflicts', value: '46', subtext: 'Plinth Area deviations', icon: AlertTriangle, color: 'text-[#DC2626]', bg: 'bg-[#FEF2F2]' },
    { label: 'Verification Pipeline', value: '28', subtext: 'Town Planning rovers', icon: Clock, color: 'text-[#16A34A]', bg: 'bg-[#F0FDF4]' },
  ];

  const urbanChanges = [
    { id: 'MUN-PROP-842', address: 'Plot 42, Road No 10, Banjara Hills', type: 'Additional Floor Detected (+210 m²)', change: 'G+2 to G+3', taxImpact: '+₹24,500/yr' },
    { id: 'MUN-PROP-915', address: 'Door No 8-2-293/A, Jubilee Hills', type: 'New Commercial Construction', change: 'Vacant to Commercial G+4', taxImpact: '+₹1,85,000/yr' },
    { id: 'MUN-PROP-1102', address: 'Plot 18, Somajiguda Main Rd', type: 'Setback / Buffer Encroachment', change: 'Compound wall extended 1.8m', taxImpact: 'Town Planning Notice' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <div 
            onClick={onOpenChangePhoto}
            className="relative shrink-0 cursor-pointer group"
            title="Click to update municipal officer photo"
          >
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"}
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
                MUNICIPAL OFFICER
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F1F5F9] text-[#475569]">
                <MapPin className="w-3 h-3 text-[#2563EB]" /> {municipality}
              </span>
            </div>
            <p className="text-sm text-[#64748B] mt-0.5">
              {user.department} • <span className="text-[#0F172A] font-medium">{user.designation || 'Town Planning & Property Tax Assessment'}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-mun-properties"
            type="button"
            onClick={() => onNavigate('municipal-properties')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#2563EB]" />
            <span>Municipal Properties</span>
          </button>

          <button
            id="btn-mun-buildings"
            type="button"
            onClick={() => onNavigate('buildings')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-[#2563EB]" />
            <span>Building Footprints</span>
          </button>

          <button
            id="btn-mun-changes"
            type="button"
            onClick={() => onNavigate('change-detection')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>142 New Buildings</span>
          </button>
        </div>
      </div>

      {/* Jurisdiction Isolation Banner */}
      <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl flex items-center justify-between text-xs text-[#1E40AF]">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#2563EB]" />
          <span>
            <strong>Municipal Scope Enforced:</strong> Showing assessments, utility alignments, and building footprints strictly for <strong>{municipality}</strong>.
          </span>
        </div>
        <span className="font-semibold text-[11px] bg-white px-2 py-0.5 rounded border border-[#BFDBFE]">
          ULB Ward 84 / 91
        </span>
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

      {/* Main Grid: Urban Change Detection & Municipal GIS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: AI Drone Plinth Area & Unassessed Structures */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] font-heading flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#2563EB]" />
                  Unassessed Structures & Expansion Alerts ({municipality})
                </h3>
                <p className="text-xs text-[#64748B]">AI detected discrepancies between municipal tax assessment register and 2026 Drone Orthophoto</p>
              </div>
              <button
                onClick={() => onNavigate('change-detection')}
                className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
              >
                Launch Temporal Map →
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {urbanChanges.map((change, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#BFDBFE] hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A] font-mono">{change.id}</span>
                      <span className="text-[#64748B]">• {change.address}</span>
                    </div>
                    <div className="text-[#DC2626] font-semibold mt-1">
                      {change.type} ({change.change})
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-1 rounded border border-[#DCFCE7]">
                      {change.taxImpact}
                    </span>
                    <button
                      onClick={() => onNavigate('map')}
                      className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] cursor-pointer"
                    >
                      Inspect Footprint
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Municipality Map Scope */}
        <div className="space-y-6">
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-[#0F172A] font-heading flex items-center gap-2 mb-3">
              <MapIcon className="w-4 h-4 text-[#2563EB]" />
              Municipal Ward GIS Map
            </h3>

            <div className="h-44 rounded-xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border border-[#BFDBFE] p-3 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-[#1E40AF]">Active Ward Boundary: Khairatabad</span>
              <div className="text-center">
                <div className="text-xs font-bold text-[#0F172A]">22,180 Buildings Footprinted</div>
                <div className="text-[10px] text-[#64748B]">Water, Sewer & Power Network Overlays</div>
              </div>
              <button 
                onClick={() => onNavigate('map')}
                className="w-full py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                Inspect Municipal GIS Map
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
