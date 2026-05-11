'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Role } from '@/data/mock-data';
import styles from './page.module.css';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role>('client');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    if (selectedRole === 'client') {
      router.push('/onboarding');
    } else {
      router.push(`/dashboard/${selectedRole}`);
    }
  };

  const roles: { id: Role; label: string }[] = [
    { id: 'client', label: 'Client' },
    { id: 'therapist', label: 'Therapist' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.leftHalf}>
        <div className={styles.branding}>
          <img src="/full_logo.jpeg" alt="IRAI Logo" className={styles.logo} />
          <h2 className={styles.tagline}>Holistic Wellness Journey</h2>
          <p className={styles.description}>
            Log in to access your personalized dashboard, track your progress, and connect with your wellness team.
          </p>
        </div>
        
        {/* Animated lotus petals / ambient design could go here */}
        <div className={styles.ambientDecor}></div>
      </div>

      <div className={styles.rightHalf}>
        <div className={styles.formContainer}>
          <div className={styles.mobileLogo}>
            <img src="/base_logo.png" alt="IRAI" />
            <span>IRAI</span>
          </div>
          
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Please select your role and sign in.</p>

          <div className={styles.roleTabs}>
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`${styles.roleTab} ${selectedRole === r.id ? styles.activeTab : ''}`}
                onClick={() => setSelectedRole(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.demoNotice}>
              <strong>Demo Mode:</strong> Any email/password will work. You will be logged in as a pre-configured demo user for the selected role.
            </div>

            <Input 
              label="Email Address" 
              type="email" 
              placeholder="demo@irai.com"
              defaultValue="demo@irai.com"
              required 
            />
            
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••"
              defaultValue="password"
              required 
            />

            <div className={styles.forgotPassword}>
              <Link href="#">Forgot password?</Link>
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg">
              Sign In
            </Button>
          </form>

          <div className={styles.signUp}>
            Don't have an account? <Link href="/pricing">View Plans</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
