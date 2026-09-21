import React from 'react';
import { 
  FileSpreadsheet, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  ArrowRight, 
  Send, 
  UserCheck, 
  Layers, 
  Check, 
  X, 
  Eye, 
  Camera,
  Landmark
} from 'lucide-react';
import { UserProfile, NavigationTab } from '../../../types/landsync';

interface RevenueOfficerDashboardProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onOpenChangePhoto?: () => void;
}

export const RevenueOfficerDashboard: React.FC<RevenueOfficerDashboardProps> = ({
  user,
  onNavigate,
  onOpenChangePhoto
}) => {
  const kpis = [
    { label: 'Revenue Khasra Records', value: '18,420', subtext: 'RoR Settlement Records', icon: Landmark, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Cadastral Map Parcels', value: '18,310', subtext: 'Tippon & Village Maps', icon: Layers, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Pending Verification', value: '86', subtext: 'Awaiting Tahsildar sign-off', icon: AlertTriangle, color: 'text-[#D97706]', bg: 'bg-[#FFFBEB]' },
    { label: 'Survey No. Mismatches', value: '24', subtext: 'Sub-division conflict', icon: Scale, color: 'text-[#DC2626]', bg: 'bg-[#FEF2F2]' },
    { label: 'Area Mismatches', value: '31', subtext: 'Area deviation > 1.5%', icon: Scale, color: 'text-[#D97706]', bg: 'bg-[#FFFBEB]' },
    { label: 'Approved Records', value: '18,169', subtext: '98.6% Settlement Sync', icon: CheckCircle2, color: 'text-[#16A34A]', bg: 'bg-[#F0FDF4]' },
  ];

  // Specific Revenue vs Cadastral records as requested in user prompt
  const comparisonRecords = [
    {
      surveyNo: '125',
      khataNo: 'KH-842',
      ownerRevenue: 'S. R. Venkat & Brothers',
      revenueArea: '252 m²',
      cadastralArea: '250 m²',
      diff: '+2 m² (0.8%)',
      status: 'Requires Review',
      actionNeeded: 'Verify boundary coordinates with Village Cadastral Map'
    },
    {
      surveyNo: '142/1',
      khataNo: 'KH-1020',
      ownerRevenue: 'Lakshmi Devi',
      revenueArea: '480 m²',
      cadastralArea: '475 m²',
      diff: '+5 m² (1.05%)',
      status: 'Requires Review',
      actionNeeded: 'Cadastral sub-division boundary check required'
    },
    {
      surveyNo: '188/B',
      khataNo: 'KH-1205',
      ownerRevenue: 'Mohd. Qasim',
      revenueArea: '310 m²',
      cadastralArea: '310 m²',
      diff: '0 m² (Matched)',
      status: 'Ready for Approval',
      actionNeeded: 'Revenue RoR and Tippon geometry in exact harmony'
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <div 
            onClick={onOpenChangePhoto}
            className="relative shrink-0 cursor-pointer group"
            title="Click to update revenue officer photo"
          >
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"}
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
                REVENUE OFFICER
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F1F5F9] text-[#475569]">
                <Landmark className="w-3 h-3 text-[#2563EB]" /> Revenue & Cadastral Settlement
              </span>
            </div>
            <p className="text-sm text-[#64748B] mt-0.5">
              {user.department} • <span className="text-[#0F172A] font-medium">{user.designation || 'Tahsildar & Sub-Divisional Wing'}</span>
            </p>
          </div>
        </div>

        {/* Revenue Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-rev-verify-records"
            type="button"
            onClick={() => onNavigate('property-verification')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-[#2563EB]" />
            <span>Property Verification</span>
          </button>

          <button
            id="btn-rev-cadastral-compare"
            type="button"
            onClick={() => onNavigate('cadastral-comparison')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <Scale className="w-4 h-4 text-[#2563EB]" />
            <span>Cadastral Comparison</span>
          </button>

          <button
            id="btn-rev-conflicts"
            type="button"
            onClick={() => onNavigate('conflicts')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Review 31 Mismatches</span>
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

      {/* Main Revenue Records Verification Table */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#F1F5F9]">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-heading flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#2563EB]" />
              Revenue RoR vs Cadastral Area Cross-Verification
            </h2>
            <p className="text-xs text-[#64748B]">
              Direct comparison between Pattadar Passbook / Khasra records and Digitized Cadastral Village Maps
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] self-start sm:self-auto">
            Tahsildar Verification Portal
          </span>
        </div>

        <div className="space-y-4">
          {comparisonRecords.map((item, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#BFDBFE] hover:bg-white transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-md bg-[#2563EB] text-white font-mono font-bold text-xs">
                    Survey No: {item.surveyNo}
                  </span>
                  <span className="text-xs font-semibold text-[#0F172A]">
                    Khata: {item.khataNo}
                  </span>
                  <span className="text-xs text-[#64748B]">
                    • Owner: <strong>{item.ownerRevenue}</strong>
                  </span>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold self-start sm:self-auto ${
                  item.status === 'Ready for Approval' 
                    ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]' 
                    : 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
                }`}>
                  {item.status}
                </span>
              </div>

              {/* Area Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-white border border-[#E2E8F0] text-xs">
                <div>
                  <span className="text-[#64748B] block text-[11px]">Revenue RoR Area</span>
                  <span className="text-sm font-bold text-[#0F172A] font-mono">{item.revenueArea}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Cadastral Map Area</span>
                  <span className="text-sm font-bold text-[#0F172A] font-mono">{item.cadastralArea}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Variance / Deviation</span>
                  <span className={`text-sm font-bold font-mono ${item.diff.includes('0 m²') ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {item.diff}
                  </span>
                </div>
              </div>

              {/* Action Buttons: [Compare], [Verify], [Approve], [Send to GIS] */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <span className="text-xs text-[#64748B]">
                  <strong>Protocol:</strong> {item.actionNeeded}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    id={`btn-compare-${item.surveyNo}`}
                    type="button"
                    onClick={() => onNavigate('cadastral-comparison')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F1F5F9] cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Compare</span>
                  </button>

                  <button
                    id={`btn-verify-${item.surveyNo}`}
                    type="button"
                    onClick={() => onNavigate('property-verification')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F1F5F9] cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Verify</span>
                  </button>

                  <button
                    id={`btn-send-gis-${item.surveyNo}`}
                    type="button"
                    onClick={() => alert(`Survey ${item.surveyNo} geometry request forwarded to GIS & Cartography Wing.`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-xs font-semibold hover:bg-[#DBEAFE] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to GIS</span>
                  </button>

                  <button
                    id={`btn-approve-${item.surveyNo}`}
                    type="button"
                    onClick={() => alert(`Survey ${item.surveyNo} official settlement record approved by Revenue Authority.`)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-semibold shadow-2xs cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
