import React from 'react';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import { ChevronRight } from 'lucide-react';
import styles from './ClientRow.module.css';
import { ClientTier } from '@/data/mock-data';

interface ClientRowProps {
  name: string;
  avatar: string;
  tier: ClientTier;
  progress: number;
  nextSessionDate?: string;
  lastSessionDate?: string;
  onClick?: () => void;
}

export function ClientRow({
  name,
  avatar,
  tier,
  progress,
  nextSessionDate,
  lastSessionDate,
  onClick
}: ClientRowProps) {
  return (
    <div className={styles.clientRow} onClick={onClick}>
      <div className={styles.clientInfo}>
        <Avatar src={avatar} alt={name} size="md" />
        <div>
          <h4 className={styles.name}>{name}</h4>
          <Badge variant={tier === 'elite' ? 'gold' : tier === 'therapeutic' ? 'secondary' : 'outline'}>
            {tier}
          </Badge>
        </div>
      </div>

      <div className={styles.progressCol}>
        <span className={styles.label}>Overall Progress</span>
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%`, backgroundColor: progress > 70 ? 'var(--success)' : 'var(--warning)' }} 
            />
          </div>
          <span className={styles.progressValue}>{progress}%</span>
        </div>
      </div>

      <div className={styles.dateCol}>
        <span className={styles.label}>Next Session</span>
        <span className={styles.value}>{nextSessionDate || 'None scheduled'}</span>
      </div>

      <div className={styles.dateCol}>
        <span className={styles.label}>Last Session</span>
        <span className={styles.value}>{lastSessionDate || 'Never'}</span>
      </div>

      <div className={styles.actionCol}>
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); if(onClick) onClick(); }}>
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
}
