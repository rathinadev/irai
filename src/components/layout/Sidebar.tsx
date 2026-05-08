'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Home, 
  Calendar, 
  TrendingUp, 
  Search, 
  User, 
  Users, 
  List,
  Activity,
  FileText
} from 'lucide-react';
import styles from './Sidebar.module.css';

const clientLinks = [
  { href: '/dashboard/client', label: 'Dashboard', icon: Home },
  { href: '/dashboard/client/sessions', label: 'My Sessions', icon: Calendar },
  { href: '/dashboard/client/progress', label: 'My Progress', icon: TrendingUp },
  { href: '/dashboard/client/classes', label: 'Browse Classes', icon: Search },
  { href: '/dashboard/client/profile', label: 'My Profile', icon: User },
];

const therapistLinks = [
  { href: '/dashboard/therapist', label: 'Dashboard', icon: Home },
  { href: '/dashboard/therapist/calendar', label: 'My Calendar', icon: Calendar },
  { href: '/dashboard/therapist/clients', label: 'My Clients', icon: Users },
  { href: '/dashboard/therapist/sessions', label: 'Sessions', icon: List },
];

const adminLinks = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: Home },
  { href: '/dashboard/admin/schedule', label: 'Schedule', icon: Calendar },
  { href: '/dashboard/admin/therapists', label: 'Therapists', icon: Activity },
  { href: '/dashboard/admin/users', label: 'Users', icon: Users },
];

export function Sidebar() {
  const { role } = useAuth();
  const pathname = usePathname();

  let links: { href: string; label: string; icon: React.ElementType }[] = [];
  if (role === 'client') links = clientLinks;
  else if (role === 'therapist') links = therapistLinks;
  else if (role === 'admin') links = adminLinks;

  if (!role) return null;

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon size={20} className={styles.icon} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className={styles.footer}>
        <div className={styles.helpBox} onClick={() => alert('Support chat simulation opened! A support agent will be with you shortly.')}>
          <FileText size={16} />
          <span>Need Help?</span>
        </div>
      </div>
    </aside>
  );
}
