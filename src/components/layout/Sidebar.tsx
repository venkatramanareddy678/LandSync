import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Map, 
  Cpu, 
  SplitSquareVertical, 
  AlertTriangle, 
  Clock, 
  CheckSquare, 
  FileText, 
  Webhook, 
  History, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  Camera,
  Users,
  Landmark,
  Building2,
  Satellite,
  Compass,
  Home,
  Zap,
  UserCheck,
  Eye
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../../types/landsync';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  user: UserProfile;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  conflictsCount?: number;
  onChangePhoto?: () => void;
}

// STRICT ROLE-BASED NAVIGATION ITEMS
export const getRoleNavItems = (
  role: string,
  conflictsCount: number = 183
): { id: NavigationTab; label: string; icon: React.FC<{ className?: string }>; badge?: string | number }[] => {
  switch (role) {
    case 'SUPER_ADMIN':
      return [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'users', label: 'Users & Authorities', icon: Users },
        { id: 'datasets', label: 'State Datasets', icon: Database, badge: '12' },
        { id: 'map', label: 'State GIS Map', icon: Map },
        { id: 'api-integrations', label: 'API Integrations', icon: Webhook },
        { id: 'reports', label: 'Audit Reports', icon: FileText },
        { id: 'audit-logs', label: 'System Audit Logs', icon: History },
      ];

    case 'DISTRICT_ADMIN':
      return [
        { id: 'overview', label: 'Collectorate Dashboard', icon: LayoutDashboard },
        { id: 'datasets', label: 'District Datasets', icon: Database, badge: '12' },
        { id: 'map', label: 'District GIS Map', icon: Map },
        { id: 'conflicts', label: 'Pending Conflicts', icon: AlertTriangle, badge: conflictsCount },
        { id: 'ground-verification', label: 'Ground Verification', icon: CheckSquare },
        { id: 'reports', label: 'District Reports', icon: FileText },
      ];

    case 'GIS_OFFICER':
      return [
        { id: 'overview', label: 'GIS Dashboard', icon: LayoutDashboard },
        { id: 'datasets', label: 'Spatial Datasets', icon: Database, badge: '12' },
        { id: 'map', label: 'Interactive GIS Map', icon: Map, badge: 'Hero' },
        { id: 'ai-integration', label: 'AI Conflation', icon: Cpu },
        { id: 'spatial-matching', label: 'Spatial Matching', icon: SplitSquareVertical },
        { id: 'conflicts', label: 'Topology Conflicts', icon: AlertTriangle, badge: conflictsCount },
        { id: 'change-detection', label: 'Change Detection', icon: Clock },
        { id: 'reports', label: 'GIS Reports', icon: FileText },
      ];

    case 'REVENUE_OFFICER':
      return [
        { id: 'overview', label: 'Revenue Dashboard', icon: LayoutDashboard },
        { id: 'revenue-records', label: 'Revenue Records (RoR)', icon: Landmark },
        { id: 'cadastral-comparison', label: 'Cadastral Records', icon: Database },
        { id: 'property-verification', label: 'Property Verification', icon: UserCheck },
        { id: 'conflicts', label: 'Area Mismatches', icon: AlertTriangle, badge: 31 },
        { id: 'reports', label: 'Settlement Reports', icon: FileText },
      ];

    case 'MUNICIPAL_OFFICER':
      return [
        { id: 'overview', label: 'Municipal Dashboard', icon: LayoutDashboard },
        { id: 'municipal-properties', label: 'Municipal Properties', icon: Home },
        { id: 'buildings', label: 'Building Footprints', icon: Building2 },
        { id: 'utilities', label: 'Utility Networks', icon: Zap },
        { id: 'change-detection', label: 'Urban Change / Drone', icon: Clock },
        { id: 'conflicts', label: 'Property Tax Conflicts', icon: AlertTriangle, badge: 46 },
        { id: 'reports', label: 'Town Planning Reports', icon: FileText },
      ];

    case 'SURVEY_OFFICER':
      return [
        { id: 'overview', label: 'Survey Dashboard', icon: LayoutDashboard },
        { id: 'survey-tasks', label: 'Survey Rover Tasks', icon: CheckSquare },
        { id: 'gnss-cors', label: 'GNSS / CORS Network', icon: Satellite },
        { id: 'coordinate-validation', label: 'Coordinate Validation', icon: Compass },
        { id: 'ground-verification', label: 'GCP Triangulation', icon: Layers },
        { id: 'reports', label: 'Geodetic Reports', icon: FileText },
      ];

    case 'FIELD_OFFICER':
      return [
        { id: 'overview', label: 'Field Dashboard', icon: LayoutDashboard },
        { id: 'ground-verification', label: 'Field Verification', icon: CheckSquare },
        { id: 'map', label: 'Navigation Map', icon: Map },
      ];

    case 'DEPARTMENT_VIEWER':
      return [
        { id: 'overview', label: 'Read-Only Dashboard', icon: LayoutDashboard },
        { id: 'map', label: 'GIS Map Viewer', icon: Map },
        { id: 'property-verification', label: 'Search Properties', icon: Eye },
        { id: 'reports', label: 'Permitted Reports', icon: FileText },
      ];

    default:
      return [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'datasets', label: 'Datasets', icon: Database },
        { id: 'map', label: 'GIS Map', icon: Map },
        { id: 'reports', label: 'Reports', icon: FileText },
      ];
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  user,
  onLogout,
  isCollapsed,
  onToggleCollapse,
  conflictsCount = 183,
  onChangePhoto,
}) => {
  const primaryNavItems = getRoleNavItems(user.role, conflictsCount);

  const secondaryNavItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`bg-[#FFFFFF] border-r border-[#E2E8F0] flex flex-col justify-between transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Section: Logo & Toggle */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E2E8F0]">
          {!isCollapsed ? (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-xs">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div className="truncate">
                <div className="text-base font-bold tracking-tight text-[#0F172A] font-heading flex items-center gap-1.5">
                  Land<span className="text-[#2563EB]">Sync</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB] rounded-md border border-[#DBEAFE]">GIS</span>
                </div>
                <div className="text-[10px] text-[#64748B] truncate">
                  Intelligent Geospatial Integration
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-xs">
                <Layers className="w-5 h-5 text-white" />
              </div>
            </div>
          )}

          <button
            id="btn-sidebar-collapse-toggle"
            type="button"
            onClick={onToggleCollapse}
            className={`p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors cursor-pointer ${
              isCollapsed ? 'mx-auto mt-2 hidden lg:block' : ''
            }`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation links */}
        <div className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-175px)]">
          <div className={`px-2 pb-1.5 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? 'GIS' : 'Core GIS Tools'}
          </div>

          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isSelected = 
              currentTab === item.id || 
              (item.id === 'overview' && currentTab === 'dashboard') ||
              (item.id === 'dashboard' && currentTab === 'overview');
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                type="button"
                onClick={() => onSelectTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold shadow-2xs'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isSelected ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
                
                {!isCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.badge === 'Hero'
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : typeof item.badge === 'number'
                      ? 'bg-[#FEF3C7] text-[#B45309]'
                      : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="my-3 border-t border-[#E2E8F0]"></div>

          <div className={`px-2 pb-1 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? 'SYS' : 'System & Services'}
          </div>

          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isSelected = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                type="button"
                onClick={() => onSelectTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold shadow-2xs'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isSelected ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
                
                {!isCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile Card */}
      <div className="p-3 border-t border-[#E2E8F0] bg-[#FFFFFF]">
        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors ${
          isCollapsed ? 'justify-center' : ''
        }`}>
          <div 
            onClick={onChangePhoto}
            className="relative shrink-0 cursor-pointer group"
            title="Change profile photo"
          >
            <img 
              src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border border-[#DBEAFE] group-hover:ring-2 group-hover:ring-[#2563EB]/40 transition-all"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#16A34A] ring-2 ring-white"></span>
          </div>

          {!isCollapsed && (
            <div 
              className="flex-1 min-w-0 cursor-pointer"
              onClick={onChangePhoto}
              title="Click to update photo or profile"
            >
              <div className="text-sm font-semibold text-[#0F172A] truncate hover:text-[#2563EB] transition-colors">
                {user.name}
              </div>
              <div className="text-xs text-[#64748B] truncate">
                {user.role}
              </div>
            </div>
          )}

          {!isCollapsed && (
            <div className="flex items-center gap-1">
              <button
                id="btn-sidebar-change-photo"
                type="button"
                onClick={onChangePhoto}
                className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors cursor-pointer"
                title="Change Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
              <button
                id="btn-sidebar-logout"
                type="button"
                onClick={onLogout}
                className="p-1.5 text-[#94A3B8] hover:text-[#DC2626] hover:bg-[#FEE2E2]/60 rounded-lg transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
