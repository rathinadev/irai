'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PricingCard } from '@/components/ui/PricingCard';
import { pricingPlans } from '@/data/pricing-data';
import styles from './page.module.css';

export default function PricingPage() {
  const router = useRouter();

  const handleSelectPlan = () => {
    // In a real app, we'd pass the selected plan ID to the sign-up flow
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <Link href="/">
            <img src="/base_logo.png" alt="IRAI Logo" className={styles.logo} />
            <span className={styles.logoText}>IRAI</span>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Invest in Your Holistic Wellness</h1>
          <p className={styles.subtitle}>
            Choose the perfect plan for your journey. Whether you need a daily routine or a personalized recovery program, IRAI has you covered.
          </p>
        </div>

        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan) => (
            <div key={plan.id} className={styles.cardWrapper}>
              <PricingCard plan={plan} onSelect={handleSelectPlan} />
            </div>
          ))}
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>Can I switch plans later?</h4>
              <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>How do the 1-on-1 sessions work?</h4>
              <p>Depending on your plan, you get dedicated sessions with our specialized therapists. You can easily schedule these through your dashboard.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>What is AI Document Analysis?</h4>
              <p>Our proprietary AI securely analyzes your uploaded medical reports to give your assigned therapists deeper context, personalizing your sessions.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Can I get a refund?</h4>
              <p>We offer a 7-day money-back guarantee for all new subscriptions if you are not fully satisfied with our platform.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} IRAI Wellness. All rights reserved.</p>
      </footer>
    </div>
  );
}
