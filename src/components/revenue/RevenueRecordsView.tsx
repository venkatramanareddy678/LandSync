import React, { useState } from 'react';
import { 
  Landmark, 
  Scale, 
  Search, 
  Filter, 
  Check, 
  X, 
  Send, 
  Eye, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { UserProfile, NavigationTab } from '../../types/landsync';

interface RevenueRecordsViewProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
}

export const RevenueRecordsView: React.FC<RevenueRecordsViewProps> = ({
  user,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Requires Review' | 'Verified' | 'Pending'>('All');

  const records = [
    {
      khasraNo: '125',
      khataNo: 'KH-842',
      pattadarName: 'S. R. Venkat & Brothers',
      fatherName: 'Late K. Ramana',
      village: 'Banjara Hills',
      landNature: 'Patta Dry Land (Agricultural Converted)',
      rorArea: '252 m²',
      cadastralArea: '250 m²',
      deviation: '+2 m² (0.8%)',
      status: 'Requires Review',
      subDivisionStatus: 'Single Unit',
      lastTaxPaid: 'FY 2025-26'
    },
    {
      khasraNo: '142/1',
      khataNo: 'KH-1020',
      pattadarName: 'Lakshmi Devi',
      fatherName: 'V. Narayana',
      village: 'Jubilee Hills',
      landNature: 'Patta Homestead',
      rorArea: '480 m²',
      cadastralArea: '475 m²',
      deviation: '+5 m² (1.05%)',
      status: 'Requires Review',
      subDivisionStatus: 'Sub-divided in 2024',
      lastTaxPaid: 'FY 2025-26'
    },
    {
      khasraNo: '188/B',
      khataNo: 'KH-1205',
      pattadarName: 'Mohd. Qasim',
      fatherName: 'Abdul Rehman',
      village: 'Somajiguda',
      landNature: 'Inam Abolition Converted Patta',
      rorArea: '310 m²',
      cadastralArea: '310 m²',
      deviation: '0 m² (Exact)',
      status: 'Verified',
      subDivisionStatus: 'Single Unit',
      lastTaxPaid: 'FY 2025-26'
    },
    {
      khasraNo: '204',
      khataNo: 'KH-1450',
      pattadarName: 'G. Suresh Babu',
      fatherName: 'G. Krishna Rao',
      village: 'Khairatabad',
      landNature: 'Patta Commercial',
      rorArea: '620 m²',
      cadastralArea: '606 m²',
      deviation: '+14 m² (2.25%)',
      status: 'Requires Review',
      subDivisionStatus: 'Survey in Progress',
      lastTaxPaid: 'FY 2025-26'
    },
  ];

  const filteredRecords = records.filter(r => {
    const matchesSearch = 
      r.khasraNo.includes(searchTerm) ||
      r.pattadarName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.khataNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || r.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-heading">
              Revenue RoR & Cadastral Verification
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              Tahsildar Wing
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Cross-referencing Record of Rights (RoR), Khasra Passbooks, and Digitized Cadastral Maps
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('conflicts')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-[#D97706]" />
            <span>View Mismatches (31)</span>
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Launch Cadastral Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            id="search-revenue-records"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Survey / Khasra No (e.g. 125), Khata No, or Pattadar Name..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#CBD5E1] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#64748B] font-medium">Status:</span>
          {(['All', 'Requires Review', 'Verified'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterStatus === status 
                  ? 'bg-[#2563EB] text-white' 
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
                <th className="py-3 px-4 font-semibold">Survey / Khasra</th>
                <th className="py-3 px-4 font-semibold">Khata No</th>
                <th className="py-3 px-4 font-semibold">Pattadar / Owner</th>
                <th className="py-3 px-4 font-semibold">Revenue RoR Area</th>
                <th className="py-3 px-4 font-semibold">Cadastral Area</th>
                <th className="py-3 px-4 font-semibold">Variance</th>
                <th className="py-3 px-4 font-semibold">Verification Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredRecords.map((rec) => (
                <tr key={rec.khasraNo} className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#2563EB]">
                    Survey {rec.khasraNo}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#64748B]">{rec.khataNo}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#0F172A]">{rec.pattadarName}</div>
                    <div className="text-[11px] text-[#64748B]">S/O {rec.fatherName}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A]">{rec.rorArea}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A]">{rec.cadastralArea}</td>
                  <td className="py-3.5 px-4">
                    <span className={`font-mono font-bold ${rec.deviation.includes('0 m²') ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                      {rec.deviation}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      rec.status === 'Verified'
                        ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]'
                        : 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
                    }`}>
                      {rec.status === 'Verified' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => alert(`Comparing Survey ${rec.khasraNo} against Village Tippon map.`)}
                        className="p-1.5 rounded-lg text-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
                        title="Compare Records"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`Survey ${rec.khasraNo} sent to GIS Cartographer for polygon adjustment.`)}
                        className="p-1.5 rounded-lg text-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
                        title="Send to GIS"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`Survey ${rec.khasraNo} approved by Tahsildar.`)}
                        className="p-1.5 rounded-lg text-[#16A34A] hover:bg-[#F0FDF4] transition-colors"
                        title="Approve Settlement"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
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
