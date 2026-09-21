import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Building, 
  Search, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Trash2, 
  Edit
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types/landsync';

interface SuperAdminUsersViewProps {
  currentUser: UserProfile;
  onOpenCreateAuthorityModal?: () => void;
}

export const SuperAdminUsersView: React.FC<SuperAdminUsersViewProps> = ({
  currentUser,
  onOpenCreateAuthorityModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const usersList = [
    { id: 'usr-001', name: 'Dr. Rajeshwar Rao, IAS', role: 'SUPER_ADMIN', roleLabel: 'Super Admin', dept: 'State IT & Geospatial Department', phone: '+91 98765 43210', status: 'Active', district: 'State-wide (All Districts)' },
    { id: 'usr-002', name: 'Smt. P. Vani Prasad, IAS', role: 'DISTRICT_ADMIN', roleLabel: 'District Admin', dept: 'District Collectorate, Hyderabad', phone: '+91 98765 43211', status: 'Active', district: 'Hyderabad District' },
    { id: 'usr-003', name: 'A. K. Sharma', role: 'GIS_OFFICER', roleLabel: 'GIS Officer', dept: 'GIS & Remote Sensing Wing', phone: '+91 98765 43212', status: 'Active', district: 'Hyderabad (Ward 84)' },
    { id: 'usr-004', name: 'B. Venkat Reddy', role: 'REVENUE_OFFICER', roleLabel: 'Revenue Officer', dept: 'Revenue & Land Records (Tahsildar)', phone: '+91 98765 43213', status: 'Active', district: 'Hyderabad District' },
    { id: 'usr-005', name: 'K. Sunitha', role: 'MUNICIPAL_OFFICER', roleLabel: 'Municipal Officer', dept: 'GHMC Town Planning & Assessment', phone: '+91 98765 43214', status: 'Active', district: 'GHMC Circle 5' },
    { id: 'usr-006', name: 'M. Sreenivasa Rao', role: 'SURVEY_OFFICER', roleLabel: 'Survey Officer', dept: 'Department of Survey & Land Records', phone: '+91 98765 43215', status: 'Active', district: 'Hyderabad Central' },
    { id: 'usr-007', name: 'R. Naresh Kumar', role: 'FIELD_OFFICER', roleLabel: 'Field Officer', dept: 'Field Inspection & Verification Wing', phone: '+91 98765 43216', status: 'Active', district: 'Khairatabad Ward 84' },
    { id: 'usr-008', name: 'Ananya Deshmukh', role: 'DEPARTMENT_VIEWER', roleLabel: 'Department Viewer', dept: 'Urban Development & Audit Wing', phone: '+91 98765 43217', status: 'Active', district: 'Hyderabad District' },
  ];

  const filtered = usersList.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.roleLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone.includes(searchTerm)
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-heading">
              Authority & User Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              Super Admin Control
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Manage official accounts, assign administrative roles, and configure regional authority scopes
          </p>
        </div>

        <button
          id="btn-add-authority-user"
          type="button"
          onClick={onOpenCreateAuthorityModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Create Authority Account</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            id="search-users-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search authority officer by name, role, department or phone..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#CBD5E1] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
                <th className="py-3 px-4 font-semibold">Officer Name</th>
                <th className="py-3 px-4 font-semibold">Role Tier</th>
                <th className="py-3 px-4 font-semibold">Department & Wing</th>
                <th className="py-3 px-4 font-semibold">Jurisdiction / Scope</th>
                <th className="py-3 px-4 font-semibold">WhatsApp / Phone</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#0F172A]">{u.name}</div>
                    <div className="text-[11px] text-[#64748B] font-mono">{u.id}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                      {u.roleLabel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#475569]">{u.dept}</td>
                  <td className="py-3.5 px-4 text-[#0F172A] font-medium">{u.district}</td>
                  <td className="py-3.5 px-4 font-mono text-[#64748B]">{u.phone}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]">
                      <CheckCircle2 className="w-3 h-3" /> {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => alert(`Editing permissions for ${u.name}`)}
                        className="p-1.5 rounded-lg text-[#2563EB] hover:bg-[#EFF6FF]"
                        title="Edit Permissions"
                      >
                        <Edit className="w-3.5 h-3.5" />
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
