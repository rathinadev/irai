'use client';

import React from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, UserCheck, Activity, DollarSign } from 'lucide-react';
import { StatsPie } from '@/components/charts/StatsPie';
import { StatsBar } from '@/components/charts/StatsBar';
import styles from './page.module.css';

const mockPieData = [
  { name: 'Elite', value: 400, color: 'var(--gold)' },
  { name: 'Therapeutic', value: 500, color: 'var(--teal)' },
  { name: 'Essential', value: 348, color: 'var(--blue)' },
];

const mockBarData = [
  { name: 'Meera (Yoga)', sessions: 45 },
  { name: 'Dr. Arun (Med)', sessions: 32 },
  { name: 'Dr. Sneha (Psy)', sessions: 28 },
  { name: 'Rajesh (Phys)', sessions: 35 },
  { name: 'Kavita (Nutr)', sessions: 40 },
];

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>System Overview</h1>
        <p className={styles.subtitle}>Platform metrics and management.</p>
      </header>

      <div className={styles.statsGrid}>
        <StatsCard 
          title="Total Active Clients" 
          value="1,248" 
          trend={{ value: 15, isPositive: true }}
          icon={<Users size={20} />}
        />
        <StatsCard 
          title="Active Therapists" 
          value="42" 
          icon={<UserCheck size={20} />}
        />
        <StatsCard 
          title="Sessions This Week" 
          value="356" 
          trend={{ value: 8, isPositive: true }}
          icon={<Activity size={20} />}
        />
        <StatsCard 
          title="MRR (Demo)" 
          value="₹4.2L" 
          trend={{ value: 12, isPositive: true }}
          icon={<DollarSign size={20} />}
        />
      </div>

      <div className={styles.mainGrid}>
        <Card padding="lg">
          <div className={styles.cardHeader}>
            <h3>Subscription Distribution</h3>
          </div>
          <div style={{ height: '300px' }}>
            <StatsPie data={mockPieData} />
          </div>
        </Card>

        <Card padding="lg">
          <div className={styles.cardHeader}>
            <h3>Session Load per Therapist</h3>
          </div>
          <div style={{ height: '300px' }}>
            <StatsBar data={mockBarData} />
          </div>
        </Card>

        <Card padding="lg">
          <div className={styles.cardHeader}>
            <h3>Recent System Alerts</h3>
          </div>
          <div className={styles.alertList}>
            <div className={styles.alertItem}>
              <Badge variant="warning">Warning</Badge>
              <span>High waitlist for Advanced Core Yoga (8 pending)</span>
            </div>
            <div className={styles.alertItem}>
              <Badge variant="error">Critical</Badge>
              <span>Therapist ID: t4 reported technical issue in video</span>
            </div>
            <div className={styles.alertItem}>
              <Badge variant="success">Info</Badge>
              <span>New Elite plan subscription: User ID: c12</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
