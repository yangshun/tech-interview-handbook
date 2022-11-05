import type { TypeaheadOption } from '@tih/ui';

import { JobTitleLabels } from '~/components/shared/JobTitles';

export type FilterId = 'experience' | 'location' | 'role';
export type FilterLabel = 'Experience' | 'Location' | 'Role';

export type CustomFilter = {
  isUnreviewed: boolean;
};

export type FilterOption<T> = {
  label: string;
  value: T;
};

export type Filter = {
  id: FilterId;
  label: FilterLabel;
  options: Array<TypeaheadOption>;
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

export const ROLES: Array<TypeaheadOption> = [
  {
    id: 'software-engineer',
    label: 'Software Engineer',
    value: 'software-engineer',
  },
  {
    id: 'back-end-engineer',
    label: 'Back End Engineer',
    value: 'back-end-engineer',
  },
  {
    id: 'front-end-engineer',
    label: 'Front End Engineer',
    value: 'front-end-engineer',
  },
];

export const EXPERIENCES: Array<TypeaheadOption> = [
  {
    id: 'Internship',
    label: 'Internship',
    value: 'Internship',
  },
  {
    id: 'Entry Level (0 - 2 years)',
    label: 'Entry Level (0 - 2 years)',
    value: 'Entry Level (0 - 2 years)',
  },
  {
    id: 'Mid Level (3 - 5 years)',
    label: 'Mid Level (3 - 5 years)',
    value: 'Mid Level (3 - 5 years)',
  },
  {
    id: 'Senior Level (5+ years)',
    label: 'Senior Level (5+ years)',
    value: 'Senior Level (5+ years)',
  },
];

export const LOCATIONS: Array<TypeaheadOption> = [];

export const INITIAL_FILTER_STATE: FilterState = {
  experience: EXPERIENCES,
  isUnreviewed: true,
  location: [],
  role: ROLES,
};

export const SHORTCUTS: Array<Shortcut> = [
  {
    filters: {
      ...INITIAL_FILTER_STATE,
      isUnreviewed: false,
    },
    name: 'All',
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
      experience: [],
      isUnreviewed: false,
    },
    name: 'Fresh Grad',
    sortOrder: 'latest',
  },
  {
    filters: {
      ...INITIAL_FILTER_STATE,
      isUnreviewed: false,
    },
    name: 'Top 10',
    sortOrder: 'popular',
  },
  {
    filters: {
      ...INITIAL_FILTER_STATE,
      isUnreviewed: false,
      location: [],
    },
    name: 'US Only',
    sortOrder: 'latest',
  },
];

export const isInitialFilterState = (filters: FilterState) =>
  Object.keys(filters).every((filter) => {
    if (!['experience', 'location', 'role'].includes(filter)) {
      return true;
    }
    return INITIAL_FILTER_STATE[filter as FilterId].every((value) =>
      filters[filter as FilterId].includes(value),
    );
  });

export const getFilterLabel = (
  filterId: FilterId | 'sort',
  filterValue: SortOrder | string,
) => {
  let filters: Array<TypeaheadOption> = [];

  switch (filterId) {
    case 'experience':
      filters = EXPERIENCES;
      break;
    case 'location':
      break;
    case 'role':
      filters = Object.entries(JobTitleLabels).map(([slug, label]) => ({
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
