import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Database, 
  AlertTriangle, 
  Menu, 
  X, 
  Cpu, 
  SplitSquareVertical, 
  Clock, 
  CheckSquare, 
  FileText, 
  Webhook, 
  History, 
  Settings, 
  LogOut,
  Camera 
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../../types/landsync';
import { getRoleNavItems } from './Sidebar';

interface MobileNavProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  user: UserProfile;
  onLogout: () => void;
  conflictsCount?: number;
  onChangePhoto?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  user,
  onLogout,
  conflictsCount = 183,
  onChangePhoto,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const roleItems = getRoleNavItems(user.role, conflictsCount);
  const mainTabs = roleItems.slice(0, 4);
  const drawerLinks = [
    ...roleItems.slice(4),
    { id: 'settings' as NavigationTab, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Bottom Sticky Bar for Mobile (lg:hidden) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#FFFFFF] border-t border-[#E2E8F0] px-2 flex items-center justify-around z-40 shadow-[0_-4px_20px_rgba(15,23,42,0.06)]">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = 
            currentTab === tab.id || 
            (tab.id === 'overview' && currentTab === 'dashboard') ||
            (tab.id === 'dashboard' && currentTab === 'overview');
          return (
            <button
              key={tab.id}
              id={`mobile-tab-${tab.id}`}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[60px] h-12 rounded-xl text-[11px] font-semibold transition-all relative ${
                isSelected ? 'text-[#2563EB]' : 'text-[#64748B]'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isSelected ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="absolute top-1 right-3 px-1 py-0.2 rounded-full text-[9px] font-bold bg-[#DC2626] text-white">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* More Drawer button */}
        <button
          id="mobile-tab-more"
          type="button"
          onClick={() => setDrawerOpen(true)}
          className={`flex flex-col items-center justify-center min-w-[60px] h-12 rounded-xl text-[11px] font-semibold ${
            drawerOpen ? 'text-[#2563EB]' : 'text-[#64748B]'
          }`}
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span>More</span>
        </button>
      </nav>

      {/* Drawer Modal for Additional Tools */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto shadow-2xl border-t border-[#E2E8F0] animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white">
                  <Menu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] font-heading">
                    LandSync Modules
                  </h3>
                  <p className="text-xs text-[#64748B]">All GIS services &amp; tools</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-[#64748B] hover:text-[#0F172A] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3 space-y-1">
              {drawerLinks.map((item) => {
                const Icon = item.icon;
                const isSelected = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-drawer-${item.id}`}
                    type="button"
                    onClick={() => {
                      onSelectTab(item.id);
                      setDrawerOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                        : 'text-[#0F172A] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Profile & Logout on drawer */}
            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  if (onChangePhoto) onChangePhoto();
                }}
                className="flex items-center gap-2.5 text-left p-1 rounded-xl hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#DBEAFE] group-hover:ring-2 group-hover:ring-[#2563EB]/40"
                  />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#2563EB] rounded-full flex items-center justify-center text-white">
                    <Camera className="w-2 h-2" />
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#2563EB]">{user.name}</div>
                  <div className="text-[10px] text-[#2563EB] font-medium">Change Photo</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onLogout();
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#DC2626] bg-[#FEE2E2]/50 hover:bg-[#FEE2E2] rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
