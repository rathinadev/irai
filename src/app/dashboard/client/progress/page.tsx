'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { AchievementBadge } from '@/components/ui/AchievementBadge';
import { ProgressLine } from '@/components/charts/ProgressLine';
import { SkillRadar } from '@/components/charts/SkillRadar';
import { mockRadarData, mockPreviousRadarData } from '@/data/mock-data';
import { Badge } from '@/components/ui/Badge';
import { Flame, Star, Target, ShieldCheck } from 'lucide-react';
import styles from './page.module.css';

const mockProgressData = [
  { month: 'Jan', flexibility: 40, strength: 45, focus: 50 },
  { month: 'Feb', flexibility: 45, strength: 50, focus: 55 },
  { month: 'Mar', flexibility: 55, strength: 60, focus: 65 },
  { month: 'Apr', flexibility: 65, strength: 65, focus: 75 },
  { month: 'May', flexibility: 85, strength: 70, focus: 80 },
];

export default function ClientProgress() {
  const [radarData, setRadarData] = useState(mockRadarData);
  const [isGoalCompleted, setIsGoalCompleted] = useState(false);

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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Progress</h1>
        <p className={styles.subtitle}>Track your wellness journey and celebrate your milestones.</p>
      </header>

      <div className={styles.mainGrid}>
        <Card padding="lg" className={styles.chartCard}>
          <div className={styles.cardHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--blue-deep)' }}>Your Skill Radar</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--gray-500)' }}>A holistic view of your 6 wellness dimensions.</p>
            </div>
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
          <SkillRadar data={radarData} comparisonData={mockPreviousRadarData} />
        </Card>

        <Card padding="lg" className={styles.chartCard}>
          <div className={styles.cardHeader} style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--blue-deep)' }}>Growth Over Time</h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--gray-500)' }}>Your improvement across key dimensions over the last 5 months.</p>
          </div>
          <ProgressLine 
            data={mockProgressData} 
            lines={[
              { key: 'flexibility', name: 'Flexibility', color: 'var(--teal)' },
              { key: 'strength', name: 'Strength', color: 'var(--blue)' },
              { key: 'focus', name: 'Mental Focus', color: '#7E57C2' },
            ]}
          />
        </Card>

        <Card padding="lg" className={styles.achievementsCard}>
          <div className={styles.cardHeader} style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--blue-deep)' }}>Milestones & Badges</h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--gray-500)' }}>Your earned achievements.</p>
          </div>
          
          <div className={styles.badgeGrid}>
            <AchievementBadge 
              title="First Step" 
              description="Completed first session" 
              icon={<Star size={24} />} 
              date="Jan 15, 2026" 
            />
            <AchievementBadge 
              title="7-Day Streak" 
              description="Consistency is key" 
              icon={<Flame size={24} />} 
              date="Feb 02, 2026" 
            />
            <AchievementBadge 
              title="Goal Setter" 
              description="Reached target flexibility" 
              icon={<Target size={24} />} 
              date="Apr 10, 2026" 
            />
            <AchievementBadge 
              title="Pain Free Week" 
              description="No reported pain for 7 days" 
              icon={<ShieldCheck size={24} />} 
              unlocked={false} 
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
