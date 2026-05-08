'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SessionCard } from '@/components/ui/SessionCard';
import { Modal } from '@/components/ui/Modal';
import { useAuth } from '@/context/AuthContext';
import { mockSessions } from '@/data/mock-data';
import styles from './page.module.css';

export default function TherapistSessions() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);
  const [writingNoteFor, setWritingNoteFor] = useState<string | null>(null);
  
  // Therapist sees sessions assigned to them
  const mySessions = mockSessions.filter(s => s.therapistId === user?.id);
  
  // Also include the group session for demo
  if (mockSessions[1]) mySessions.unshift(mockSessions[1]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Sessions</h1>
        <p className={styles.subtitle}>View your upcoming 1-on-1 and group classes.</p>
      </header>

      <div className={styles.grid}>
        {mySessions.map(session => (
          <SessionCard
            key={session.id}
            title={session.sessionTitle!}
            date={session.date}
            time={`${session.startTime} - ${session.endTime}`}
            type={session.sessionType!}
            clientName={session.clientName}
            isPast={(session as any).isPast}
            onJoin={() => router.push(`/meeting/${session.id}`)}
            onViewNotes={() => setSelectedNotes(session.sessionTitle!)}
            onAddNote={(session as any).isPast ? () => setWritingNoteFor(session.sessionTitle!) : undefined}
          />
        ))}
      </div>
      
      <Modal 
        isOpen={!!selectedNotes} 
        onClose={() => setSelectedNotes(null)}
        title={`Notes: ${selectedNotes}`}
      >
        <div style={{ padding: '16px 0', lineHeight: '1.6', color: 'var(--charcoal)' }}>
          <p><strong>Session Summary:</strong> Focus was on pranayama techniques for stress relief. Client participated actively.</p>
          <p><strong>Next Steps:</strong> Review breathing patterns in the next session.</p>
        </div>
      </Modal>

      <Modal 
        isOpen={!!writingNoteFor} 
        onClose={() => setWritingNoteFor(null)}
        title={`Add Note: ${writingNoteFor}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--charcoal)' }}>Session Summary</label>
            <textarea 
              rows={4} 
              placeholder="Write your clinical notes here..."
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--gray-300)', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--charcoal)' }}>Homework / Prescriptions</label>
            <textarea 
              rows={2} 
              placeholder="e.g. 10 mins of meditation daily"
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--gray-300)', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button 
              onClick={() => setWritingNoteFor(null)}
              style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid var(--gray-300)', background: 'transparent', cursor: 'pointer', fontWeight: 500 }}
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                alert('Note saved to client record successfully!');
                setWritingNoteFor(null);
              }}
              style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: 'var(--teal)', color: 'white', cursor: 'pointer', fontWeight: 500 }}
            >
              Save Note
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
