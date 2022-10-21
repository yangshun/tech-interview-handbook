import { EducationBackgroundType } from './types';

export const emptyOption = '----';

// TODO: use enums
export const titleOptions = [
  {
    label: 'Software engineer',
    value: 'Software engineer',
  },
  {
    label: 'Frontend engineer',
    value: 'Frontend engineer',
  },
  {
    label: 'Backend engineer',
    value: 'Backend engineer',
  },
  {
    label: 'Full-stack engineer',
    value: 'Full-stack engineer',
  },
];

export const locationOptions = [
  {
    label: 'Singapore, Singapore',
    value: 'Singapore, Singapore',
  },
  {
    label: 'New York, US',
    value: 'New York, US',
  },
  {
    label: 'San Francisco, US',
    value: 'San Francisco, US',
  },
];

export const internshipCycleOptions = [
  {
    label: 'Summer',
    value: 'Summer',
  },
  {
    label: 'Winter',
    value: 'Winter',
  },
  {
    label: 'Spring',
    value: 'Spring',
  },
  {
    label: 'Fall',
    value: 'Fall',
  },
  {
    label: 'Full year',
    value: 'Full year',
  },
];

export const yearOptions = [
  {
    label: '2021',
    value: 2021,
  },
  {
    label: '2022',
    value: 2022,
  },
  {
    label: '2023',
    value: 2023,
  },
  {
    label: '2024',
    value: 2024,
  },
];

export const educationLevelOptions = Object.entries(
  EducationBackgroundType,
).map(([, value]) => ({
  label: value,
  value,
}));

export const educationFieldOptions = [
  {
    label: 'Computer Science',
    value: 'Computer Science',
  },
  {
    label: 'Information Security',
    value: 'Information Security',
  },
  {
    label: 'Business Analytics',
    value: 'Business Analytics',
  },
];

export enum FieldError {
  NonNegativeNumber = 'Please fill in a non-negative number in this field.',
  Number = 'Please fill in a number in this field.',
  Required = 'Please fill in this field.',
}

export const OVERALL_TAB = 'Overall';
