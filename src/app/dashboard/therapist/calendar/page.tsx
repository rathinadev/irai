'use client';

import React, { useState } from 'react';
import { WeeklyCalendar } from '@/components/calendar/WeeklyCalendar';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import styles from './page.module.css';

export default function TherapistCalendar() {
  const [isAddingAvailability, setIsAddingAvailability] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>My Calendar</h1>
          <p className={styles.subtitle}>Manage your schedule and availability.</p>
        </div>
        <Button variant="primary" onClick={() => setIsAddingAvailability(true)}>
          Add Availability
        </Button>
      </header>

      <div className={styles.calendarWrapper}>
        {/* Full screen weekly calendar */}
        <WeeklyCalendar slots={[]} />
      </div>

      <Modal
        isOpen={isAddingAvailability}
        onClose={() => setIsAddingAvailability(false)}
        title="Set Available Hours"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--charcoal)' }}>Day of Week</label>
            <select style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--gray-300)', width: '100%', fontFamily: 'inherit', fontSize: '14px' }}>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--charcoal)' }}>Start Time</label>
              <Input type="time" defaultValue="09:00" />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--charcoal)' }}>End Time</label>
              <Input type="time" defaultValue="17:00" />
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <input type="checkbox" id="repeat" defaultChecked style={{ width: '16px', height: '16px', accentColor: 'var(--teal)' }} />
            <label htmlFor="repeat" style={{ fontSize: '14px', color: 'var(--charcoal)' }}>Repeat every week</label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <Button variant="outline" onClick={() => setIsAddingAvailability(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => {
              alert('Availability saved successfully!');
              setIsAddingAvailability(false);
            }}>Save Availability</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
