import { ResumesSection } from '@prisma/client';

export const RESUME_COMMENTS_SECTIONS = [
  {
    label: 'General',
    value: ResumesSection.GENERAL,
  },
  {
    label: 'Education',
    value: ResumesSection.EDUCATION,
  },
  {
    label: 'Experience',
    value: ResumesSection.EXPERIENCE,
  },
  {
    label: 'Projects',
    value: ResumesSection.PROJECTS,
  },
  {
    label: 'Skills',
    value: ResumesSection.SKILLS,
  },
];
