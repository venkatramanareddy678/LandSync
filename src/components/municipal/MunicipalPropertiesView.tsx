import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Zap, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  MapPin, 
  Layers,
  Filter
} from 'lucide-react';
import { UserProfile, NavigationTab } from '../../types/landsync';

interface MunicipalPropertiesViewProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
}

export const MunicipalPropertiesView: React.FC<MunicipalPropertiesViewProps> = ({
  user,
  onNavigate
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'properties' | 'buildings' | 'utilities'>('properties');
  const [searchTerm, setSearchTerm] = useState('');

  const properties = [
    { ptin: 'PTIN-84291', doorNo: '8-2-293/84', owner: 'S. R. Venkat', plinthArea: '210 m²', floors: 'G+2', taxAnnual: '₹18,400', status: 'Assessed', zone: 'Banjara Hills' },
    { ptin: 'PTIN-84292', doorNo: '8-2-293/85', owner: 'Lakshmi Devi', plinthArea: '320 m²', floors: 'G+3', taxAnnual: '₹34,200', status: 'Assessed', zone: 'Banjara Hills' },
    { ptin: 'PTIN-84305', doorNo: '10-3-14/A', owner: 'K. R. Rao Commercial Complex', plinthArea: '850 m²', floors: 'G+4', taxAnnual: '₹1,92,000', status: 'Re-assessment Flagged', zone: 'Khairatabad' },
  ];

  const buildings = [
    { id: 'BLD-0042', address: 'Plot 12, Road 10', footprintArea: '142 m²', height: '11.5m', usage: 'Residential', droneVerified: true },
    { id: 'BLD-0043', address: 'Plot 14, Road 10', footprintArea: '198 m²', height: '14.8m', usage: 'Commercial Office', droneVerified: true },
    { id: 'BLD-0089', address: 'Plot 22, Road 14', footprintArea: '310 m²', height: '18.2m', usage: 'Mixed Retail', droneVerified: false },
  ];

  const utilities = [
    { network: 'Drinking Water Trunk Line', agency: 'HMWSSB', coverage: '98.2%', status: 'Connected', pipeDia: '300mm DI' },
    { network: 'Underground Sewerage System', agency: 'HMWSSB', coverage: '94.5%', status: 'Connected', pipeDia: '450mm RCC' },
    { network: 'Stormwater Micro-Drainage', agency: 'GHMC Engineering', coverage: '91.0%', status: 'Connected', pipeDia: 'Box Drain' },
    { network: 'High-Tension Power Corridor', agency: 'TSSPDCL', coverage: '100%', status: 'Connected', pipeDia: '11kV Feeder' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-heading">
              Municipal Property & Urban Asset Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              ULB Administration
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Jurisdiction: <strong className="text-[#0F172A]">{user.municipality || 'GHMC Circle 5 (Khairatabad)'}</strong>
          </p>
        </div>

        <button
          onClick={() => onNavigate('map')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Building2 className="w-4 h-4" />
          <span>Launch Municipal GIS Map</span>
        </button>
      </div>

      {/* Sub Tabs: Properties, Buildings, Utilities */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
        <button
          onClick={() => setActiveSubTab('properties')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'properties'
              ? 'bg-[#2563EB] text-white shadow-2xs'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
          }`}
        >
          Municipal Properties (PTIN)
        </button>
        <button
          onClick={() => setActiveSubTab('buildings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'buildings'
              ? 'bg-[#2563EB] text-white shadow-2xs'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
          }`}
        >
          Building Footprints
        </button>
        <button
          onClick={() => setActiveSubTab('utilities')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'utilities'
              ? 'bg-[#2563EB] text-white shadow-2xs'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
          }`}
        >
          Underground & Surface Utilities
        </button>
      </div>

      {/* Content based on sub-tab */}
      {activeSubTab === 'properties' && (
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
                  <th className="py-3 px-4 font-semibold">PTIN (Assessment No)</th>
                  <th className="py-3 px-4 font-semibold">Door Number</th>
                  <th className="py-3 px-4 font-semibold">Assessed Owner</th>
                  <th className="py-3 px-4 font-semibold">Plinth Area</th>
                  <th className="py-3 px-4 font-semibold">Floors</th>
                  <th className="py-3 px-4 font-semibold">Annual Tax</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {properties.map((p) => (
                  <tr key={p.ptin} className="hover:bg-[#F8FAFC]">
                    <td className="py-3 px-4 font-mono font-bold text-[#2563EB]">{p.ptin}</td>
                    <td className="py-3 px-4 font-medium text-[#0F172A]">{p.doorNo}</td>
                    <td className="py-3 px-4 text-[#0F172A]">{p.owner}</td>
                    <td className="py-3 px-4 font-mono">{p.plinthArea}</td>
                    <td className="py-3 px-4">{p.floors}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#16A34A]">{p.taxAnnual}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        p.status === 'Assessed' 
                          ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]'
                          : 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => onNavigate('map')}
                        className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] text-[#2563EB] font-semibold hover:bg-[#DBEAFE] cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'buildings' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {buildings.map((b) => (
            <div key={b.id} className="p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#2563EB]">{b.id}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#16A34A]">
                  AI Vectorized
                </span>
              </div>
              <div className="font-semibold text-[#0F172A]">{b.address}</div>
              <div className="text-[#64748B]">Footprint: <strong>{b.footprintArea}</strong> • Height: {b.height}</div>
              <div className="text-[#64748B]">Classification: <strong className="text-[#0F172A]">{b.usage}</strong></div>
              <button 
                onClick={() => onNavigate('map')}
                className="w-full mt-2 py-1.5 rounded-lg bg-[#EFF6FF] text-[#2563EB] font-semibold hover:bg-[#DBEAFE] text-center"
              >
                Highlight on GIS Map
              </button>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === 'utilities' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {utilities.map((u, i) => (
            <div key={i} className="p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#2563EB]" />
                  {u.network}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#16A34A]">
                  {u.status}
                </span>
              </div>
              <div className="text-[#64748B]">Custodian Agency: <strong className="text-[#0F172A]">{u.agency}</strong></div>
              <div className="text-[#64748B]">Ward Coverage: <strong className="text-[#16A34A]">{u.coverage}</strong> • Spec: {u.pipeDia}</div>
              <button 
                onClick={() => onNavigate('map')}
                className="w-full mt-2 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] font-semibold hover:bg-[#F8FAFC] text-center"
              >
                Toggle Utility Layer on Map
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
