// eslint-disable-next-line no-shadow
export enum YOE_CATEGORY {
  ENTRY = 'entry',
  INTERN = 'intern',
  MID = 'mid',
  SENIOR = 'senior',
}

export const YOE_CATEGORY_PARAM: Record<string, number> = {
  entry: 1,
  intern: 0,
  mid: 2,
  senior: 3,
};

export const OfferTableYoeOptions = [
  { label: 'All Full Time YOE', value: '' },
  {
    label: 'Fresh Grad (0-2 YOE)',
    value: YOE_CATEGORY.ENTRY,
  },
  {
    label: 'Mid (3-5 YOE)',
    value: YOE_CATEGORY.MID,
  },
  {
    label: 'Senior (6+ YOE)',
    value: YOE_CATEGORY.SENIOR,
  },
  {
    label: 'Internship',
    value: YOE_CATEGORY.INTERN,
  },
];

export const OfferTableFilterOptions = [
  {
    label: 'Latest Submitted',
    value: '-monthYearReceived',
  },
  {
    label: 'Highest Salary',
    value: '-totalCompensation',
  },
  {
    label: 'Highest YOE first',
    value: '-totalYoe',
  },
  {
    label: 'Lowest YOE first',
    value: '+totalYoe',
  },
];

export type OfferTableSortByType =
  | '-monthYearReceived'
  | '-totalCompensation'
  | '-totalYoe'
  | '+totalYoe';