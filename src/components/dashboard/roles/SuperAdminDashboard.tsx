import React from 'react';
import { 
  Users, 
  Building2, 
  Database, 
  Layers, 
  AlertTriangle, 
  Webhook, 
  PlusCircle, 
  ShieldCheck, 
  FileSpreadsheet, 
  Activity, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp, 
  Globe, 
  History,
  Camera,
  Server
} from 'lucide-react';
import { UserProfile, NavigationTab } from '../../../types/landsync';

interface SuperAdminDashboardProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onOpenChangePhoto?: () => void;
  onOpenCreateAuthorityModal?: () => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  user,
  onNavigate,
  onOpenChangePhoto,
  onOpenCreateAuthorityModal
}) => {
  const kpis = [
    { label: 'Total Registered Officers', value: '1,428', change: '+24 this week', icon: Users, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Statewide Departments', value: '18', change: '100% active', icon: Building2, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Active Datasets', value: '84', change: '12 added today', icon: Database, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Integrated Properties', value: '42,850', change: '94.2% confidence', icon: Layers, color: 'text-[#16A34A]', bg: 'bg-[#F0FDF4]' },
    { label: 'System Conflicts', value: '183', change: '-14 resolved', icon: AlertTriangle, color: 'text-[#D97706]', bg: 'bg-[#FFFBEB]' },
    { label: 'API Integrations', value: '7 / 7 Active', change: 'All healthy', icon: Webhook, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
  ];

  const departmentActivity = [
    { name: 'Revenue & Land Records (DLR)', districtCount: '33 Districts', parcels: '18,420', status: 'Synchronized', load: '98%' },
    { name: 'Greater Hyderabad Municipal Corp (GHMC)', districtCount: '6 Zones / 30 Circles', parcels: '14,890', status: 'Synchronized', load: '95%' },
    { name: 'Cadastral & Survey Settlements Wing', districtCount: 'Statewide Geodetic Grid', parcels: '9,540', status: 'Active Ingestion', load: '87%' },
    { name: 'Town & Country Planning Directorate', districtCount: '24 Urban Authorities', parcels: '6,210', status: 'Synchronized', load: '92%' },
  ];

  const apiConnections = [
    { name: 'Meta WhatsApp Business Cloud API', type: 'Communication', status: 'Operational', latency: '42ms' },
    { name: 'State Revenue Portal (Dharani/Bhoomi Gateway)', type: 'Government Cadastre', status: 'Operational', latency: '120ms' },
    { name: 'ULB Municipal GIS Property Tax Engine', type: 'Urban Governance', status: 'Operational', latency: '85ms' },
    { name: 'Survey of India CORS/RTK Network', type: 'Geodetic GNSS', status: 'Operational', latency: '28ms' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <div 
            onClick={onOpenChangePhoto}
            className="relative shrink-0 cursor-pointer group"
            title="Click to update administrator profile photo"
          >
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"}
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
                SUPER ADMIN
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]">
                <ShieldCheck className="w-3 h-3" /> Statewide Authority
              </span>
            </div>
            <p className="text-sm text-[#64748B] mt-0.5">
              {user.department} • <span className="text-[#0F172A] font-medium">{user.district}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-sa-manage-users"
            type="button"
            onClick={() => onNavigate('users')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <Users className="w-4 h-4 text-[#2563EB]" />
            <span>Manage Users</span>
          </button>

          <button
            id="btn-sa-api-integrations"
            type="button"
            onClick={() => onNavigate('api-integrations')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <Webhook className="w-4 h-4 text-[#2563EB]" />
            <span>API Integrations</span>
          </button>

          <button
            id="btn-sa-audit-logs"
            type="button"
            onClick={() => onNavigate('audit-logs')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <History className="w-4 h-4 text-[#64748B]" />
            <span>Audit Logs</span>
          </button>

          <button
            id="btn-sa-create-authority"
            type="button"
            onClick={() => onOpenCreateAuthorityModal ? onOpenCreateAuthorityModal() : onNavigate('users')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Authority / User</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
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
              <div className="text-[11px] text-[#64748B] mt-1 flex items-center gap-1">
                <span>{kpi.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Statewide Overview & System Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Statewide Map & Department Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Statewide Map Scope Banner */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
              <div>
                <h2 className="text-base font-bold text-[#0F172A] font-heading flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#2563EB]" />
                  Statewide Geospatial Integration Grid
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Unified cadastral, drone ORI, and municipal parcel coverage across all 33 districts
                </p>
              </div>
              <button
                id="btn-open-statewide-map"
                type="button"
                onClick={() => onNavigate('map')}
                className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] cursor-pointer"
              >
                <span>Launch Enterprise GIS Map</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 h-56 rounded-xl bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#DBEAFE] border border-[#BFDBFE] p-4 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                  <span className="font-semibold text-[#0F172A]">Live GIS Engine: Active</span>
                  <span className="text-[#64748B] font-mono">EPSG:32644 (UTM 44N)</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#2563EB] text-white">
                  Statewide Scope
                </span>
              </div>

              {/* Simplified visual map representation */}
              <div className="my-auto text-center z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 border border-[#BFDBFE] shadow-sm">
                  <Layers className="w-5 h-5 text-[#2563EB]" />
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#0F172A]">42,850 Unified Properties</div>
                    <div className="text-[10px] text-[#64748B]">Cadastral • Drone Ortho • Revenue Khasra • Municipal Tax</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#475569] z-10 bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-[#E2E8F0]">
                <span>Coverage: <strong>33 Districts (100%)</strong></span>
                <span>Active Conflation Engine: <strong>AI Confidence 94.2%</strong></span>
                <button 
                  onClick={() => onNavigate('map')}
                  className="font-semibold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Explore State Layers →
                </button>
              </div>
            </div>
          </div>

          {/* Department Activity Table */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] font-heading">
                  Departmental Ingestion & Conflation Status
                </h3>
                <p className="text-xs text-[#64748B]">Real-time synchronization across state agencies</p>
              </div>
              <button 
                onClick={() => onNavigate('departments')}
                className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
              >
                View All Departments
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#64748B]">
                    <th className="pb-2 font-semibold">Department / Agency</th>
                    <th className="pb-2 font-semibold">Jurisdiction Scope</th>
                    <th className="pb-2 font-semibold">Linked Parcels</th>
                    <th className="pb-2 font-semibold">Sync Health</th>
                    <th className="pb-2 font-semibold text-right">Throughput</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {departmentActivity.map((dept, i) => (
                    <tr key={i} className="hover:bg-[#F8FAFC]">
                      <td className="py-3 font-medium text-[#0F172A]">{dept.name}</td>
                      <td className="py-3 text-[#64748B]">{dept.districtCount}</td>
                      <td className="py-3 font-mono font-medium text-[#0F172A]">{dept.parcels}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]">
                          <CheckCircle2 className="w-3 h-3" /> {dept.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-medium text-[#2563EB]">{dept.load}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Col: System Alerts, API Health, Quick Navigation */}
        <div className="space-y-6">
          
          {/* API Health Matrix */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0F172A] font-heading flex items-center gap-2">
                <Server className="w-4 h-4 text-[#2563EB]" />
                API Infrastructure Health
              </h3>
              <span className="text-[11px] font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#DCFCE7]">
                100% ONLINE
              </span>
            </div>

            <div className="space-y-2.5">
              {apiConnections.map((api, idx) => (
                <div key={idx} className="p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-[#0F172A]">{api.name}</div>
                    <div className="text-[11px] text-[#64748B]">{api.type}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-[#16A34A] flex items-center gap-1 justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                      {api.status}
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">{api.latency}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              id="btn-sa-manage-apis"
              type="button"
              onClick={() => onNavigate('api-integrations')}
              className="mt-3 w-full py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] text-xs font-semibold transition-colors text-center cursor-pointer"
            >
              Configure API Gateways & Credentials →
            </button>
          </div>

          {/* System Security & Audit Snapshot */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0F172A] font-heading flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#2563EB]" />
                System Security & Governance
              </h3>
              <button 
                onClick={() => onNavigate('audit-logs')}
                className="text-[11px] font-semibold text-[#2563EB] hover:underline cursor-pointer"
              >
                Full Logs
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 pb-2.5 border-b border-[#F1F5F9]">
                <div className="w-2 h-2 rounded-full bg-[#16A34A] mt-1 shrink-0"></div>
                <div>
                  <div className="font-medium text-[#0F172A]">WhatsApp OTP Service verified</div>
                  <div className="text-[11px] text-[#64748B]">Meta Cloud API health check passed (42ms)</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pb-2.5 border-b border-[#F1F5F9]">
                <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-1 shrink-0"></div>
                <div>
                  <div className="font-medium text-[#0F172A]">Drone ORI Orthophoto Ingested</div>
                  <div className="text-[11px] text-[#64748B]">GHMC Circle 5 survey run • 840 geometries matched</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#D97706] mt-1 shrink-0"></div>
                <div>
                  <div className="font-medium text-[#0F172A]">Cadastral Boundary Mismatch Flagged</div>
                  <div className="text-[11px] text-[#64748B]">Survey No 125 vs Municipal M458 assigned to District Admin</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
              <span>Compliance: <strong>ISO 27001 / IT Act</strong></span>
              <span className="text-[#16A34A] font-semibold">100% Encrypted</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
