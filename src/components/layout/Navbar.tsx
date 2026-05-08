'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Menu, User, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import styles from './Navbar.module.css';

export function Navbar() {
  const { user, role, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getProfileLink = () => {
    if (role === 'client') return '/dashboard/client/profile';
    return '#'; // Therapists/admins don't have a profile page in this demo
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        {/* We would toggle sidebar on mobile here */}
        <button className={styles.menuBtn}>
          <Menu size={24} />
        </button>
        <Link href="/" className={styles.logo}>
          <img src="/base_logo.png" alt="IRAI Logo" className={styles.logoImg} />
          <span className={styles.logoText}>IRAI</span>
        </Link>
      </div>

      {user && (
        <div className={styles.right}>
          <div className={styles.roleBadge}>
            <Badge variant="outline">{role}</Badge>
          </div>
          
          <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle Dark Mode">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className={styles.iconBtn}>
            <Bell size={20} />
            <span className={styles.notificationDot}></span>
          </button>

          <div className={styles.profileMenu}>
            <button 
              className={styles.profileBtn}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <Avatar src={user.avatar} alt={user.name} size="sm" />
            </button>

            {isProfileOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  <p className={styles.userName}>{user.name}</p>
                  <p className={styles.userEmail}>{user.email}</p>
                </div>
                <div className={styles.dropdownItems}>
                  {role === 'client' && (
                    <Link 
                      href={getProfileLink()} 
                      className={styles.dropdownItem}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User size={16} /> My Profile & Documents
                    </Link>
                  )}
                  <button className={styles.dropdownItem}>
                    <Settings size={16} /> Settings
                  </button>
                  <button className={styles.dropdownItem} onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
