# IRAI — Product Requirements Document (PRD)

> **Version**: 1.0  
> **Date**: 2026-05-08  
> **Type**: Demo / Client Presentation App  
> **Stack**: Next.js 14 (App Router) + TypeScript  

---

## 1. Product Overview

### 1.1 What is IRAI?

**IRAI** stands for **Intelligent | Restorative | AI-Powered | Integrated**.

It is a holistic yoga therapy and wellness platform that combines:
- 🧘 **Yoga Therapy** — Traditional and therapeutic yoga sessions
- 🩺 **Medical Science** — Doctor consultations and medical oversight
- 🧠 **Mental Wellness** — Psychology sessions and mental health support
- 🏃 **Physiotherapy** — Physical rehabilitation and movement therapy
- 🥗 **Nutrition** — Diet planning and nutritional guidance

The platform connects **clients** (patients/users) with **therapists** (across 5 specialties) through live group classes, 1-on-1 sessions, and AI-powered health tracking.

### 1.2 Purpose of This Demo

This Next.js application is a **demonstration prototype** to present to clients/investors. It is:
- ✅ Fully auto-populated with realistic mock data
- ✅ Visually complete and interactive
- ✅ NOT a production app — no real backend, database, or authentication
- ✅ Designed to showcase the full user experience across all roles

### 1.3 Brand Identity

| Element | Detail |
|---------|--------|
| **Name** | IRAI |
| **Tagline** | Intelligent \| Restorative \| AI-Powered \| Integrated |
| **Sub-tagline** | Yoga • Health • Mind • Nutrition |
| **Base Logo** | Symbol only (meditating figure + caduceus + wings) — used as favicon, navbar icon |
| **Full Logo** | Symbol + "IRAI" text + tagline + 5 pillar icons — used on landing page, login page |
| **Color Theme** | Teal, deep blue, gold accents — calm, spa-like aesthetic |
| **5 Pillars** | Yoga Therapy, Medical Science, Mental Wellness, Physiotherapy, Nutrition |

---

## 2. User Roles

### 2.1 Client (Patient/User)
Regular users who sign up for yoga and wellness services.

**What they can do:**
- View their personalized dashboard with wellness metrics
- See their **Skill Radar Chart** (gamified 6-dimension wellness score)
- Browse and enroll in group classes
- Attend 1-on-1 sessions with therapists
- Track progress over time (charts, milestones, streaks)
- Upload medical documents for AI analysis (from profile icon)
- Join video sessions (Google Meet-style simulation)
- View their subscription tier and plan details

### 2.2 Therapist (Worker/Practitioner)
Professionals who deliver sessions. **5 specialty types**, all sharing one unified dashboard template with a specialty badge:

| Specialty | Badge Color | Focus |
|-----------|-------------|-------|
| Yoga Therapist | Teal | Asanas, pranayama, meditation |
| Medical Doctor | Blue | Health monitoring, prescriptions |
| Psychologist | Purple | Mental health, CBT, counseling |
| Physiologist | Orange | Physical rehab, movement |
| Nutritionist | Green | Diet plans, meal tracking |

**What they can do:**
- View their daily schedule and upcoming sessions
- Manage their **calendar with time slots** (available/booked/blocked)
- View their client list with progress summaries
- Access any client's detail page:
  - Client's Skill Radar Chart
  - Progress over time
  - AI-generated document summaries (medical history)
  - Behavioral patterns (attendance, consistency, engagement)
  - Auto-generated short summary of the client
- Start/join video sessions
- View session notes

### 2.3 Admin (IRAI Staff)
Platform administrators who manage operations.

**What they can do:**
- View platform-wide analytics (total users, revenue, session counts)
- **Schedule sessions** in any therapist's calendar
- View master calendar across all therapists
- Manage therapist profiles and availability
- Manage user accounts
- View subscription distribution and revenue charts

---

## 3. Pricing Tiers

Three subscription plans displayed on a dedicated pricing page (visible before login):

