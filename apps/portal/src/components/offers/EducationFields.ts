import { emptyOption } from './constants';

export const EducationFieldLabels = [
  'Business Analytics',
  'Computer Science',
  'Data Science and Analytics',
  'Information Security',
  'Information Systems',
];

export const EducationFieldOptions = [emptyOption].concat(
  EducationFieldLabels.map((label) => ({
    label,
    value: label.replace(/\s+/g, '-').toLowerCase(),
  })),
);
