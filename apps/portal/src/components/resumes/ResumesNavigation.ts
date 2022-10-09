import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  {
    children: [],
    href: '/resumes',
    name: 'Browse',
  },
  { children: [], href: '/resumes/submit', name: 'Submit for review' },
];

const config = {
  navigation,
  showGlobalNav: false,
  title: 'Resumes',
};

export default config;
