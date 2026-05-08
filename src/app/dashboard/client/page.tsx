'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatsCard } from '@/components/ui/StatsCard';
import { SessionCard } from '@/components/ui/SessionCard';
import { SkillRadar } from '@/components/charts/SkillRadar';
import { Modal } from '@/components/ui/Modal';
import { mockRadarData, mockPreviousRadarData, mockSessions } from '@/data/mock-data';
import { Calendar, Activity, Zap, Trophy } from 'lucide-react';
import styles from './page.module.css';

export default function ClientDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);
  const [radarData, setRadarData] = useState(mockRadarData);
  const [isGoalCompleted, setIsGoalCompleted] = useState(false);
  const [waterGlasses, setWaterGlasses] = useState(0);
  
  // Filter sessions for this user or group sessions
  const mySessions = mockSessions.filter(s => 
    s.status !== 'available' && s.clientName !== 'Multiple (12)' // Simulating client filter
  );

  const handleCompleteGoal = () => {
    setIsGoalCompleted(true);
    setRadarData(prev => ({
      flexibility: Math.min(100, prev.flexibility + Math.floor(Math.random() * 6) + 5),
      strength: Math.min(100, prev.strength + Math.floor(Math.random() * 6) + 5),
      breathing: Math.min(100, prev.breathing + Math.floor(Math.random() * 6) + 5),
      mentalFocus: Math.min(100, prev.mentalFocus + Math.floor(Math.random() * 6) + 5),
      painReduction: Math.min(100, prev.painReduction + Math.floor(Math.random() * 6) + 5),
      consistency: Math.min(100, prev.consistency + Math.floor(Math.random() * 6) + 5),
    }));
  };
  
  // Add group session back for demo
  if (mockSessions[1]) mySessions.unshift(mockSessions[1]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Good morning, {user?.name.split(' ')[0]} 🙏</h1>
          <p className={styles.subtitle}>Welcome back to your wellness journey.</p>
        </div>
        <div className={styles.tierBadge}>
          <Badge variant={user?.tier === 'elite' ? 'gold' : 'primary'}>
            {user?.tier} Plan
          </Badge>
        </div>
      </header>

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
        <Card className={styles.radarCard} padding="lg">
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Your Skill Radar</h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button 
                onClick={handleCompleteGoal}
                disabled={isGoalCompleted}
                style={{
                  padding: '4px 10px', borderRadius: '12px', border: 'none',
                  background: isGoalCompleted ? 'var(--sage)' : 'var(--teal)',
                  color: isGoalCompleted ? 'var(--success)' : 'white',
                  fontSize: '11px', fontWeight: 600, cursor: isGoalCompleted ? 'default' : 'pointer'
                }}
              >
                {isGoalCompleted ? 'Goal Completed ✓' : 'Complete Goal (+5 XP)'}
              </button>
              <Badge variant="outline">Current vs Previous</Badge>
            </div>
          </div>
          <p className={styles.cardDesc}>A holistic view of your 6 wellness dimensions.</p>
          <SkillRadar data={radarData} comparisonData={mockPreviousRadarData} />
        </Card>

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
