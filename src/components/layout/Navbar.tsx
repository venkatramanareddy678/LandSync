import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  UploadCloud, 
  Cpu, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  X,
  Camera
} from 'lucide-react';
import { NavigationTab, UserProfile, ROLE_LABELS } from '../../types/landsync';

interface NavbarProps {
  currentTab: NavigationTab;
  user: UserProfile;
  onOpenSearch?: () => void;
  onOpenUploadModal: () => void;
  onOpenIntegrationModal?: () => void;
  onOpenHelpModal?: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  onGlobalSearch?: (query: string) => void;
  conflictsCount?: number;
  onChangePhoto?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  user,
  onOpenSearch,
  onOpenUploadModal,
  onOpenIntegrationModal = () => {},
  onOpenHelpModal = () => {},
  onToggleSidebar,
  isSidebarCollapsed,
  onGlobalSearch,
  conflictsCount = 0,
  onChangePhoto,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Tab Title mapper
  const tabTitles: Partial<Record<NavigationTab, { title: string; crumb: string }>> = {
    overview: { title: 'Dashboard', crumb: 'Home / Dashboard' },
    dashboard: { title: 'Dashboard', crumb: 'Home / Dashboard' },
    datasets: { title: 'Land Datasets', crumb: 'Home / Datasets' },
    map: { title: 'GIS Spatial Map', crumb: 'Home / GIS Map' },
    'ai-integration': { title: 'AI Integration Engine', crumb: 'Home / AI Pipeline' },
    'spatial-matching': { title: 'Spatial Conflation & Matching', crumb: 'Home / Spatial Matching' },
    conflicts: { title: 'Cadastral & Municipal Conflicts', crumb: 'Home / Conflicts' },
    'change-detection': { title: 'Satellite & Drone Change Detection', crumb: 'Home / Change Detection' },
    'ground-verification': { title: 'Mobile Ground Verification', crumb: 'Home / Ground Verification' },
    reports: { title: 'GIS Spatial Reports & Exports', crumb: 'Home / Reports' },
    'api-integrations': { title: 'Connected API Integrations', crumb: 'System / API Integrations' },
    'audit-logs': { title: 'System Security & Audit Trail', crumb: 'System / Audit Logs' },
    settings: { title: 'Platform Settings & Thresholds', crumb: 'System / Settings' },
    // Super Admin & District Admin Views
    users: { title: 'Authority & Officer Management', crumb: 'Administration / Users' },
    departments: { title: 'Department Access Controls', crumb: 'Administration / Departments' },
    // Revenue Views
    'revenue-records': { title: 'Revenue & Cadastral Passbooks', crumb: 'Revenue / Passbooks' },
    'cadastral-comparison': { title: 'Cadastral Parcel Comparison', crumb: 'Revenue / Comparison' },
    'property-verification': { title: 'Title & Boundary Verification', crumb: 'Revenue / Verification' },
    // Municipal Views
    'municipal-properties': { title: 'Municipal Property Master (PTIN)', crumb: 'Municipal / Properties' },
    buildings: { title: 'Building Footprints & Floors', crumb: 'Municipal / Buildings' },
    utilities: { title: 'Water & Power Utility Overlays', crumb: 'Municipal / Utilities' },
    // Survey Views
    'survey-tasks': { title: 'Survey & GNSS Field Tasks', crumb: 'Survey / Tasks' },
    'gnss-cors': { title: 'CORS Station Geodetic Baselines', crumb: 'Survey / CORS Network' },
    'boundary-validation': { title: 'High-Precision Boundary Check', crumb: 'Survey / Boundary Check' },
    'coordinate-validation': { title: 'Coordinate Transformation Validation', crumb: 'Survey / Coordinates' },
    // Field Views
    'field-tasks': { title: 'Assigned Ground Ground Truth Tasks', crumb: 'Field / Assigned Tasks' },
    'field-map': { title: 'Field Navigation & Boundary Map', crumb: 'Field / Map' },
    'field-completed': { title: 'Verified Ground Truth Submissions', crumb: 'Field / Completed' },
    // Viewer Views
    'viewer-map': { title: 'State Certified Geospatial Map', crumb: 'Public / Certified Map' },
    'viewer-properties': { title: 'Certified Land Parcel Inquiries', crumb: 'Inquiry / Properties' },
    'viewer-reports': { title: 'Certified Spatial Clearance Reports', crumb: 'Reports / Clearances' },
  };

