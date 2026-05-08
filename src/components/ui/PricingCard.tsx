import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { Check } from 'lucide-react';
import styles from './PricingCard.module.css';
import { PricingPlan } from '@/data/pricing-data';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: () => void;
}

export function PricingCard({ plan, onSelect }: PricingCardProps) {
  return (
    <Card 
      className={`${styles.pricingCard} ${plan.isPremium ? styles.premium : ''} ${plan.isPopular ? styles.popular : ''}`}
      padding="lg"
    >
      {plan.isPopular && (
        <div className={styles.popularBadgeWrapper}>
          <Badge variant="secondary">Most Popular</Badge>
        </div>
      )}
      
      {plan.isPremium && (
        <div className={styles.premiumBadgeWrapper}>
          <Badge variant="gold">Premium Choice</Badge>
        </div>
      )}

      <div className={styles.header}>
        <h3 className={styles.name}>{plan.name}</h3>
        <p className={styles.subtitle}>{plan.subtitle}</p>
      </div>

      <div className={styles.priceContainer}>
        <span className={styles.currency}>₹</span>
        <span className={styles.price}>{plan.price}</span>
        <span className={styles.period}>/mo</span>
      </div>

      <div className={styles.audience}>
        <strong>For:</strong> {plan.targetAudience}
      </div>

      <div className={styles.coreOffering}>
        {plan.coreOffering}
      </div>

      <Button 
        variant={plan.isPremium ? 'primary' : (plan.isPopular ? 'primary' : 'outline')}
        fullWidth
        className={styles.button}
        onClick={onSelect}
      >
        Get Started
      </Button>

      <div className={styles.features}>
        <p className={styles.featuresTitle}>What's included:</p>
        <ul className={styles.featureList}>
          {plan.features.map((feature, i) => (
            <li key={i} className={styles.featureItem}>
              <Check size={18} className={styles.checkIcon} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
