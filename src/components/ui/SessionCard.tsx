import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Calendar, Clock, Video, User } from 'lucide-react';
import styles from './SessionCard.module.css';

interface SessionCardProps {
  title: string;
  date: string;
  time: string;
  type: 'yoga' | 'medical' | 'psychology' | 'physiology' | 'nutrition';
  therapistName?: string;
  clientName?: string;
  isPast?: boolean;
  onJoin?: () => void;
  onViewNotes?: () => void;
  onAddNote?: () => void;
}

export function SessionCard({ 
  title, 
  date, 
  time, 
  type, 
  therapistName, 
  clientName,
  isPast,
  onJoin,
  onViewNotes,
  onAddNote
}: SessionCardProps) {
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  
  return (
    <Card className={`${styles.sessionCard} ${isPast ? styles.past : ''}`} padding="md">
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        <Badge variant={`specialty-${type}` as any}>{type}</Badge>
      </div>
      
      <div className={styles.details}>
        <div className={styles.detailRow}>
          <Calendar size={16} className={styles.icon} />
          <span>{formattedDate}</span>
        </div>
        <div className={styles.detailRow}>
          <Clock size={16} className={styles.icon} />
          <span>{time}</span>
        </div>
        {(therapistName || clientName) && (
          <div className={styles.detailRow}>
            <User size={16} className={styles.icon} />
            <span>{therapistName || clientName}</span>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {isPast ? (
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <Button variant="outline" size="sm" fullWidth onClick={onViewNotes}>
              View Notes
            </Button>
            {onAddNote && (
              <Button variant="primary" size="sm" fullWidth onClick={onAddNote}>
                Add Note
              </Button>
            )}
          </div>
        ) : (
          <Button variant="primary" size="sm" fullWidth onClick={onJoin}>
            <Video size={16} /> Join Session
          </Button>
        )}
      </div>
    </Card>
  );
}