### Essential (Routine) — ₹899/mo
| Attribute | Detail |
|-----------|--------|
| **Target Audience** | Beginners & Lifestyle Users |
| **Core Offering** | Daily Live Yoga + Basic AI personalization |
| **Sessions** | Unlimited group classes |
| **1-on-1** | None |
| **AI Features** | Basic wellness tracking |
| **Support** | Community support |

### Therapeutic (Recovery) — ₹2,499/mo
| Attribute | Detail |
|-----------|--------|
| **Target Audience** | Result Seekers & Patients |
| **Core Offering** | Goal-based programs + Group Therapy sessions |
| **Sessions** | Unlimited group + 2 group therapy/week |
| **1-on-1** | 1 session/month |
| **AI Features** | Advanced AI personalization + document analysis |
| **Support** | Priority email support |

### Elite (Personalized) — ₹7,499/mo
| Attribute | Detail |
|-----------|--------|
| **Target Audience** | Premium Users |
| **Core Offering** | Dedicated manager + 2 Priority 1-on-1 sessions |
| **Sessions** | Unlimited everything |
| **1-on-1** | 2 priority sessions/month |
| **AI Features** | Full AI suite + dedicated health manager |
| **Support** | Dedicated manager + WhatsApp support |

---

## 4. Gamification System — Skill Radar Chart

A hexagonal radar chart covering **6 wellness dimensions**, displayed prominently on the client dashboard and visible to therapists reviewing a client.

### 6 Dimensions

| Dimension | What It Measures | Score Range |
|-----------|-----------------|-------------|
| **Flexibility** | Range of motion, yoga pose progression | 0–100 |
| **Strength** | Physical strength, endurance in sessions | 0–100 |
| **Breathing** | Pranayama proficiency, breath control | 0–100 |
| **Mental Focus** | Meditation consistency, mindfulness scores | 0–100 |
| **Pain Reduction** | Self-reported pain levels over time | 0–100 |
| **Consistency** | Session attendance streak, regularity | 0–100 |

### Gamification Elements
- **Animated fill** on page load (radar expands from center)
- **Level badges**: Beginner → Practitioner → Advanced → Master
- **Achievement badges** for milestones (e.g., "7-day streak", "First 1-on-1", "Pain-free week")
- **Monthly comparison** — overlay current vs previous month radar
- **Overall wellness score** — weighted average of 6 dimensions

---

## 5. Feature Details

### 5.1 AI Document Analysis System

**Location**: Client's profile page (accessible via profile icon in navbar)

**Flow (Demo Simulation)**:
1. Client clicks profile icon → navigates to profile page
2. Scrolls to "Medical Documents" section
3. Drags & drops or selects a file (PDF, image, etc.)
4. **Animated upload simulation**:
   - Progress bar fills up
   - "Analyzing document..." spinner with AI icon
   - Processing animation (2-3 seconds)
5. **Result appears**: Pre-populated AI-extracted summary showing:
   - Document type (e.g., "Blood Test Report", "MRI Scan", "Prescription")
   - Key findings (conditions, metrics, medications)
   - Health indicators flagged
   - Date of document
6. Previously uploaded documents listed with their summaries

**Who can see it**:
- The client (their own documents)
- Any therapist viewing that client's detail page
- Admin (in user management)

### 5.2 Calendar & Scheduling System

**Therapist Calendar**:
- Weekly view with hourly time slots (7 AM – 9 PM)
- Monthly view toggle
- Slot states:
  - 🟢 **Available** — open for booking
  - 🔵 **Booked** — client enrolled (shows client name + session type)
  - 🟡 **Group Session** — multiple clients
  - ⚫ **Blocked** — therapist unavailable
- Click any booked slot → see session details (client name, type, notes)
- Visible to: The therapist themselves + Admin

**Admin Scheduler**:
- Master view across ALL therapists
- Filter by therapist, specialty, date range
- Can schedule new sessions into any therapist's calendar
- Color-coded by therapist specialty

### 5.3 Session Types

