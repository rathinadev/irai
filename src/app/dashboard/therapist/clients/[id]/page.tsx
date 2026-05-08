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
import styles from './page.module.css';

export default function ClientDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const client = clients.find(u => u.id === params.id);

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
              <Badge variant={client.tier === 'elite' ? 'gold' : 'primary'}>{client.tier} Plan</Badge>
              <Badge variant="outline">Onboarded: Jan 2026</Badge>
            </div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline"><MessageSquare size={16} /> Message</Button>
          <Button variant="primary">Book Session</Button>
        </div>
      </div>

      <Tabs 
        tabs={[
          { id: 'overview', label: 'Progress Overview', content: OverviewTab },
          { id: 'documents', label: 'Medical Documents', content: DocumentsTab },
          { id: 'notes', label: 'Therapist Notes', content: <Card padding="lg"><p>Session notes history goes here.</p></Card> }
        ]}
      />
    </div>
  );
}
