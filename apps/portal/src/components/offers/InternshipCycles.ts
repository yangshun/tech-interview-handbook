import { emptyOption } from './constants';

export const InternshipCycleLabels = [
  'Spring',
  'Summer',
  'Fall',
  'Winter',
  'Half year',
  'Full year',
  'Others',
];

export const InternshipCycleOptions = [emptyOption].concat(
  InternshipCycleLabels.map((label) => ({
    label,
    value: label.replace(/\s+/g, '-').toLowerCase(),
  })),
);
