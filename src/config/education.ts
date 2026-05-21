/**
 * Education and courses configuration
 * Add your educational background and courses here
 */

import type { Education, Course } from '../types';

export const education: readonly Education[] = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    major: 'Computer Applications',
    institution: 'R.K. Desai Group of Colleges, Veer Narmad South Gujarat University (VNSGU)',
    location: 'Vapi, Gujarat',
    year: 'May 2026',
    description: 'CGPA: 7.56 / 10',
  },
] as const;

export const courses: readonly Course[] = [
  {
    title: 'Deloitte Cyber Security',
    description: 'Cyber security certification.',
    institution: 'Deloitte',
    location: 'Online',
    year: 'Completed',
  },
  {
    title: 'IBM Internship',
    description: 'Internship certification covering enterprise-level cloud-based full stack development exposure.',
    institution: 'IBM',
    location: 'Online',
    year: 'Completed',
  },
  {
    title: 'Data Analytics & Business Intelligence',
    description: 'Certification demonstrating analytical and data skills.',
    institution: 'Deloitte',
    location: 'Online',
    year: 'Completed',
  },
  {
    title: 'Web Development Internship',
    description: 'Web development internship certification.',
    institution: 'Techfellow',
    location: 'Remote',
    year: 'Completed',
  },
] as const;
