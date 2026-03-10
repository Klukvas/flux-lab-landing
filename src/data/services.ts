import type { Service, ProcessStep } from '@/types';

export const services: readonly Service[] = [
  {
    id: 'outsourcing',
    icon: 'team',
    titleKey: 'services.outsourcing.title',
    descriptionKey: 'services.outsourcing.description',
    features: ['Dedicated development teams', 'Flexible scaling', 'Seamless integration', 'Regular reporting'],
  },
  {
    id: 'consulting',
    icon: 'idea',
    titleKey: 'services.consulting.title',
    descriptionKey: 'services.consulting.description',
    features: ['Architecture review', 'Technology assessment', 'Performance audit', 'Security analysis'],
  },
  {
    id: 'custom',
    icon: 'build',
    titleKey: 'services.custom.title',
    descriptionKey: 'services.custom.description',
    features: ['Full-stack development', 'Mobile applications', 'API development', 'Cloud infrastructure'],
  },
] as const;

export const processSteps: readonly ProcessStep[] = [
  { id: 'discovery', titleKey: 'services.process.discovery', icon: 'search', order: 1 },
  { id: 'design', titleKey: 'services.process.design', icon: 'design', order: 2 },
  { id: 'development', titleKey: 'services.process.development', icon: 'code', order: 3 },
  { id: 'testing', titleKey: 'services.process.testing', icon: 'test', order: 4 },
  { id: 'deployment', titleKey: 'services.process.deployment', icon: 'deploy', order: 5 },
  { id: 'support', titleKey: 'services.process.support', icon: 'support', order: 6 },
] as const;
