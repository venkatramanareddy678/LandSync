import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Calendar, 
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { AuditLogEntry } from '../../types/landsync';

interface ReportsViewProps {
  logs: AuditLogEntry[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ logs }) => {
  const [activeSubTab, setActiveSubTab] = useState<'reports' | 'logs'>('reports');
  const [searchLog, setSearchLog] = useState('');

  const filteredLogs = logs.filter((log) => {
    const eventName = log.event || log.action || '';
    const userName = log.user || log.officer || '';
    const detailsText = log.details || '';
    const q = searchLog.toLowerCase();
    return (
      eventName.toLowerCase().includes(q) ||
      userName.toLowerCase().includes(q) ||
      detailsText.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading">
            Official Reports &amp; Audit Logs
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">
            Generate enterprise GIS compliance digests and view immutable tamper-proof logs.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white p-1 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <button
            type="button"
            onClick={() => setActiveSubTab('reports')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'reports' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#64748B]'
            }`}
          >
            Compliance Reports
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'logs' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#64748B]'
            }`}
          >
            Audit Trail
          </button>
        </div>
      </div>

      {activeSubTab === 'reports' ? (
        <div className="space-y-6">
          {/* Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
              <span className="text-xs font-semibold text-[#64748B]">Integrated Parcels</span>
              <div className="text-2xl font-extrabold text-[#0F172A] font-heading mt-1">8,420</div>
              <span className="text-xs text-[#16A34A] font-semibold mt-1 inline-block">91% Conflation Confidence</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
              <span className="text-xs font-semibold text-[#64748B]">Conflicts Addressed</span>
              <div className="text-2xl font-extrabold text-[#0F172A] font-heading mt-1">42 Resolved</div>
              <span className="text-xs text-[#2563EB] font-semibold mt-1 inline-block">183 Pending Senior Review</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
              <span className="text-xs font-semibold text-[#64748B]">Boundary Discrepancy Rate</span>
              <div className="text-2xl font-extrabold text-[#0F172A] font-heading mt-1">2.1%</div>
              <span className="text-xs text-[#16A34A] font-semibold mt-1 inline-block">Within National Norm (&lt;3%)</span>
            </div>
          </div>

          {/* Official Ready-to-Export Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Report 1 */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] font-heading">
                  Cadastral-Municipal Tax Base Reconciliation Report
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Comprehensive audit linking survey khasra numbers to municipal property tax assessments. Highlights unassessed properties for revenue recovery.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[11px] text-[#64748B] font-mono">Updated today • 48 pages</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert('Generating Official Reconciliation PDF...')}
                    className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Exporting CSV Spreadsheet...')}
                    className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9] cursor-pointer"
                    title="Export CSV"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-[#64748B]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Report 2 */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-[#B45309]" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] font-heading">
                  Topology Conflict &amp; Encroachment Register
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Geospatial conflict docket detailing boundary overlap slivers, road corridor right-of-way buffer breaches, and disputed survey marks.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[11px] text-[#64748B] font-mono">183 active records</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert('Generating Conflict Register PDF...')}
                    className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Exporting CSV Spreadsheet...')}
                    className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9] cursor-pointer"
                    title="Export CSV"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-[#64748B]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Report 3 */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] font-heading">
                  Drone Orthomosaic Change Detection Digest
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Comparison between historical 2025 satellite and 2026 drone flights. Identifies unauthorized constructions, expansions, and footprint modifications.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[11px] text-[#64748B] font-mono">3 detected anomalies</span>
                <button
                  type="button"
                  onClick={() => alert('Downloading Change Detection Digest...')}
                  className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Report 4 */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#16A34A] flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] font-heading">
                  Field RTK Ground Verification Logs
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Timestamped GPS rover logs, survey officer digital signatures, and geo-tagged site inspection photo attachments.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[11px] text-[#64748B] font-mono">92 field logs</span>
                <button
                  type="button"
                  onClick={() => alert('Downloading Field Verification Dossier...')}
                  className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* AUDIT TRAIL TAB */
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <div className="relative w-72">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                placeholder="Search audit trail logs..."
                className="w-full pl-9 pr-3 py-1.5 text-xs text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>
            <span className="text-xs text-[#64748B] font-mono">
              Immutable System Ledger
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#64748B] uppercase">
                <tr>
                  <th className="py-3 px-5">Timestamp</th>
                  <th className="py-3 px-4">Event</th>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-5">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-5 font-mono text-[#64748B]">
                      {log.timestamp}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#0F172A]">
                      {log.event || log.action}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#2563EB]">
                      {log.user || log.officer}
                    </td>
                    <td className="py-3.5 px-5 text-[#64748B]">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
