/**
 * Competitions and achievements configuration
 * Add your competition achievements and awards here
 */

import type { Competition } from '../types';

export const competitions: readonly Competition[] = [
  {
    title: 'NextGen Techathon Hackathon',
    description: 'Hackathon',
    achievement: 'Won NextGen Techathon Hackathon on April 9, 2026, securing 1st place among competing teams.',
    year: '2026',
  },
  {
    title: 'Techfellow Internship Delivery',
    description: 'Industry Internship',
    achievement: 'Delivered production-grade web features during a 3-month industry internship at Techfellow.',
    year: '2026',
  },
  {
    title: 'Full Stack Applications',
    description: 'Project Milestone',
    achievement: 'Designed, developed, and deployed 4+ full stack applications integrating modern frameworks independently.',
    year: '2026',
  },
  {
    title: 'Deloitte Data Analysis Certificate',
    description: 'Certification',
    achievement: 'Awarded Deloitte Data Analysis Certificate, demonstrating strong analytical and data skills.',
    year: 'Completed',
  },
  {
    title: 'Debugging & Problem Solving',
    description: 'Recognition',
    achievement: 'Recognized for debugging proficiency and problem-solving in academic and internship environments.',
    year: '2026',
  },
] as const;
