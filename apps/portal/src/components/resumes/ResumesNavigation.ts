import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  {
    children: [
      { href: '#', name: 'Technical Support' },
      { href: '#', name: 'Sales' },
      { href: '#', name: 'General' },
    ],
    href: '#',
    name: 'Inboxes',
  },
  { children: [], href: '#', name: 'Reporting' },
  { children: [], href: '#', name: 'Settings' },
];

const config = {
  navigation,
  title: 'Resumes',
};

export default config;
