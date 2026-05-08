'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { ClientRow } from '@/components/ui/ClientRow';
import { clients } from '@/data/mock-data';

export default function AdminUsers() {
  // clients array already contains only clients

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1 style={{ fontSize: '28px', color: 'var(--blue-deep)', marginBottom: '4px' }}>User Management</h1>
        <p style={{ color: 'var(--gray-500)', margin: 0 }}>View all registered clients.</p>
      </header>

      <Card>
        <div style={{ padding: '0 24px' }}>
          {clients.map(client => (
            <ClientRow
              key={client.id}
              name={client.name}
              avatar={client.avatar}
              tier={client.tier!}
              progress={Math.floor(Math.random() * 40) + 40}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
