export type UserRole = 
  | 'SUPER_ADMIN'
  | 'DISTRICT_ADMIN'
  | 'GIS_OFFICER'
  | 'REVENUE_OFFICER'
  | 'MUNICIPAL_OFFICER'
  | 'SURVEY_OFFICER'
  | 'FIELD_OFFICER'
  | 'DEPARTMENT_VIEWER';

export type NavigationTab = 
  | 'overview'
  | 'dashboard'
  // Common / Specialized Views
  | 'datasets'
  | 'map'
  | 'ai-integration'
  | 'spatial-matching'
  | 'conflicts'
  | 'change-detection'
  | 'ground-verification'
  | 'reports'
  | 'api-integrations'
  | 'audit-logs'
  | 'settings'
  // Super Admin Views
  | 'users'
  | 'departments'
  // Revenue Officer Views
  | 'revenue-records'
  | 'cadastral-comparison'
  | 'property-verification'
  // Municipal Officer Views
  | 'municipal-properties'
  | 'buildings'
  | 'utilities'
  // Survey Officer Views
  | 'survey-tasks'
  | 'gnss-cors'
  | 'boundary-validation'
  | 'coordinate-validation'
  // Field Officer Views
  | 'field-tasks'
  | 'field-map'
  | 'field-completed'
  // Viewer Views
  | 'viewer-map'
  | 'viewer-properties'
  | 'viewer-reports';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  department: string;
  district: string;
  municipality: string;
  status: 'active' | 'inactive' | 'pending';
  permissions: string[];
  designation?: string;
  organization?: string;
  mobile?: string;
  avatarUrl?: string;
  token?: string;
}

export const ROLE_DASHBOARD_ROUTES: Record<UserRole, string> = {
  SUPER_ADMIN: '/dashboard/super-admin',
  DISTRICT_ADMIN: '/dashboard/district-admin',
  GIS_OFFICER: '/dashboard/gis-officer',
  REVENUE_OFFICER: '/dashboard/revenue-officer',
  MUNICIPAL_OFFICER: '/dashboard/municipal-officer',
  SURVEY_OFFICER: '/dashboard/survey-officer',
  FIELD_OFFICER: '/dashboard/field-officer',
  DEPARTMENT_VIEWER: '/dashboard/viewer',
};

export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Administrator',
  DISTRICT_ADMIN: 'District Administrator',
  GIS_OFFICER: 'GIS Officer',
  REVENUE_OFFICER: 'Revenue Officer',
  MUNICIPAL_OFFICER: 'Municipal Officer',
  SURVEY_OFFICER: 'Survey / GNSS Officer',
  FIELD_OFFICER: 'Field Officer',
  DEPARTMENT_VIEWER: 'Department Viewer',
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  SUPER_ADMIN: [
    'users.manage',
    'departments.manage',
    'datasets.manage',
    'properties.manage',
    'conflicts.manage',
    'reports.export',
    'api.manage',
    'audit.view'
  ],
  DISTRICT_ADMIN: [
    'district.view',
    'datasets.manage',
    'properties.manage',
    'conflicts.manage',
    'verification.assign',
    'reports.export'
  ],
  GIS_OFFICER: [
    'datasets.upload',
    'datasets.process',
    'gis.process',
    'matching.run',
    'topology.run',
    'conflicts.view',
    'reports.export'
  ],
  REVENUE_OFFICER: [
    'revenue.view',
    'revenue.verify',
    'cadastral.view',
    'property.verify',
    'conflicts.view'
  ],
  MUNICIPAL_OFFICER: [
    'municipal.view',
    'properties.view',
    'buildings.view',
    'utilities.view',
    'changes.view',
    'conflicts.view'
  ],
  SURVEY_OFFICER: [
    'survey.view',
    'gnss.upload',
    'coordinates.validate',
    'boundary.validate',
    'verification.assign'
  ],
  FIELD_OFFICER: [
    'tasks.view',
    'verification.create',
    'gps.submit',
    'photo.upload'
  ],
  DEPARTMENT_VIEWER: [
    'properties.view',
    'maps.view',
    'reports.view'
  ]
};

export interface RoleNavItem {
  id: NavigationTab;
  label: string;
  iconName: string;
  badge?: string | number;
  badgeColor?: string;
  description?: string;
}

export interface LandDataset {
  id: string;
  name: string;
  type?: 'Cadastral' | 'Municipal' | 'Drone Imagery' | 'Revenue Khasra' | 'Utilities' | 'ORI' | 'DSM' | 'DTM' | 'GNSS/CORS' | 'Building Footprints' | 'Ground Truthing';
  source?: string;
  format: string;
  recordsCount?: number;
  records?: number;
  crs: string;
  lastUpdated?: string;
  uploadedAt?: string;
  qualityScore?: number;
  status: string;
  fileSize?: string;
  size?: string;
}

export type DatasetItem = LandDataset;

export interface ParcelCoordinate {
  x: number;
  y: number;
}

