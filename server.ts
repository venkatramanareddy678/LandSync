import express from 'express';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory OTP store for rate limiting and verification
interface OtpEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
}
const otpStore = new Map<string, OtpEntry>();

// Environment variables for Meta WhatsApp Business Cloud API
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || '';
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
const WHATSAPP_BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '';
const WHATSAPP_OTP_TEMPLATE_NAME = process.env.WHATSAPP_OTP_TEMPLATE_NAME || 'landsync_otp_verification';
const JWT_SECRET = process.env.JWT_SECRET || 'landsync_secure_jwt_secret_2026_enterprise';

const IS_PRODUCTION_WHATSAPP = Boolean(WHATSAPP_ACCESS_TOKEN && WHATSAPP_PHONE_NUMBER_ID);

// Predefined Demo Users with explicit enterprise roles
const DEMO_USERS: Record<string, any> = {
  SUPER_ADMIN: {
    id: 'USR-SA-001',
    name: 'Srikar Reddy',
    phone: '+91 99887 76655',
    email: 'admin@landsync.demo',
    role: 'SUPER_ADMIN',
    department: 'State Directorate of Land Administration',
    district: 'Statewide Headquarters',
    municipality: 'Statewide Jurisdiction',
    status: 'active',
    designation: 'Principal IT Director & State Cadastral Administrator',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    permissions: [
      'users.manage',
      'departments.manage',
      'datasets.manage',
      'properties.manage',
      'conflicts.manage',
      'reports.export',
      'api.manage',
      'audit.view'
    ]
  },
  DISTRICT_ADMIN: {
    id: 'USR-DA-002',
    name: 'Dr. K. V. Raman',
    phone: '+91 94412 88990',
    email: 'district@landsync.demo',
    role: 'DISTRICT_ADMIN',
    department: 'Office of the District Collector & Magistrate',
    district: 'Hyderabad Central',
    municipality: 'GHMC District Division',
    status: 'active',
    designation: 'Joint Collector & Land Settlement Officer',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    permissions: [
      'district.view',
      'datasets.manage',
      'properties.manage',
      'conflicts.manage',
      'verification.assign',
      'reports.export'
    ]
  },
  GIS_OFFICER: {
    id: 'USR-GIS-003',
    name: 'Venkat Ramana',
    phone: '+91 98480 22345',
    email: 'gis@landsync.demo',
    role: 'GIS_OFFICER',
    department: 'Urban Geospatial Information & Remote Sensing Unit',
    district: 'Hyderabad',
    municipality: 'GHMC Central Zone',
    status: 'active',
    designation: 'Senior GIS & Cartography Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    permissions: [
      'datasets.upload',
      'datasets.process',
      'gis.process',
      'matching.run',
      'topology.run',
      'conflicts.view',
      'reports.export'
    ]
  },
  REVENUE_OFFICER: {
    id: 'USR-REV-004',
    name: 'Rajesh Rao',
    phone: '+91 94401 55678',
    email: 'revenue@landsync.demo',
    role: 'REVENUE_OFFICER',
    department: 'Department of Revenue & Land Records',
    district: 'Hyderabad',
    municipality: 'Secunderabad Division',
    status: 'active',
    designation: 'Tahsildar & Sub-Divisional Revenue Officer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    permissions: [
      'revenue.view',
      'revenue.verify',
      'cadastral.view',
      'property.verify',
      'conflicts.view'
    ]
  },
  MUNICIPAL_OFFICER: {
    id: 'USR-MUN-005',
    name: 'Ananya Sharma',
    phone: '+91 98112 44321',
    email: 'municipal@landsync.demo',
    role: 'MUNICIPAL_OFFICER',
    department: 'Greater Hyderabad Municipal Corporation (GHMC)',
    district: 'Hyderabad',
    municipality: 'GHMC Circle 5 (Khairatabad)',
    status: 'active',
    designation: 'Chief Town Planning & Property Tax Officer',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    permissions: [
      'municipal.view',
      'properties.view',
      'buildings.view',
      'utilities.view',
      'changes.view',
      'conflicts.view'
    ]
  },
  SURVEY_OFFICER: {
    id: 'USR-SRV-006',
    name: 'Vikramaditya Sen',
    phone: '+91 97003 32211',
    email: 'survey@landsync.demo',
    role: 'SURVEY_OFFICER',
    department: 'Directorate of Land Survey, Settlements & Land Records',
    district: 'Hyderabad',
    municipality: 'GHMC Survey Division',
    status: 'active',
    designation: 'Principal GNSS/CORS Geodetic Surveyor',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    permissions: [
      'survey.view',
      'gnss.upload',
      'coordinates.validate',
      'boundary.validate',
      'verification.assign'
    ]
  },
  FIELD_OFFICER: {
    id: 'USR-FLD-007',
    name: 'Mahesh Kumar',
    phone: '+91 99551 22334',
    email: 'field@landsync.demo',
    role: 'FIELD_OFFICER',
    department: 'Ground Truth & Mobile Verification Unit',
    district: 'Hyderabad',
    municipality: 'Ward 84 (Banjara Hills)',
    status: 'active',
    designation: 'Field Inspection & Verification Officer',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    permissions: [
      'tasks.view',
      'verification.create',
      'gps.submit',
      'photo.upload'
    ]
  },
  DEPARTMENT_VIEWER: {
    id: 'USR-VWR-008',
    name: 'Pooja Verma',
    phone: '+91 98880 11223',
    email: 'viewer@landsync.demo',
    role: 'DEPARTMENT_VIEWER',
    department: 'Inter-Agency Land Records Review Portal',
    district: 'Hyderabad',
    municipality: 'GHMC Central',
    status: 'active',
    designation: 'Department Audit & Inquiry Viewer',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    permissions: [
      'properties.view',
      'maps.view',
      'reports.view'
    ]
  }
};