| Type | Description | Participants |
|------|-------------|-------------|
| **Group Yoga Class** | Live yoga sessions, multiple participants | 10-30 clients + 1 therapist |
| **Group Therapy** | Therapeutic group sessions (e.g., pain management, stress) | 5-10 clients + 1 therapist |
| **1-on-1 Session** | Private session with a specific therapist | 1 client + 1 therapist |
| **Consultation** | Initial assessment or follow-up | 1 client + 1 therapist |

### 5.4 Client Progress Tracking

**What is tracked**:
- Skill Radar Chart scores over time (line charts per dimension)
- Session attendance history (dates, types, therapists)
- Streak count (consecutive days/weeks of attendance)
- Behavioral patterns:
  - Which session types they attend most
  - Time-of-day preferences
  - Consistency score
  - Engagement level (early joins, full sessions, etc.)
- Milestones and achievements earned

**Auto-generated client summary** (visible to therapists):
> "Priya has attended 24 sessions over the last 3 months with 85% consistency. She primarily attends morning yoga and weekly psychology sessions. Her flexibility score has improved 32% since joining. She uploaded 3 medical documents indicating chronic lower back pain. Pain reduction score has improved from 35 to 67."

### 5.5 Meeting Simulation (Google Meet Style)

**Purpose**: Show clients how live sessions will look and feel.

**Pre-join screen**:
- Session title and scheduled time
- Static avatar preview (no webcam — confirmed)
- "Ready to Join?" button
- Audio/video toggle before joining

**In-meeting UI**:
- **Video grid**: 
  - Self tile (static avatar with animated breathing ring)
  - Therapist tile (static image with subtle animation)
  - Group sessions: multiple participant tiles (2x2, 3x3 grid)
- **Bottom control bar**:
  - 🎤 Mute/Unmute toggle
  - 📷 Camera On/Off toggle
  - 🖥️ Share Screen button
  - 💬 Chat toggle (opens side panel)
  - ❤️ Reactions
  - 🔴 End Call button (red)
- **Side panel** (toggleable):
  - Chat tab with mock messages
  - Participants tab with list
- **Top bar**:
  - Session title
  - Live timer (counts up)
  - "Recording" indicator dot
- **End call** → returns to dashboard with "Session Complete" summary

### 5.6 Classes Browser (Client View)

A filterable catalog of available group sessions:

**Filters**:
- By type: Yoga, Therapy, Medical, Psychology, Nutrition
- By difficulty: Beginner, Intermediate, Advanced
- By time: Morning, Afternoon, Evening

**Each class card shows**:
- Class title (e.g., "Morning Flow Yoga", "Stress Management Group")
- Therapist name + avatar + specialty badge
- Date & time
- Duration
- Spots available / total capacity
- Difficulty level indicator
- "Enroll" button

---

## 6. Page-by-Page Specification

### 6.1 Landing Page (`/`)
Full marketing page with:
1. **Hero Section**: Full IRAI logo, tagline ("Intelligent | Restorative | AI-Powered | Integrated"), animated gradient background, CTA button → pricing
2. **What We Offer**: 5 pillar cards (Yoga Therapy, Medical Science, Mental Wellness, Physiotherapy, Nutrition) with icons and hover animations
3. **How It Works**: 3-step visual (Sign Up → Get Matched → Start Healing)
4. **Skill Radar Preview**: Animated radar chart teaser showing the gamification system
5. **Testimonials**: Carousel of mock client testimonials with avatars
6. **CTA Section**: "Start Your Wellness Journey" → links to pricing
7. **Footer**: Links, social icons, copyright

### 6.2 Pricing Page (`/pricing`)
1. **3 Pricing Cards** side-by-side:
   - Essential (₹899) — standard card
   - Therapeutic (₹2,499) — "Most Popular" badge
   - Elite (₹7,499) — gold gradient border, premium badge
2. **Feature comparison table** below cards
3. **FAQ accordion** (5-6 common questions)
4. **CTA**: "Get Started" on each card → Login page

### 6.3 Login Page (`/login`)
Split-screen layout:
- **Left half**: Full IRAI logo + floating lotus petal ambient animation
- **Right half**: 
  - Role selector tabs: **Client** | **Therapist** | **Admin**
  - Email field (pre-filled with demo email)
  - Password field (pre-filled)
  - "Sign In" button
  - "Don't have an account? Sign Up" link (non-functional for demo)
