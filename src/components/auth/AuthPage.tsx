import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Layers, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Lock, 
  Building2, 
  Briefcase, 
  UserCheck, 
  Sparkles,
  RefreshCw,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  Check,
  Landmark,
  Satellite,
  Smartphone
} from 'lucide-react';
import { UserProfile, UserRole, ROLE_PERMISSIONS, ROLE_LABELS } from '../../types/landsync';

interface AuthPageProps {
  onLoginSuccess: (user: UserProfile) => void;
}

// 8 Pre-configured government officer profiles representing each authority role
export const DEMO_OFFICER_PROFILES: UserProfile[] = [
  {
    id: 'usr-super-01',
    name: 'Dr. Rajeshwar Rao, IAS',
    role: 'SUPER_ADMIN',
    phone: '+91 98765 43210',
    mobile: '+91 98765 43210',
    email: 'rajeshwar.ias@landsync.gov.in',
    organization: 'State Ministry of Land Administration & IT',
    department: 'State Geospatial Data Directorate',
    designation: 'Super Administrator / State Secretary',
    district: 'State-wide (All Districts)',
    municipality: 'All Municipalities',
    status: 'active',
    permissions: ROLE_PERMISSIONS.SUPER_ADMIN,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-dist-01',
    name: 'Smt. P. Vani Prasad, IAS',
    role: 'DISTRICT_ADMIN',
    phone: '+91 98765 43211',
    mobile: '+91 98765 43211',
    email: 'collector.hyd@landsync.gov.in',
    organization: 'District Collectorate & Land Administration',
    department: 'Revenue & Municipal Administration',
    designation: 'District Collector & Magistrate',
    district: 'Hyderabad District',
    municipality: 'GHMC (All Circles)',
    status: 'active',
    permissions: ROLE_PERMISSIONS.DISTRICT_ADMIN,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-gis-01',
    name: 'A. K. Sharma',
    role: 'GIS_OFFICER',
    phone: '+91 98480 22345',
    mobile: '+91 98480 22345',
    email: 'ak.sharma.gis@gov.in',
    organization: 'State Directorate of Land Records & Survey',
    department: 'Urban Geospatial Information Unit',
    designation: 'Senior GIS & Cartography Specialist',
    district: 'Hyderabad',
    municipality: 'GHMC Circle 5',
    status: 'active',
    permissions: ROLE_PERMISSIONS.GIS_OFFICER,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-rev-01',
    name: 'B. Venkat Reddy',
    role: 'REVENUE_OFFICER',
    phone: '+91 94401 55678',
    mobile: '+91 94401 55678',
    email: 'tahsildar.khairatabad@gov.in',
    organization: 'Department of Revenue & Land Records',
    department: 'Tahsildar & Sub-Divisional Wing',
    designation: 'Tahsildar & Executive Magistrate',
    district: 'Hyderabad',
    municipality: 'Khairatabad Mandal',
    status: 'active',
    permissions: ROLE_PERMISSIONS.REVENUE_OFFICER,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-mun-01',
    name: 'K. Sunitha',
    role: 'MUNICIPAL_OFFICER',
    phone: '+91 98112 44321',
    mobile: '+91 98112 44321',
    email: 'sunitha.ghmc@ulb.gov.in',
    organization: 'Greater Hyderabad Municipal Corporation',
    department: 'Town Planning & Property Tax Assessment',
    designation: 'Chief Town Planning Officer',
    district: 'Hyderabad',
    municipality: 'GHMC Circle 5 (Khairatabad)',
    status: 'active',
    permissions: ROLE_PERMISSIONS.MUNICIPAL_OFFICER,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-srv-01',
    name: 'M. Sreenivasa Rao',
    role: 'SURVEY_OFFICER',
    phone: '+91 98230 11223',
    mobile: '+91 98230 11223',
    email: 'sreenivas.survey@gov.in',
    organization: 'Department of Survey & Land Records',
    department: 'Geodetic & CORS Reference Wing',
    designation: 'Principal GNSS/CORS Geodetic Surveyor',
    district: 'Hyderabad',
    municipality: 'Central Division',
    status: 'active',
    permissions: ROLE_PERMISSIONS.SURVEY_OFFICER,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-fld-01',
    name: 'R. Naresh Kumar',
    role: 'FIELD_OFFICER',
    phone: '+91 99887 66554',
    mobile: '+91 99887 66554',
    email: 'naresh.field@gov.in',
    organization: 'Field Inspection & Cadastral Verification Wing',
    department: 'Ground Truth & Rover Operations',
    designation: 'Field Inspection Rover Inspector',
    district: 'Hyderabad',
    municipality: 'Ward 84 (Banjara Hills)',
    status: 'active',
    permissions: ROLE_PERMISSIONS.FIELD_OFFICER,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-viw-01',
    name: 'Ananya Deshmukh',
    role: 'DEPARTMENT_VIEWER',
    phone: '+91 98765 12345',
    mobile: '+91 98765 12345',
    email: 'ananya.viewer@gov.in',
    organization: 'Urban Development & Audit Wing',
    department: 'Inter-Departmental Inquiry Wing',
    designation: 'Department Officer (Read-Only)',
    district: 'Hyderabad District',
    municipality: 'GHMC Area',
    status: 'active',
    permissions: ROLE_PERMISSIONS.DEPARTMENT_VIEWER,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  }
];

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [authStep, setAuthStep] = useState<'form' | 'otp' | 'success'>('form');
  
  // Pending profile to activate upon OTP or direct verification
  const [pendingProfile, setPendingProfile] = useState<UserProfile | null>(null);

  // Sign-in state
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signinRole, setSigninRole] = useState<UserRole>('GIS_OFFICER');
  const [signinError, setSigninError] = useState<string | null>(null);

  // Sign-up form state
  const [fullName, setFullName] = useState('');
  const [org, setOrg] = useState('State Directorate of Land Records & Survey');
  const [department, setDepartment] = useState('Urban Geospatial Information Unit');
  const [designation, setDesignation] = useState('Senior GIS & Cartography Specialist');
  const [district, setDistrict] = useState('Hyderabad');
  const [municipality, setMunicipality] = useState('GHMC Circle 5');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [role, setRole] = useState<UserRole>('GIS_OFFICER');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState<string | null>(null);

  // OTP state
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(27);
  const [isVerifying, setIsVerifying] = useState(false);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Update default organization, department, and designation when role changes
  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    switch (newRole) {
      case 'SUPER_ADMIN':
        setOrg('State Ministry of Land Administration & IT');
        setDepartment('State Geospatial Data Directorate');
        setDesignation('Super Administrator / State Secretary');
        setDistrict('State-wide (All Districts)');
        setMunicipality('All Municipalities');
        break;
      case 'DISTRICT_ADMIN':
        setOrg('District Collectorate & Land Administration');
        setDepartment('Revenue, Land Records & Municipal Administration');
        setDesignation('District Collector & Magistrate');
        setDistrict('Hyderabad District');
        setMunicipality('GHMC (All Circles)');
        break;
      case 'GIS_OFFICER':
        setOrg('State Directorate of Land Records & Survey');
        setDepartment('Urban Geospatial Information Unit');
        setDesignation('Senior GIS & Cartography Specialist');
        setDistrict('Hyderabad');
        setMunicipality('GHMC Circle 5');
        break;
      case 'REVENUE_OFFICER':
        setOrg('Department of Revenue & Land Records');
        setDepartment('Tahsildar & Sub-Divisional Wing');
        setDesignation('Tahsildar & Executive Magistrate');
        setDistrict('Hyderabad');
        setMunicipality('Khairatabad Mandal');
        break;
      case 'MUNICIPAL_OFFICER':
        setOrg('Greater Hyderabad Municipal Corporation (GHMC)');
        setDepartment('Town Planning & Property Tax Assessment');
        setDesignation('Chief Town Planning Officer');
        setDistrict('Hyderabad');
        setMunicipality('GHMC Circle 5 (Khairatabad)');
        break;
      case 'SURVEY_OFFICER':
        setOrg('Department of Survey, Settlement & Land Records');
        setDepartment('Geodetic & CORS Reference Wing');
        setDesignation('Principal GNSS/CORS Geodetic Surveyor');
        setDistrict('Hyderabad');
        setMunicipality('Central Division');
        break;
      case 'FIELD_OFFICER':
        setOrg('Field Inspection & Cadastral Verification Wing');
        setDepartment('Ground Truth & Rover Operations');
        setDesignation('Field Inspection Rover Inspector');
        setDistrict('Hyderabad');
        setMunicipality('Ward 84 (Banjara Hills)');
        break;
      case 'DEPARTMENT_VIEWER':
        setOrg('Urban Development Authority & Public Audit');
        setDepartment('Inter-Departmental Inquiry Wing');
        setDesignation('Department Officer (Read-Only)');
        setDistrict('Hyderabad District');
        setMunicipality('GHMC Area');
        break;
    }
  };

  // Helper to retrieve saved registered users from localStorage
  const getRegisteredUsers = (): UserProfile[] => {
    try {
      const stored = localStorage.getItem('landsync_registered_users');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Helper to save a newly registered user
  const saveRegisteredUser = (newUser: UserProfile) => {
    try {
      const existing = getRegisteredUsers();
      const cleanMobile = newUser.phone.replace(/\D/g, '').slice(-10);
      const filtered = existing.filter(u => {
        const uMobile = (u.phone || u.mobile || '').replace(/\D/g, '').slice(-10);
        return uMobile !== cleanMobile && u.email.toLowerCase() !== newUser.email.toLowerCase();
      });
      filtered.push(newUser);
      localStorage.setItem('landsync_registered_users', JSON.stringify(filtered));
    } catch (e) {
      console.warn('Could not save user to registered list', e);
    }
  };

  // Countdown timer for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (authStep === 'otp' && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [authStep, timerSeconds]);

  // Start WhatsApp OTP for Sign In
  const handleStartSignInWhatsApp = () => {
    const rawDigits = mobileNumber.replace(/\D/g, '');
    if (rawDigits.length < 10) {
      setSigninError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setSigninError(null);

    // Check if this mobile is already registered
    const registered = getRegisteredUsers();
    const cleanMobile = rawDigits.slice(-10);
    const existing = registered.find(u => (u.phone || u.mobile || '').replace(/\D/g, '').slice(-10) === cleanMobile);

    let targetProfile: UserProfile;
    if (existing) {
      targetProfile = existing;
    } else {
      // Find matching demo profile or create fresh profile with chosen role
      const matchingDemo = DEMO_OFFICER_PROFILES.find(d => d.role === signinRole) || DEMO_OFFICER_PROFILES[2];
      targetProfile = {
        id: `usr-${signinRole.toLowerCase()}-${cleanMobile.slice(-4)}`,
        name: matchingDemo.name,
        role: signinRole,
        phone: `+91 ${cleanMobile}`,
        mobile: `+91 ${cleanMobile}`,
        email: email || matchingDemo.email,
        organization: matchingDemo.organization,
        department: matchingDemo.department,
        designation: matchingDemo.designation,
        district: matchingDemo.district,
        municipality: matchingDemo.municipality,
        status: 'active',
        permissions: ROLE_PERMISSIONS[signinRole],
        avatarUrl: matchingDemo.avatarUrl,
      };
    }

    setPendingProfile(targetProfile);
    setOtp(['', '', '', '', '', '']);
    setTimerSeconds(27);
    setAuthStep('otp');
    setTimeout(() => {
      otpInputsRef.current[0]?.focus();
    }, 150);
  };

  // Submit standard Email + Password sign in
  const handleStandardSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSigninError(null);

    const inputEmail = email.trim().toLowerCase();
    const rawMobile = mobileNumber.replace(/\D/g, '').slice(-10);

    // Look for matching user in registered accounts
    const registered = getRegisteredUsers();
    const foundUser = registered.find(
      u => (inputEmail && u.email.toLowerCase() === inputEmail) || 
           (rawMobile && (u.phone || u.mobile || '').replace(/\D/g, '').slice(-10) === rawMobile)
    );

    if (foundUser) {
      onLoginSuccess(foundUser);
      return;
    }

    // Otherwise find demo profile or build signed in profile with chosen role
    const matchingDemo = DEMO_OFFICER_PROFILES.find(d => d.role === signinRole) || DEMO_OFFICER_PROFILES[2];
    const newProfile: UserProfile = {
      id: `usr-${signinRole.toLowerCase()}-${Date.now().toString().slice(-4)}`,
      name: matchingDemo.name,
      role: signinRole,
      phone: rawMobile ? `+91 ${rawMobile}` : matchingDemo.phone,
      mobile: rawMobile ? `+91 ${rawMobile}` : matchingDemo.phone,
      email: inputEmail || matchingDemo.email,
      organization: matchingDemo.organization,
      department: matchingDemo.department,
      designation: matchingDemo.designation,
      district: matchingDemo.district,
      municipality: matchingDemo.municipality,
      status: 'active',
      permissions: ROLE_PERMISSIONS[signinRole],
      avatarUrl: matchingDemo.avatarUrl,
    };

    onLoginSuccess(newProfile);
  };

  // Sign up form validation and preparation for OTP
  const handleStartSignUpOtp = () => {
    if (!fullName.trim()) {
      setSignupError('Please enter your full name.');
      return;
    }
    const rawDigits = signupMobile.replace(/\D/g, '');
    if (rawDigits.length < 10) {
      setSignupError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setSignupError(null);

    const demoForRole = DEMO_OFFICER_PROFILES.find(d => d.role === role);
    const chosenAvatar = demoForRole?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

    const newCreatedUser: UserProfile = {
      id: `usr-${role.toLowerCase()}-${Date.now().toString().slice(-4)}`,
      name: fullName.trim(),
      role: role,
      phone: `+91 ${rawDigits.slice(-10)}`,
      mobile: `+91 ${rawDigits.slice(-10)}`,
      email: signupEmail.trim() || `${fullName.trim().toLowerCase().replace(/\s+/g, '.')}@landsync.gov.in`,
      organization: org.trim(),
      department: department.trim(),
      designation: designation.trim(),
      district: district.trim() || 'Hyderabad',
      municipality: municipality.trim() || 'GHMC Circle 5',
      status: 'active',
      permissions: ROLE_PERMISSIONS[role],
      avatarUrl: chosenAvatar,
    };

    saveRegisteredUser(newCreatedUser);
    setPendingProfile(newCreatedUser);

    setOtp(['', '', '', '', '', '']);
    setTimerSeconds(27);
    setAuthStep('otp');
    setTimeout(() => {
      otpInputsRef.current[0]?.focus();
    }, 150);
  };

  // Direct instant registration without OTP waiting
  const handleInstantCreateAccount = () => {
    if (!fullName.trim()) {
      setSignupError('Please enter your full name.');
      return;
    }
    const rawDigits = signupMobile.replace(/\D/g, '');
    if (rawDigits.length < 10) {
      setSignupError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setSignupError(null);

    const demoForRole = DEMO_OFFICER_PROFILES.find(d => d.role === role);
    const chosenAvatar = demoForRole?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

    const newCreatedUser: UserProfile = {
      id: `usr-${role.toLowerCase()}-${Date.now().toString().slice(-4)}`,
      name: fullName.trim(),
      role: role,
      phone: `+91 ${rawDigits.slice(-10)}`,
      mobile: `+91 ${rawDigits.slice(-10)}`,
      email: signupEmail.trim() || `${fullName.trim().toLowerCase().replace(/\s+/g, '.')}@landsync.gov.in`,
      organization: org.trim(),
      department: department.trim(),
      designation: designation.trim(),
      district: district.trim() || 'Hyderabad',
      municipality: municipality.trim() || 'GHMC Circle 5',
      status: 'active',
      permissions: ROLE_PERMISSIONS[role],
      avatarUrl: chosenAvatar,
    };

    saveRegisteredUser(newCreatedUser);
    onLoginSuccess(newCreatedUser);
  };

  // OTP inputs handling
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto advance
    if (val && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Auto-fill OTP helper
  const handleAutoFillOtp = () => {
    const sample = ['8', '4', '2', '9', '1', '7'];
    setOtp(sample);
  };

  const handleVerifyOtp = () => {
    if (!pendingProfile) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setAuthStep('success');
      setTimeout(() => {
        onLoginSuccess(pendingProfile);
      }, 600);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-3 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-[#FFFFFF] rounded-2xl shadow-md border border-[#E2E8F0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
        
        {/* LEFT SIDE: Instant Authority Profile Selection Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#EFF6FF] via-[#DBEAFE]/30 to-[#FFFFFF] p-6 lg:p-8 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#E2E8F0] overflow-hidden">
          
          {/* Top Brand Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-[#0F172A] font-heading">
                  Land<span className="text-[#2563EB]">Sync</span>
                </span>
                <span className="block text-[11px] font-medium text-[#64748B]">
                  State Geospatial Integration Portal
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                Role-Based Authority Access
              </div>
              <p className="text-xs text-[#64748B] mt-2">
                Click any official role profile below to test its customized dashboard, data permissions, and workspace:
              </p>
            </div>
          </div>

          {/* Quick 1-Click Role Profiles List */}
          <div className="my-4 relative z-10 space-y-2 overflow-y-auto max-h-[380px] pr-1">
            {DEMO_OFFICER_PROFILES.map((profile) => (
              <button
                key={profile.id}
                id={`btn-login-as-${profile.role.toLowerCase()}`}
                type="button"
                onClick={() => onLoginSuccess(profile)}
                className="w-full p-2.5 rounded-xl bg-white/95 hover:bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-left transition-all shadow-2xs hover:shadow-xs group flex items-center justify-between gap-2.5 cursor-pointer"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-9 h-9 rounded-xl object-cover border border-[#E2E8F0] shrink-0"
                  />
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#0F172A] truncate group-hover:text-[#2563EB]">
                        {profile.name}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#2563EB] font-bold">
                      {ROLE_LABELS[profile.role]}
                    </div>
                    <div className="text-[10px] text-[#64748B] truncate">
                      {profile.district} • {profile.department}
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>

          {/* Bottom Trust Badge */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#E2E8F0]/60 text-[11px] text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>OGC Compliant (WFS/WMS)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>EPSG:32644 (UTM 44N)</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Authentication & Account Creation Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center bg-[#FFFFFF]">
          
          {/* STEP 1: FORM VIEW (SIGN IN / CREATE ACCOUNT) */}
          {authStep === 'form' && (
            <div className="max-w-md w-full mx-auto">
              
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading">
                  {authTab === 'signin' ? 'Official Authority Sign In' : 'Create New Authority Account'}
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  {authTab === 'signin' 
                    ? 'Log into LandSync with your mobile number, role, or registered account' 
                    : 'Register your official profile to receive authorized role-based credentials'}
                </p>
              </div>

              {/* Tabs [ Sign In ] [ Create Account ] */}
              <div className="flex p-1 bg-[#F1F5F9] rounded-xl mb-4">
                <button
                  id="tab-signin-btn"
                  type="button"
                  onClick={() => {
                    setAuthTab('signin');
                    setSigninError(null);
                    setSignupError(null);
                  }}
                  className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authTab === 'signin'
                      ? 'bg-[#FFFFFF] text-[#2563EB] shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  id="tab-signup-btn"
                  type="button"
                  onClick={() => {
                    setAuthTab('signup');
                    setSigninError(null);
                    setSignupError(null);
                  }}
                  className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authTab === 'signup'
                      ? 'bg-[#FFFFFF] text-[#2563EB] shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Create Account</span>
                </button>
              </div>

              {/* SIGN IN VIEW */}
              {authTab === 'signin' && (
                <div className="space-y-3.5">
                  {signinError && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
                      {signinError}
                    </div>
                  )}

                  {/* Role Selector for Sign In */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Authority Role *
                    </label>
                    <select
                      id="signin-role-select"
                      value={signinRole}
                      onChange={(e) => setSigninRole(e.target.value as UserRole)}
                      className="w-full px-3.5 py-2.5 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:outline-hidden bg-white"
                    >
                      <option value="SUPER_ADMIN">Super Administrator (State-wide IT &amp; Policy)</option>
                      <option value="DISTRICT_ADMIN">District Administrator (Collectorate &amp; Land Admin)</option>
                      <option value="GIS_OFFICER">GIS Officer (Directorate of Land Records &amp; Survey)</option>
                      <option value="REVENUE_OFFICER">Revenue Officer (Tahsildar &amp; Khasra Passbooks)</option>
                      <option value="MUNICIPAL_OFFICER">Municipal Officer (Town Planning &amp; PTIN)</option>
                      <option value="SURVEY_OFFICER">Survey / GNSS Officer (Geodetic &amp; CORS)</option>
                      <option value="FIELD_OFFICER">Field Officer (Ground Verification &amp; RTK)</option>
                      <option value="DEPARTMENT_VIEWER">Department Viewer (Read-Only Certified Access)</option>
                    </select>
                  </div>

                  {/* Mobile Number Field */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Registered Mobile Number
                    </label>
                    <div className="flex rounded-xl border border-[#E2E8F0] overflow-hidden focus-within:ring-2 focus-within:ring-[#2563EB]/20 focus-within:border-[#2563EB] transition-all bg-[#FFFFFF]">
                      <div className="bg-[#F8FAFC] px-3.5 py-2.5 text-xs font-semibold text-[#64748B] border-r border-[#E2E8F0] flex items-center">
                        +91
                      </div>
                      <input
                        id="signin-mobile-input"
                        type="tel"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Enter 10-digit mobile (e.g. 98480 22345)"
                        className="flex-1 px-3.5 py-2.5 text-xs text-[#0F172A] focus:outline-hidden font-mono"
                      />
                    </div>
                  </div>

                  {/* Primary WhatsApp / OTP Button */}
                  <button
                    id="btn-continue-whatsapp"
                    type="button"
                    onClick={handleStartSignInWhatsApp}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-medium text-xs transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.146-.539-1.854-.769-3.033-2.659-3.125-2.783-.092-.123-.746-.992-.746-1.892 0-.9.47-1.342.637-1.524.167-.183.366-.228.488-.228.122 0 .245.001.352.006.113.006.264-.043.413.315.153.366.522 1.272.568 1.364.046.091.077.198.016.32-.061.122-.092.198-.184.305-.091.107-.193.24-.275.321-.092.092-.187.191-.081.374.107.183.475.784 1.02 1.269.702.624 1.294.818 1.478.91.183.091.29.076.397-.046.107-.122.458-.533.58-.716.122-.183.244-.153.412-.091.168.061 1.069.504 1.252.595.183.092.305.137.351.214.046.076.046.443-.098.848z"/>
                    </svg>
                    <span>Sign In via WhatsApp OTP</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Divider: OR */}
                  <div className="relative my-2 flex items-center justify-center">
                    <div className="border-t border-[#E2E8F0] w-full"></div>
                    <span className="bg-[#FFFFFF] px-3 text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider relative">
                      OR EMAIL CREDENTIALS
                    </span>
                  </div>

                  {/* Email & Password Form */}
                  <form onSubmit={handleStandardSignIn} className="space-y-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                        Official Government Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
                        <input
                          id="signin-email-input"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="officer.name@gov.in"
                          className="w-full pl-9 pr-3 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:outline-hidden transition-all bg-[#FFFFFF]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
                        <input
                          id="signin-password-input"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          className="w-full pl-9 pr-9 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:outline-hidden transition-all bg-[#FFFFFF]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2 text-[#94A3B8] hover:text-[#64748B]"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      id="btn-submit-signin"
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
                    >
                      Sign In as {ROLE_LABELS[signinRole]}
                    </button>
                  </form>

                  <div className="text-center pt-1 text-xs text-[#64748B]">
                    Need a custom officer profile?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthTab('signup')}
                      className="text-[#2563EB] font-semibold hover:underline cursor-pointer"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              )}

              {/* SIGN UP VIEW (CREATE ACCOUNT) */}
              {authTab === 'signup' && (
                <div className="space-y-3">
                  {signupError && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
                      {signupError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Full Officer Name *
                    </label>
                    <input
                      id="signup-name-input"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Venkatramana Reddy"
                      className="w-full px-3 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:outline-hidden"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                        Mobile Number *
                      </label>
                      <div className="flex rounded-xl border border-[#E2E8F0] overflow-hidden focus-within:ring-2 focus-within:ring-[#2563EB]/20 focus-within:border-[#2563EB]">
                        <span className="bg-[#F8FAFC] px-2.5 py-2 text-xs font-semibold text-[#64748B] border-r border-[#E2E8F0]">
                          +91
                        </span>
                        <input
                          id="signup-mobile-input"
                          type="tel"
                          maxLength={10}
                          value={signupMobile}
                          onChange={(e) => setSignupMobile(e.target.value)}
                          placeholder="98480 22345"
                          className="w-full px-2.5 py-2 text-xs text-[#0F172A] focus:outline-hidden font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                        Assigned Role *
                      </label>
                      <select
                        id="signup-role-select"
                        value={role}
                        onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                        className="w-full px-3 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:outline-hidden bg-white"
                      >
                        <option value="SUPER_ADMIN">Super Administrator</option>
                        <option value="DISTRICT_ADMIN">District Administrator</option>
                        <option value="GIS_OFFICER">GIS Officer</option>
                        <option value="REVENUE_OFFICER">Revenue Officer</option>
                        <option value="MUNICIPAL_OFFICER">Municipal Officer</option>
                        <option value="SURVEY_OFFICER">Survey / GNSS Officer</option>
                        <option value="FIELD_OFFICER">Field Officer</option>
                        <option value="DEPARTMENT_VIEWER">Department Viewer</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                        District Scope *
                      </label>
                      <input
                        id="signup-district-input"
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="e.g. Hyderabad"
                        className="w-full px-3 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                        Municipality / Circle Scope *
                      </label>
                      <input
                        id="signup-municipality-input"
                        type="text"
                        value={municipality}
                        onChange={(e) => setMunicipality(e.target.value)}
                        placeholder="e.g. GHMC Circle 5"
                        className="w-full px-3 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                        Department
                      </label>
                      <input
                        id="signup-dept-input"
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-3 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                        Designation
                      </label>
                      <input
                        id="signup-desig-input"
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="w-full px-3 py-2 text-xs text-[#0F172A] rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Two action buttons: Instant Create or WhatsApp OTP */}
                  <div className="pt-2 space-y-2">
                    <button
                      id="btn-signup-instant"
                      type="button"
                      onClick={handleInstantCreateAccount}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Create Account &amp; Enter As {ROLE_LABELS[role]}</span>
                    </button>

                    <button
                      id="btn-signup-whatsapp-otp"
                      type="button"
                      onClick={handleStartSignUpOtp}
                      className="w-full py-2 px-3 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE]/70 border border-[#DBEAFE] text-[#1D4ED8] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Verify &amp; Create via WhatsApp OTP</span>
                    </button>
                  </div>

                  <div className="text-center pt-1 text-xs text-[#64748B]">
                    Already have an authorized profile?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthTab('signin')}
                      className="text-[#2563EB] font-semibold hover:underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: WHATSAPP OTP VERIFICATION SCREEN */}
          {authStep === 'otp' && (
            <div className="max-w-md w-full mx-auto text-center">
              
              <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <svg className="w-7 h-7 fill-[#2563EB]" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.146-.539-1.854-.769-3.033-2.659-3.125-2.783-.092-.123-.746-.992-.746-1.892 0-.9.47-1.342.637-1.524.167-.183.366-.228.488-.228.122 0 .245.001.352.006.113.006.264-.043.413.315.153.366.522 1.272.568 1.364.046.091.077.198.016.32-.061.122-.092.198-.184.305-.091.107-.193.24-.275.321-.092.092-.187.191-.081.374.107.183.475.784 1.02 1.269.702.624 1.294.818 1.478.91.183.091.29.076.397-.046.107-.122.458-.533.58-.716.122-.183.244-.153.412-.091.168.061 1.069.504 1.252.595.183.092.305.137.351.214.046.076.046.443-.098.848z"/>
                </svg>
              </div>

              <h2 className="text-xl font-bold text-[#0F172A] font-heading mb-1">
                Verify Mobile Number
              </h2>
              <p className="text-xs text-[#64748B] mb-1">
                Official verification code dispatched via WhatsApp to:
              </p>
              <p className="text-sm font-bold text-[#2563EB] font-mono mb-2">
                {pendingProfile?.phone || pendingProfile?.mobile}
              </p>
              <p className="text-xs text-[#64748B] mb-4">
                Officer: <span className="font-semibold text-[#0F172A]">{pendingProfile?.name}</span> ({ROLE_LABELS[pendingProfile?.role || 'GIS_OFFICER']})
              </p>

              {/* 6-box OTP input */}
              <div className="flex justify-center gap-2 mb-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputsRef.current[idx] = el;
                    }}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-10 h-12 text-center text-lg font-bold font-mono rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:outline-hidden transition-all bg-[#FFFFFF] shadow-xs"
                  />
                ))}
              </div>

              {/* Auto-fill button for fast testing */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleAutoFillOtp}
                  className="text-xs text-[#2563EB] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer bg-[#EFF6FF] px-3 py-1.5 rounded-lg border border-[#DBEAFE]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Click to auto-fill code (842917)</span>
                </button>
              </div>

              {/* Primary verify button */}
              <button
                id="btn-verify-otp"
                type="button"
                onClick={handleVerifyOtp}
                disabled={otp.join('').length < 6 || isVerifying}
                className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#CBD5E1] text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Verify &amp; Enter LandSync ({ROLE_LABELS[pendingProfile?.role || 'GIS_OFFICER']})</span>
                )}
              </button>

              {/* Countdown timer / resend */}
              <div className="mt-3 text-xs text-[#64748B]">
                {timerSeconds > 0 ? (
                  <span>Resend code in 00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setTimerSeconds(27)}
                    className="text-[#2563EB] font-semibold hover:underline cursor-pointer"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setAuthStep('form')}
                  className="text-xs text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                >
                  ← Change details / back to form
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS ANIMATION STATE */}
          {authStep === 'success' && (
            <div className="max-w-md w-full mx-auto text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#EFF6FF] border-2 border-[#16A34A] text-[#16A34A] flex items-center justify-center mx-auto mb-3 animate-bounce">
                <CheckCircle2 className="w-8 h-8 text-[#16A34A]" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] font-heading mb-1">
                ✓ Identity Verified
              </h2>
              <p className="text-xs font-semibold text-[#0F172A] mt-1">
                Welcome, {pendingProfile?.name}
              </p>
              <p className="text-xs font-bold text-[#2563EB] mt-0.5">
                {ROLE_LABELS[pendingProfile?.role || 'GIS_OFFICER']} Workspace
              </p>
              <p className="text-[11px] text-[#64748B] mt-1">
                Loading {pendingProfile?.district} ({pendingProfile?.municipality}) data scope...
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
