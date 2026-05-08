'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAuth } from '@/context/AuthContext';
import styles from './DashboardLayout.module.css';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !pathname.includes('/login')) {
      router.push('/login');
    }
  }, [user, pathname, router]);

  if (!user) {
    return null; // Don't render until redirect happens
  }

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.contentWrapper}>
          <main className={styles.content}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
