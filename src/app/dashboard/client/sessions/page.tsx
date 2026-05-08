'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { SessionCard } from '@/components/ui/SessionCard';
import { Modal } from '@/components/ui/Modal';
import { mockSessions } from '@/data/mock-data';
import styles from './page.module.css';

export default function ClientSessions() {
  const router = useRouter();
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);
  // Client only sees their own or group sessions
  const mySessions = mockSessions.filter(s => 
    s.status !== 'available' && s.clientName !== 'Multiple (12)' 
  );
  if (mockSessions[1]) mySessions.unshift(mockSessions[1]);

  // Separate upcoming and past (mock logic)
  const upcomingSessions = mySessions; // For demo, all are upcoming today
  const pastSessions = [
    {
      id: 'p1',
      date: '2026-05-01',
      startTime: '09:00',
      endTime: '10:00',
      status: 'booked' as const,
      sessionTitle: 'Initial Consultation',
      sessionType: 'medical' as const,
      therapistId: 't2'
    }
  ];

  const ListView = (
    <div className={styles.listContainer}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Upcoming Sessions</h3>
        <div className={styles.grid}>
          {upcomingSessions.map(session => (
            <SessionCard
              key={session.id}
              title={session.sessionTitle!}
              date={session.date}
              time={`${session.startTime} - ${session.endTime}`}
              type={session.sessionType!}
              therapistName={`Therapist ID: ${session.therapistId}`}
              onJoin={() => router.push(`/meeting/${session.id}`)}
              onViewNotes={() => setSelectedNotes(session.sessionTitle!)}
            />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Past Sessions</h3>
        <div className={styles.grid}>
          {pastSessions.map(session => (
            <SessionCard
              key={session.id}
              title={session.sessionTitle}
              date={session.date}
              time={`${session.startTime} - ${session.endTime}`}
              type={session.sessionType}
              therapistName={`Therapist ID: ${session.therapistId}`}
              isPast
              onViewNotes={() => setSelectedNotes(session.sessionTitle!)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const CalendarView = (
    <Card padding="lg" className={styles.calendarContainer}>
      <div className={styles.calendarPlaceholder}>
        <p>Full monthly calendar view goes here.</p>
        <p>Switch to List View to see your sessions.</p>
      </div>
    </Card>
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Sessions</h1>
        <p className={styles.subtitle}>Manage your upcoming appointments and group classes.</p>
      </header>

      <Tabs 
        tabs={[
          { id: 'list', label: 'List View', content: ListView },
          { id: 'calendar', label: 'Calendar View', content: CalendarView }
        ]} 
      />
      <Modal 
        isOpen={!!selectedNotes} 
        onClose={() => setSelectedNotes(null)}
        title={`Notes: ${selectedNotes}`}
      >
        <div style={{ padding: '16px 0', lineHeight: '1.6', color: 'var(--charcoal)' }}>
          <p><strong>Session Summary:</strong> Client reported feeling much better after last week's exercises. We focused heavily on lower back mobility today.</p>
          <p><strong>Homework:</strong> 15 minutes of cat-cow stretches daily before bed. Continue hydration goal of 2L per day.</p>
        </div>
      </Modal>
    </div>
  );
}
