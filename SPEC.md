# IRAI — Technical Specification Sheet

> Companion to `PRD.md` — covers architecture, file structure, component specs, and build plan.

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        NEXT.JS APP                          │
│                                                             │
│  ┌──────────┐   ┌──────────────┐   ┌───────────────────┐   │
│  │ Landing  │   │   Login      │   │    Dashboard      │   │
│  │ Page     │──▶│   Page       │──▶│    Shell          │   │
│  │          │   │ (Role Pick)  │   │ (Navbar+Sidebar)  │   │
│  └──────────┘   └──────────────┘   └───────┬───────────┘   │
│       │                                     │               │
│  ┌────▼─────┐              ┌────────────────┼───────────┐   │
│  │ Pricing  │              │                │           │   │
│  │ Page     │        ┌─────▼──┐  ┌──────▼──┐ ┌──▼────┐  │   │
│  └──────────┘        │ Client │  │Therapist│ │ Admin │  │   │
│                      │  Pages │  │  Pages  │ │ Pages │  │   │
│                      └────┬───┘  └────┬────┘ └───┬───┘  │   │
│                           │           │          │       │   │
│                      ┌────▼───────────▼──────────▼───┐   │   │
│                      │     Meeting Simulation        │   │   │
│                      │     (/meeting/[id])           │   │   │
│                      └───────────────────────────────┘   │   │
│                                                          │   │
│  ┌───────────────────────────────────────────────────┐   │   │
│  │              SHARED LAYER                         │   │   │
│  │  AuthContext │ Mock Data │ UI Components │ Charts │   │   │
│  └───────────────────────────────────────────────────┘   │   │
└──────────────────────────────────────────────────────────────┘
```

### Routing (No Real Auth)
- Login page sets `role` in React Context (`client` | `therapist` | `admin`)
- Dashboard layout reads role from context and renders role-specific sidebar
- If no role set, redirect to `/login`
- All routes are client-side navigable — no middleware needed for demo

---

## 2. Complete File Structure

```
irai_design/
├── public/
│   ├── base_logo.png                  # Symbol logo
│   ├── full_logo.jpeg                 # Full logo with text
│   └── avatars/                       # Auto-generated avatar images
│       ├── client-priya.jpg
│       ├── client-rahul.jpg
│       ├── client-ananya.jpg
│       ├── client-vikram.jpg
│       ├── client-lakshmi.jpg
│       ├── therapist-meera.jpg
│       ├── therapist-arun.jpg
│       ├── therapist-sneha.jpg
│       ├── therapist-rajesh.jpg
│       ├── therapist-kavita.jpg
│       ├── therapist-deepa.jpg
│       ├── therapist-sanjay.jpg
│       └── therapist-ritu.jpg
│
├── src/
│   ├── app/
│   │   ├── globals.css                # Design tokens + global styles
│   │   ├── layout.tsx                 # Root layout (fonts, metadata, AuthProvider)
│   │   ├── page.tsx                   # Landing page
│   │   ├── page.module.css
│   │   │
│   │   ├── pricing/
│   │   │   ├── page.tsx               # Pricing page
│   │   │   └── page.module.css
│   │   │
│   │   ├── login/
│   │   │   ├── page.tsx               # Login page
│   │   │   └── page.module.css
│   │   │
│   │   ├── dashboard/
│   │   │   ├── layout.tsx             # Dashboard shell (Navbar + Sidebar)
│   │   │   ├── layout.module.css
│   │   │   │
│   │   │   ├── client/
│   │   │   │   ├── page.tsx           # Client home dashboard
│   │   │   │   ├── page.module.css
│   │   │   │   ├── sessions/
│   │   │   │   │   ├── page.tsx       # My Sessions
│   │   │   │   │   └── page.module.css
│   │   │   │   ├── progress/
│   │   │   │   │   ├── page.tsx       # Progress tracking
│   │   │   │   │   └── page.module.css
│   │   │   │   ├── classes/
│   │   │   │   │   ├── page.tsx       # Browse classes
│   │   │   │   │   └── page.module.css
│   │   │   │   └── profile/
│   │   │   │       ├── page.tsx       # Profile + AI docs
│   │   │   │       └── page.module.css
│   │   │   │
│   │   │   ├── therapist/
│   │   │   │   ├── page.tsx           # Therapist home
│   │   │   │   ├── page.module.css
│   │   │   │   ├── calendar/
│   │   │   │   │   ├── page.tsx       # Calendar with slots
│   │   │   │   │   └── page.module.css
│   │   │   │   ├── clients/
│   │   │   │   │   ├── page.tsx       # Client list
│   │   │   │   │   ├── page.module.css
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx   # Client detail
│   │   │   │   │       └── page.module.css
│   │   │   │   └── sessions/
│   │   │   │       ├── page.tsx       # Sessions list
│   │   │   │       └── page.module.css
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── page.tsx           # Admin home
│   │   │       ├── page.module.css
│   │   │       ├── schedule/
│   │   │       │   ├── page.tsx       # Master scheduler
│   │   │       │   └── page.module.css
│   │   │       ├── therapists/
│   │   │       │   ├── page.tsx       # Therapist management
│   │   │       │   └── page.module.css
│   │   │       └── users/
│   │   │           ├── page.tsx       # User management
│   │   │           └── page.module.css
│   │   │
│   │   └── meeting/
│   │       └── [id]/
│   │           ├── page.tsx           # Meeting simulation
│   │           └── page.module.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Top navigation bar
│   │   │   ├── Navbar.module.css
│   │   │   ├── Sidebar.tsx            # Side navigation
│   │   │   ├── Sidebar.module.css
│   │   │   ├── Footer.tsx             # Landing page footer
│   │   │   └── Footer.module.css
│   │   │
│   │   ├── charts/
│   │   │   ├── SkillRadar.tsx         # 6-dimension radar chart
│   │   │   ├── ProgressLine.tsx       # Line chart (progress over time)
│   │   │   ├── StatsPie.tsx           # Pie chart (subscription dist.)
│   │   │   └── StatsBar.tsx           # Bar chart (session load)
│   │   │
│   │   ├── calendar/
│   │   │   ├── WeeklyCalendar.tsx     # Week view with time slots
│   │   │   ├── WeeklyCalendar.module.css
│   │   │   ├── MonthlyCalendar.tsx    # Month view
│   │   │   └── MonthlyCalendar.module.css
│   │   │
│   │   ├── meeting/
│   │   │   ├── PreJoinScreen.tsx      # "Ready to join?" screen
│   │   │   ├── VideoGrid.tsx          # Participant video tiles
│   │   │   ├── ControlBar.tsx         # Bottom controls (mute, camera, etc.)
│   │   │   ├── ChatPanel.tsx          # Side chat panel
│   │   │   ├── ParticipantTile.tsx    # Single video tile
│   │   │   └── Meeting.module.css
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Button.module.css
│   │       ├── Card.tsx
│   │       ├── Card.module.css
│   │       ├── Badge.tsx
│   │       ├── Badge.module.css
│   │       ├── Input.tsx
│   │       ├── Input.module.css
│   │       ├── Avatar.tsx
│   │       ├── Avatar.module.css
│   │       ├── Tabs.tsx
│   │       ├── Tabs.module.css
│   │       ├── Modal.tsx
│   │       ├── Modal.module.css
│   │       ├── PricingCard.tsx
│   │       ├── PricingCard.module.css
│   │       ├── SessionCard.tsx
│   │       ├── SessionCard.module.css
│   │       ├── ClassCard.tsx
│   │       ├── ClassCard.module.css
│   │       ├── AchievementBadge.tsx
│   │       ├── AchievementBadge.module.css
│   │       ├── DocumentUpload.tsx
│   │       ├── DocumentUpload.module.css
│   │       ├── StatsCard.tsx
│   │       ├── StatsCard.module.css
│   │       ├── ClientRow.tsx
│   │       └── ClientRow.module.css
│   │
│   ├── context/
│   │   └── AuthContext.tsx            # Role + user state management
│   │
│   └── data/
│       ├── mock-data.ts              # All demo data (clients, therapists, sessions, etc.)
│       └── pricing-data.ts           # 3 pricing tiers
│
├── PRD.md                             # This document
├── SPEC.md                            # Technical spec (this file)
├── base_logo.png                      # Original logo files
├── full_logo.jpeg
├── package.json
├── tsconfig.json
└── next.config.ts
```

**Total files: ~75 (38 .tsx + 30 .module.css + 3 .ts data + 4 config)**

---

## 3. Component Specifications

### 3.1 AuthContext (`src/context/AuthContext.tsx`)

```typescript
// Types
type Role = 'client' | 'therapist' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  // Client-specific
  tier?: 'essential' | 'therapeutic' | 'elite';
  // Therapist-specific
  specialty?: 'yoga' | 'medical' | 'psychology' | 'physiology' | 'nutrition';
}

