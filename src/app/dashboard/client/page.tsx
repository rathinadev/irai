'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatsCard } from '@/components/ui/StatsCard';
import { SessionCard } from '@/components/ui/SessionCard';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { mockSessions } from '@/data/mock-data';
import { Calendar, Activity, Zap, Trophy } from 'lucide-react';
import styles from './page.module.css';

export default function ClientDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);
  const [waterGlasses, setWaterGlasses] = useState(0);
  
  // Filter sessions based on tier constraints
  const mySessions = mockSessions.filter(s => {
    if (s.status === 'available') return false;
    
    // Transform tier doesn't have group yoga
    if (user?.tier === 'transform' && s.clientName === 'Multiple (12)') return false;
    
    // Foundation tier ONLY has group yoga (No 1-on-1)
    if (user?.tier === 'foundation' && s.clientName !== 'Multiple (12)') return false;
    
    return true;
  });

  const tier = user?.tier || 'foundation';
  const services = [
    { name: '1-on-1 Yoga Therapy', available: tier === 'foundation' ? 'No' : tier === 'balanced' ? '4 Sessions / mo' : '12 Sessions / mo', locked: tier === 'foundation' },
    { name: 'Doctor Consultation', available: tier === 'foundation' ? 'No' : '2 Sessions / mo', locked: tier === 'foundation' },
    { name: 'Nutrition Support', available: tier === 'foundation' ? 'General Plan' : tier === 'balanced' ? '2 Sessions / mo' : '4 Sessions / mo', locked: false },
    { name: 'Physiotherapy', available: tier === 'transform' ? '4 Sessions / mo' : 'No', locked: tier !== 'transform' },
    { name: 'Psychologist Support', available: tier === 'transform' ? '2 Sessions / mo' : 'No', locked: tier !== 'transform' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Good morning, {user?.name.split(' ')[0]} 🙏</h1>
          <p className={styles.subtitle}>Welcome back to your wellness journey.</p>
        </div>
        <div className={styles.tierBadge}>
          <Badge variant={user?.tier === 'transform' ? 'gold' : 'primary'}>
            {user?.tier} Plan
          </Badge>
        </div>
      </header>

      <div className={styles.notificationsArea}>
        <div className={styles.notificationItem}>
          <span className={styles.notifIcon}>💬</span>
          <div className={styles.notifContent}>
            <strong>New message from Dr. Sarah</strong>
            <p>"Hello John, how are you feeling after the last session?"</p>
          </div>
        </div>
        <div className={styles.notificationItem}>
          <span className={styles.notifIcon}>📅</span>
          <div className={styles.notifContent}>
            <strong>New session scheduled</strong>
            <p>Your follow-up session is confirmed for Tomorrow at 10:00 AM.</p>
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatsCard 
          title="Overall Score" 
          value="78%" 
          trend={{ value: 4, isPositive: true }}
          icon={<Activity size={20} />}
          subtitle="Top 15% of users"
        />
        <StatsCard 
          title="Current Streak" 
          value="12 Days" 
          icon={<Zap size={20} />}
          subtitle="Your best is 14 days"
        />
        <StatsCard 
          title="Sessions This Month" 
          value="8" 
          icon={<Calendar size={20} />}
          subtitle="4 Yoga, 2 Therapy, 2 Custom"
        />
        <StatsCard 
          title="Milestones" 
          value="3" 
          icon={<Trophy size={20} />}
          subtitle="1 new this week"
        />
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.mainCol}>
          <Card className={styles.heroCard} padding="lg">
            <div className={styles.heroContent}>
              <Badge variant="gold" className={styles.heroBadge}>
                {user?.tier === 'foundation' ? 'Daily Plan' : 'Active Program'}
              </Badge>
              <h2 className={styles.heroTitle}>
                {user?.tier === 'foundation' ? 'General Wellness Practice' : 'Lower Back Recovery Plan'}
              </h2>
              <p className={styles.heroSubtitle}>
                {user?.tier === 'foundation' ? 'Maintain your daily practice with guided general sessions.' : 'Focus on clinical recovery. You are 60% through this module.'}
              </p>
              <div className={styles.progressWrapper}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: user?.tier === 'foundation' ? '30%' : '60%' }}></div>
                </div>
                <span className={styles.progressText}>
                  {user?.tier === 'foundation' ? '30%' : '60%'} Complete
                </span>
              </div>
              <button className={styles.heroBtn}>Resume Session</button>
            </div>
          </Card>

          <div className={styles.bentoGrid}>
            <Card padding="md" className={styles.bentoCard}>
              <h4 className={styles.bentoTitle}>💡 Daily Focus</h4>
              <p className={styles.bentoText}>Deep breathing and gentle spinal twists to release tension.</p>
            </Card>
            <Card padding="md" className={styles.bentoCard}>
              <h4 className={styles.bentoTitle}>👩‍⚕️ Therapist Note</h4>
              <p className={styles.bentoText}>"Focus on posture during work hours. Take breaks every 45 mins." - Dr. Sarah</p>
            </Card>
          </div>

          <Card padding="lg" className={styles.servicesCard}>
            <h3 className={styles.servicesTitle}>My Plan Benefits</h3>
            <div className={styles.servicesList}>
              {services.map((service, idx) => (
                <div key={idx} className={`${styles.serviceItem} ${service.locked ? styles.serviceLocked : ''}`}>
                  <span className={styles.serviceName}>{service.name}</span>
                  <Badge variant={service.locked ? 'outline' : 'primary'}>
                    {service.available}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <div className={styles.sideCol}>
          <Card className={styles.sessionsCard} padding="md">
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Upcoming Sessions</h3>
              <a href="/dashboard/client/sessions" className={styles.viewAll}>View All</a>
            </div>
            
            <div className={styles.sessionList}>
              {mySessions.slice(0, 3).map(session => (
                <SessionCard
                  key={session.id}
                  title={session.sessionTitle!}
                  date={session.date}
                  time={`${session.startTime} - ${session.endTime}`}
                  type={session.sessionType!}
                  therapistName={`Therapist ID: ${session.therapistId}`} // We'd map this in a real app
                  onJoin={() => router.push(`/meeting/${session.id}`)}
                  onViewNotes={() => setSelectedNotes(session.sessionTitle!)}
                />
              ))}
            </div>
          </Card>

          <Card className={styles.waterCard} padding="md">
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Daily Hydration</h3>
              <Badge variant="outline">{waterGlasses} / 8 Glasses</Badge>
            </div>
            <div style={{ height: '8px', background: 'var(--teal-light)', borderRadius: '4px', overflow: 'hidden', margin: '16px 0' }}>
              <div style={{ height: '100%', background: 'var(--teal)', width: `${(waterGlasses / 8) * 100}%`, transition: 'width 0.3s ease' }}></div>
            </div>
            <button 
              onClick={() => setWaterGlasses(prev => Math.min(8, prev + 1))}
              disabled={waterGlasses >= 8}
              style={{
                width: '100%', padding: '8px', borderRadius: '8px', border: 'none',
                background: waterGlasses >= 8 ? 'var(--sage)' : 'var(--teal-50)',
                color: waterGlasses >= 8 ? 'var(--success)' : 'var(--teal-deep)',
                fontWeight: 600, cursor: waterGlasses >= 8 ? 'default' : 'pointer',
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
              }}
            >
              <Zap size={16} />
              {waterGlasses >= 8 ? 'Hydration Goal Met!' : '+ Log a Glass of Water'}
            </button>
          </Card>
        </div>
      </div>
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
