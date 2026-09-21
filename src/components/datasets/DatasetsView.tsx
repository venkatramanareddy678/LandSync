import React, { useState } from 'react';
import { 
  Database, 
  UploadCloud, 
  Search, 
  Filter, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Download, 
  RefreshCw, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DatasetItem } from '../../types/landsync';

interface DatasetsViewProps {
  datasets: DatasetItem[];
  onOpenUploadModal: () => void;
}

export const DatasetsView: React.FC<DatasetsViewProps> = ({
  datasets,
  onOpenUploadModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');

  const filteredDatasets = datasets.filter((d) => {
    const matchesSource = sourceFilter === 'All' || d.source === sourceFilter;
    const matchesSearch = searchQuery === '' || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.format.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.crs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSource && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-heading">
            Geospatial Datasets
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">
            Manage multi-agency geospatial files, coordinate reference systems, and ingestion pipelines.
          </p>
        </div>

        <button
          id="btn-upload-new-dataset"
          type="button"
          onClick={onOpenUploadModal}
          className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-bold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <UploadCloud className="w-4 h-4" />
          <span>+ Upload Dataset</span>
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'Cadastral Office', 'Municipal ULB', 'Drone Survey', 'Utility Board'].map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setSourceFilter(src)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                sourceFilter === src
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]'
              }`}
            >
              {src}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search datasets, CRS, format..."
            className="w-full sm:w-64 pl-9 pr-3 py-2 text-xs text-[#0F172A] bg-white rounded-xl border border-[#E2E8F0] focus:outline-hidden focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Datasets Table / Cards */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                <th className="py-3.5 px-5">Dataset Name</th>
                <th className="py-3.5 px-4">Format</th>
                <th className="py-3.5 px-4">Source Agency</th>
                <th className="py-3.5 px-4">CRS Projection</th>
                <th className="py-3.5 px-4">Records</th>
                <th className="py-3.5 px-4">Size</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {filteredDatasets.map((ds) => (
                <tr key={ds.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#0F172A] flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#2563EB]" />
                      <span>{ds.name}</span>
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5 font-mono">
                      Uploaded {ds.uploadedAt}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold font-mono bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
                      {ds.format}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-medium text-[#0F172A]">
                    {ds.source}
                  </td>

                  <td className="py-4 px-4 font-mono font-semibold text-[#0F172A]">
                    {ds.crs}
                  </td>

                  <td className="py-4 px-4 font-mono font-bold text-[#0F172A]">
                    {(ds.records ?? ds.recordsCount ?? 0).toLocaleString()}
                  </td>

                  <td className="py-4 px-4 text-[#64748B] font-mono">
                    {ds.size}
                  </td>

                  <td className="py-4 px-4">
                    {ds.status === 'Processed' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Processed
                      </span>
                    )}
                    {ds.status === 'Validating' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Validating
                      </span>
                    )}
                    {ds.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" /> In Queue
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => alert(`Exporting ${ds.name} GeoJSON layer...`)}
                        className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors cursor-pointer"
                        title="Download GeoJSON"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Re-ingesting and re-projecting ${ds.name}...`)}
                        className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors cursor-pointer"
                        title="Re-run pipeline"
                      >
                        <RefreshCw className="w-4 h-4" />
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