interface AuthContextType {
  user: User | null;
  role: Role | null;
  login: (role: Role) => void;  // Sets pre-defined demo user for that role
  logout: () => void;           // Clears state, redirects to /login
}
```

### 3.2 SkillRadar Chart

**Props**:
```typescript
interface SkillRadarProps {
  data: {
    flexibility: number;    // 0-100
    strength: number;
    breathing: number;
    mentalFocus: number;
    painReduction: number;
    consistency: number;
  };
  animated?: boolean;        // Default true
  showComparison?: boolean;  // Overlay previous month
  comparisonData?: same;     // Previous month data
  size?: 'sm' | 'md' | 'lg'; // Chart size
}
```

**Implementation**: Recharts `RadarChart` with `PolarGrid`, custom gradient fill, Framer Motion entry animation.

### 3.3 WeeklyCalendar

**Props**:
```typescript
interface WeeklyCalendarProps {
  slots: TimeSlot[];
  currentWeek: Date;
  onSlotClick?: (slot: TimeSlot) => void;
  onWeekChange?: (direction: 'prev' | 'next') => void;
  readOnly?: boolean;  // Admin can edit, therapist view-only option
}

interface TimeSlot {
  id: string;
  date: string;          // ISO date
  startTime: string;     // "09:00"
  endTime: string;       // "10:00"
  status: 'available' | 'booked' | 'group' | 'blocked';
  sessionTitle?: string;
  clientName?: string;
  sessionType?: 'yoga' | 'therapy' | '1on1' | 'consultation';
}
```

**Visual**: 7-column grid (Mon-Sun), rows from 7AM to 9PM, color-coded cells.

### 3.4 DocumentUpload

**Props**:
```typescript
interface DocumentUploadProps {
  documents: MedicalDocument[];
  onUpload?: (file: File) => void;  // Triggers simulation
}

