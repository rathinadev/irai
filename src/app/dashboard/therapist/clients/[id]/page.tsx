'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { SkillRadar } from '@/components/charts/SkillRadar';
import { mockRadarData, mockPreviousRadarData, clients, mockDocuments } from '@/data/mock-data';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle2, MessageSquare } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import styles from './page.module.css';

export default function ClientDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const client = clients.find(u => u.id === id);

  const [isMessageOpen, setIsMessageOpen] = React.useState(false);
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [bookingDate, setBookingDate] = React.useState('');
  const [bookingTime, setBookingTime] = React.useState('');

  if (!client) {
    return <div>Client not found</div>;
  }

  const OverviewTab = (
    <div className={styles.tabGrid}>
      <Card padding="lg" className={styles.radarCard}>
        <div className={styles.cardHeader}>
          <h3>Current Progress</h3>
        </div>
        <SkillRadar data={mockRadarData} comparisonData={mockPreviousRadarData} />
      </Card>
      
      <div className={styles.sideCol}>
        <Card padding="md">
          <div className={styles.cardHeader}>
            <h3>AI Summary</h3>
          </div>
          <p className={styles.aiText}>
            Patient is responding well to back pain protocols. Noticeable improvement in flexibility (+15%) over the last month. Recommended to increase core strengthening exercises and maintain current breathing routines.
          </p>
        </Card>

        <Card padding="md">
          <div className={styles.cardHeader}>
            <h3>Key Metrics</h3>
          </div>
          <div className={styles.metricsList}>
            <div className={styles.metricItem}>
              <span>Adherence</span>
              <strong>85%</strong>
            </div>
            <div className={styles.metricItem}>
              <span>Pain Level (Avg)</span>
              <strong>3/10</strong>
            </div>
            <div className={styles.metricItem}>
              <span>Sessions Attended</span>
              <strong>12/14</strong>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const DocumentsTab = (
    <div className={styles.docGrid}>
      {mockDocuments.map(doc => (
        <Card key={doc.id} padding="md" className={styles.docCard}>
          <div className={styles.docHeader}>
            <div className={styles.docTitle}>
              <FileText size={18} className={styles.docIcon} />
              <span>{doc.fileName}</span>
            </div>
            <span className={styles.docDate}>{new Date(doc.uploadDate).toLocaleDateString()}</span>
          </div>
          <p className={styles.docSummary}>{doc.aiSummary}</p>
          <div className={styles.indicators}>
            {doc.healthIndicators.map((indicator, i) => (
              <div key={i} className={`${styles.indicator} ${styles[indicator.status]}`}>
                {indicator.status === 'warning' ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                <span>{indicator.label}: {indicator.value}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => router.back()}>
        <ArrowLeft size={16} /> Back to Clients
      </button>

      <div className={styles.headerCard}>
        <div className={styles.clientProfile}>
          <Avatar src={client.avatar} alt={client.name} size="xl" />
          <div className={styles.clientInfo}>
            <h1 className={styles.name}>{client.name}</h1>
            <p className={styles.email}>{client.email}</p>
            <div className={styles.tags}>
              <Badge variant={client.tier === 'transform' ? 'gold' : 'primary'}>{client.tier} Plan</Badge>
              <Badge variant="outline">Onboarded: Jan 2026</Badge>
            </div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline" onClick={() => setIsMessageOpen(true)}><MessageSquare size={16} /> Message</Button>
          <Button variant="primary" onClick={() => setIsBookingOpen(true)}>Book Session</Button>
        </div>
      </div>

      <Tabs 
        tabs={[
          { id: 'overview', label: 'Progress Overview', content: OverviewTab },
          { id: 'documents', label: 'Medical Documents', content: DocumentsTab },
          { id: 'notes', label: 'Therapist Notes', content: <Card padding="lg"><p>Session notes history goes here.</p></Card> }
        ]}
      />

      {/* Message Modal */}
      <Modal isOpen={isMessageOpen} onClose={() => setIsMessageOpen(false)} title={`Message ${client.name}`}>
        <div style={{ padding: '16px 0' }}>
          <div style={{ height: '200px', backgroundColor: 'var(--gray-50)', borderRadius: '8px', padding: '16px', marginBottom: '16px', overflowY: 'auto' }}>
            <p style={{ margin: '0 0 8px 0', color: 'var(--gray-500)', fontSize: '12px' }}>Today</p>
            <div style={{ backgroundColor: 'var(--teal-50)', padding: '10px', borderRadius: '8px', maxWidth: '80%', marginBottom: '8px' }}>
              <p style={{ margin: 0, color: 'var(--teal-deep)' }}>Hello {client.name.split(' ')[0]}, how are you feeling after the last session?</p>
            </div>
            <p style={{ margin: '0 0 4px 0', color: 'var(--gray-500)', fontSize: '12px', textAlign: 'right' }}>Patient</p>
            <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--gray-200)', padding: '10px', borderRadius: '8px', maxWidth: '80%', marginLeft: 'auto' }}>
              <p style={{ margin: 0, color: 'var(--charcoal)' }}>The stretches helped a lot! My lower back feels much less stiff.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" placeholder="Type a message..." style={{ flexGrow: 1, padding: '10px', border: '1px solid var(--gray-300)', borderRadius: '8px' }} />
            <Button variant="primary">Send</Button>
          </div>
        </div>
      </Modal>

      {/* Booking Modal */}
      <Modal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} title="Schedule Follow-up Session">
        <div style={{ padding: '16px 0' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Select Date</label>
            <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid var(--gray-300)', borderRadius: '8px' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Select Time</label>
            <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid var(--gray-300)', borderRadius: '8px' }}>
              <option value="">Select Time</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="14:00">02:00 PM</option>
              <option value="16:00">04:00 PM</option>
            </select>
          </div>
          <Button variant="primary" fullWidth disabled={!bookingDate || !bookingTime} onClick={() => { alert('Session Booked!'); setIsBookingOpen(false); }}>Confirm Booking</Button>
        </div>
      </Modal>
    </div>
  );
}
