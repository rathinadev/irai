'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, HeartPulse, Brain, Apple, Activity, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

export default function LandingPage() {
  const pillars = [
    { title: 'Yoga Therapy', icon: Activity, desc: 'Restorative asanas and pranayama.', color: 'var(--teal)' },
    { title: 'Medical Science', icon: Stethoscope, desc: 'Doctor-led health monitoring.', color: 'var(--blue)' },
    { title: 'Mental Wellness', icon: Brain, desc: 'CBT and psychological support.', color: '#7E57C2' },
    { title: 'Physiotherapy', icon: HeartPulse, desc: 'Movement and rehab protocols.', color: '#FF8A65' },
    { title: 'Nutrition', icon: Apple, desc: 'Customized diet planning.', color: '#4CAF50' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <img src="/base_logo.png" alt="IRAI Logo" className={styles.logoIcon} />
          <span className={styles.logoText}>IRAI</span>
        </div>
        <div className={styles.navActions}>
          <Link href="/pricing" className={styles.navLink}>Pricing</Link>
          <Link href="/login">
            <Button variant="primary" size="sm">Login</Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBg}></div>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src="/full_logo.jpeg" alt="IRAI Full Logo" className={styles.fullLogo} />
            <h1 className={styles.heroTitle}>
              Intelligent <span className={styles.dot}>•</span> Restorative <span className={styles.dot}>•</span> AI-Powered <span className={styles.dot}>•</span> Integrated
            </h1>
            <p className={styles.heroSubtitle}>
              Experience a holistic wellness platform that unites ancient yoga traditions with modern medical science and AI insights.
            </p>
            <div className={styles.ctaGroup}>
              <Link href="/pricing">
                <Button size="lg" variant="primary">
                  View Pricing <ChevronRight size={20} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Pillars Section */}
        <section className={styles.pillarsSection}>
          <h2 className={styles.sectionTitle}>The Five Pillars of IRAI</h2>
          <div className={styles.pillarsGrid}>
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className={styles.pillarCard} padding="lg">
                    <div className={styles.iconCircle} style={{ color: pillar.color, backgroundColor: `${pillar.color}15` }}>
                      <Icon size={32} />
                    </div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.howItWorks}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>Choose Your Plan</h3>
              <p>Select a tier that matches your wellness goals, from daily routines to premium elite coaching.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>AI Assessment</h3>
              <p>Upload your medical documents securely. Our AI analyzes them to build a personalized health profile.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>Start Healing</h3>
              <p>Join live group sessions, book 1-on-1s with specialized therapists, and track your gamified progress.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <h2>Ready to Transform Your Health?</h2>
          <p>Join IRAI today and start your journey towards holistic wellness.</p>
          <Link href="/pricing">
            <Button size="lg" variant="primary">Get Started</Button>
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <img src="/base_logo.png" alt="IRAI" className={styles.logoIconSmall} />
            <span className={styles.logoTextSmall}>IRAI</span>
          </div>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} IRAI Wellness. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
