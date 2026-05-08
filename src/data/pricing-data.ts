export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  targetAudience: string;
  coreOffering: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  isPremium?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'essential',
    name: 'Essential',
    subtitle: 'Routine',
    targetAudience: 'Beginners & Lifestyle Users',
    coreOffering: 'Daily Live Yoga + Basic AI personalization.',
    price: 899,
    features: [
      'Unlimited group yoga classes',
      'Basic wellness tracking',
      'Community support',
      'Access to recorded sessions'
    ],
  },
  {
    id: 'therapeutic',
    name: 'Therapeutic',
    subtitle: 'Recovery',
    targetAudience: 'Result Seekers & Patients',
    coreOffering: 'Goal-based programs + Group Therapy sessions.',
    price: 2499,
    isPopular: true,
    features: [
      'Everything in Essential',
      '2 Group Therapy sessions/week',
      '1 Priority 1-on-1 session/month',
      'Advanced AI personalization',
      'Medical document analysis',
      'Priority email support'
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    subtitle: 'Personalized',
    targetAudience: 'Premium Users',
    coreOffering: 'Dedicated manager + 2 Priority 1-on-1 sessions.',
    price: 7499,
    isPremium: true,
    features: [
      'Everything in Therapeutic',
      '2 Priority 1-on-1 sessions/month',
      'Dedicated health manager',
      'Full AI suite access',
      'Custom nutrition plan',
      'WhatsApp support'
    ],
  }
];
