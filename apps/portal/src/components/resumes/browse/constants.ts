export const BROWSE_TABS_VALUES = {
  ALL: 'all',
  MY: 'my',
  STARRED: 'starred',
};

export const SORT_OPTIONS = [
  { current: true, href: '#', name: 'Latest' },
  { current: false, href: '#', name: 'Popular' },
  { current: false, href: '#', name: 'Top Comments' },
];

export const TOP_HITS = [
  { href: '#', name: 'Unreviewed' },
  { href: '#', name: 'Fresh Grad' },
  { href: '#', name: 'GOATs' },
  { href: '#', name: 'US Only' },
];

export const ROLES = [
  {
    checked: false,
    label: 'Full-Stack Engineer',
    value: 'Full-Stack Engineer',
  },
  { checked: false, label: 'Frontend Engineer', value: 'Frontend Engineer' },
  { checked: false, label: 'Backend Engineer', value: 'Backend Engineer' },
  { checked: false, label: 'DevOps Engineer', value: 'DevOps Engineer' },
  { checked: false, label: 'iOS Engineer', value: 'iOS Engineer' },
  { checked: false, label: 'Android Engineer', value: 'Android Engineer' },
];

export const EXPERIENCE = [
  { checked: false, label: 'Freshman', value: 'Freshman' },
  { checked: false, label: 'Sophomore', value: 'Sophomore' },
  { checked: false, label: 'Junior', value: 'Junior' },
  { checked: false, label: 'Senior', value: 'Senior' },
  {
    checked: false,
    label: 'Fresh Grad (0-1 years)',
    value: 'Fresh Grad (0-1 years)',
  },
  {
    checked: false,
    label: 'Mid-level (2 - 5 years)',
    value: 'Mid-level (2 - 5 years)',
  },
  {
    checked: false,
    label: 'Senior (5+ years)',
    value: 'Senior (5+ years)',
  },
];

export const LOCATION = [
  { checked: false, label: 'Singapore', value: 'singapore' },
  { checked: false, label: 'United States', value: 'usa' },
  { checked: false, label: 'India', value: 'india' },
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
