export type ClientTier = 'foundation' | 'balanced' | 'transform';

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
    id: 'foundation',
    name: 'Foundation',
    subtitle: 'Base Layer',
    targetAudience: 'Beginners',
    coreOffering: 'Basic programs',
    price: 1999,
    features: [
      'Daily Live Yoga Sessions (Mon - Fri)',
      'Basic condition programs',
      'Limited AI Personalization',
      'General nutrition plan'
    ],
  },
  {
    id: 'balanced',
    name: 'Balanced',
    subtitle: 'Structured',
    targetAudience: 'Regular Users',
    coreOffering: 'Advanced programs',
    price: 4999,
    isPopular: true,
    features: [
      '4 1-on-1 Yoga Therapy Sessions / mo',
      'Daily Live Yoga Sessions (Mon - Fri)',
      '2 Doctor Consultations',
      '2 Nutrition Support Sessions',
      'Personalised AI recommendations & Tracking',
      'Advanced structured condition programs'
    ],
  },
  {
    id: 'transform',
    name: 'Transform',
    subtitle: 'Clinical',
    targetAudience: 'Recovery Focused',
    coreOffering: 'Full predictive system',
    price: 11999,
    isPremium: true,
    features: [
      '12 1-on-1 Yoga Therapy Sessions / mo',
      '2 Doctor Consultations (As per Need)',
      '4 Nutrition Support Sessions / mo',
      '4 Physiotherapy Sessions / mo',
      '2 Psychologist Support Sessions / mo',
      'Advanced predictive AI system',
      'Clinical recovery programs'
    ],
  }
];
