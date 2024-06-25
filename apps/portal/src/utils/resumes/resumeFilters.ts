import type { TypeaheadOption } from '~/ui';

import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';
import { JobTitleLabels } from '~/components/shared/JobTitles';

export type FilterId = 'experience' | 'location' | 'role';
export type FilterCounts = Record<FilterId, Record<string, number>>;

export type CustomFilter = {
  isTop10: boolean;
  isUnreviewed: boolean;
};

export type FilterOption<T> = {
  label: string;
  value: T;
};

export type Filter = {
  id: FilterId;
  label: string;
};

export type FilterState = CustomFilter &
  Record<FilterId, Array<TypeaheadOption>>;

export type SortOrder = 'latest' | 'mostComments' | 'popular';

export type Shortcut = {
  customFilters?: CustomFilter;
  filters: FilterState;
  name: string;
  sortOrder: SortOrder;
};

export const getTypeaheadOption = (
  filterId: FilterId,
  filterValue: string,
  locationName?: string,
) => {
  switch (filterId) {
    case 'experience':
      return EXPERIENCES.find(({ value }) => value === filterValue);
    case 'role':
      return {
        id: filterValue,
        label: getLabelForJobTitleType(filterValue as JobTitleType),
        value: filterValue,
      };
    case 'location':
      return {
        id: filterValue,
        label: locationName ?? '',
        value: filterValue,
      };
    default:
      break;
  }
};

export const BROWSE_TABS_VALUES = {
  ALL: 'all',
  MY: 'my',
  STARRED: 'starred',
};

export const SORT_OPTIONS: Array<FilterOption<SortOrder>> = [
  { label: 'Latest', value: 'latest' },
  { label: 'Popular', value: 'popular' },
  { label: 'Most Comments', value: 'mostComments' },
];

export const EXPERIENCES: Array<TypeaheadOption> = [
  {
    id: 'internship',
    label: 'Internship',
    value: 'internship',
  },
  {
    id: 'entry-level',
    label: 'Entry Level (0 - 2 years)',
    value: 'entry-level',
  },
  {
    id: 'mid-level',
    label: 'Mid Level (3 - 5 years)',
    value: 'mid-level',
  },
  {
    id: 'senior-level',
    label: 'Senior Level (5+ years)',
    value: 'senior-level',
  },
];

export const INITIAL_FILTER_STATE: FilterState = {
  experience: [],
  isTop10: false,
  isUnreviewed: false,
  location: [],
  role: [],
};

export const SHORTCUTS: Array<Shortcut> = [
  {
    filters: {
      ...INITIAL_FILTER_STATE,
    },
    name: 'General',
    sortOrder: 'latest',
  },
  {
    filters: {
      ...INITIAL_FILTER_STATE,
      isUnreviewed: true,
    },
    name: 'Unreviewed',
    sortOrder: 'latest',
  },
  {
    filters: {
      ...INITIAL_FILTER_STATE,
      experience: [
        {
          id: 'entry-level',
          label: 'Entry Level (0 - 2 years)',
          value: 'entry-level',
        },
      ],
    },
    name: 'Fresh Grad',
    sortOrder: 'latest',
  },
  {
    filters: {
      ...INITIAL_FILTER_STATE,
      isTop10: true,
    },
    name: 'Top 10',
    sortOrder: 'popular',
  },
  {
    filters: {
      ...INITIAL_FILTER_STATE,
      location: [
        {
          id: '231',
          label: 'United States',
          value: '231',
        },
      ],
    },
    name: 'US Only',
    sortOrder: 'latest',
  },
];

// We omit 'location' as its label should be fetched from the Country table.
export const getFilterLabel = (
  filterId: Omit<FilterId | 'sort', 'location'>,
  filterValue: SortOrder | string,
): string | undefined => {
  if (filterId === 'location') {
    return filterValue;
  }

  let filters: Array<TypeaheadOption> = [];

  switch (filterId) {
    case 'experience':
      filters = EXPERIENCES;
      break;
    case 'role':
      filters = Object.entries(JobTitleLabels).map(([slug, { label }]) => ({
        id: slug,
        label,
        value: slug,
      }));
      break;
    case 'sort':
      return SORT_OPTIONS.find(({ value }) => value === filterValue)?.label;
    default:
      break;
  }

  return filters.find(({ value }) => value === filterValue)?.label;
};