  const currentMeta = tabTitles[currentTab] || { title: 'Dashboard', crumb: 'Home / Dashboard' };

  const notifications = [
    {
      id: 1,
      title: 'Municipal GIS Sync Complete',
      desc: '3,410 properties synchronized from ULB-M4 portal.',
      time: '2 mins ago',
      type: 'success',
    },
    {
      id: 2,
      title: '18 Topology Conflicts Detected',
      desc: 'Survey 126 and 131 have boundary overlaps > 5%.',
      time: '32 mins ago',
      type: 'warning',
    },
    {
      id: 3,
      title: 'Drone Orthomosaic 2026 Processed',
      desc: 'CRS re-projected to EPSG:32644 with 98% quality score.',
      time: '2 hours ago',
      type: 'info',
    }
  ];

  return (
    <header className="h-16 bg-[#FFFFFF] border-b border-[#E2E8F0] px-4 sm:px-6 flex items-center justify-between z-20 relative">
      {/* Left: Page Title & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight font-heading">
            {currentMeta.title}
          </h1>
          {currentTab === 'map' && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
              Live 5cm Vector
            </span>
          )}
        </div>
        <div className="text-xs text-[#64748B] font-medium hidden sm:block">
          {currentMeta.crumb}
        </div>
      </div>

      {/* Right: Actions, Search, Notifications, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Upload Button */}
        <button
          id="btn-nav-upload-dataset"
          type="button"
          onClick={onOpenUploadModal}
          className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] text-xs font-semibold border border-[#DBEAFE] transition-all cursor-pointer"
        >
          <UploadCloud className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Upload Dataset</span>
        </button>

        {/* Run Integration Button */}
        <button
          id="btn-nav-run-integration"
          type="button"
          onClick={onOpenIntegrationModal}
          className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
        >
          <Cpu className="w-3.5 h-3.5 text-white" />
          <span>Run AI Integration</span>
        </button>

        {/* Global Search Button */}
        <button
          id="btn-nav-search"
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] text-xs transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-[#64748B]" />
          <span className="hidden sm:inline">Search property or survey...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-[#94A3B8] bg-white border border-[#CBD5E1] rounded">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            id="btn-nav-notifications"
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2563EB] ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_10px_35px_rgba(15,23,42,0.12)] border border-[#E2E8F0] p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#0F172A] font-heading">
                    Notifications
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB] rounded-full">
                    3 New
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-[#94A3B8] hover:text-[#0F172A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-2 divide-y divide-[#F1F5F9] max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div key={item.id} className="py-2.5 px-1 hover:bg-[#F8FAFC] rounded-lg transition-colors">
                    <div className="flex items-start gap-2.5">
                      {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />}
                      {item.type === 'warning' && <AlertCircle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />}
                      {item.type === 'info' && <Cpu className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-[#0F172A]">
                          {item.title}
                        </div>
                        <div className="text-xs text-[#64748B] mt-0.5">
                          {item.desc}
                        </div>
                        <div className="text-[10px] text-[#94A3B8] mt-1 font-mono">
                          {item.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] text-center">
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-[#2563EB] hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help Guide */}
        <button
          id="btn-nav-help"
          type="button"
          onClick={onOpenHelpModal}
          className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-colors cursor-pointer"
          title="GIS User Manual & Help"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* User Badge with Change Photo Action */}
        <button
          id="btn-nav-change-photo"
          type="button"
          onClick={onChangePhoto}
          className="flex items-center gap-2 pl-2.5 py-1 pr-1.5 rounded-xl hover:bg-[#F8FAFC] border-l border-[#E2E8F0] transition-colors cursor-pointer group text-left"
          title="Click to change profile photograph"
        >
          <div className="relative shrink-0">
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-[#DBEAFE] group-hover:ring-2 group-hover:ring-[#2563EB]/40 transition-all"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#16A34A] ring-1.5 ring-white"></span>
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-[#0F172A] leading-tight group-hover:text-[#2563EB] transition-colors">
              {user.name}
            </div>
            <div className="text-[10px] text-[#2563EB] font-bold leading-tight">
              {ROLE_LABELS[user.role] || user.role}
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};
