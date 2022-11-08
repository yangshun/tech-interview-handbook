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

export type OfferTableSortType =
  | 'companyName'
  | 'jobTitle'
  | 'monthYearReceived'
  | 'totalCompensation'
  | 'totalYoe';

export enum OFFER_TABLE_SORT_ORDER {
  ASC = '+',
  DESC = '-',
  UNSORTED = '',
}

export function getOppositeSortOrder(
  order: OFFER_TABLE_SORT_ORDER,
): OFFER_TABLE_SORT_ORDER {
  if (order === OFFER_TABLE_SORT_ORDER.UNSORTED) {
    return OFFER_TABLE_SORT_ORDER.UNSORTED;
  }
  return order === OFFER_TABLE_SORT_ORDER.ASC
    ? OFFER_TABLE_SORT_ORDER.DESC
    : OFFER_TABLE_SORT_ORDER.ASC;
}

export type OfferTableColumn = {
  label: string;
  sortType?: OfferTableSortType;
};

export const FullTimeOfferTableColumns: Array<OfferTableColumn> = [
  { label: 'Company', sortType: 'companyName' },
  { label: 'Title', sortType: 'jobTitle' },
  { label: 'YOE', sortType: 'totalYoe' },
  { label: 'Annual TC', sortType: 'totalCompensation' },
  { label: 'Annual Base / Bonus / Stocks' },
  { label: 'Date Offered', sortType: 'monthYearReceived' },
  { label: 'Actions' },
];

export const InternOfferTableColumns: Array<OfferTableColumn> = [
  { label: 'Company', sortType: 'companyName' },
  { label: 'Title', sortType: 'jobTitle' },
  { label: 'YOE', sortType: 'totalYoe' },
  { label: 'Monthly Salary', sortType: 'totalCompensation' },
  { label: 'Date Offered', sortType: 'monthYearReceived' },
  { label: 'Actions' },
];
