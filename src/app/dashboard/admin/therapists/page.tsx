'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { therapists } from '@/data/mock-data';

export default function AdminTherapists() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1 style={{ fontSize: '28px', color: 'var(--blue-deep)', marginBottom: '4px' }}>Therapist Management</h1>
        <p style={{ color: 'var(--gray-500)', margin: 0 }}>View and manage active therapists on the platform.</p>
      </header>

      <Card>
        <div style={{ padding: '0 24px' }}>
          {therapists.map(therapist => (
            <div key={therapist.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '24px',
              padding: '24px 0',
              borderBottom: '1px solid var(--gray-100)'
            }}>
              <Avatar src={therapist.avatar} alt={therapist.name} size="lg" />
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', color: 'var(--blue-deep)' }}>{therapist.name}</h4>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Badge variant={`specialty-${therapist.specialty || 'yoga'}` as any}>
                    {therapist.specialty ? therapist.specialty.charAt(0).toUpperCase() + therapist.specialty.slice(1) : 'General'}
                  </Badge>
                  <Badge variant="outline">★ {4.8}</Badge>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '4px' }}>Active Clients</div>
                <div style={{ fontSize: '18px', fontWeight: 600 }}>{Math.floor(Math.random() * 20) + 5}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
