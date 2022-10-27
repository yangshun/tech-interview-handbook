export type FilterId = 'experience' | 'location' | 'role';
export type FilterLabel = 'Experience' | 'Location' | 'Role';

export type CustomFilter = {
  numComments: number;
};

export type RoleFilter =
  | 'Android Engineer'
  | 'Backend Engineer'
  | 'DevOps Engineer'
  | 'Frontend Engineer'
  | 'Full-Stack Engineer'
  | 'iOS Engineer';

export type ExperienceFilter =
  | 'Entry Level (0 - 2 years)'
  | 'Internship'
  | 'Mid Level (3 - 5 years)'
  | 'Senior Level (5+ years)';

export type LocationFilter = 'India' | 'Singapore' | 'United States';

export type FilterValue = ExperienceFilter | LocationFilter | RoleFilter;

export type FilterOption<T> = {
  label: string;
  value: T;
};

export type Filter = {
  id: FilterId;
  label: FilterLabel;
  options: Array<FilterOption<FilterValue>>;
};

export type FilterState = Partial<CustomFilter> &
  Record<FilterId, Array<FilterValue>>;

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

export const ROLES: Array<FilterOption<RoleFilter>> = [
  {
    label: 'Full-Stack Engineer',
    value: 'Full-Stack Engineer',
  },
  { label: 'Frontend Engineer', value: 'Frontend Engineer' },
  { label: 'Backend Engineer', value: 'Backend Engineer' },
  { label: 'DevOps Engineer', value: 'DevOps Engineer' },
  { label: 'iOS Engineer', value: 'iOS Engineer' },
  { label: 'Android Engineer', value: 'Android Engineer' },
];

export const EXPERIENCES: Array<FilterOption<ExperienceFilter>> = [
  { label: 'Internship', value: 'Internship' },
  {
    label: 'Entry Level (0 - 2 years)',
    value: 'Entry Level (0 - 2 years)',
  },
  {
    label: 'Mid Level (3 - 5 years)',
    value: 'Mid Level (3 - 5 years)',
  },
  {
    label: 'Senior Level (5+ years)',
    value: 'Senior Level (5+ years)',
  },
];

export const LOCATIONS: Array<FilterOption<LocationFilter>> = [
  { label: 'Singapore', value: 'Singapore' },
  { label: 'United States', value: 'United States' },
  { label: 'India', value: 'India' },
];

export const INITIAL_FILTER_STATE: FilterState = {
  experience: Object.values(EXPERIENCES).map(({ value }) => value),
  location: Object.values(LOCATIONS).map(({ value }) => value),
  role: Object.values(ROLES).map(({ value }) => value),
};

export const SHORTCUTS: Array<Shortcut> = [
  {
    filters: INITIAL_FILTER_STATE,
    name: 'All',
    sortOrder: 'latest',
  },
  {
    filters: {
      ...INITIAL_FILTER_STATE,
      numComments: 0,
    },
    name: 'Unreviewed',
    sortOrder: 'latest',
  },
  {
    filters: {
      ...INITIAL_FILTER_STATE,
      experience: ['Entry Level (0 - 2 years)'],
    },
    name: 'Fresh Grad',
    sortOrder: 'latest',
  },
  {
    filters: INITIAL_FILTER_STATE,
    name: 'Top 10',
    sortOrder: 'popular',
  },
  {
    filters: {
      ...INITIAL_FILTER_STATE,
      location: ['United States'],
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
  filters: Array<
    FilterOption<ExperienceFilter | LocationFilter | RoleFilter | SortOrder>
  >,
  filterValue: ExperienceFilter | LocationFilter | RoleFilter | SortOrder,
) => filters.find(({ value }) => value === filterValue)?.label ?? filterValue;
