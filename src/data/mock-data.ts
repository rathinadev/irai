export type Role = 'client' | 'therapist' | 'admin';

export type ClientTier = 'foundation' | 'balanced' | 'transform';
export type TherapistSpecialty = 'yoga' | 'medical' | 'psychology' | 'physiology' | 'nutrition';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  tier?: ClientTier;
  specialty?: TherapistSpecialty;
}

export const clients: User[] = [
  { id: 'c1', name: 'Priya Sharma', email: 'priya@example.com', role: 'client', avatar: '/avatars/client-priya.jpg', tier: 'transform' },
  { id: 'c2', name: 'Rahul Verma', email: 'rahul@example.com', role: 'client', avatar: '/avatars/client-rahul.jpg', tier: 'balanced' },
  { id: 'c3', name: 'Ananya Desai', email: 'ananya@example.com', role: 'client', avatar: '/avatars/client-ananya.jpg', tier: 'foundation' },
  { id: 'c4', name: 'Vikram Patel', email: 'vikram@example.com', role: 'client', avatar: '/avatars/client-vikram.jpg', tier: 'balanced' },
  { id: 'c5', name: 'Lakshmi Nair', email: 'lakshmi@example.com', role: 'client', avatar: '/avatars/client-lakshmi.jpg', tier: 'transform' },
];

export const therapists: User[] = [
  { id: 't1', name: 'Meera Krishnan', email: 'meera@irai.com', role: 'therapist', avatar: '/avatars/therapist-meera.jpg', specialty: 'yoga' },
  { id: 't2', name: 'Dr. Arun Mehta', email: 'arun@irai.com', role: 'therapist', avatar: '/avatars/therapist-arun.jpg', specialty: 'medical' },
  { id: 't3', name: 'Dr. Sneha Iyer', email: 'sneha@irai.com', role: 'therapist', avatar: '/avatars/therapist-sneha.jpg', specialty: 'psychology' },
  { id: 't4', name: 'Rajesh Kumar', email: 'rajesh@irai.com', role: 'therapist', avatar: '/avatars/therapist-rajesh.jpg', specialty: 'physiology' },
  { id: 't5', name: 'Kavita Reddy', email: 'kavita@irai.com', role: 'therapist', avatar: '/avatars/therapist-kavita.jpg', specialty: 'nutrition' },
  { id: 't6', name: 'Deepa Nair', email: 'deepa@irai.com', role: 'therapist', avatar: '/avatars/therapist-deepa.jpg', specialty: 'yoga' },
  { id: 't7', name: 'Dr. Sanjay Gupta', email: 'sanjay@irai.com', role: 'therapist', avatar: '/avatars/therapist-sanjay.jpg', specialty: 'medical' },
  { id: 't8', name: 'Ritu Sharma', email: 'ritu@irai.com', role: 'therapist', avatar: '/avatars/therapist-ritu.jpg', specialty: 'psychology' },
];

export const admins: User[] = [
  { id: 'a1', name: 'System Admin', email: 'admin@irai.com', role: 'admin', avatar: '/avatars/admin.jpg' },
];

export const currentUserMock = clients[0]; // Priya Sharma

// Mock Medical Documents
export const mockDocuments = [
  {
    id: 'd1',
    fileName: 'Blood_Test_Report_Jan2026.pdf',
    uploadDate: '2026-01-15T10:00:00Z',
    documentType: 'blood_test',
    aiSummary: 'Routine blood panel. Vitamin D slightly deficient. HbA1c normal.',
    keyFindings: ['Vitamin D: 18 ng/mL (Low)', 'Hemoglobin: 13.5 g/dL (Normal)', 'HbA1c: 5.4% (Normal)'],
    healthIndicators: [
      { label: 'Vitamin D', value: 'Low', status: 'warning' as const },
      { label: 'Blood Sugar', value: 'Normal', status: 'normal' as const },
    ]
  },
  {
    id: 'd2',
    fileName: 'Lumbar_MRI_Findings.pdf',
    uploadDate: '2025-11-20T14:30:00Z',
    documentType: 'mri',
    aiSummary: 'Mild disc bulge at L4-L5. No significant nerve root compression.',
    keyFindings: ['L4-L5 mild posterior disc bulge', 'No spinal canal stenosis'],
    healthIndicators: [
      { label: 'Spinal Health', value: 'Mild Issue', status: 'warning' as const },
      { label: 'Nerve Impingement', value: 'None', status: 'normal' as const },
    ]
  }
];

// Mock Radar Data
export const mockRadarData = {
  flexibility: 85,
  strength: 70,
  breathing: 90,
  mentalFocus: 80,
  painReduction: 65,
  consistency: 95,
};

export const mockPreviousRadarData = {
  flexibility: 75,
  strength: 65,
  breathing: 80,
  mentalFocus: 70,
  painReduction: 50,
  consistency: 85,
};

// Mock Calendar Data
const today = new Date();
const todayStr = today.toISOString().split('T')[0];

export const mockSessions = [
  {
    id: 's1',
    date: todayStr,
    startTime: '09:00',
    endTime: '10:00',
    status: 'booked' as const,
    sessionTitle: '1-on-1 Yoga Therapy',
    clientName: 'Priya Sharma',
    therapistId: 't1',
    sessionType: 'yoga' as const
  },
  {
    id: 's2',
    date: todayStr,
    startTime: '11:00',
    endTime: '12:00',
    status: 'group' as const,
    sessionTitle: 'Group Mindfulness',
    clientName: 'Multiple (12)',
    therapistId: 't3',
    sessionType: 'psychology' as const
  },
  {
    id: 's3',
    date: todayStr,
    startTime: '14:00',
    endTime: '15:00',
    status: 'booked' as const,
    sessionTitle: 'Medical Consultation',
    clientName: 'Rahul Verma',
    therapistId: 't2',
    sessionType: 'medical' as const
  },
  {
    id: 's4',
    date: todayStr,
    startTime: '16:00',
    endTime: '17:00',
    status: 'available' as const,
    therapistId: 't1',
  }
];
