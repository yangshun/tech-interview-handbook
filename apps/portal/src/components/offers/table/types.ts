// eslint-disable-next-line no-shadow
export enum YOE_CATEGORY {
  INTERN = 0,
  ENTRY = 1,
  MID = 2,
  SENIOR = 3,
}

export const OfferTableYoeOptions = [
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
    value: 'latest-submitted',
  },
  {
    label: 'Highest Salary',
    value: 'highest-salary',
  },
  {
    label: 'Highest YOE first',
    value: 'highest-yoe-first',
  },
  {
    label: 'Lowest YOE first',
    value: 'lowest-yoe-first',
  },
];

export const OfferTableSortBy: Record<string, string> = {
  'highest-salary': '-totalCompensation',
  'highest-yoe-first': '-totalYoe',
  'latest-submitted': '-monthYearReceived',
  'lowest-yoe-first': '+totalYoe',
};
