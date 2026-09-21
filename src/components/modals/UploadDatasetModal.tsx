import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  X, 
  Database, 
  Layers, 
  Cpu, 
  AlertCircle 
} from 'lucide-react';
import { DatasetItem } from '../../types/landsync';

interface UploadDatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newDataset: DatasetItem) => void;
}

export const UploadDatasetModal: React.FC<UploadDatasetModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [datasetName, setDatasetName] = useState('');
  const [format, setFormat] = useState('Shapefile (.zip)');
  const [source, setSource] = useState('Cadastral Office');
  const [crs, setCrs] = useState('EPSG:32644 (UTM Zone 44N)');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (!datasetName) {
        setDatasetName(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!datasetName) {
        setDatasetName(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let current = 0;
    const interval = setInterval(() => {
      current += 25;
      setUploadProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          const newDs: DatasetItem = {
            id: `DS-${Date.now().toString().slice(-4)}`,
            name: datasetName || 'Uploaded Ward Dataset',
            source,
            format,
            crs,
            records: 1240,
            uploadedAt: 'Just now',
            status: 'Processed',
            size: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '14.2 MB',
          };
          onUploadSuccess(newDs);
          onClose();
        }, 400);
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-xl bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] font-heading">
                Upload Geospatial Dataset
              </h2>
              <p className="text-xs text-[#64748B]">
                Supports ESRI Shapefiles, GeoJSON, KML, and PostGIS layers
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#0F172A] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          
          {/* Drag & Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
              dragActive 
                ? 'border-[#2563EB] bg-[#EFF6FF]' 
                : 'border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#2563EB]/60'
            }`}
          >
            <input
              type="file"
              id="file-upload-input"
              className="hidden"
              onChange={handleFileChange}
              accept=".zip,.geojson,.json,.kml,.csv"
            />
            <label htmlFor="file-upload-input" className="cursor-pointer block">
              <UploadCloud className="w-10 h-10 text-[#2563EB] mx-auto mb-2" />
              <div className="text-xs font-bold text-[#0F172A]">
                {selectedFile ? selectedFile.name : 'Drag and drop geospatial archive or click to browse'}
              </div>
              <div className="text-[11px] text-[#64748B] mt-1">
                .ZIP (containing .shp, .shx, .dbf, .prj), .GEOJSON, .KML (up to 500MB)
              </div>
            </label>
          </div>

          {/* Dataset Name */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Dataset Name
            </label>
            <input
              type="text"
              required
              value={datasetName}
              onChange={(e) => setDatasetName(e.target.value)}
              placeholder="e.g. Ward 14 Cadastral Survey 2026"
              className="w-full px-3.5 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          {/* Format & Agency Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">
                Data Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] bg-white focus:outline-hidden focus:border-[#2563EB]"
              >
                <option value="Shapefile (.zip)">ESRI Shapefile (.zip)</option>
                <option value="GeoJSON">GeoJSON (.geojson)</option>
                <option value="KML / KMZ">Google Earth KML / KMZ</option>
                <option value="CSV Tabular">CSV with Lat/Long Columns</option>
                <option value="PostGIS">Live PostGIS / WFS Stream</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">
                Source Agency
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] bg-white focus:outline-hidden focus:border-[#2563EB]"
              >
                <option value="Cadastral Office">Cadastral / Land Records Dept</option>
                <option value="Municipal ULB">Municipal Corporation (ULB)</option>
                <option value="Revenue Dept">Revenue Department</option>
                <option value="Drone Survey">Survey of India / Drone Ortho</option>
                <option value="Utility Board">Water / Electricity Board</option>
              </select>
            </div>
          </div>

          {/* Coordinate Reference System */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              CRS (Coordinate Reference System)
            </label>
            <select
              value={crs}
              onChange={(e) => setCrs(e.target.value)}
              className="w-full px-3 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] bg-white focus:outline-hidden focus:border-[#2563EB] font-mono"
            >
              <option value="EPSG:32644 (UTM Zone 44N)">EPSG:32644 — WGS 84 / UTM zone 44N (Standard Cadastral)</option>
              <option value="EPSG:4326 (WGS 84)">EPSG:4326 — WGS 84 (GPS Geographic Lat/Lon)</option>
              <option value="EPSG:3857 (Web Mercator)">EPSG:3857 — Pseudo-Mercator (Web Standard)</option>
              <option value="Auto-detect from .prj">Auto-detect from Shapefile .prj projection file</option>
            </select>
          </div>

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#2563EB]">Ingesting &amp; Reprojecting...</span>
                <span className="text-[#0F172A] font-mono">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-[#EFF6FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2563EB] rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
            >
              Cancel
            </button>
            <button
              id="btn-submit-upload"
              type="submit"
              disabled={isUploading}
              className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isUploading ? 'Ingesting...' : 'Ingest Dataset'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
