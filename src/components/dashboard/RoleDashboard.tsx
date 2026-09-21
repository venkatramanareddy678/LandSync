import React from 'react';
import { UserProfile, NavigationTab, ConflictItem, LandDataset, LandParcel } from '../../types/landsync';
import { SuperAdminDashboard } from './roles/SuperAdminDashboard';
import { DistrictAdminDashboard } from './roles/DistrictAdminDashboard';
import { GisOfficerDashboard } from './roles/GisOfficerDashboard';
import { RevenueOfficerDashboard } from './roles/RevenueOfficerDashboard';
import { MunicipalOfficerDashboard } from './roles/MunicipalOfficerDashboard';
import { SurveyOfficerDashboard } from './roles/SurveyOfficerDashboard';
import { FieldOfficerDashboard } from './roles/FieldOfficerDashboard';
import { DepartmentViewerDashboard } from './roles/DepartmentViewerDashboard';

interface RoleDashboardProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onOpenUploadModal: () => void;
  onOpenIntegrationModal: () => void;
  onOpenChangePhoto?: () => void;
  onOpenCreateAuthorityModal?: () => void;
  conflictsCount?: number;
  conflicts?: ConflictItem[];
}

export const RoleDashboard: React.FC<RoleDashboardProps> = ({
  user,
  onNavigate,
  onOpenUploadModal,
  onOpenIntegrationModal,
  onOpenChangePhoto,
  onOpenCreateAuthorityModal,
  conflictsCount = 183,
  conflicts = []
}) => {
  switch (user.role) {
    case 'SUPER_ADMIN':
      return (
        <SuperAdminDashboard
          user={user}
          onNavigate={onNavigate}
          onOpenChangePhoto={onOpenChangePhoto}
          onOpenCreateAuthorityModal={onOpenCreateAuthorityModal}
        />
      );

    case 'DISTRICT_ADMIN':
      return (
        <DistrictAdminDashboard
          user={user}
          onNavigate={onNavigate}
          onOpenChangePhoto={onOpenChangePhoto}
          conflicts={conflicts}
        />
      );

    case 'GIS_OFFICER':
      return (
        <GisOfficerDashboard
          user={user}
          onNavigate={onNavigate}
          onOpenUploadModal={onOpenUploadModal}
          onOpenIntegrationModal={onOpenIntegrationModal}
          onOpenChangePhoto={onOpenChangePhoto}
          conflictsCount={conflictsCount}
        />
      );

    case 'REVENUE_OFFICER':
      return (
        <RevenueOfficerDashboard
          user={user}
          onNavigate={onNavigate}
          onOpenChangePhoto={onOpenChangePhoto}
        />
      );

    case 'MUNICIPAL_OFFICER':
      return (
        <MunicipalOfficerDashboard
          user={user}
          onNavigate={onNavigate}
          onOpenChangePhoto={onOpenChangePhoto}
        />
      );

    case 'SURVEY_OFFICER':
      return (
        <SurveyOfficerDashboard
          user={user}
          onNavigate={onNavigate}
          onOpenChangePhoto={onOpenChangePhoto}
        />
      );

    case 'FIELD_OFFICER':
      return (
        <FieldOfficerDashboard
          user={user}
          onNavigate={onNavigate}
          onOpenChangePhoto={onOpenChangePhoto}
        />
      );

    case 'DEPARTMENT_VIEWER':
      return (
        <DepartmentViewerDashboard
          user={user}
          onNavigate={onNavigate}
          onOpenChangePhoto={onOpenChangePhoto}
        />
      );

    default:
      return (
        <GisOfficerDashboard
          user={user}
          onNavigate={onNavigate}
          onOpenUploadModal={onOpenUploadModal}
          onOpenIntegrationModal={onOpenIntegrationModal}
          onOpenChangePhoto={onOpenChangePhoto}
          conflictsCount={conflictsCount}
        />
      );
  }
};
