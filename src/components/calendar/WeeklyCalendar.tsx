'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import styles from './WeeklyCalendar.module.css';

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'group' | 'blocked';
  sessionTitle?: string;
  clientName?: string;
}

interface WeeklyCalendarProps {
  slots: TimeSlot[];
  onSlotClick?: (slot: TimeSlot) => void;
}

export function WeeklyCalendar({ slots, onSlotClick }: WeeklyCalendarProps) {
  // Mock week days for demo
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = ['11', '12', '13', '14', '15', '16', '17'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 7); // 7 AM to 7 PM

  const getSlotStyle = (status: TimeSlot['status']) => {
    switch (status) {
      case 'available': return styles.slotAvailable;
      case 'booked': return styles.slotBooked;
      case 'group': return styles.slotGroup;
      case 'blocked': return styles.slotBlocked;
      default: return '';
    }
  };

  const getSlotLabel = (slot: TimeSlot) => {
    if (slot.status === 'available') return 'Available';
    if (slot.status === 'blocked') return 'Blocked';
    return `${slot.sessionTitle}\n${slot.clientName}`;
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={styles.monthLabel}>May 2026</div>
        <div className={styles.controls}>
          <Button variant="outline" size="sm">Today</Button>
          <div className={styles.navArrows}>
            <button className={styles.arrowBtn}><ChevronLeft size={20} /></button>
            <button className={styles.arrowBtn}><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Top-left empty cell */}
        <div className={styles.timeLabelHeader}></div>
        
        {/* Day headers */}
        {days.map((day, i) => (
          <div key={day} className={styles.dayHeader}>
            <span className={styles.dayName}>{day}</span>
            <span className={`${styles.dayNumber} ${dates[i] === '15' ? styles.today : ''}`}>
              {dates[i]}
            </span>
          </div>
        ))}

        {/* Time rows */}
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <div className={styles.timeLabel}>
              {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </div>
            
            {/* 7 cells per hour */}
            {days.map((_, dayIndex) => {
              // Mock logic to scatter some slots for the demo
              const isSlot = (dayIndex === 0 && hour === 9) || 
                             (dayIndex === 2 && hour === 14) ||
                             (dayIndex === 4 && hour === 11);
                             
              let slotData: TimeSlot | null = null;
              if (dayIndex === 0 && hour === 9) {
                slotData = { id: '1', date: '', startTime: '09:00', endTime: '10:00', status: 'booked', sessionTitle: '1-on-1 Yoga', clientName: 'Priya Sharma' };
              } else if (dayIndex === 2 && hour === 14) {
                slotData = { id: '2', date: '', startTime: '14:00', endTime: '15:00', status: 'group', sessionTitle: 'Group Therapy', clientName: 'Multiple (8)' };
              } else if (dayIndex === 4 && hour === 11) {
                slotData = { id: '3', date: '', startTime: '11:00', endTime: '12:00', status: 'available' };
              }

              return (
                <div key={`${dayIndex}-${hour}`} className={styles.cell}>
                  {slotData && (
                    <div 
                      className={`${styles.slot} ${getSlotStyle(slotData.status)}`}
                      onClick={() => onSlotClick && onSlotClick(slotData!)}
                    >
                      <div className={styles.slotContent}>
                        {getSlotLabel(slotData).split('\n').map((line, i) => (
                          <span key={i} className={i === 0 ? styles.slotPrimaryText : styles.slotSecondaryText}>
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
