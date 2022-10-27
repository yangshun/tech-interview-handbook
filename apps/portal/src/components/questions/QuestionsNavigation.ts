import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/questions/browse', name: 'Browse' },
  { href: '/questions/lists', name: 'My Lists' },
  // { href: '/questions/my-questions', name: 'My Questions' },
  // { href: '/questions/history', name: 'History' },
];

const config = {
  // TODO: Change this to your own GA4 measurement ID.
  googleAnalyticsMeasurementID: 'G-DBLZDQ2ZZN',
  navigation,
  showGlobalNav: false,
  title: 'Questions Bank',
  titleHref: '/questions',
};

export default config;