interface MedicalDocument {
  id: string;
  fileName: string;
  uploadDate: string;
  documentType: 'blood_test' | 'xray' | 'mri' | 'prescription' | 'diet_chart';
  aiSummary: string;
  keyFindings: string[];
  healthIndicators: { label: string; value: string; status: 'normal' | 'warning' | 'critical' }[];
}
```

**Upload simulation flow**:
1. File dropped → filename appears with progress bar (0→100% over 1.5s)
2. Progress complete → "Analyzing with AI..." spinner (2s)
3. Analysis complete → fade in pre-populated summary card
4. Card added to document list

### 3.5 Meeting Components

**VideoGrid layout modes**:
- 1 participant: Full screen
- 2 participants: Side by side (50/50)
- 3-4 participants: 2x2 grid
- 5-6 participants: 2x3 grid
- 7-9 participants: 3x3 grid

**ControlBar buttons**:
```typescript
interface ControlBarProps {
  isMuted: boolean;
  isCameraOn: boolean;
  isChatOpen: boolean;
  isScreenSharing: boolean;
  onToggleMute: () => void;
  onToggleCamera: () => void;
  onToggleChat: () => void;
  onToggleScreenShare: () => void;
  onEndCall: () => void;
}
```

### 3.6 PricingCard

```typescript
interface PricingCardProps {
  planName: string;           // "Essential" | "Therapeutic" | "Elite"
  subtitle: string;           // "Routine" | "Recovery" | "Personalized"
  targetAudience: string;
  coreOffering: string;
  price: number;              // 899, 2499, 7499
  features: string[];
  isPopular?: boolean;        // "Most Popular" badge
  isPremium?: boolean;        // Gold gradient border
  onSelect: () => void;
}
```

---

## 4. CSS Design Token Reference

```css
:root {
  /* Primary Palette */
  --teal-deep: #0B6E6E;
  --teal: #1A9E9E;
  --teal-light: #B2DFDB;
  --teal-50: #E0F2F1;
  --blue-deep: #0D3B66;
  --blue: #1565C0;
  --blue-light: #BBDEFB;
  --gold: #C8A951;
  --gold-light: #F5E6B8;
  
  /* Semantic Colors */
  --success: #4CAF50;
  --warning: #FF9800;
  --error: #E57373;
  --info: #29B6F6;
  
  /* Specialty Colors */
  --specialty-yoga: #0B6E6E;
  --specialty-medical: #1565C0;
  --specialty-psychology: #7E57C2;
  --specialty-physiology: #FF8A65;
  --specialty-nutrition: #66BB6A;
  
  /* Neutrals */
  --charcoal: #263238;
  --gray-700: #455A64;
  --gray-500: #78909C;
  --gray-300: #B0BEC5;
  --gray-100: #ECEFF1;
  --sage: #E8F5E9;
  --cream: #FAFDF6;
  --white: #FFFFFF;
  
  /* Typography */
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Spacing Scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.1);
  --shadow-glow: 0 0 20px rgba(26,158,158,0.15);
  
  /* Glassmorphism */
  --glass-bg: rgba(255,255,255,0.7);
  --glass-border: rgba(255,255,255,0.3);
  --glass-blur: blur(12px);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
  
  /* Z-Index Scale */
  --z-sidebar: 100;
  --z-navbar: 200;
  --z-modal: 300;
  --z-toast: 400;
}
```

---

## 5. Build Execution Plan

### Phase 1: Foundation (Setup + Design System + Data)
1. Copy logos to `public/`
2. Create `globals.css` with all design tokens
3. Create root `layout.tsx` with Google Fonts + metadata
4. Create `mock-data.ts` with all demo data
5. Create `pricing-data.ts`
6. Create `AuthContext.tsx`

### Phase 2: Shared UI Components
7. Build all `ui/` components: Button, Card, Badge, Input, Avatar, Tabs, Modal, StatsCard
8. Build PricingCard, SessionCard, ClassCard, AchievementBadge, DocumentUpload, ClientRow

### Phase 3: Layout Components
9. Build Navbar (role-aware, logo, notifications, profile dropdown)
10. Build Sidebar (role-specific navigation items)
11. Build Footer (for landing page)
12. Build Dashboard layout.tsx (Navbar + Sidebar shell)

### Phase 4: Public Pages
13. Build Landing Page (hero, features, how-it-works, radar preview, testimonials, CTA)
14. Build Pricing Page (3 cards, comparison table, FAQ)
15. Build Login Page (split-screen, role tabs, demo credentials)

### Phase 5: Charts
16. Build SkillRadar component
17. Build ProgressLine component
18. Build StatsPie component
19. Build StatsBar component

### Phase 6: Client Dashboard (5 pages)
20. Client home (radar + stats + upcoming sessions)
21. Client sessions (calendar + list view)
22. Client progress (line charts + radar comparison + achievements)
23. Client classes (browse + filter + enroll)
24. Client profile (info + AI document upload + summaries)

### Phase 7: Therapist Dashboard (5 pages)
25. Therapist home (schedule overview + stats + alerts)
26. Therapist calendar (weekly/monthly with time slots)
27. Therapist clients list (searchable table)
28. Therapist client detail (radar + progress + docs + summary)
29. Therapist sessions (list + notes + start session)

### Phase 8: Admin Dashboard (4 pages)
30. Admin home (platform stats + charts)
31. Admin schedule (master calendar across therapists)
32. Admin therapists (management list)
33. Admin users (management list)

### Phase 9: Meeting Simulation
34. PreJoinScreen component
35. VideoGrid + ParticipantTile components
36. ControlBar component
37. ChatPanel component
38. Meeting page (assembles all meeting components)

### Phase 10: Polish
39. Avatar image generation (13 demo avatars)
40. Page transitions (Framer Motion)
41. Build verification (`npm run build`)
42. Browser visual testing of all 18 pages

---

## 6. Key Decisions Log

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | Unified therapist dashboard with specialty badge | Simpler to build, same UX pattern, specialty shown via colored badge |
| 2 | Static avatar for meeting self-view | No webcam needed for demo — cleaner presentation |
| 3 | Full marketing landing page | Client needs to see the full brand story before pricing |
| 4 | Animated upload + pre-populated data for AI docs | Shows the UX flow (upload → processing → result) using fake data |
| 5 | Tagline on landing page | "Intelligent \| Restorative \| AI-Powered \| Integrated" displayed in hero |
| 6 | Vanilla CSS modules (no Tailwind) | Maximum control over calm aesthetic, matches design vision |
| 7 | Recharts for all charts | Lightweight, React-native, supports Radar + Line + Bar + Pie |
| 8 | Framer Motion for animations | Best-in-class React animation library, smooth page transitions |
| 9 | No real auth/backend | Demo only — role selection via context, mock data everywhere |
| 10 | CSS Modules per component | Scoped styles, no class name collisions, maintainable |

---

## 7. Interaction Flows

### Flow 1: First-time Visitor
```
Landing Page → Scroll through features → Click "View Pricing"
→ Pricing Page → Compare tiers → Click "Get Started" on a tier
→ Login Page → Select role → Click "Sign In"
→ Role-specific Dashboard
```

### Flow 2: Client Joining a Session
```
Client Dashboard → See upcoming session card → Click "Join"
→ Meeting Pre-Join Screen → Click "Join Now"
→ Meeting Room (Google Meet UI) → Interact with controls
→ Click "End Call" → Session Complete summary → Back to Dashboard
```

### Flow 3: Client Uploading Medical Document
```
Client Dashboard → Click Profile icon in Navbar
→ Profile Page → Scroll to Medical Documents
→ Drag & drop file → Upload progress bar → AI analyzing spinner
→ Summary card appears with extracted health info
→ Document added to list
```

### Flow 4: Therapist Reviewing a Client
```
Therapist Dashboard → Click "My Clients" in sidebar
→ Client List → Search for client → Click row
→ Client Detail → View radar chart, progress, AI doc summaries
→ Read auto-generated summary → Navigate to session
```

### Flow 5: Admin Scheduling a Session
```
Admin Dashboard → Click "Schedule" in sidebar
→ Master Calendar → Filter by therapist → Find available slot
→ Click slot → Fill session details modal → Confirm
→ Session appears on calendar
```
