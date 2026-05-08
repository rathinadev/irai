'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClientRow } from '@/components/ui/ClientRow';
import { Input } from '@/components/ui/Input';
import { clients } from '@/data/mock-data';
import styles from './page.module.css';

export default function TherapistClients() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // clients array already contains only clients

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClientClick = (id: string) => {
    router.push(`/dashboard/therapist/clients/${id}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Clients</h1>
        <p className={styles.subtitle}>Overview of all clients under your care.</p>
      </header>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <Input 
            placeholder="Search clients..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.clientList}>
        <div className={styles.listHeader}>
          <span>Client Details</span>
          <span>Progress</span>
          <span>Next Session</span>
          <span className={styles.alignRight}>Last Session</span>
          <span></span>
        </div>
        
        {filteredClients.map(client => (
          <ClientRow
            key={client.id}
            name={client.name}
            avatar={client.avatar}
            tier={client.tier!}
            progress={Math.floor(Math.random() * 40) + 40} // Mock progress
            nextSessionDate="Tomorrow, 10:00 AM" // Mock
            lastSessionDate="Last week" // Mock
            onClick={() => handleClientClick(client.id)}
          />
        ))}
      </div>
    </div>
  );
}
