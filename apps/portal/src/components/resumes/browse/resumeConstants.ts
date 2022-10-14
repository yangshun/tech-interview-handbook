export const BROWSE_TABS_VALUES = {
  ALL: 'all',
  MY: 'my',
  STARRED: 'starred',
};

export type SortOrder = 'latest' | 'popular' | 'topComments';
type SortOption = {
  name: string;
  value: SortOrder;
};

export const SORT_OPTIONS: Array<SortOption> = [
  { name: 'Latest', value: 'latest' },
  { name: 'Popular', value: 'popular' },
  { name: 'Top Comments', value: 'topComments' },
];

export const TOP_HITS = [
  { href: '#', name: 'Unreviewed' },
  { href: '#', name: 'Fresh Grad' },
  { href: '#', name: 'GOATs' },
  { href: '#', name: 'US Only' },
];

export type FilterOption = {
  label: string;
  value: string;
};

export const ROLE: Array<FilterOption> = [
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

export const EXPERIENCE: Array<FilterOption> = [
  { label: 'Freshman', value: 'Freshman' },
  { label: 'Sophomore', value: 'Sophomore' },
  { label: 'Junior', value: 'Junior' },
  { label: 'Senior', value: 'Senior' },
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

export const LOCATION: Array<FilterOption> = [
  { label: 'Singapore', value: 'Singapore' },
  { label: 'United States', value: 'United States' },
  { label: 'India', value: 'India' },
];

export const TEST_RESUMES = [
  {
    createdAt: new Date(),
    experience: 'Fresh Grad (0-1 years)',
    numComments: 9,
    numStars: 1,
    role: 'Backend Engineer',
    title: 'Rejected from multiple companies, please help...:(',
    user: 'Git Ji Ra',
  },
  {
    createdAt: new Date(),
    experience: 'Fresh Grad (0-1 years)',
    numComments: 9,
    numStars: 1,
    role: 'Backend Engineer',
    title: 'Rejected from multiple companies, please help...:(',
    user: 'Git Ji Ra',
  },
  {
    createdAt: new Date(),
    experience: 'Fresh Grad (0-1 years)',
    numComments: 9,
    numStars: 1,
    role: 'Backend Engineer',
    title: 'Rejected from multiple companies, please help...:(',
    user: 'Git Ji Ra',
  },
];
