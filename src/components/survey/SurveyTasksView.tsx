import React, { useState } from 'react';
import { 
  Satellite, 
  Compass, 
  MapPin, 
  CheckSquare, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Layers,
  Radio
} from 'lucide-react';
import { UserProfile, NavigationTab } from '../../types/landsync';

interface SurveyTasksViewProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
}

export const SurveyTasksView: React.FC<SurveyTasksViewProps> = ({
  user,
  onNavigate
}) => {
  const [tasks, setTasks] = useState([
    { id: 'SRV-001', surveyNo: '125', location: 'Plot 12, Road 10, Banjara Hills', rover: 'Trimble R12i GNSS', status: 'In Progress', accuracy: '±8mm', targetDate: 'Today' },
    { id: 'SRV-002', surveyNo: '142/1', location: 'Jubilee Hills Ward Boundary', rover: 'Leica GS18 T', status: 'Completed', accuracy: '±6mm', targetDate: 'Yesterday' },
    { id: 'SRV-003', surveyNo: '188/B', location: 'Somajiguda Revenue Pillar 14', rover: 'South G7 RTK', status: 'Pending Assignment', accuracy: 'N/A', targetDate: 'Tomorrow' },
  ]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-heading">
              GNSS & Geodetic Boundary Validation
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              CORS Reference Network
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Real-time differential positioning, GCP coordinate calibration, and field rover control
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert('Starting GNSS RINEX Observation log ingestion.')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          >
            <UploadCloud className="w-4 h-4 text-[#2563EB]" />
            <span>Upload RINEX Data</span>
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Launch Geodetic Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time CORS Stream Monitor */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0F172A] font-heading flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#16A34A] animate-pulse" />
            Active Survey of India CORS Real-Time Kinematic Base Stations
          </h2>
          <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-[#DCFCE7]">
            RTK Fixed (NTRIP v2.0)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-1">
            <div className="font-bold text-[#0F172A]">HYD-CORS-01 (Uppal Base)</div>
            <div className="text-[#64748B]">Coordinates: 17.4042° N, 78.5582° E</div>
            <div className="text-[#16A34A] font-medium text-[11px]">Differential Correction: 0.2s latency • 32 SVs</div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-1">
            <div className="font-bold text-[#0F172A]">HYD-CORS-02 (Tank Bund Base)</div>
            <div className="text-[#64748B]">Coordinates: 17.4180° N, 78.4790° E</div>
            <div className="text-[#16A34A] font-medium text-[11px]">Differential Correction: 0.3s latency • 29 SVs</div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-1">
            <div className="font-bold text-[#0F172A]">SEC-CORS-01 (Cantonment Base)</div>
            <div className="text-[#64748B]">Coordinates: 17.4420° N, 78.4980° E</div>
            <div className="text-[#16A34A] font-medium text-[11px]">Differential Correction: 0.4s latency • 27 SVs</div>
          </div>
        </div>
      </div>

      {/* Survey Tasks Queue */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-[#E2E8F0]">
          <h3 className="text-sm font-bold text-[#0F172A] font-heading">
            Field Rover Survey & Coordinate Verification Tasks
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
                <th className="py-3 px-4 font-semibold">Task ID</th>
                <th className="py-3 px-4 font-semibold">Survey No</th>
                <th className="py-3 px-4 font-semibold">Location / Landmark</th>
                <th className="py-3 px-4 font-semibold">Assigned Rover Hardware</th>
                <th className="py-3 px-4 font-semibold">RTK Accuracy</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {tasks.map((t) => (
                <tr key={t.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#2563EB]">{t.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#0F172A]">Survey {t.surveyNo}</td>
                  <td className="py-3.5 px-4 text-[#475569]">{t.location}</td>
                  <td className="py-3.5 px-4 font-mono text-[#0F172A]">{t.rover}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#16A34A]">{t.accuracy}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      t.status === 'Completed'
                        ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]'
                        : t.status === 'In Progress'
                        ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]'
                        : 'bg-[#F1F5F9] text-[#64748B]'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onNavigate('map')}
                      className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] text-[#2563EB] font-semibold hover:bg-[#DBEAFE] cursor-pointer"
                    >
                      Inspect Rover Track
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
