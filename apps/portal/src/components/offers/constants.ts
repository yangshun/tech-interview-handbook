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
    label: 'Bytedance',
    value: 'id-abc123',
  },
  {
    label: 'Google',
    value: 'id-abc567',
  },
  {
    label: 'Meta',
    value: 'id-abc456',
  },
  {
    label: 'Shopee',
    value: 'id-abc345',
  },
  {
    label: 'Tik Tok',
    value: 'id-abc678',
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
