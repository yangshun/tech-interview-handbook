import { EducationBackgroundType } from './types';

const emptyOption = {
  label: '----',
  value: '',
};

// TODO: use enums
export const titleOptions = [
  emptyOption,
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

export const companyOptions = [
  emptyOption,
  {
    label: 'Amazon',
    value: 'cl93patjt0000txewdi601mub',
  },
  {
    label: 'Microsoft',
    value: 'cl93patjt0001txewkglfjsro',
  },
  {
    label: 'Apple',
    value: 'cl93patjt0002txewf3ug54m8',
  },
  {
    label: 'Google',
    value: 'cl93patjt0003txewyiaky7xx',
  },
  {
    label: 'Meta',
    value: 'cl93patjt0004txew88wkcqpu',
  },
];

export const locationOptions = [
  emptyOption,
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
  emptyOption,
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
  emptyOption,
  {
    label: '2021',
    value: '2021',
  },
  {
    label: '2022',
    value: '2022',
  },
  {
    label: '2023',
    value: '2023',
  },
  {
    label: '2024',
    value: '2024',
  },
];

const educationBackgroundTypes = Object.entries(EducationBackgroundType).map(
  ([key, value]) => ({
    label: key,
    value,
  }),
);

export const educationLevelOptions = [emptyOption, ...educationBackgroundTypes];

export const educationFieldOptions = [
  emptyOption,
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
