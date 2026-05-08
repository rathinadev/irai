'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/Badge';
import { StatsCard } from '@/components/ui/StatsCard';
import { Card } from '@/components/ui/Card';
import { SessionCard } from '@/components/ui/SessionCard';
import { WeeklyCalendar } from '@/components/calendar/WeeklyCalendar';
import { Modal } from '@/components/ui/Modal';
import { Users, Calendar as CalendarIcon, TrendingUp, AlertCircle } from 'lucide-react';
import styles from './page.module.css';

export default function TherapistDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, {user?.name}</h1>
          <p className={styles.subtitle}>Here's what's happening today.</p>
        </div>
        <div className={styles.specialtyBadge}>
          <Badge variant={`specialty-${user?.specialty}` as any}>
            {user?.specialty ? user.specialty.charAt(0).toUpperCase() + user.specialty.slice(1) : 'General'} Specialist
          </Badge>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <StatsCard 
          title="Total Clients" 
          value="45" 
          trend={{ value: 12, isPositive: true }}
          icon={<Users size={20} />}
          subtitle="3 new this week"
        />
        <StatsCard 
          title="Sessions Today" 
          value="6" 
          icon={<CalendarIcon size={20} />}
          subtitle="4 completed, 2 upcoming"
        />
        <StatsCard 
          title="Avg Client Progress" 
          value="72%" 
          trend={{ value: 5, isPositive: true }}
          icon={<TrendingUp size={20} />}
          subtitle="Across active clients"
        />
        <StatsCard 
          title="Alerts" 
          value="3" 
          icon={<AlertCircle size={20} />}
          subtitle="2 new documents uploaded"
        />
      </div>

      <div className={styles.mainGrid}>
        <Card padding="lg" className={styles.calendarCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Today's Schedule</h3>
            <Link href="/dashboard/therapist/calendar" className={styles.viewFull}>View Full Calendar</Link>
          </div>
          {/* We'll use the weekly calendar but it's just a demo placeholder anyway */}
          <div className={styles.calendarWrapper}>
            <WeeklyCalendar slots={[]} />
          </div>
        </Card>

        <div className={styles.sideCol}>
          <Card padding="md" className={styles.alertsCard}>
            <h3 className={styles.cardTitle}>Client Alerts</h3>
            <div className={styles.alertList}>
              <div className={styles.alertItem}>
                <div className={styles.alertDot}></div>
                <div className={styles.alertContent}>
                  <p className={styles.alertText}><strong>Priya Sharma</strong> uploaded a new MRI Report.</p>
                  <span className={styles.alertTime}>2 hours ago</span>
                </div>
              </div>
              <div className={styles.alertItem}>
                <div className={styles.alertDot}></div>
                <div className={styles.alertContent}>
                  <p className={styles.alertText}><strong>Rahul Verma</strong> missed his morning session.</p>
                  <span className={styles.alertTime}>4 hours ago</span>
                </div>
              </div>
            </div>
          </Card>

          <Card padding="md" className={styles.upcomingCard}>
            <h3 className={styles.cardTitle}>Next Session</h3>
            <SessionCard
              title="1-on-1 Consultation"
              date={new Date().toISOString().split('T')[0]}
              time="14:00 - 15:00"
              type={user?.specialty || 'medical'}
              clientName="Client: Vikram Patel"
              onJoin={() => router.push(`/meeting/s1`)}
              onViewNotes={() => setSelectedNotes('1-on-1 Consultation')}
            />
          </Card>
        </div>
      </div>

      <Modal 
        isOpen={!!selectedNotes} 
        onClose={() => setSelectedNotes(null)}
        title={`Notes: ${selectedNotes}`}
      >
        <div style={{ padding: '16px 0', lineHeight: '1.6', color: 'var(--charcoal)' }}>
          <p><strong>Session Summary:</strong> Discussed recent MRI findings. Client is cleared for light yoga. Avoid heavy lifting.</p>
          <p><strong>Next Steps:</strong> Schedule follow-up in 2 weeks to monitor progress.</p>
        </div>
      </Modal>
    </div>
  );
}
