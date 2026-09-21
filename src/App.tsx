import React, { useState } from 'react';
import { 
  NavigationTab, 
  LandParcel, 
  DatasetItem, 
  ConflictItem, 
  SpatialMatchItem, 
  ChangeDetectionRecord, 
  AuditLogEntry,
  UserProfile
} from './types/landsync';
import { 
  currentUser, 
  mockDatasets, 
  mockParcels, 
  mockConflicts, 
  mockSpatialMatches, 
  mockChangeRecords, 
  mockAuditLogs 
} from './data/mockData';

// Layout & Core Views
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { AuthPage } from './components/auth/AuthPage';

import { DashboardView } from './components/dashboard/DashboardView';
import { RoleDashboard } from './components/dashboard/RoleDashboard';
import { GisMapView } from './components/gis/GisMapView';
import { AiIntegrationView } from './components/ai/AiIntegrationView';
import { SpatialMatchingView } from './components/matching/SpatialMatchingView';
import { ConflictsView } from './components/conflicts/ConflictsView';
import { ChangeDetectionView } from './components/changedetection/ChangeDetectionView';
import { GroundVerificationView } from './components/groundverification/GroundVerificationView';
import { DatasetsView } from './components/datasets/DatasetsView';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';

// Role-specific Authority Views
import { SuperAdminUsersView } from './components/admin/SuperAdminUsersView';
import { RevenueRecordsView } from './components/revenue/RevenueRecordsView';
import { MunicipalPropertiesView } from './components/municipal/MunicipalPropertiesView';
import { SurveyTasksView } from './components/survey/SurveyTasksView';

// Modals
import { UploadDatasetModal } from './components/modals/UploadDatasetModal';
import { ProcessingModal } from './components/modals/ProcessingModal';
import { ParcelDetailModal } from './components/modals/ParcelDetailModal';
import { ChangePhotoModal } from './components/modals/ChangePhotoModal';

