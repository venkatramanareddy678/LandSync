import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  MapPin, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  UserCheck, 
  ExternalLink,
  ChevronRight,
  SplitSquareVertical,
  X
} from 'lucide-react';
import { ConflictItem, LandParcel } from '../../types/landsync';

interface ConflictsViewProps {
  conflicts: ConflictItem[];
  onViewOnMap: (propertyId: string) => void;
  onCompare: (propertyId: string) => void;
  onResolve: (conflict: ConflictItem) => void;
}

export const ConflictsView: React.FC<ConflictsViewProps> = ({
  conflicts,
  onViewOnMap,
  onCompare,
  onResolve,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Boundary' | 'Area' | 'Attribute' | 'Geometry' | 'Duplicate'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConflictForResolve, setSelectedConflictForResolve] = useState<ConflictItem | null>(null);
  const [resolutionChoice, setResolutionChoice] = useState<'cadastral' | 'municipal' | 'field-dispatch'>('cadastral');
  const [resolveNotes, setResolveNotes] = useState('');

  const filterTabs: ('All' | 'Boundary' | 'Area' | 'Attribute' | 'Geometry' | 'Duplicate')[] = [
    'All',
    'Boundary',
    'Area',
    'Attribute',
    'Geometry',
    'Duplicate',
  ];

  const filteredConflicts = conflicts.filter((c) => {
    const matchesTab = activeFilter === 'All' || c.type === activeFilter;
    const matchesSearch = searchQuery === '' || 
      c.propertyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.surveyNumber.includes(searchQuery) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleConfirmResolution = () => {
    if (selectedConflictForResolve) {
      onResolve(selectedConflictForResolve);
      setSelectedConflictForResolve(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading">
              {conflicts.length} Conflicts
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
              Requires Review
            </span>
          </div>
          <p className="text-sm text-[#64748B] mt-1">
            Resolve geometric deviations, area discrepancies, and attribute title mismatches between agencies.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
          <input
            id="conflict-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PROP-ID or Survey..."
            className="w-full sm:w-64 pl-9 pr-3.5 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] bg-white focus:outline-hidden focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === tab
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-[#FFFFFF] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]'
            }`}
          >
            {tab === 'All' ? 'All Conflicts (183)' : `${tab}`}
          </button>
        ))}
      </div>

      {/* Conflict Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredConflicts.map((conflict) => {
          const isWarning = conflict.severity === 'Warning';
          const isCritical = conflict.severity === 'Critical';

          return (
            <div
              key={conflict.id}
              className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    isCritical 
                      ? 'bg-[#FEE2E2] text-[#DC2626] border border-[#FCA5A5]' 
                      : 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]'
                  }`}>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{conflict.type} mismatch</span>
                  </span>

                  <span className="text-[11px] font-mono text-[#64748B]">
                    {conflict.id}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0F172A] font-heading mb-1.5">
                  {conflict.title}
                </h3>

                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  {conflict.description}
                </p>

                {/* Conflict Values Comparison Box */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-3.5 space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">Property:</span>
                    <span className="font-bold text-[#0F172A] font-mono">{conflict.propertyId}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">Cadastral:</span>
                    <span className="font-bold text-[#2563EB] font-mono">{conflict.cadastralValue}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">Municipal:</span>
                    <span className="font-bold text-[#0284C7] font-mono">{conflict.municipalValue}</span>
                  </div>
                  <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                    <span className="font-bold text-[#64748B]">Difference:</span>
                    <span className="font-extrabold text-[#DC2626] font-mono">{conflict.differenceValue}</span>
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center justify-between text-xs mb-4">
                  <div>
                    <span className="text-[#64748B]">Confidence: </span>
                    <span className="font-bold text-[#0F172A] font-mono">{conflict.confidence}%</span>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Status: </span>
                    <span className="font-semibold text-[#B45309]">{conflict.status}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: View on Map, Compare, Assign, Resolve */}
              <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onViewOnMap(conflict.propertyId)}
                    className="py-2 px-3 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>View on Map</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onCompare(conflict.propertyId)}
                    className="py-2 px-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <SplitSquareVertical className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>Compare</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => alert(`Assigned ${conflict.id} to Field Surveyor for on-site inspection.`)}
                    className="py-2 px-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Assign
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedConflictForResolve(conflict)}
                    className="py-2 px-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolve</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* RESOLUTION MODAL */}
      {selectedConflictForResolve && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] font-heading">
                    Resolve Spatial Dispute
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {selectedConflictForResolve.propertyId} • {selectedConflictForResolve.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedConflictForResolve(null)}
                className="text-[#94A3B8] hover:text-[#0F172A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-2 uppercase tracking-wide">
                  Select Conflation Rule
                </label>
                <div className="space-y-2">
                  <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    resolutionChoice === 'cadastral' 
                      ? 'bg-[#EFF6FF] border-[#2563EB] text-[#0F172A]' 
                      : 'bg-white border-[#E2E8F0] text-[#64748B]'
                  }`}>
                    <input
                      type="radio"
                      name="resolve-choice"
                      checked={resolutionChoice === 'cadastral'}
                      onChange={() => setResolutionChoice('cadastral')}
                      className="mt-0.5 text-[#2563EB]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">
                        Accept Cadastral Survey Boundary ({selectedConflictForResolve.cadastralValue})
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        Applies official state cadastral survey demarcations and updates municipal tax index.
                      </div>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    resolutionChoice === 'municipal' 
                      ? 'bg-[#EFF6FF] border-[#2563EB] text-[#0F172A]' 
                      : 'bg-white border-[#E2E8F0] text-[#64748B]'
                  }`}>
                    <input
                      type="radio"
                      name="resolve-choice"
                      checked={resolutionChoice === 'municipal'}
                      onChange={() => setResolutionChoice('municipal')}
                      className="mt-0.5 text-[#2563EB]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">
                        Accept Municipal ULB Assessment ({selectedConflictForResolve.municipalValue})
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        Adopts physical municipal field measurement and amends village khasra records.
                      </div>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    resolutionChoice === 'field-dispatch' 
                      ? 'bg-[#EFF6FF] border-[#2563EB] text-[#0F172A]' 
                      : 'bg-white border-[#E2E8F0] text-[#64748B]'
                  }`}>
                    <input
                      type="radio"
                      name="resolve-choice"
                      checked={resolutionChoice === 'field-dispatch'}
                      onChange={() => setResolutionChoice('field-dispatch')}
                      className="mt-0.5 text-[#2563EB]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">
                        Dispatch RTK GNSS Field Ground Survey
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        Sends task order to mobile rover unit for sub-centimeter resurvey.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">
                  Officer Order / Resolution Notes
                </label>
                <textarea
                  rows={2}
                  value={resolveNotes}
                  onChange={(e) => setResolveNotes(e.target.value)}
                  placeholder="Enter reasoning, government order reference, or dispatch instructions..."
                  className="w-full px-3.5 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setSelectedConflictForResolve(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
              >
                Cancel
              </button>
              <button
                id="btn-confirm-resolve"
                type="button"
                onClick={handleConfirmResolution}
                className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Confirm Resolution
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
