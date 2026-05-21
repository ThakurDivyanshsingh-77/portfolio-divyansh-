/**
 * Professional experience configuration
 * Add your work experience here
 */

import type { Experience } from '../types';

export const experience: readonly Experience[] = [
  {
    title: 'Freelance Web Developer',
    company: 'Techfellow',
    location: 'Remote',
    period: 'Ongoing',
    description: 'Collaborated on client projects as a freelancer with a 20% project revenue share. Built responsive full stack web applications using React.js, Node.js, and MongoDB, designed RESTful APIs, optimized database queries, and improved UI/UX performance.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'UI/UX'],
  },
  {
    title: 'Web Development Intern',
    company: 'Techfellow',
    location: 'Remote',
    period: '3 Months',
    description: 'Collaborated with senior developers to build scalable full stack applications in a professional development team and gained hands-on experience with React.js, Node.js, and MongoDB in live production environments.',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Full Stack Development'],
  },
  {
    title: 'Web Development Intern',
    company: 'IBM',
    location: 'Remote',
    period: '1 Month',
    description: 'Contributed to enterprise-level cloud-based full stack development projects and gained exposure to agile methodologies and professional software engineering practices.',
    technologies: ['Cloud Development', 'Full Stack Development', 'Agile'],
  },
] as const;
