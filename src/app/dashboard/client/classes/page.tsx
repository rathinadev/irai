'use client';

import React, { useState } from 'react';
import { ClassCard } from '@/components/ui/ClassCard';
import { Input } from '@/components/ui/Input';
import { therapists } from '@/data/mock-data';
import styles from './page.module.css';

const mockClasses = [
  {
    id: 'c1',
    title: 'Morning Flow Yoga',
    therapistId: 't1', // Meera
    date: '2026-05-15',
    time: '07:00 AM',
    duration: 60,
    spotsAvailable: 12,
    totalSpots: 30,
    difficulty: 'Beginner' as const,
    type: 'Yoga'
  },
  {
    id: 'c2',
    title: 'Stress Management Group',
    therapistId: 't3', // Sneha
    date: '2026-05-16',
    time: '06:00 PM',
    duration: 45,
    spotsAvailable: 5,
    totalSpots: 15,
    difficulty: 'Beginner' as const,
    type: 'Psychology'
  },
  {
    id: 'c3',
    title: 'Advanced Core Strength',
    therapistId: 't6', // Deepa
    date: '2026-05-17',
    time: '08:00 AM',
    duration: 60,
    spotsAvailable: 0,
    totalSpots: 20,
    difficulty: 'Advanced' as const,
    type: 'Yoga'
  },
  {
    id: 'c4',
    title: 'Back Pain Relief Protocol',
    therapistId: 't4', // Rajesh
    date: '2026-05-18',
    time: '10:00 AM',
    duration: 45,
    spotsAvailable: 8,
    totalSpots: 12,
    difficulty: 'Intermediate' as const,
    type: 'Physiotherapy'
  },
];

export default function BrowseClasses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [classes, setClasses] = useState(mockClasses);
  const [enrolledClassIds, setEnrolledClassIds] = useState<string[]>([]);
  const [isEnrolling, setIsEnrolling] = useState<string | null>(null);

  const filteredClasses = classes.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || c.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTherapist = (id: string) => therapists.find(t => t.id === id);

  const handleEnroll = (classId: string) => {
    if (enrolledClassIds.includes(classId)) return;
    
    setIsEnrolling(classId);
    
    // Simulate API call
    setTimeout(() => {
      setClasses(prev => prev.map(c => {
        if (c.id === classId && c.spotsAvailable > 0) {
          return { ...c, spotsAvailable: c.spotsAvailable - 1 };
        }
        return c;
      }));
      setEnrolledClassIds(prev => [...prev, classId]);
      setIsEnrolling(null);
    }, 800);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Browse Classes</h1>
        <p className={styles.subtitle}>Discover and enroll in upcoming group sessions.</p>
      </header>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <Input 
            placeholder="Search classes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          {['All', 'Yoga', 'Psychology', 'Physiotherapy', 'Nutrition'].map(type => (
            <button 
              key={type}
              className={`${styles.filterBtn} ${typeFilter === type ? styles.activeFilter : ''}`}
              onClick={() => setTypeFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filteredClasses.length > 0 ? (
          filteredClasses.map(cls => {
            const therapist = getTherapist(cls.therapistId);
            return (
              <ClassCard
                key={cls.id}
                title={cls.title}
                therapistName={therapist?.name || 'Unknown'}
                therapistAvatar={therapist?.avatar || ''}
                date={cls.date}
                time={cls.time}
                duration={cls.duration}
                spotsAvailable={cls.spotsAvailable}
                totalSpots={cls.totalSpots}
                difficulty={cls.difficulty}
                type={cls.type}
                onEnroll={() => handleEnroll(cls.id)}
                isEnrolled={enrolledClassIds.includes(cls.id)}
                isEnrolling={isEnrolling === cls.id}
              />
            )
          })
        ) : (
          <div className={styles.noResults}>
            <p>No classes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
