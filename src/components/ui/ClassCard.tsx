import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Avatar } from './Avatar';
import { Clock, Users } from 'lucide-react';
import styles from './ClassCard.module.css';

interface ClassCardProps {
  title: string;
  therapistName: string;
  therapistAvatar: string;
  date: string;
  time: string;
  duration: number; // minutes
  spotsAvailable: number;
  totalSpots: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: string;
  onEnroll?: () => void;
  isEnrolled?: boolean;
  isEnrolling?: boolean;
}

export function ClassCard({
  title,
  therapistName,
  therapistAvatar,
  date,
  time,
  duration,
  spotsAvailable,
  totalSpots,
  difficulty,
  type,
  onEnroll,
  isEnrolled,
  isEnrolling
}: ClassCardProps) {
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const isFull = spotsAvailable === 0;

  return (
    <Card className={styles.classCard} padding="md">
      <div className={styles.header}>
        <div className={styles.tags}>
          <Badge variant="secondary">{type}</Badge>
          <Badge variant={difficulty === 'Beginner' ? 'success' : difficulty === 'Intermediate' ? 'warning' : 'error'}>
            {difficulty}
          </Badge>
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.therapistInfo}>
        <Avatar src={therapistAvatar} alt={therapistName} size="sm" />
        <span className={styles.therapistName}>{therapistName}</span>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <Clock size={16} className={styles.icon} />
          <span>{formattedDate}, {time} ({duration}m)</span>
        </div>
        <div className={styles.detailItem}>
          <Users size={16} className={styles.icon} />
          <span className={isFull ? styles.full : ''}>
            {isFull ? 'Class Full' : `${spotsAvailable}/${totalSpots} spots left`}
          </span>
        </div>
      </div>

      <Button 
        variant={isEnrolled ? 'success' : isFull ? 'secondary' : 'primary'} 
        fullWidth 
        disabled={isFull || isEnrolled || isEnrolling}
        onClick={onEnroll}
        className={styles.enrollBtn}
      >
        {isEnrolling ? 'Enrolling...' : isEnrolled ? 'Enrolled ✓' : isFull ? 'Waitlist' : 'Enroll Now'}
      </Button>
    </Card>
  );
}
