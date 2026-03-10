import type { CareerPosition } from '@/types';

export const positions: readonly CareerPosition[] = [
  {
    id: 'senior-frontend',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'full-time',
    description: 'We are looking for a senior frontend developer to lead the development of our web applications.',
    requirements: [
      '5+ years of experience with React/Next.js',
      'Strong TypeScript skills',
      'Experience with state management and testing',
      'Knowledge of accessibility and performance optimization',
    ],
    benefits: ['Remote work', 'Flexible hours', 'Professional development budget', 'Equipment allowance'],
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'full-time',
    description: 'Join our backend team to build scalable APIs and services powering our products.',
    requirements: [
      '3+ years of experience with Node.js or Python',
      'Database design and optimization (PostgreSQL)',
      'REST API design and implementation',
      'Experience with Docker and cloud services',
    ],
    benefits: ['Remote work', 'Flexible hours', 'Professional development budget', 'Equipment allowance'],
  },
] as const;

export function getAllPositions(): readonly CareerPosition[] {
  return positions;
}

export function getPositionById(id: string): CareerPosition | undefined {
  return positions.find((p) => p.id === id);
}