export default function App() {
  // Authentication state (default true to show working application instantly)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const savedUser = localStorage.getItem('landsync_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
      const savedAvatar = localStorage.getItem('landsync_user_avatar');
      if (savedAvatar) {
        return { ...currentUser, avatarUrl: savedAvatar };
      }
    } catch {
      // fallback to mock default
    }
    return currentUser;
  });

  // Navigation & Layout State
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Application Data States
  const [datasets, setDatasets] = useState<DatasetItem[]>(mockDatasets);
  const [parcels, setParcels] = useState<LandParcel[]>(mockParcels);
  const [conflicts, setConflicts] = useState<ConflictItem[]>(mockConflicts);
  const [spatialMatches, setSpatialMatches] = useState<SpatialMatchItem[]>(mockSpatialMatches);
  const [changeRecords, setChangeRecords] = useState<ChangeDetectionRecord[]>(mockChangeRecords);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(mockAuditLogs);

  // Selected Parcel (for Map & Details)
  const [selectedParcel, setSelectedParcel] = useState<LandParcel>(mockParcels[0]);

  // Modal States
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isParcelDetailModalOpen, setIsParcelDetailModalOpen] = useState(false);
  const [isChangePhotoModalOpen, setIsChangePhotoModalOpen] = useState(false);
  const [isEngineProcessing, setIsEngineProcessing] = useState(false);

  // User Profile & Photo management
  const handleUpdateAvatar = (newAvatarUrl: string) => {
    setUser((prev) => {
      const updated = { ...prev, avatarUrl: newAvatarUrl };
      try {
        localStorage.setItem('landsync_user_avatar', newAvatarUrl);
        localStorage.setItem('landsync_user', JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not cache user avatar', err);
      }
      return updated;
    });

    // Append to audit logs
    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      action: 'PROFILE_PHOTO_UPDATED',
      user: user.name,
      timestamp: 'Just now',
      details: 'Authorized officer portrait updated in system registry.',
      status: 'Success'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    try {
      localStorage.setItem('landsync_user', JSON.stringify(updatedUser));
      if (updatedUser.avatarUrl) {
        localStorage.setItem('landsync_user_avatar', updatedUser.avatarUrl);
      }
    } catch (err) {
      console.warn('Could not cache user credentials', err);
    }
  };

  // Notification badge counts
  const conflictsCount = conflicts.filter((c) => c.status === 'Requires Review').length;

  // Actions
  const handleSelectParcel = (parcel: LandParcel) => {
    setSelectedParcel(parcel);
  };

  const handleViewFullRecord = (parcel: LandParcel) => {
    setSelectedParcel(parcel);
    setIsParcelDetailModalOpen(true);
  };

  const handleReportConflict = (parcel: LandParcel) => {
    setSelectedParcel(parcel);
    setActiveTab('conflicts');
  };

  const handleStartGroundVerification = (parcel: LandParcel) => {
    setSelectedParcel(parcel);
    setActiveTab('ground-verification');
  };

  const handleUploadSuccess = (newDataset: DatasetItem) => {
    setDatasets((prev) => [newDataset, ...prev]);
    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      event: 'Dataset Ingestion',
      user: user.name,
      details: `Ingested ${newDataset.name} (${newDataset.format}, ${newDataset.crs})`,
      status: 'Success',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleAcceptMatch = (matchId: string) => {
    setSpatialMatches((prev) => prev.filter((m) => m.id !== matchId));
    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      event: 'Spatial Match Accepted',
      user: user.name,
      details: `Manual confirmation of conflated parcel match ${matchId}`,
      status: 'Success',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleRejectMatch = (matchId: string) => {
    setSpatialMatches((prev) => prev.filter((m) => m.id !== matchId));
  };

  const handleResolveConflict = (conflict: ConflictItem) => {
    setConflicts((prev) => prev.filter((c) => c.id !== conflict.id));
    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      event: 'Conflict Resolved',
      user: user.name,
      details: `Resolved ${conflict.type} dispute for ${conflict.propertyId}`,
      status: 'Success',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleApproveGroundVerification = () => {
    // Update parcel status to integrated
    setParcels((prev) =>
      prev.map((p) =>
        p.id === selectedParcel.id
          ? { ...p, status: 'Integrated', confidence: 98 }
          : p
      )
    );
    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      event: 'Ground RTK Verified',
      user: user.name,
      details: `Field validation approved for ${selectedParcel.id}`,
      status: 'Success',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    setActiveTab('map');
  };

  const handleGlobalSearch = (query: string) => {
    const found = parcels.find(
      (p) =>
        p.id.toLowerCase().includes(query.toLowerCase()) ||
        p.surveyNumber.includes(query) ||
        p.municipalId.toLowerCase().includes(query.toLowerCase())
    );
    if (found) {
      setSelectedParcel(found);
      setActiveTab('map');
    }
  };

  // If logged out, show the auth screen
  if (!isAuthenticated) {
    return (
      <AuthPage
        onLoginSuccess={(loggedInUser: UserProfile) => {
          setUser(loggedInUser);
          setIsAuthenticated(true);
          try {
            localStorage.setItem('landsync_user', JSON.stringify(loggedInUser));
            if (loggedInUser.avatarUrl) {
              localStorage.setItem('landsync_user_avatar', loggedInUser.avatarUrl);
            }
          } catch (err) {
            console.warn('Could not store logged in user', err);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A] antialiased">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={activeTab}
        user={user}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenIntegrationModal={() => setIsProcessingModalOpen(true)}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isSidebarCollapsed={isSidebarCollapsed}
        onGlobalSearch={handleGlobalSearch}
        conflictsCount={conflictsCount}
        onChangePhoto={() => setIsChangePhotoModalOpen(true)}
      />

      {/* Main Application Shell */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar (Left) */}
        <Sidebar
          currentTab={activeTab}
          onSelectTab={(tab: NavigationTab) => setActiveTab(tab)}
          user={user}
          onLogout={() => setIsAuthenticated(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          conflictsCount={conflictsCount}
          onChangePhoto={() => setIsChangePhotoModalOpen(true)}
        />

        {/* Dynamic Center/Right Content Area */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
          {(activeTab === 'overview' || activeTab === 'dashboard') && (
            <RoleDashboard
              user={user}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenUploadModal={() => setIsUploadModalOpen(true)}
              onOpenIntegrationModal={() => setIsProcessingModalOpen(true)}
              conflictsCount={conflictsCount}
              conflicts={conflicts}
              onOpenChangePhoto={() => setIsChangePhotoModalOpen(true)}
            />
          )}

          {/* Super Admin & District Admin Authority Views */}
          {(activeTab === 'users' || activeTab === 'departments') && (
            <SuperAdminUsersView 
              currentUser={user} 
              onOpenCreateAuthorityModal={() => setIsChangePhotoModalOpen(true)}
            />
          )}

          {/* Revenue Officer Specialized Views */}
          {(activeTab === 'revenue-records' || activeTab === 'cadastral-comparison' || activeTab === 'property-verification') && (
            <RevenueRecordsView
              user={user}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {/* Municipal Officer Specialized Views */}
          {(activeTab === 'municipal-properties' || activeTab === 'buildings' || activeTab === 'utilities' || activeTab === 'viewer-properties') && (
            <MunicipalPropertiesView
              user={user}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {/* Survey Officer Specialized Views */}
          {(activeTab === 'survey-tasks' || activeTab === 'gnss-cors' || activeTab === 'boundary-validation' || activeTab === 'coordinate-validation') && (
            <SurveyTasksView
              user={user}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {/* Field Officer Views */}
          {(activeTab === 'field-tasks' || activeTab === 'field-completed') && (
            <GroundVerificationView
              parcel={selectedParcel}
              onApprove={handleApproveGroundVerification}
              onFlagResurvey={() => {
                alert(`Task order dispatched to Survey of India rover for ${selectedParcel.id}`);
                setActiveTab('map');
              }}
            />
          )}

          {/* GIS Map & Field/Viewer Map Views */}
          {(activeTab === 'map' || activeTab === 'field-map' || activeTab === 'viewer-map') && (
            <GisMapView
              parcels={parcels}
              selectedParcel={selectedParcel}
              onSelectParcel={handleSelectParcel}
              onViewFullRecord={handleViewFullRecord}
              onReportConflict={handleReportConflict}
              onStartGroundVerification={handleStartGroundVerification}
            />
          )}

          {activeTab === 'ai-integration' && (
            <AiIntegrationView
              onOpenProcessingModal={() => setIsProcessingModalOpen(true)}
              isProcessing={isEngineProcessing}
              processingProgress={87}
            />
          )}

          {activeTab === 'spatial-matching' && (
            <SpatialMatchingView
              matches={spatialMatches}
              onAccept={handleAcceptMatch}
              onReject={handleRejectMatch}
            />
          )}

          {activeTab === 'conflicts' && (
            <ConflictsView
              conflicts={conflicts}
              onViewOnMap={(propId) => {
                const p = parcels.find((item) => item.id === propId);
                if (p) setSelectedParcel(p);
                setActiveTab('map');
              }}
              onCompare={(propId) => {
                setActiveTab('spatial-matching');
              }}
              onResolve={handleResolveConflict}
            />
          )}

          {activeTab === 'change-detection' && (
            <ChangeDetectionView
              records={changeRecords}
              onVerifyChange={(record) => {
                const p = parcels.find((item) => item.id === record.propertyId);
                if (p) setSelectedParcel(p);
                setActiveTab('ground-verification');
              }}
            />
          )}

          {activeTab === 'ground-verification' && (
            <GroundVerificationView
              parcel={selectedParcel}
              onApprove={handleApproveGroundVerification}
              onFlagResurvey={() => {
                alert(`Task order dispatched to Survey of India rover for ${selectedParcel.id}`);
                setActiveTab('map');
              }}
            />
          )}

          {activeTab === 'datasets' && (
            <DatasetsView
              datasets={datasets}
              onOpenUploadModal={() => setIsUploadModalOpen(true)}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView logs={auditLogs} />
          )}

          {activeTab === 'audit-logs' && (
            <ReportsView logs={auditLogs} />
          )}

          {activeTab === 'settings' && (
            <SettingsView 
              user={user} 
              onOpenChangePhoto={() => setIsChangePhotoModalOpen(true)}
              onUpdateAvatar={handleUpdateAvatar}
              onUpdateUser={handleUpdateUser}
            />
          )}
        </main>
      </div>

      {/* Mobile Navigation & Drawer */}
      <MobileNav
        currentTab={activeTab}
        onSelectTab={(tab: NavigationTab) => setActiveTab(tab)}
        user={user}
        onLogout={() => setIsAuthenticated(false)}
        conflictsCount={conflictsCount}
        onChangePhoto={() => setIsChangePhotoModalOpen(true)}
      />

      {/* UPLOAD DATASET MODAL */}
      <UploadDatasetModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* PROCESSING MODAL */}
      <ProcessingModal
        isOpen={isProcessingModalOpen}
        onClose={() => setIsProcessingModalOpen(false)}
        onComplete={() => {
          setActiveTab('map');
        }}
      />

      {/* PARCEL DETAIL FULL RECORD MODAL */}
      <ParcelDetailModal
        parcel={isParcelDetailModalOpen ? selectedParcel : null}
        onClose={() => setIsParcelDetailModalOpen(false)}
        onStartVerification={handleStartGroundVerification}
      />

      {/* CHANGE PROFILE PHOTO MODAL */}
      <ChangePhotoModal
        isOpen={isChangePhotoModalOpen}
        onClose={() => setIsChangePhotoModalOpen(false)}
        user={user}
        onUpdateAvatar={handleUpdateAvatar}
      />

    </div>
  );
}
