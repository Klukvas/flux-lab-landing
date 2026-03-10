import type { Testimonial } from '@/types';

export const testimonials: readonly Testimonial[] = [
  {
    id: 'efluxcom',
    name: 'Oleksandr Melnyk',
    company: 'GreenGrid Energy',
    project: 'EFluxCom',
  },
  {
    id: 'washflow',
    name: 'Iryna Savchenko',
    company: 'CleanWave',
    project: 'WashFlow',
  },
  {
    id: 'accounting',
    name: 'Viktor Kravchuk',
    company: 'Finova Partners',
    project: 'Accounting',
  },
] as const;
