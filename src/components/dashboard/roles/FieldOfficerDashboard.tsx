import React, { useState } from 'react';
import { 
  CheckSquare, 
  MapPin, 
  Camera, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Play, 
  Upload, 
  FileText,
  Smartphone,
  Compass
} from 'lucide-react';
import { UserProfile, NavigationTab } from '../../../types/landsync';

interface FieldOfficerDashboardProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onOpenChangePhoto?: () => void;
}

export const FieldOfficerDashboard: React.FC<FieldOfficerDashboardProps> = ({
  user,
  onNavigate,
  onOpenChangePhoto
}) => {
  const [selectedTask, setSelectedTask] = useState<string | null>('PROP-00125');
  const [gpsCaptured, setGpsCaptured] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [observation, setObservation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const kpis = [
    { label: 'My Assigned Tasks', value: '8', icon: CheckSquare, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: "Today's Schedule", value: '3', icon: Clock, color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
    { label: 'Pending Ground Check', value: '5', icon: AlertCircle, color: 'text-[#D97706]', bg: 'bg-[#FFFBEB]' },
    { label: 'Completed Inspections', value: '14', icon: CheckCircle2, color: 'text-[#16A34A]', bg: 'bg-[#F0FDF4]' },
    { label: 'Revisit Required', value: '1', icon: Navigation, color: 'text-[#DC2626]', bg: 'bg-[#FEF2F2]' },
  ];

  const fieldTasks = [
    {
      id: 'PROP-00125',
      surveyNo: '125',
      address: 'Plot 12, Road No 10, Banjara Hills',
      reason: 'Cadastral vs Municipal area variance (+2 m²)',
      coordinates: '17.4375° N, 78.4482° E',
      status: 'High Priority',
      distance: '0.4 km away'
    },
    {
      id: 'PROP-00142',
      surveyNo: '142/1',
      address: 'Plot 45, Jubilee Hills Checkpost',
      reason: 'Check commercial setback wall boundary',
      coordinates: '17.4320° N, 78.4390° E',
      status: 'Scheduled',
      distance: '1.2 km away'
    },
    {
      id: 'PROP-00188',
      surveyNo: '188/B',
      address: 'Survey Pillar 14, Somajiguda',
      reason: 'Verify corner cadastral stone monumentation',
      coordinates: '17.4260° N, 78.4550° E',
      status: 'Scheduled',
      distance: '2.1 km away'
    }
  ];

  const handleCaptureGps = () => {
    setGpsCaptured(true);
  };

  const handleTakePhoto = () => {
    setPhotoUploaded(true);
  };

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setGpsCaptured(false);
      setPhotoUploaded(false);
      setObservation('');
      alert('Verification record submitted directly to District Collectorate & GIS Database with RTK geotag!');
    }, 1200);
  };

  return (
    <div className="p-3 sm:p-5 lg:p-7 max-w-4xl mx-auto space-y-5">
      
      {/* Mobile-First Header */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div 
              onClick={onOpenChangePhoto}
              className="relative shrink-0 cursor-pointer group"
              title="Click to update photo"
            >
              <img
                src={user.avatarUrl || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"}
                alt={user.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-[#2563EB] shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#16A34A] ring-2 ring-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] font-heading">
                  {user.name}
                </h1>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                  FIELD OFFICER
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                {user.department} • <strong className="text-[#0F172A]">{user.municipality || 'Ward 84'}</strong>
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]">
            <Smartphone className="w-3.5 h-3.5" /> Mobile Field App
          </span>
        </div>

        {/* Primary prominent button as demanded */}
        <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
          <button
            id="btn-start-field-verification"
            type="button"
            onClick={() => {
              const el = document.getElementById('field-task-active-card');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>START FIELD VERIFICATION</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-3 text-center shadow-2xs">
              <div className="text-lg font-bold text-[#0F172A] font-heading">{kpi.value}</div>
              <div className="text-[11px] font-medium text-[#64748B] mt-0.5">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* Active Field Verification Task Card (as requested) */}
      <div id="field-task-active-card" className="bg-[#FFFFFF] border-2 border-[#2563EB] rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#2563EB] text-white font-mono font-bold text-xs">
              Active Task
            </span>
            <h2 className="text-base font-bold text-[#0F172A] font-heading">
              Property: PROP-00125
            </h2>
          </div>
          <span className="text-xs font-bold text-[#D97706] bg-[#FFFBEB] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
            Requires On-Site Ground Truth
          </span>
        </div>

        {/* Task Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <div className="text-[#64748B]">Survey Number: <strong className="text-[#0F172A]">125 (Sub-division A)</strong></div>
            <div className="text-[#64748B]">Location: <strong className="text-[#0F172A]">Plot 12, Road No 10, Banjara Hills</strong></div>
            <div className="text-[#64748B]">Discrepancy: <strong className="text-[#DC2626]">252 m² (RoR) vs 250 m² (Cadastre)</strong></div>
          </div>

          <div className="p-3 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-1 flex flex-col justify-between">
            <div>
              <div className="text-[#1E40AF] font-semibold flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> Target Coordinates:
              </div>
              <div className="font-mono text-[#0F172A] text-[11px] mt-0.5">17.437521° N, 78.448215° E</div>
            </div>
            <button 
              onClick={() => onNavigate('map')}
              className="text-[#2563EB] font-bold text-[11px] hover:underline text-left cursor-pointer"
            >
              View Property Boundary on Map →
            </button>
          </div>
        </div>

        {/* The 4 Core Field Actions Demanded in Prompt */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold text-[#0F172A]">
            Field Evidence Collection:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Action 1: Capture GPS */}
            <button
              id="btn-capture-gps"
              type="button"
              onClick={handleCaptureGps}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                gpsCaptured 
                  ? 'bg-[#F0FDF4] border-[#16A34A] text-[#16A34A]' 
                  : 'bg-white border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              <Navigation className="w-4 h-4 text-[#2563EB]" />
              <span>{gpsCaptured ? '✓ GPS Captured (±0.4m Accuracy)' : '[ Capture GPS ]'}</span>
            </button>

            {/* Action 2: Take Photo */}
            <button
              id="btn-take-photo"
              type="button"
              onClick={handleTakePhoto}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                photoUploaded 
                  ? 'bg-[#F0FDF4] border-[#16A34A] text-[#16A34A]' 
                  : 'bg-white border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              <Camera className="w-4 h-4 text-[#2563EB]" />
              <span>{photoUploaded ? '✓ Boundary Photo Attached' : '[ Take Photo ]'}</span>
            </button>
          </div>

          {/* Action 3: Add Observation */}
          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              [ Add Observation ]
            </label>
            <textarea
              id="field-observation-notes"
              rows={3}
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Record boundary physical markers, compound wall status, owner presence, or monument stone condition..."
              className="w-full text-xs p-3 rounded-xl border border-[#CBD5E1] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Action 4: Submit Verification */}
          <button
            id="btn-submit-verification"
            type="button"
            onClick={handleSubmitVerification}
            disabled={isSubmitted}
            className="w-full py-3.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitted ? 'Transmitting Geotag to GIS...' : '[ Submit Verification ]'}</span>
          </button>
        </div>
      </div>

      {/* Assigned Tasks Queue */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-[#0F172A] font-heading">
          Today's Field Verification Route (Ward 84)
        </h3>

        <div className="space-y-2">
          {fieldTasks.map((task) => (
            <div 
              key={task.id}
              onClick={() => setSelectedTask(task.id)}
              className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                selectedTask === task.id 
                  ? 'border-[#2563EB] bg-[#EFF6FF]' 
                  : 'border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0F172A] font-mono">{task.id}</span>
                  <span className="text-[#64748B]">Survey No: <strong>{task.surveyNo}</strong></span>
                  <span className="text-[#2563EB] font-semibold">({task.distance})</span>
                </div>
                <div className="text-[#475569] text-[11px] mt-0.5">{task.address}</div>
              </div>

              <button className="px-2.5 py-1 rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] font-semibold text-[11px]">
                Inspect
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
