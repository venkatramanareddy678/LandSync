import React from 'react';
import { ShieldAlert, ArrowLeft, Lock, KeyRound } from 'lucide-react';
import { UserProfile, ROLE_DASHBOARD_ROUTES, NavigationTab } from '../../types/landsync';

interface AccessRestrictedProps {
  user: UserProfile;
  requiredPermission?: string;
  requiredRole?: string;
  onReturnToDashboard: () => void;
}

export const AccessRestricted: React.FC<AccessRestrictedProps> = ({
  user,
  requiredPermission,
  requiredRole,
  onReturnToDashboard
}) => {
  const userDashboard = ROLE_DASHBOARD_ROUTES[user.role] || '/dashboard';

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] flex items-center justify-center mx-auto mb-5 text-[#DC2626]">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626] mb-3">
          <Lock className="w-3.5 h-3.5" />
          <span>ACCESS RESTRICTED</span>
        </div>

        <h2 className="text-xl font-bold text-[#0F172A] mb-2 font-heading">
          Permission Denied
        </h2>

        <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
          You do not have authorization to access this administrative section or dataset scope under your current government role (<strong className="text-[#0F172A]">{user.role}</strong>).
        </p>

        {(requiredRole || requiredPermission) && (
          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-left text-xs space-y-1 mb-6">
            <div className="text-[#64748B] flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Required Security Clearance:</span>
            </div>
            {requiredRole && (
              <div className="font-mono font-medium text-[#0F172A] pl-5">
                Role: {requiredRole}
              </div>
            )}
            {requiredPermission && (
              <div className="font-mono font-medium text-[#0F172A] pl-5">
                Permission: {requiredPermission}
              </div>
            )}
          </div>
        )}

        <button
          id="btn-return-dashboard"
          type="button"
          onClick={onReturnToDashboard}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to My Authorized Dashboard</span>
        </button>
      </div>
    </div>
  );
};
