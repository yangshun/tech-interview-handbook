import { emptyOption } from './constants';

export const EducationLevelLabels = [
  'Bachelor',
  'Diploma',
  'Masters',
  'PhD',
  'Professional',
  'Secondary',
  'Self-taught',
  'Bootcamp',
];

export const EducationLevelOptions = [emptyOption].concat(
  EducationLevelLabels.map((label) => ({
    label,
    value: label.replace(/\s+/g, '-').toLowerCase(),
  })),
);
