import React from 'react';
import { 
  Building, 
  Database, 
  Layers, 
  AlertTriangle, 
  CheckSquare, 
  TrendingUp, 
  ArrowRight, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  Clock, 
  UserCheck,
  Shield,
  Camera,
  Map as MapIcon
} from 'lucide-react';
import { UserProfile, NavigationTab, ConflictItem } from '../../../types/landsync';

interface DistrictAdminDashboardProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onOpenChangePhoto?: () => void;
  conflicts?: ConflictItem[];
}

export const DistrictAdminDashboard: React.FC<DistrictAdminDashboardProps> = ({
  user,
  onNavigate,
  onOpenChangePhoto,
  conflicts = []
}) => {
  const districtName = user.district || 'Hyderabad Central';

  const kpis = [
    { label: 'District Properties', value: '14,890', subtext: `Scoped to ${districtName}`, icon: Layers, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Processed Datasets', value: '26', subtext: 'Cadastral & Ortho', icon: Database, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Pending Reviews', value: '42', subtext: 'Awaiting Sign-off', icon: Clock, color: 'text-[#D97706]', bg: 'bg-[#FFFBEB]' },
    { label: 'Active Conflicts', value: '38', subtext: 'Boundary & Area', icon: AlertTriangle, color: 'text-[#DC2626]', bg: 'bg-[#FEF2F2]' },
    { label: 'Field Verifications', value: '18', subtext: 'Rovers dispatched', icon: CheckSquare, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Data Quality Index', value: '95.4%', subtext: 'High Conflation Match', icon: TrendingUp, color: 'text-[#16A34A]', bg: 'bg-[#F0FDF4]' },
  ];

  const pendingApprovals = [
    { id: 'PROP-00125', surveyNo: '125', municipalId: 'M458', type: 'Cadastral Area Deviation', diff: '+2.0 m²', status: 'Needs Sign-off', urgency: 'High' },
    { id: 'PROP-00188', surveyNo: '188/B', municipalId: 'M512', type: 'Owner Name Orthography', diff: 'Spelling mismatch', status: 'Pending Review', urgency: 'Medium' },
    { id: 'PROP-00204', surveyNo: '204', municipalId: 'M620', type: 'Encroachment Warning', diff: '14 m² road buffer', status: 'Field Assigned', urgency: 'High' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <div 
            onClick={onOpenChangePhoto}
            className="relative shrink-0 cursor-pointer group"
            title="Click to update district administrator photo"
          >
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"}
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
                DISTRICT ADMIN
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F1F5F9] text-[#475569]">
                <MapPin className="w-3 h-3 text-[#2563EB]" /> {districtName}
              </span>
            </div>
            <p className="text-sm text-[#64748B] mt-0.5">
              {user.department} • <span className="text-[#0F172A] font-medium">{user.designation || 'District Collectorate Jurisdiction'}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-da-review-integration"
            type="button"
            onClick={() => onNavigate('conflicts')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
            <span>Review Integration</span>
          </button>

          <button
            id="btn-da-assign-verification"
            type="button"
            onClick={() => onNavigate('ground-verification')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-[#2563EB]" />
            <span>Assign Field Verification</span>
          </button>

          <button
            id="btn-da-district-reports"
            type="button"
            onClick={() => onNavigate('reports')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>View District Reports</span>
          </button>
        </div>
      </div>

      {/* Strict Scoping Notice */}
      <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl flex items-center justify-between text-xs text-[#1E40AF]">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#2563EB]" />
          <span>
            <strong>Data Scope Isolation Active:</strong> Displaying cadastral and municipal records exclusively for <strong>{districtName}</strong>.
          </span>
        </div>
        <span className="font-semibold text-[11px] bg-white px-2 py-0.5 rounded border border-[#BFDBFE]">
          Enforced by LandSync RBAC
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

      {/* 2-Column Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Pending Approvals & District Conflict Summary */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Pending Reviews & Approvals */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] font-heading">
                  Pending Cadastral & Revenue Approvals ({districtName})
                </h3>
                <p className="text-xs text-[#64748B]">Parcels requiring District Collectorate sign-off or field rover dispatch</p>
              </div>
              <button 
                onClick={() => onNavigate('conflicts')}
                className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
              >
                View All Conflicts →
              </button>
            </div>

            <div className="space-y-3">
              {pendingApprovals.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#BFDBFE] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A] font-mono">{item.id}</span>
                      <span className="text-[#64748B]">• Survey No: <strong>{item.surveyNo}</strong></span>
                      <span className="text-[#64748B]">• Municipal ID: <strong>{item.municipalId}</strong></span>
                    </div>
                    <div className="text-[#475569] mt-1">
                      {item.type} • Discrepancy: <strong className="text-[#DC2626]">{item.diff}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onNavigate('map')}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] font-semibold hover:bg-[#F1F5F9] cursor-pointer"
                    >
                      Inspect Map
                    </button>
                    <button
                      onClick={() => onNavigate('conflicts')}
                      className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] cursor-pointer"
                    >
                      Review & Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* District Ground Verification Queue */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0F172A] font-heading flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#2563EB]" />
                Active Field Verification Tasks ({districtName})
              </h3>
              <button 
                onClick={() => onNavigate('ground-verification')}
                className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
              >
                Open Ground Verification →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F172A]">Ward 84 (Banjara Hills)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB]">6 Tasks</span>
                </div>
                <div className="text-[11px] text-[#64748B] mt-1">Assigned Officer: Mahesh Kumar (Field Officer)</div>
                <div className="text-[11px] text-[#16A34A] mt-2 font-medium">4 Verified • 2 Pending RTK GPS</div>
              </div>

              <div className="p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F172A]">Ward 91 (Jubilee Hills)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB]">12 Tasks</span>
                </div>
                <div className="text-[11px] text-[#64748B] mt-1">Assigned Officer: Vikramaditya Sen (Survey Officer)</div>
                <div className="text-[11px] text-[#D97706] mt-2 font-medium">8 Verified • 4 Boundary Rechecks</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Quick District Map & Summary Actions */}
        <div className="space-y-6">
          
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-[#0F172A] font-heading flex items-center gap-2 mb-3">
              <MapIcon className="w-4 h-4 text-[#2563EB]" />
              {districtName} Spatial Extent
            </h3>
            
            <div className="h-44 rounded-xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border border-[#BFDBFE] p-3 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-[#1E40AF]">District Boundary Polygon Loaded</span>
              <div className="text-center">
                <div className="text-xs font-bold text-[#0F172A]">14,890 Land Parcels</div>
                <div className="text-[10px] text-[#64748B]">98.2% Orthophoto Coverage</div>
              </div>
              <button 
                onClick={() => onNavigate('map')}
                className="w-full py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                Launch District GIS Workspace
              </button>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-[#0F172A] font-heading mb-3">
              District Reporting & Compliance
            </h3>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => onNavigate('reports')}
                className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <span className="font-medium text-[#0F172A]">Monthly District Conflation Summary</span>
                <span className="text-[11px] font-bold text-[#2563EB]">PDF / Excel</span>
              </button>
              <button
                onClick={() => onNavigate('reports')}
                className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <span className="font-medium text-[#0F172A]">Disputed Cadastral Parcels Audit</span>
                <span className="text-[11px] font-bold text-[#2563EB]">38 Records</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