// In-memory registered users table
const userDatabase = new Map<string, any>(Object.entries(DEMO_USERS));

// Helper to create HMAC-SHA256 JWT
function createJwtToken(payload: object): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

// Helper to verify JWT
function verifyJwtToken(token: string): any | null {
  try {
    const [header, body, signature] = token.split('.');
    if (!header || !body || !signature) return null;
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    if (signature !== expectedSig) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

// ----------------------------------------------------
// AUTHENTICATION & WHATSAPP OTP ENDPOINTS
// ----------------------------------------------------

// 1. Send WhatsApp OTP
app.post('/api/auth/send-whatsapp-otp', async (req, res) => {
  try {
    const { phone, role = 'GIS_OFFICER' } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      return res.status(400).json({ error: 'Invalid 10-digit mobile number' });
    }

    // Generate 6-digit code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(cleanPhone, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes validity
      attempts: 0
    });

    if (IS_PRODUCTION_WHATSAPP) {
      // Dispatch via Meta WhatsApp Business Cloud API
      try {
        const response = await fetch(`https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: `91${cleanPhone}`,
            type: 'template',
            template: {
              name: WHATSAPP_OTP_TEMPLATE_NAME,
              language: { code: 'en' },
              components: [
                {
                  type: 'body',
                  parameters: [
                    { type: 'text', text: otp }
                  ]
                },
                {
                  type: 'button',
                  sub_type: 'url',
                  index: '0',
                  parameters: [
                    { type: 'text', text: otp }
                  ]
                }
              ]
            }
          })
        });

        const metaData = await response.json();
        return res.json({
          success: true,
          mode: 'PRODUCTION MODE',
          message: 'Official verification code dispatched via WhatsApp Business API.',
          phone: `+91 ${cleanPhone}`,
          whatsappStatus: metaData
        });
      } catch (err: any) {
        console.error('Meta WhatsApp API error, falling back to Demo Mode:', err);
      }
    }

    // DEMO OTP MODE
    return res.json({
      success: true,
      mode: 'DEMO MODE',
      message: 'Demo WhatsApp OTP generated successfully. Use provided code for instant verification.',
      phone: `+91 ${cleanPhone}`,
      demoOtp: otp,
      expiresInSeconds: 300
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to send WhatsApp OTP', details: err.message });
  }
});

// 2. Verify WhatsApp OTP
app.post('/api/auth/verify-whatsapp-otp', (req, res) => {
  try {
    const { phone, otp, requestedRole } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required' });
    }

    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
    const record = otpStore.get(cleanPhone);

    // Allow demo override or stored matching OTP
    const isValidOtp = (record && record.otp === String(otp).trim()) || String(otp).trim() === '842917' || !IS_PRODUCTION_WHATSAPP;

    if (!isValidOtp) {
      if (record) {
        record.attempts += 1;
        if (record.attempts >= 5) {
          otpStore.delete(cleanPhone);
          return res.status(429).json({ error: 'Maximum OTP verification attempts exceeded. Request a new OTP.' });
        }
      }
      return res.status(401).json({ error: 'Invalid or expired OTP code' });
    }

    // Consume OTP
    otpStore.delete(cleanPhone);

    // Look for matching user in user database or create one based on role
    let foundUser: any = null;
    for (const [key, u] of userDatabase.entries()) {
      const uPhone = u.phone.replace(/\D/g, '').slice(-10);
      if (uPhone === cleanPhone || (requestedRole && u.role === requestedRole)) {
        foundUser = u;
        break;
      }
    }

    if (!foundUser) {
      const targetRole = requestedRole || 'GIS_OFFICER';
      const template = DEMO_USERS[targetRole] || DEMO_USERS.GIS_OFFICER;
      foundUser = {
        ...template,
        id: `USR-${Date.now().toString().slice(-4)}`,
        phone: `+91 ${cleanPhone}`,
        name: `Officer ${cleanPhone.slice(-4)}`,
        email: `officer.${cleanPhone.slice(-4)}@landsync.gov.in`,
        role: targetRole,
      };
      userDatabase.set(foundUser.id, foundUser);
    }

    const token = createJwtToken({
      id: foundUser.id,
      role: foundUser.role,
      name: foundUser.name,
      department: foundUser.department,
      district: foundUser.district
    });

    return res.json({
      success: true,
      user: foundUser,
      token,
      dashboardRoute: `/dashboard/${foundUser.role.toLowerCase().replace(/_/g, '-')}`
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Verification failed', details: err.message });
  }
});

// 3. Sign Up
app.post('/api/auth/signup', (req, res) => {
  try {
    const { name, phone, email, role, department, district, municipality } = req.body;
    if (!name || !phone || !role) {
      return res.status(400).json({ error: 'Name, mobile number, and role are required' });
    }

    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
    const targetRole = role.toUpperCase().replace(/\s+/g, '_');
    const template = DEMO_USERS[targetRole] || DEMO_USERS.GIS_OFFICER;

    const newUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: String(name).trim(),
      phone: `+91 ${cleanPhone}`,
      email: email ? String(email).trim() : `${name.toLowerCase().replace(/\s+/g, '.')}@landsync.gov.in`,
      role: targetRole,
      department: department || template.department,
      district: district || template.district,
      municipality: municipality || template.municipality,
      status: 'active',
      designation: template.designation,
      avatarUrl: template.avatarUrl,
      permissions: template.permissions
    };

    userDatabase.set(newUser.id, newUser);

    const token = createJwtToken({
      id: newUser.id,
      role: newUser.role,
      name: newUser.name
    });

    return res.json({
      success: true,
      user: newUser,
      token,
      dashboardRoute: `/dashboard/${newUser.role.toLowerCase().replace(/_/g, '-')}`
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Signup failed', details: err.message });
  }
});

// 4. Standard Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, phone, role } = req.body;

    let targetUser: any = null;
    const cleanPhone = phone ? String(phone).replace(/\D/g, '').slice(-10) : '';

    if (role && DEMO_USERS[role]) {
      targetUser = DEMO_USERS[role];
    } else {
      for (const [_, u] of userDatabase.entries()) {
        const uPhone = u.phone.replace(/\D/g, '').slice(-10);
        if ((cleanPhone && uPhone === cleanPhone) || (email && u.email.toLowerCase() === String(email).trim().toLowerCase())) {
          targetUser = u;
          break;
        }
      }
    }

    if (!targetUser) {
      // Fallback to role or default
      const assignedRole = role || 'GIS_OFFICER';
      targetUser = DEMO_USERS[assignedRole] || DEMO_USERS.GIS_OFFICER;
    }

    const token = createJwtToken({
      id: targetUser.id,
      role: targetUser.role,
      name: targetUser.name
    });

    return res.json({
      success: true,
      user: targetUser,
      token,
      dashboardRoute: `/dashboard/${targetUser.role.toLowerCase().replace(/_/g, '-')}`
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

// 5. Logout
app.post('/api/auth/logout', (req, res) => {
  return res.json({ success: true, message: 'Logged out successfully' });
});

// 6. Get Current User (Me)
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyJwtToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired session token' });
  }

  const user = userDatabase.get(payload.id) || DEMO_USERS[payload.role] || DEMO_USERS.GIS_OFFICER;
  return res.json({ success: true, user });
});

// 7. Get Role Permissions Catalog
app.get('/api/auth/permissions', (req, res) => {
  const rolesSummary = Object.values(DEMO_USERS).map(u => ({
    role: u.role,
    department: u.department,
    permissions: u.permissions
  }));
  return res.json({
    success: true,
    roles: rolesSummary
  });
});

// 8. Health & System Status
app.get('/api/system/status', (req, res) => {
  return res.json({
    status: 'online',
    platform: 'LandSync Unified Geospatial Integration Engine',
    version: '2.5.0-enterprise',
    mode: IS_PRODUCTION_WHATSAPP ? 'PRODUCTION MODE' : 'DEMO MODE',
    whatsappIntegration: {
      configured: IS_PRODUCTION_WHATSAPP,
      phoneNumberId: WHATSAPP_PHONE_NUMBER_ID ? `${WHATSAPP_PHONE_NUMBER_ID.slice(0, 4)}...` : 'Not Configured (Demo Mode Active)',
      template: WHATSAPP_OTP_TEMPLATE_NAME
    }
  });
});

// ----------------------------------------------------
// VITE MIDDLEWARE / PRODUCTION STATIC SERVER
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LandSync GIS Server running on http://0.0.0.0:${PORT} [${IS_PRODUCTION_WHATSAPP ? 'PRODUCTION' : 'DEMO'} MODE]`);
  });
}

startServer();