- Clicking login routes to the role-specific dashboard

### 6.4 Client Dashboard (`/dashboard/client`)
- Welcome banner: "Good morning, Priya 🙏" + tier badge
- Skill Radar Chart (animated)
- Quick stats row: Next Session, Streak (12 days), Sessions This Month (8), Overall Score (74%)
- Upcoming sessions list (next 3)
- Recent activity feed

### 6.5 Client Sessions (`/dashboard/client/sessions`)
- Tab toggle: Calendar View | List View
- Calendar shows sessions marked on dates
- List shows upcoming + past sessions
- Each session: title, therapist, time, type badge, "Join" button (for upcoming)

### 6.6 Client Progress (`/dashboard/client/progress`)
- Line charts: Each of the 6 wellness dimensions over 6 months
- Monthly radar chart comparison (current vs previous month)
- Milestones & achievements section (badge grid)
- Behavioral summary card

### 6.7 Client Classes (`/dashboard/client/classes`)
- Filter bar (type, difficulty, time)
- Grid of class cards
- "Enroll" buttons

### 6.8 Client Profile (`/dashboard/client/profile`)
- Profile info section (avatar, name, email, phone, tier)
- **AI Document Analysis section**:
  - Upload area (drag & drop zone)
  - Upload simulation animation
  - List of uploaded documents with AI summaries
  - Key health indicators panel
- Subscription info
- Session history summary stats

### 6.9 Therapist Dashboard (`/dashboard/therapist`)
- Specialty badge (Yoga Therapist / Medical Doctor / etc.)
- Today's schedule (timeline view)
- Quick stats: Total Clients (45), Sessions Today (6), This Week (22), Avg Client Progress (72%)
- Client alerts: "2 new documents uploaded", "1 missed session"

### 6.10 Therapist Calendar (`/dashboard/therapist/calendar`)
- Weekly/Monthly toggle
- Time slots grid (7 AM – 9 PM)
- Color-coded slots (available/booked/group/blocked)
- Click slot → details panel

### 6.11 Therapist Clients (`/dashboard/therapist/clients`)
- Searchable table: Name, Tier, Progress %, Next Session, Last Session
- Click row → client detail page

### 6.12 Therapist Client Detail (`/dashboard/therapist/clients/[id]`)
- Client's Skill Radar Chart
- Progress over time line charts
- Session history with notes
- AI document summaries section
- Behavioral patterns panel
- Auto-generated client summary paragraph

### 6.13 Therapist Sessions (`/dashboard/therapist/sessions`)
- Upcoming sessions list
- Session notes section
- "Start Session" → navigates to meeting simulation

### 6.14 Admin Dashboard (`/dashboard/admin`)
- Stats cards: Total Users (1,247), Active Subscriptions, Revenue (₹18.5L/mo), Sessions This Week (156)
- Charts: User growth line chart, subscription tier pie chart, session load per therapist bar chart
- Quick actions: Schedule Session, Add Therapist, View Reports

### 6.15 Admin Schedule (`/dashboard/admin/schedule`)
- Master calendar across all therapists
- Filter by therapist, specialty, date range
- Schedule new sessions
- Color-coded by specialty

### 6.16 Admin Therapists (`/dashboard/admin/therapists`)
- Therapist list: Name, Specialty, Availability, Client Count, Rating
- Click → view therapist's calendar

### 6.17 Admin Users (`/dashboard/admin/users`)
- User list: Name, Tier, Therapist Assigned, Last Active, Status
- Search + filter

### 6.18 Meeting Room (`/meeting/[id]`)
- Full-screen Google Meet-style simulation
- Pre-join screen → In-meeting UI → End call summary
- (See Section 5.5 for full detail)

---

## 7. Design System

