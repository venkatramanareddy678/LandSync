import React, { useState, useRef } from 'react';
import { 
  Settings as SettingsIcon, 
  Sliders, 
  Database, 
  ShieldCheck, 
  Key, 
  Save, 
  CheckCircle2, 
  User, 
  Building,
  RefreshCw,
  ExternalLink,
  Camera,
  Upload,
  Sparkles
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types/landsync';

interface SettingsViewProps {
  user: UserProfile;
  onOpenChangePhoto?: () => void;
  onUpdateAvatar?: (newAvatarUrl: string) => void;
  onUpdateUser?: (updatedUser: UserProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ 
  user,
  onOpenChangePhoto,
  onUpdateAvatar,
  onUpdateUser,
}) => {
  const [defaultCrs, setDefaultCrs] = useState('EPSG:32644');
  const [confidenceThreshold, setConfidenceThreshold] = useState(90);
  const [snapTolerance, setSnapTolerance] = useState(0.5);
  const [autoReconcile, setAutoReconcile] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Editable user fields
  const [officerName, setOfficerName] = useState(user.name);
  const [officerEmail, setOfficerEmail] = useState(user.email);
  const [officerRole, setOfficerRole] = useState<UserRole>(user.role);
  const [officerDept, setOfficerDept] = useState(user.department);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDirectFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (onUpdateAvatar) {
        onUpdateAvatar(result);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        name: officerName,
        email: officerEmail,
        role: officerRole,
        department: officerDept,
      });
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading">
            System Settings &amp; Integrations
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">
            Configure enterprise GIS conflation rules, CRS standards, and governmental agency APIs.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#DCFCE7] text-[#16A34A] text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Conflation Rules Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E2E8F0]">
            <Sliders className="w-5 h-5 text-[#2563EB]" />
            <h2 className="text-base font-bold text-[#0F172A] font-heading">
              Spatial Conflation &amp; Topology Engine Rules
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">
                Default Master Coordinate Reference System (CRS)
              </label>
              <select
                value={defaultCrs}
                onChange={(e) => setDefaultCrs(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] font-mono focus:outline-hidden focus:border-[#2563EB]"
              >
                <option value="EPSG:32644">EPSG:32644 — WGS 84 / UTM zone 44N</option>
                <option value="EPSG:4326">EPSG:4326 — WGS 84 Geographic 2D</option>
                <option value="EPSG:3857">EPSG:3857 — WGS 84 / Pseudo-Mercator</option>
              </select>
              <span className="text-[11px] text-[#64748B] mt-1 block">
                All uploaded datasets are automatically reprojected to this projection.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">
                Spatial Snap Buffer Tolerance (Meters)
              </label>
              <input
                type="number"
                step="0.05"
                value={snapTolerance}
                onChange={(e) => setSnapTolerance(parseFloat(e.target.value))}
                className="w-full px-3.5 py-2.5 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] font-mono focus:outline-hidden focus:border-[#2563EB]"
              />
              <span className="text-[11px] text-[#64748B] mt-1 block">
                Vertex proximity snapping threshold to eliminate false sliver gaps.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">
                Minimum AI Match Acceptance Threshold: {confidenceThreshold}%
              </label>
              <input
                type="range"
                min="70"
                max="98"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                className="w-full accent-[#2563EB] cursor-pointer mt-2"
              />
              <span className="text-[11px] text-[#64748B] mt-1 block">
                Matches below this threshold are routed to human review.
              </span>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoReconcile}
                  onChange={(e) => setAutoReconcile(e.target.checked)}
                  className="rounded text-[#2563EB] focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-[#0F172A] block">
                    Auto-Approve High-Confidence Matches (&gt;95%)
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    Streamlines batch processing for identical geometry and attributes.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Agency API Integrations */}
        <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E2E8F0]">
            <Database className="w-5 h-5 text-[#2563EB]" />
            <h2 className="text-base font-bold text-[#0F172A] font-heading">
              External Government GIS Gateways
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center font-bold text-[#2563EB] text-xs">
                  SOI
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">Survey of India (SOI) WFS / WMS Gateway</div>
                  <div className="text-[11px] text-[#64748B]">National spatial framework &amp; CORS network stream</div>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold text-[#16A34A] bg-[#DCFCE7] rounded-full">
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center font-bold text-[#2563EB] text-xs">
                  REV
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">State Revenue Bhoomi / Kaveri Integration</div>
                  <div className="text-[11px] text-[#64748B]">Title deeds, encumbrance certificates &amp; mutation records</div>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold text-[#16A34A] bg-[#DCFCE7] rounded-full">
                Active Sync
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center font-bold text-[#2563EB] text-xs">
                  ULB
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">Municipal Corporation Property Tax API</div>
                  <div className="text-[11px] text-[#64748B]">GIS property tax assessments &amp; door numbering master</div>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold text-[#16A34A] bg-[#DCFCE7] rounded-full">
                Synchronized
              </span>
            </div>
          </div>
        </div>

        {/* User Organization & Role with Photo Change */}
        <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <User className="w-5 h-5 text-[#2563EB]" />
              <h2 className="text-base font-bold text-[#0F172A] font-heading">
                Operator Credentials &amp; Profile Photo
              </h2>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] rounded-full border border-[#DBEAFE]">
              Authenticated Session
            </span>
          </div>

          {/* Profile Photo Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0 group">
                <img
                  src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#2563EB] shadow-xs"
                />
                <button
                  type="button"
                  onClick={onOpenChangePhoto}
                  className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                  title="Change photo"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#16A34A] ring-2 ring-white"></span>
              </div>

              <div>
                <div className="text-sm font-bold text-[#0F172A]">
                  {user.name}
                </div>
                <div className="text-xs text-[#64748B]">
                  {user.role} • {user.organization}
                </div>
                <div className="text-[11px] text-[#2563EB] font-mono mt-0.5">
                  ID: GOV-GIS-{user.mobile ? user.mobile.slice(-4) : '9848'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleDirectFileUpload}
              />
              <button
                id="btn-settings-upload-photo"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#0F172A] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Upload className="w-3.5 h-3.5 text-[#64748B]" />
                <span>Upload From PC</span>
              </button>

              <button
                id="btn-settings-change-photo"
                type="button"
                onClick={onOpenChangePhoto}
                className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Change Photo</span>
              </button>
            </div>
          </div>

          {/* Editable credentials form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">
                Authorized Officer Name
              </label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">
                Official Government Email
              </label>
              <input
                type="email"
                value={officerEmail}
                onChange={(e) => setOfficerEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">
                Designation / Role
              </label>
              <select
                value={officerRole}
                onChange={(e) => setOfficerRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2.5 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-hidden focus:border-[#2563EB]"
              >
                <option value="SUPER_ADMIN">Super Administrator</option>
                <option value="DISTRICT_ADMIN">District Administrator</option>
                <option value="GIS_OFFICER">GIS Officer</option>
                <option value="REVENUE_OFFICER">Revenue Officer</option>
                <option value="MUNICIPAL_OFFICER">Municipal Officer</option>
                <option value="SURVEY_OFFICER">Survey Officer</option>
                <option value="FIELD_OFFICER">Field Officer</option>
                <option value="DEPARTMENT_VIEWER">Department Viewer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">
                Department Jurisdiction
              </label>
              <input
                type="text"
                value={officerDept}
                onChange={(e) => setOfficerDept(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            id="btn-save-settings"
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
};
