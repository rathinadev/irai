import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import styles from './StatsCard.module.css';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  subtitle?: string;
}

export function StatsCard({ title, value, trend, icon, subtitle }: StatsCardProps) {
  return (
    <Card className={styles.statsCard} padding="md">
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
      </div>
      <div className={styles.content}>
        <div className={styles.value}>{value}</div>
        {trend && (
          <Badge variant={trend.isPositive ? 'success' : 'error'} className={styles.trend}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </Badge>
        )}
      </div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </Card>
  );
}
