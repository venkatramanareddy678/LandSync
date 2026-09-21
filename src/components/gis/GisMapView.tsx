import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Layers as LayersIcon, 
  Ruler, 
  PenTool, 
  Filter, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ExternalLink, 
  FileText, 
  ShieldAlert, 
  Navigation, 
  Compass, 
  X,
  Eye,
  Info,
  MapPin
} from 'lucide-react';
import { LandParcel, LayerToggleState } from '../../types/landsync';

interface GisMapViewProps {
  parcels: LandParcel[];
  selectedParcel: LandParcel;
  onSelectParcel: (parcel: LandParcel) => void;
  onViewFullRecord: (parcel: LandParcel) => void;
  onReportConflict: (parcel: LandParcel) => void;
  onStartGroundVerification: (parcel: LandParcel) => void;
}

export const GisMapView: React.FC<GisMapViewProps> = ({
  parcels,
  selectedParcel,
  onSelectParcel,
  onViewFullRecord,
  onReportConflict,
  onStartGroundVerification,
}) => {
  // Map interactive states
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: -100, y: -80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState<'pan' | 'measure' | 'draw'>('pan');
  const [measurePoints, setMeasurePoints] = useState<{ x: number; y: number }[]>([]);
  const [showLayerPanel, setShowLayerPanel] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Integrated' | 'Conflict' | 'Pending Verification'>('All');
  const [basemap, setBasemap] = useState<'cadastral' | 'satellite' | 'topo'>('cadastral');
  const [hoveredParcel, setHoveredParcel] = useState<LandParcel | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Layer toggles
  const [layers, setLayers] = useState<LayerToggleState>({
    cadastralParcels: true,
    buildings: true,
    droneImagery: true,
    ori: true,
    dsmDtm: false,
    municipalGis: true,
    revenue: true,
    utilities: true,
    gnss: true,
    groundTruth: true,
    aiFeatures: true,
    conflicts: true,
  });

  const toggleLayer = (layerKey: keyof LayerToggleState) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Drag pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTool === 'measure') {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const clickX = (e.clientX - rect.left - pan.x) / zoom;
      const clickY = (e.clientY - rect.top - pan.y) / zoom;
      setMeasurePoints((prev) => [...prev, { x: clickX, y: clickY }]);
      return;
    }

    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || activeTool === 'measure') return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.8));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.6));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: -100, y: -80 });
    setMeasurePoints([]);
  };

  // Filtered parcels
  const filteredParcels = parcels.filter((p) => {
    const matchesFilter = statusFilter === 'All' || p.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.surveyNumber.includes(searchQuery) || 
      p.municipalId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate measured distance
  const calculatedDistance = measurePoints.length >= 2
    ? Math.round(
        Math.sqrt(
          Math.pow(measurePoints[1].x - measurePoints[0].x, 2) +
          Math.pow(measurePoints[1].y - measurePoints[0].y, 2)
        ) * 0.75
      )
    : 0;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[calc(100vh-64px)] bg-[#F8FAFC] overflow-hidden flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen' : ''
      }`}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* TOP MAP TOOLBAR */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Left cluster: Search & Filters */}
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.08)]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-2.5 top-2.5" />
            <input
              id="gis-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Survey #, PROP-ID, Owner..."
              className="w-48 sm:w-64 pl-8 pr-3 py-1.5 text-xs text-[#0F172A] rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-hidden focus:border-[#2563EB]"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-[#94A3B8] hover:text-[#0F172A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="h-6 w-[1px] bg-[#E2E8F0] mx-1"></div>

          {/* Status Filter */}
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#64748B]" />
            <select
              id="gis-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs font-semibold text-[#0F172A] bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="All">All Parcels</option>
              <option value="Integrated">Integrated (✓)</option>
              <option value="Conflict">Conflicts (⚠)</option>
              <option value="Pending Verification">Pending</option>
            </select>
          </div>
        </div>

        {/* Center/Right cluster: Map Tools */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.08)]">
          
          {/* Layer toggle button */}
          <button
            id="btn-gis-layer-toggle"
            type="button"
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              showLayerPanel ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <LayersIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Layers</span>
          </button>

          {/* Measure Tool */}
          <button
            id="btn-gis-measure-tool"
            type="button"
            onClick={() => {
              setActiveTool(activeTool === 'measure' ? 'pan' : 'measure');
              setMeasurePoints([]);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTool === 'measure' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
            title="Measure distance between parcel vertices"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Measure</span>
          </button>

          {/* Draw Tool */}
          <button
            id="btn-gis-draw-tool"
            type="button"
            onClick={() => setActiveTool(activeTool === 'draw' ? 'pan' : 'draw')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTool === 'draw' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
            title="Draw temporary boundary note"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Draw</span>
          </button>

          <div className="h-5 w-[1px] bg-[#E2E8F0] mx-1"></div>

          {/* Basemap Switcher */}
          <div className="flex bg-[#F1F5F9] rounded-xl p-0.5">
            <button
              type="button"
              onClick={() => setBasemap('cadastral')}
              className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                basemap === 'cadastral' ? 'bg-white text-[#2563EB] shadow-2xs' : 'text-[#64748B]'
              }`}
            >
              Cadastral
            </button>
            <button
              type="button"
              onClick={() => setBasemap('satellite')}
              className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                basemap === 'satellite' ? 'bg-white text-[#2563EB] shadow-2xs' : 'text-[#64748B]'
              }`}
            >
              Satellite
            </button>
          </div>

          <div className="h-5 w-[1px] bg-[#E2E8F0] mx-1"></div>

          {/* Fullscreen Toggle */}
          <button
            id="btn-gis-fullscreen"
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-[#64748B] hover:text-[#0F172A] rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* LEFT MAP LAYER CONTROL PANEL */}
      {showLayerPanel && (
        <div className="absolute top-20 left-4 z-20 w-64 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E2E8F0] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] animate-in fade-in slide-in-from-left-2">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <LayersIcon className="w-4 h-4 text-[#2563EB]" />
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-heading">
                Map Layers
              </span>
            </div>
            <button 
              type="button" 
              onClick={() => setShowLayerPanel(false)}
              className="text-[#94A3B8] hover:text-[#0F172A]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {/* Cadastral Parcels */}
            <label className="flex items-center justify-between p-1.5 hover:bg-[#F8FAFC] rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <input
                  id="layer-toggle-cadastral"
                  type="checkbox"
                  checked={layers.cadastralParcels}
                  onChange={() => toggleLayer('cadastralParcels')}
                  className="rounded text-[#2563EB] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="w-3 h-3 rounded-md bg-[#2563EB] shrink-0"></span>
                <span className="text-xs font-medium text-[#0F172A]">Cadastral Parcels</span>
              </div>
              <span className="text-[10px] text-[#64748B] font-mono">EPSG:32644</span>
            </label>

            {/* Buildings */}
            <label className="flex items-center justify-between p-1.5 hover:bg-[#F8FAFC] rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <input
                  id="layer-toggle-buildings"
                  type="checkbox"
                  checked={layers.buildings}
                  onChange={() => toggleLayer('buildings')}
                  className="rounded text-[#2563EB] focus:ring-0 cursor-pointer"
                />
                <span className="w-3 h-3 rounded-md bg-[#64748B] shrink-0"></span>
                <span className="text-xs font-medium text-[#0F172A]">Buildings</span>
              </div>
              <span className="text-[10px] text-[#64748B] font-mono">Footprints</span>
            </label>

            {/* Municipal GIS */}
            <label className="flex items-center justify-between p-1.5 hover:bg-[#F8FAFC] rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <input
                  id="layer-toggle-municipal"
                  type="checkbox"
                  checked={layers.municipalGis}
                  onChange={() => toggleLayer('municipalGis')}
                  className="rounded text-[#2563EB] focus:ring-0 cursor-pointer"
                />
                <span className="w-3 h-3 rounded-md bg-[#3B82F6] shrink-0"></span>
                <span className="text-xs font-medium text-[#0F172A]">Municipal GIS</span>
              </div>
              <span className="text-[10px] text-[#64748B] font-mono">ULB Tax</span>
            </label>

            {/* Revenue */}
            <label className="flex items-center justify-between p-1.5 hover:bg-[#F8FAFC] rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <input
                  id="layer-toggle-revenue"
                  type="checkbox"
                  checked={layers.revenue}
                  onChange={() => toggleLayer('revenue')}
                  className="rounded text-[#2563EB] focus:ring-0 cursor-pointer"
                />
                <span className="w-3 h-3 rounded-md bg-[#0284C7] shrink-0"></span>
                <span className="text-xs font-medium text-[#0F172A]">Revenue</span>
              </div>
              <span className="text-[10px] text-[#64748B] font-mono">Khasra</span>
            </label>

            {/* Utilities */}
            <label className="flex items-center justify-between p-1.5 hover:bg-[#F8FAFC] rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <input
                  id="layer-toggle-utilities"
                  type="checkbox"
                  checked={layers.utilities}
                  onChange={() => toggleLayer('utilities')}
                  className="rounded text-[#2563EB] focus:ring-0 cursor-pointer"
                />
                <span className="w-3 h-3 rounded-md bg-[#059669] shrink-0"></span>
                <span className="text-xs font-medium text-[#0F172A]">Utilities</span>
              </div>
              <span className="text-[10px] text-[#64748B] font-mono">Water/Grid</span>
            </label>

            {/* AI Features */}
            <label className="flex items-center justify-between p-1.5 hover:bg-[#F8FAFC] rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <input
                  id="layer-toggle-ai"
                  type="checkbox"
                  checked={layers.aiFeatures}
                  onChange={() => toggleLayer('aiFeatures')}
                  className="rounded text-[#2563EB] focus:ring-0 cursor-pointer"
                />
                <span className="w-3 h-3 rounded-md bg-[#7C3AED] shrink-0"></span>
                <span className="text-xs font-medium text-[#0F172A]">AI Features</span>
              </div>
              <span className="text-[10px] text-[#2563EB] font-mono font-bold">Auto</span>
            </label>

            {/* Conflicts */}
            <label className="flex items-center justify-between p-1.5 hover:bg-[#F8FAFC] rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <input
                  id="layer-toggle-conflicts"
                  type="checkbox"
                  checked={layers.conflicts}
                  onChange={() => toggleLayer('conflicts')}
                  className="rounded text-[#2563EB] focus:ring-0 cursor-pointer"
                />
                <span className="w-3 h-3 rounded-md bg-[#F59E0B] shrink-0"></span>
                <span className="text-xs font-medium text-[#0F172A]">Conflicts</span>
              </div>
              <span className="text-[10px] text-[#B45309] font-bold">183</span>
            </label>
          </div>
        </div>
      )}

      {/* FLOATING ZOOM & ORIENTATION CONTROLS (BOTTOM LEFT) */}
      <div className="absolute bottom-6 left-4 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#E2E8F0] shadow-md">
        <button
          id="btn-gis-zoom-in"
          type="button"
          onClick={handleZoomIn}
          className="p-2 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-xl transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          id="btn-gis-zoom-out"
          type="button"
          onClick={handleZoomOut}
          className="p-2 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-xl transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          id="btn-gis-zoom-reset"
          type="button"
          onClick={handleReset}
          className="p-2 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-xl transition-colors cursor-pointer"
          title="Reset Extent"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="border-t border-[#E2E8F0] my-0.5"></div>
        <div className="p-1 flex items-center justify-center text-[10px] font-mono text-[#64748B]" title="Orientation North">
          <Compass className="w-4 h-4 text-[#2563EB]" />
        </div>
      </div>

      {/* MEASURE TOOL ACTIVE BANNER */}
      {activeTool === 'measure' && (
        <div className="absolute top-20 right-4 lg:right-96 z-20 bg-[#2563EB] text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-3 text-xs">
          <Ruler className="w-4 h-4 text-white animate-pulse" />
          <div>
            <div className="font-semibold">Measurement Mode Active</div>
            <div className="text-blue-100 text-[11px]">
              {measurePoints.length === 0 && 'Click first parcel boundary vertex'}
              {measurePoints.length === 1 && 'Click second vertex to calculate distance'}
              {measurePoints.length >= 2 && `Calculated Distance: ${calculatedDistance} meters`}
            </div>
          </div>
          {measurePoints.length > 0 && (
            <button
              type="button"
              onClick={() => setMeasurePoints([])}
              className="ml-2 px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[10px] font-bold"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* MAIN GIS MAP SVG CANVAS */}
      <div 
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <svg 
          className="w-full h-full"
          style={{
            backgroundColor: basemap === 'satellite' ? '#0F172A' : '#F8FAFC'
          }}
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="gis-bg-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path 
                d="M 60 0 L 0 0 0 60" 
                fill="none" 
                stroke={basemap === 'satellite' ? '#1E293B' : '#E2E8F0'} 
                strokeWidth="0.75" 
              />
            </pattern>

            {/* Conflict diagonal hatching pattern */}
            <pattern id="conflict-stripe" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#F59E0B" strokeWidth="2.5" strokeOpacity="0.4" />
            </pattern>

            {/* Road Corridor Gradient */}
            <linearGradient id="road-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <rect width="100%" height="100%" fill="url(#gis-bg-grid)" />

          {/* Pan & Zoom Transform Group */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            
            {/* SATELLITE BASEMAP SIMULATION */}
            {basemap === 'satellite' && (
              <g opacity="0.85">
                <rect x="150" y="100" width="800" height="500" fill="#1E293B" rx="12" />
                {/* Simulated high-resolution aerial terrain features */}
                <circle cx="300" cy="220" r="140" fill="#14532D" fillOpacity="0.3" />
                <circle cx="650" cy="380" r="190" fill="#334155" fillOpacity="0.4" />
                <path d="M 160 300 Q 400 320 850 330" stroke="#475569" strokeWidth="42" fill="none" opacity="0.6" />
              </g>
            )}

            {/* ROAD RIGHT-OF-WAY CORRIDORS */}
            <g id="gis-layer-roads" opacity="0.9">
              {/* Primary 18m Ward Arterial Corridor */}
              <polygon 
                points="180,160 880,185 870,225 170,200" 
                fill="url(#road-grad)" 
                stroke="#64748B" 
                strokeWidth="1" 
                strokeDasharray="4 4"
              />
              <text x="350" y="193" fill="#475569" fontSize="10" fontWeight="600" letterSpacing="2">
                18M INDIRANAGAR MAIN CORRIDOR (ULB-M4)
              </text>

              {/* Cross Street */}
              <polygon 
                points="350,195 380,195 350,490 320,490" 
                fill="#E2E8F0" 
                stroke="#94A3B8" 
                strokeWidth="1" 
              />
              <text x="340" y="440" fill="#64748B" fontSize="8" transform="rotate(-75 340 440)" fontWeight="600">
                12M FEEDER ROAD
              </text>
            </g>

            {/* UTILITIES LAYER */}
            {layers.utilities && (
              <g id="gis-layer-utilities" opacity="0.8">
                {/* Underground Water Supply Trunk Line */}
                <path 
                  d="M 190 205 L 870 230" 
                  fill="none" 
                  stroke="#059669" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 3" 
                />
                {/* Water Valves */}
                <circle cx="260" cy="208" r="4" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="490" cy="221" r="4" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="750" cy="236" r="4" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
              </g>
            )}

            {/* CADASTRAL PARCELS & MUNICIPAL CONFLATION LAYER */}
            <g id="gis-layer-parcels">
              {filteredParcels.map((parcel) => {
                const isSelected = selectedParcel.id === parcel.id;
                const isHovered = hoveredParcel?.id === parcel.id;
                const pointsString = parcel.coordinates.map((c) => `${c.x},${c.y}`).join(' ');

                // Color calculation based on status and selection
                let fill = '#FFFFFF';
                let stroke = '#2563EB';
                let strokeWidth = isSelected ? 3.5 : 1.5;

                if (parcel.status === 'Conflict' && layers.conflicts) {
                  stroke = '#F59E0B';
                  fill = 'url(#conflict-stripe)';
                } else if (parcel.status === 'Pending Verification') {
                  stroke = '#3B82F6';
                  fill = '#EFF6FF';
                } else {
                  fill = isSelected ? '#DBEAFE' : '#FFFFFF';
                }

                if (isHovered && !isSelected) {
                  fill = '#EFF6FF';
                  strokeWidth = 2.5;
                }

                return (
                  <g 
                    key={parcel.id} 
                    className="cursor-pointer transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectParcel(parcel);
                    }}
                    onMouseEnter={() => setHoveredParcel(parcel)}
                    onMouseLeave={() => setHoveredParcel(null)}
                  >
                    {/* Cadastral Polygon */}
                    {layers.cadastralParcels && (
                      <polygon
                        points={pointsString}
                        fill={fill}
                        fillOpacity={parcel.status === 'Conflict' ? 0.4 : 0.85}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        className="transition-colors"
                      />
                    )}

                    {/* Municipal Boundary Overlay (Shows slight shift if conflict) */}
                    {layers.municipalGis && parcel.status === 'Conflict' && (
                      <polygon
                        points={parcel.coordinates
                          .map((c, i) => `${c.x + (i % 2 === 0 ? 10 : -8)},${c.y + 6}`)
                          .join(' ')}
                        fill="none"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                    )}

                    {/* AI Feature Extraction Bounding Box */}
                    {layers.aiFeatures && (
                      <rect
                        x={parcel.center.x - 28}
                        y={parcel.center.y - 20}
                        width="56"
                        height="40"
                        fill="#7C3AED"
                        fillOpacity="0.08"
                        stroke="#7C3AED"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        rx="4"
                      />
                    )}

                    {/* Building Footprint inside parcel */}
                    {layers.buildings && parcel.buildingCount > 0 && (
                      <rect
                        x={parcel.center.x - 22}
                        y={parcel.center.y - 16}
                        width="44"
                        height="32"
                        fill={isSelected ? '#1D4ED8' : '#64748B'}
                        fillOpacity={isSelected ? 0.35 : 0.25}
                        stroke={isSelected ? '#1D4ED8' : '#475569'}
                        strokeWidth="1.2"
                        rx="2"
                      />
                    )}

                    {/* Centroid Survey Number & Property ID */}
                    <text
                      x={parcel.center.x}
                      y={parcel.center.y - 4}
                      textAnchor="middle"
                      fill="#0F172A"
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="Manrope, sans-serif"
                      className="pointer-events-none select-none"
                    >
                      {parcel.surveyNumber}
                    </text>

                    <text
                      x={parcel.center.x}
                      y={parcel.center.y + 10}
                      textAnchor="middle"
                      fill="#2563EB"
                      fontSize="9"
                      fontWeight="600"
                      fontFamily="monospace"
                      className="pointer-events-none select-none"
                    >
                      {parcel.areaSqMeters} m²
                    </text>

                    {/* Status Badge Pin on Map */}
                    {parcel.status === 'Conflict' && layers.conflicts && (
                      <g transform={`translate(${parcel.center.x + 22}, ${parcel.center.y - 28})`}>
                        <circle cx="0" cy="0" r="7" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">!</text>
                      </g>
                    )}

                    {parcel.status === 'Integrated' && (
                      <g transform={`translate(${parcel.center.x + 22}, ${parcel.center.y - 28})`}>
                        <circle cx="0" cy="0" r="6" fill="#16A34A" stroke="#FFFFFF" strokeWidth="1.2" />
                        <text x="0" y="2.5" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">✓</text>
                      </g>
                    )}

                    {/* Selected Highlight Halo Ring */}
                    {isSelected && (
                      <circle
                        cx={parcel.center.x}
                        cy={parcel.center.y}
                        r="38"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                );
              })}
            </g>

            {/* MEASURING LINE ON CANVAS */}
            {measurePoints.length >= 2 && (
              <g>
                <line
                  x1={measurePoints[0].x}
                  y1={measurePoints[0].y}
                  x2={measurePoints[1].x}
                  y2={measurePoints[1].y}
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeDasharray="5 3"
                />
                <circle cx={measurePoints[0].x} cy={measurePoints[0].y} r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx={measurePoints[1].x} cy={measurePoints[1].y} r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                <rect 
                  x={(measurePoints[0].x + measurePoints[1].x) / 2 - 35} 
                  y={(measurePoints[0].y + measurePoints[1].y) / 2 - 14} 
                  width="70" 
                  height="20" 
                  fill="#0F172A" 
                  rx="4" 
                />
                <text
                  x={(measurePoints[0].x + measurePoints[1].x) / 2}
                  y={(measurePoints[0].y + measurePoints[1].y) / 2}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {calculatedDistance} m
                </text>
              </g>
            )}

            {/* MAP SCALE BAR (Bottom Right inside canvas) */}
            <g transform="translate(680, 480)">
              <rect x="0" y="0" width="100" height="4" fill="#0F172A" />
              <rect x="0" y="0" width="50" height="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.5" />
              <text x="0" y="-4" fontSize="9" fill="#64748B" fontWeight="600">0</text>
              <text x="50" y="-4" fontSize="9" fill="#64748B" fontWeight="600">25m</text>
              <text x="100" y="-4" fontSize="9" fill="#64748B" fontWeight="600">50m</text>
              <text x="50" y="16" fontSize="8" textAnchor="middle" fill="#64748B" fontWeight="500">
                1:500 Cadastral Scale
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* RIGHT: PROPERTY INFORMATION PANEL (Hero Panel) */}
      <div className="absolute top-20 right-4 bottom-6 z-20 w-80 sm:w-96 bg-white/98 backdrop-blur-md rounded-2xl border border-[#E2E8F0] shadow-[0_10px_35px_rgba(15,23,42,0.1)] flex flex-col justify-between overflow-hidden animate-in fade-in slide-in-from-right-3">
        
        {/* Panel Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] bg-gradient-to-b from-[#EFF6FF]/60 to-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase font-heading">
              Property Overview
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              selectedParcel.status === 'Integrated'
                ? 'bg-[#EFF6FF] text-[#16A34A] border border-[#DCFCE7]'
                : selectedParcel.status === 'Conflict'
                ? 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]'
                : 'bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]'
            }`}>
              {selectedParcel.status === 'Integrated' && <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />}
              {selectedParcel.status === 'Conflict' && <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B]" />}
              {selectedParcel.status === 'Pending Verification' && <Clock className="w-3.5 h-3.5 text-[#2563EB]" />}
              {selectedParcel.status}
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight font-heading">
            {selectedParcel.id}
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5 font-medium">
            {selectedParcel.ward}
          </p>
        </div>

        {/* Panel Body: Details & AI Confidence */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          
          {/* Key Identifiers Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl">
              <span className="block text-[11px] font-semibold text-[#64748B]">
                Survey Number
              </span>
              <span className="text-sm font-bold text-[#0F172A] font-mono">
                {selectedParcel.surveyNumber}
              </span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl">
              <span className="block text-[11px] font-semibold text-[#64748B]">
                Municipal ID
              </span>
              <span className="text-sm font-bold text-[#0F172A] font-mono">
                {selectedParcel.municipalId}
              </span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl">
              <span className="block text-[11px] font-semibold text-[#64748B]">
                Area
              </span>
              <span className="text-sm font-bold text-[#0F172A] font-mono">
                {selectedParcel.areaSqMeters} m²
              </span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl">
              <span className="block text-[11px] font-semibold text-[#64748B]">
                Land Use
              </span>
              <span className="text-sm font-bold text-[#0F172A]">
                {selectedParcel.landUse}
              </span>
            </div>
          </div>

          {/* Owner Info */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] p-3 rounded-xl">
            <div className="text-[11px] font-semibold text-[#64748B]">
              Registered Title Holder
            </div>
            <div className="text-sm font-bold text-[#0F172A] mt-0.5">
              {selectedParcel.owner}
            </div>
            {selectedParcel.fatherName && (
              <div className="text-xs text-[#64748B]">
                S/o: {selectedParcel.fatherName}
              </div>
            )}
          </div>

          {/* LARGE AI CONFIDENCE INDICATOR */}
          <div className="bg-gradient-to-br from-[#EFF6FF] to-white border border-[#DBEAFE] p-4 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#2563EB] tracking-wide uppercase">
                AI Conflation Confidence
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#2563EB] text-white">
                {selectedParcel.confidence >= 90 ? 'High Confidence' : 'Review Required'}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#0F172A] font-heading">
                {selectedParcel.confidence}%
              </span>
              <span className="text-xs font-semibold text-[#16A34A]">
                Spatial overlap 98.4%
              </span>
            </div>

            {/* Confidence Progress Bar */}
            <div className="w-full h-2 bg-[#E2E8F0] rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                style={{ width: `${selectedParcel.confidence}%` }}
              ></div>
            </div>

            <p className="text-[11px] text-[#64748B] mt-2">
              Validated against Cadastral vector, Municipal tax database, and 2026 Drone Orthomosaic.
            </p>
          </div>

          {/* Multi-Source Attribute Check */}
          <div className="text-xs space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[#64748B]">
              <span>Cadastral Survey Area:</span>
              <span className="font-semibold text-[#0F172A] font-mono">{selectedParcel.sources.cadastral.area} m²</span>
            </div>
            <div className="flex items-center justify-between text-[#64748B]">
              <span>Municipal Registry Area:</span>
              <span className="font-semibold text-[#0F172A] font-mono">{selectedParcel.sources.municipal.area} m²</span>
            </div>
            <div className="flex items-center justify-between text-[#64748B]">
              <span>Drone Building Count:</span>
              <span className="font-semibold text-[#0F172A] font-mono">{selectedParcel.buildingCount} structure</span>
            </div>
          </div>
        </div>

        {/* Panel Footer Action Buttons */}
        <div className="p-4 sm:p-5 border-t border-[#E2E8F0] bg-[#FFFFFF] space-y-2">
          <button
            id="btn-view-full-record"
            type="button"
            onClick={() => onViewFullRecord(selectedParcel)}
            className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Full Record</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              id="btn-view-sources"
              type="button"
              onClick={() => onViewFullRecord(selectedParcel)}
              className="py-2 px-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] font-semibold text-xs transition-colors cursor-pointer"
            >
              View Sources
            </button>
            <button
              id="btn-report-conflict"
              type="button"
              onClick={() => onReportConflict(selectedParcel)}
              className="py-2 px-3 rounded-xl bg-[#FEF3C7]/60 hover:bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] font-semibold text-xs transition-colors cursor-pointer"
            >
              Report Conflict
            </button>
          </div>

          <button
            id="btn-ground-verification"
            type="button"
            onClick={() => onStartGroundVerification(selectedParcel)}
            className="w-full py-2 px-3 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Ground Verification</span>
          </button>
        </div>

      </div>
    </div>
  );
};
