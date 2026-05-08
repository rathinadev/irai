'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { AchievementBadge } from '@/components/ui/AchievementBadge';
import { ProgressLine } from '@/components/charts/ProgressLine';
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
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Progress</h1>
        <p className={styles.subtitle}>Track your wellness journey and celebrate your milestones.</p>
      </header>

      <div className={styles.mainGrid}>
        <Card padding="lg" className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3>Growth Over Time</h3>
            <p>Your improvement across key dimensions over the last 5 months.</p>
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
          <div className={styles.cardHeader}>
            <h3>Milestones & Badges</h3>
            <p>Your earned achievements.</p>
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
