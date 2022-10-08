import type { FilterChoices } from '~/components/questions/filter/FilterSection';

export const COMPANIES: FilterChoices = [
  {
    label: 'Google',
    value: 'google',
  },
  {
    label: 'Meta',
    value: 'meta',
  },
];

// Code, design, behavioral
export const QUESTION_TYPES: FilterChoices = [
  {
    label: 'Coding',
    value: 'coding',
  },
  {
    label: 'Design',
    value: 'design',
  },
  {
    label: 'Behavioral',
    value: 'behavioral',
  },
];

export const QUESTION_AGES: FilterChoices = [
  {
    label: 'Last month',
    value: 'last-month',
  },
  {
    label: 'Last 6 months',
    value: 'last-6-months',
  },
  {
    label: 'Last year',
    value: 'last-year',
  },
  {
    label: 'All',
    value: 'all',
  },
];

export const LOCATIONS: FilterChoices = [
  {
    label: 'Singapore',
    value: 'singapore',
  },
  {
    label: 'Menlo Park',
    value: 'menlopark',
  },
  {
    label: 'California',
    value: 'california',
  },
  {
    label: 'Hong Kong',
    value: 'hongkong',
  },
  {
    label: 'Taiwan',
    value: 'taiwan',
  },
];
