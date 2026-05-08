'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { WeeklyCalendar } from '@/components/calendar/WeeklyCalendar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

export default function AdminSchedule() {
  const [isScheduling, setIsScheduling] = useState(false);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', color: 'var(--blue-deep)', marginBottom: '4px' }}>Master Schedule</h1>
          <p style={{ color: 'var(--gray-500)', margin: 0 }}>View all platform sessions and classes.</p>
        </div>
        <Button variant="primary" onClick={() => setIsScheduling(true)}>Schedule Session</Button>
      </header>
      
      <div style={{ display: 'flex', gap: '16px', background: 'var(--white)', padding: '16px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ flex: 1 }}>
          <Input placeholder="Search Therapist..." />
        </div>
        <div style={{ flex: 1 }}>
          <Input placeholder="Filter by Specialty..." />
        </div>
        <div style={{ flex: 1 }}>
          <Input type="date" />
        </div>
      </div>

      <Card padding="lg" style={{ minHeight: '600px' }}>
        <WeeklyCalendar slots={[]} />
      </Card>
      
      <Modal
        isOpen={isScheduling}
        onClose={() => setIsScheduling(false)}
        title="Schedule New Session"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input placeholder="Client Name" />
          <Input placeholder="Therapist" />
          <div style={{ display: 'flex', gap: '16px' }}>
            <Input type="date" />
            <Input type="time" />
          </div>
          <select style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--gray-300)', width: '100%' }}>
            <option>1-on-1 Consultation</option>
            <option>Group Yoga Therapy</option>
            <option>Medical Review</option>
            <option>Psychology Session</option>
          </select>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <Button variant="outline" onClick={() => setIsScheduling(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => {
              alert('Session scheduled successfully!');
              setIsScheduling(false);
            }}>Confirm Booking</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
