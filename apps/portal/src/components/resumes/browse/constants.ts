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
  { checked: false, label: 'Frontend Engineer', value: 'frontend-engineer' },
  { checked: false, label: 'Backend Engineer', value: 'backend-engineer' },
  { checked: false, label: 'DevOps Engineer', value: 'devops-engineer' },
  { checked: false, label: 'iOS Engineer', value: 'ios-engineer' },
  { checked: false, label: 'Android Engineer', value: 'android-engineer' },
];

export const EXPERIENCE = [
  { checked: false, label: 'Freshman', value: 'freshman' },
  { checked: false, label: 'Sophomore', value: 'sophomore' },
  { checked: false, label: 'Junior', value: 'junior' },
  { checked: false, label: 'Senior', value: 'senior' },
  { checked: false, label: 'Fresh Grad (0-1 years)', value: 'freshgrad' },
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
