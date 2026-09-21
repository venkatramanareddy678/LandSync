import React, { useState } from 'react';
import { 
  Eye, 
  Map as MapIcon, 
  Search, 
  FileText, 
  Download, 
  Lock, 
  ShieldCheck, 
  Layers, 
  Camera, 
  Building,
  CheckCircle2
} from 'lucide-react';
import { UserProfile, NavigationTab } from '../../../types/landsync';

interface DepartmentViewerDashboardProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onOpenChangePhoto?: () => void;
}

export const DepartmentViewerDashboard: React.FC<DepartmentViewerDashboardProps> = ({
  user,
  onNavigate,
  onOpenChangePhoto
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const sampleProperties = [
    { id: 'PROP-00125', surveyNo: '125', municipalId: 'M458', owner: 'S. R. Venkat', area: '252 m²', zone: 'Banjara Hills', status: 'Integrated' },
    { id: 'PROP-00142', surveyNo: '142/1', municipalId: 'M480', owner: 'Lakshmi Devi', area: '480 m²', zone: 'Jubilee Hills', status: 'Integrated' },
    { id: 'PROP-00188', surveyNo: '188/B', municipalId: 'M512', owner: 'Mohd. Qasim', area: '310 m²', zone: 'Somajiguda', status: 'Integrated' },
  ];

  const filteredProperties = sampleProperties.filter(p => 
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.surveyNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.municipalId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <div 
            onClick={onOpenChangePhoto}
            className="relative shrink-0 cursor-pointer group"
            title="Click to update photo"
          >
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"}
              alt={user.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-[#2563EB] shadow-xs group-hover:ring-3 group-hover:ring-[#DBEAFE] transition-all"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-heading">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]">
                READ-ONLY VIEWER
              </span>
            </div>
            <p className="text-sm text-[#64748B] mt-0.5">
              {user.department} • <span className="text-[#0F172A] font-medium">{user.district} ({user.municipality})</span>
            </p>
          </div>
        </div>

        {/* Permitted Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-viewer-open-map"
            type="button"
            onClick={() => onNavigate('map')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer"
          >
            <MapIcon className="w-4 h-4 text-[#2563EB]" />
            <span>View GIS Map</span>
          </button>

          <button
            id="btn-viewer-export-report"
            type="button"
            onClick={() => onNavigate('reports')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Permitted Report</span>
          </button>
        </div>
      </div>

      {/* Strict Read-Only Notice as demanded in requirements */}
      <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between text-xs text-[#475569]">
        <div className="flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-[#64748B]" />
          <span>
            <strong>Read-Only Access Tier:</strong> You are authorized to search parcels, inspect spatial maps, and export certified summary reports. Editing, dataset uploads, conflict resolutions, and API configurations are disabled.
          </span>
        </div>
        <span className="font-semibold text-[11px] bg-white px-2 py-0.5 rounded border border-[#CBD5E1]">
          Audit Logged
        </span>
      </div>

      {/* Search & Lookup Bar */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-[#0F172A] font-heading flex items-center gap-2">
          <Search className="w-4 h-4 text-[#2563EB]" />
          Search Unified Land Records
        </h2>

        <div className="relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
          <input
            id="viewer-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Survey Number (e.g. 125), Property ID (PROP-00125), Municipal Door No, or Owner Name..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#CBD5E1] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[#64748B]">
                <th className="pb-2 font-semibold">Property ID</th>
                <th className="pb-2 font-semibold">Survey No</th>
                <th className="pb-2 font-semibold">Municipal ID</th>
                <th className="pb-2 font-semibold">Owner (RoR)</th>
                <th className="pb-2 font-semibold">Area</th>
                <th className="pb-2 font-semibold">Zone</th>
                <th className="pb-2 font-semibold">Status</th>
                <th className="pb-2 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredProperties.map((p) => (
                <tr key={p.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-3 font-mono font-bold text-[#2563EB]">{p.id}</td>
                  <td className="py-3 font-medium text-[#0F172A]">{p.surveyNo}</td>
                  <td className="py-3 text-[#64748B]">{p.municipalId}</td>
                  <td className="py-3 text-[#0F172A]">{p.owner}</td>
                  <td className="py-3 font-mono text-[#0F172A]">{p.area}</td>
                  <td className="py-3 text-[#64748B]">{p.zone}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]">
                      <CheckCircle2 className="w-3 h-3" /> {p.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onNavigate('map')}
                      className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] text-[#2563EB] font-semibold hover:bg-[#DBEAFE] cursor-pointer"
                    >
                      View on Map
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