### 7.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Teal Deep | `#0B6E6E` | Primary headers, CTAs |
| Teal | `#1A9E9E` | Buttons, active states |
| Teal Light | `#B2DFDB` | Card backgrounds, tags |
| Blue Deep | `#0D3B66` | Navigation text, headings |
| Blue | `#1565C0` | Links, secondary actions |
| Gold | `#C8A951` | Premium badges, Elite tier |
| Green Soft | `#4CAF50` | Success, available slots |
| Sage | `#E8F5E9` | Light section backgrounds |
| Cream | `#FAFDF6` | Page backgrounds |
| Charcoal | `#263238` | Body text |
| White | `#FFFFFF` | Cards, modals |
| Red Soft | `#E57373` | End call, errors |
| Purple | `#7E57C2` | Psychology specialty |
| Orange | `#FF8A65` | Physiotherapy specialty |

### 7.2 Typography
- **Headings**: Outfit (Google Fonts) — weights 500, 600, 700
- **Body**: Inter (Google Fonts) — weights 400, 500, 600

### 7.3 Design Principles
- Calm, spa-like aesthetic — generous whitespace
- Soft gradients (teal-to-blue, sage-to-cream)
- Glassmorphism on cards (frosted glass with backdrop-blur)
- Smooth page transitions (Framer Motion)
- Micro-animations on hover and interaction
- Rounded corners (12-16px on cards, 8px on buttons)
- Subtle shadows (no harsh drop-shadows)

---

## 8. Demo Data Requirements

All data is pre-populated. No real API calls.

### Clients (5 demo profiles)
| Name | Tier | Therapist | Joined |
|------|------|-----------|--------|
| Priya Sharma | Elite | Dr. Arun (Medical) | 3 months ago |
| Rahul Verma | Therapeutic | Meera (Yoga) | 6 months ago |
| Ananya Desai | Essential | Kavita (Nutrition) | 1 month ago |
| Vikram Patel | Therapeutic | Dr. Sneha (Psychology) | 4 months ago |
| Lakshmi Nair | Elite | Rajesh (Physiotherapy) | 8 months ago |

### Therapists (8 demo profiles)
| Name | Specialty | Clients | Rating |
|------|-----------|---------|--------|
| Meera Krishnan | Yoga Therapist | 45 | 4.9 |
| Dr. Arun Mehta | Medical Doctor | 32 | 4.8 |
| Dr. Sneha Iyer | Psychologist | 28 | 4.9 |
| Rajesh Kumar | Physiologist | 35 | 4.7 |
| Kavita Reddy | Nutritionist | 40 | 4.8 |
| Deepa Nair | Yoga Therapist | 38 | 4.7 |
| Dr. Sanjay Gupta | Medical Doctor | 30 | 4.6 |
| Ritu Sharma | Psychologist | 25 | 4.8 |

### Sessions (mock schedule for current week)
- 6-8 sessions per day across therapists
- Mix of group yoga, group therapy, 1-on-1, consultations
- Realistic time slots (6 AM, 7 AM, 9 AM, 11 AM, 2 PM, 4 PM, 6 PM, 8 PM)

### Documents (pre-populated per client)
- 2-3 medical documents each with AI summaries
- Types: Blood Test, X-Ray, Prescription, MRI, Diet Chart

---

## 9. Navigation Structure

### Client Sidebar
```
🏠 Dashboard
📅 My Sessions
📈 My Progress
🎓 Browse Classes
👤 My Profile
```

### Therapist Sidebar
```
🏠 Dashboard
📅 My Calendar
👥 My Clients
📋 Sessions
```

### Admin Sidebar
```
🏠 Dashboard
📅 Schedule
👨‍⚕️ Therapists
👥 Users
```

### Top Navbar (all roles)
```
[Base Logo] ─── [Page Title] ──────────── [🔔 Notifications] [👤 Profile Dropdown]
```

---

## 10. Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14+ (App Router) | Framework |
| TypeScript | 5.x | Type safety |
| Recharts | Latest | Radar + line + bar + pie charts |
| Framer Motion | Latest | Animations, page transitions |
| Lucide React | Latest | Icon set |
| date-fns | Latest | Date formatting |
| Vanilla CSS (Modules) | — | Styling (no Tailwind) |
| Google Fonts | — | Outfit + Inter |
