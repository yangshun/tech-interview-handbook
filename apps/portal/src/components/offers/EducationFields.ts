import { emptyOption } from './constants';

const EducationFieldLabels = {
  'aerospace-engineering': 'Aerospace Engineering',
  'applied-mathematics': 'Applied Mathematics',
  biology: 'Biology',
  'biomedical-engineering': 'Biomedical Engineering',
  'business-analytics': 'Business Analytics',
  'chemical-engineering': 'Chemical Engineering',
  chemistry: 'Chemistry',
  'civil-engineering': 'Civil Engineering',
  'computational-biology': 'Computational Biology',
  'computer-engineering': 'Computer Engineering',
  'computer-science': 'Computer Science',
  'computer-science-engineering': 'Computer Science and Engineering',
  'computer-science-molecular-biology':
    'Computer Science and Molecular Biology',
  'data-science': 'Data Science',
  'data-science-analytics': 'Data Science and Analytics',
  'electrical-engineering': 'Electrical Engineering',
  'electrical-engineering-computer-science':
    'Electrical Engineering and Computer Science (EECS)',
  'electrical-science-and-engineering': 'Electrical Science and Engineering',
  'engineering-mathematics-statistics':
    'Engineering Mathematics and Statistics',
  'engineering-physics': 'Engineering Physics',
  'engineering-science': 'Engineering Science',
  'environmental-engineering': 'Environmental Engineering',
  'environmental-science': 'Environmental Science',
  'industrial-engineering-operations-research':
    'Industrial Engineering and Operations Research',
  'industrial-systems-engineering': 'Industrial Systems Engineering',
  'information-security': 'Information Security',
  'information-systems': 'Information Systems',
  'management-science-and-engineering':
    'Management Science and Engineering (MS&E)',
  'materials-science': 'Materials Science',
  mathematics: 'Mathematics',
  'mechanical-engineering': 'Mechanical Engineering',
  'nuclear-engineering': 'Nuclear Engineering',
  'operations-research': 'Operations Research',
  physics: 'Physics',
  'software-engineering': 'Software Engineering',
  'systems-engineering': 'Systems Engineering',
  'web-development': 'Web Development',
};

export type EducationType = keyof typeof EducationFieldLabels;

export function getLabelForEducationFieldType(
  educationType: EducationType,
): string {
  return EducationFieldLabels[educationType];
}

export type EducationFieldType = keyof typeof EducationFieldLabels;

export const EducationFieldOptions = [emptyOption].concat(
  Object.entries(EducationFieldLabels).map(([value, label]) => ({
    label,
    value,
  })),
);