export interface LandParcel {
  id: string; // e.g. "PROP-00125"
  surveyNumber: string; // "125"
  municipalId: string; // "M458"
  revenueId: string; // "REV-8910"
  areaSqMeters: number; // 252
  status: 'Integrated' | 'Conflict' | 'Pending Verification' | 'Under Review';
  confidence: number; // 91%
  owner: string;
  fatherName?: string;
  zone: string;
  ward: string;
  district?: string;
  municipality?: string;
  landUse: 'Residential' | 'Commercial' | 'Agricultural' | 'Public Utility';
  coordinates: ParcelCoordinate[];
  center: ParcelCoordinate;
  centroidGeo: { lat: number; lng: number };
  buildingCount: number;
  utilityConnections: {
    water: boolean;
    electricity: boolean;
    drainage: boolean;
  };
  attributesMatch: {
    ownerMatch: boolean;
    areaDeviationPct: number;
    boundaryOverlapPct: number;
  };
  sources: {
    cadastral: { surveyNo: string; area: number; year?: number; owner?: string };
    municipal: { propertyNo: string; area: number; taxAssessed?: number; owner?: string };
    drone: { detectionConfidence?: number; lastFlightDate?: string; footprintArea?: number; flightDate?: string };
    revenue: { khasraNo: string; tenure: string; area?: number };
    gnss?: { lat: number; lng: number; rtkFixed: boolean; accuracyMm: number };
  };
}

export interface ConflictItem {
  id: string;
  propertyId: string;
  surveyNumber: string;
  municipalId: string;
  type: 'Boundary' | 'Area' | 'Attribute' | 'Geometry' | 'Duplicate' | 'Coordinate error' | 'Missing data';
  title: string;
  description: string;
  cadastralValue: string;
  municipalValue: string;
  differenceValue: string;
  confidence: number;
  status: 'Requires Review' | 'In Progress' | 'Resolved' | 'Escalated';
  severity: 'Warning' | 'High' | 'Critical';
  assignedTo?: string;
  dateDetected: string;
  district?: string;
}

export interface SpatialMatchItem {
  id: string;
  propertyId: string;
  cadastralRecord: {
    surveyNo: string;
    areaSqMeters: number;
    owner: string;
    subDivision: string;
    village: string;
    coordinates: string;
  };
  municipalRecord: {
    propertyNo: string;
    doorNo: string;
    areaSqMeters: number;
    owner: string;
    taxAssessmentNo: string;
    ward: string;
  };
  revenueRecord?: {
    khasraNo: string;
    khataNo: string;
    areaSqMeters: number;
    owner: string;
  };
  buildingRecord?: {
    buildingId: string;
    footprintAreaSqMeters: number;
    floors: number;
    usage: string;
  };
  overallMatch: number; // 91%
  spatialSimilarity: number; // 94%
  attributeSimilarity: number; // 88%
  geometrySimilarity: number; // 92%
  areaSimilarity: number; // 95%
  status: 'Matched' | 'Under Review' | 'Accepted' | 'Rejected';
}

export interface ChangeDetectionRecord {
  id: string;
  propertyId: string;
  title: string;
  type: 'New Building' | 'Boundary Extension' | 'Structure Demolished' | 'Encroachment' | 'Road change' | 'Land-use change';
  yearPrevious: string; // 2025
  yearCurrent: string; // 2026
  confidence: number; // 93%
  areaChangeSqMeters: number;
  description: string;
  status: 'Verified' | 'Pending Verification' | 'Dismissed';
  coordinates: { lat: number; lng: number };
}

export interface GroundVerificationRecord {
  id: string;
  propertyId: string;
  surveyNumber: string;
  location: string;
  gpsCoordinates: { lat: number; lng: number; accuracyMeters: number };
  observationNotes: string;
  verificationStatus: 'Pending' | 'Verified' | 'Needs Review' | 'Rejected' | 'Revisit Required';
  photoUrl?: string;
  officerName: string;
  timestamp: string;
  assignedOfficerId?: string;
  district?: string;
}

export interface ApiIntegrationConfig {
  id: string;
  name: string;
  description: string;
  category: 'Communication' | 'GIS' | 'Government' | 'Hardware' | 'AI' | 'Storage';
  status: 'Connected' | 'Not Configured' | 'Demo Mode';
  endpoint: string;
  authType: 'API Key' | 'Bearer Token' | 'OAuth 2.0' | 'Mutual TLS' | 'System Internal';
  maskedKey: string;
  lastPing: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  officer?: string;
  user?: string;
  role?: string;
  action?: string;
  event?: string;
  category?: 'Sync' | 'Conflict' | 'Export' | 'Verification' | 'Config' | 'Auth' | 'Security';
  details: string;
  status: 'Success' | 'Warning' | 'Info';
}

export interface LayerToggleState {
  cadastralParcels: boolean;
  buildings: boolean;
  droneImagery: boolean;
  ori: boolean;
  dsmDtm: boolean;
  municipalGis: boolean;
  revenue: boolean;
  utilities: boolean;
  gnss: boolean;
  groundTruth: boolean;
  aiFeatures: boolean;
  conflicts: boolean;
}
