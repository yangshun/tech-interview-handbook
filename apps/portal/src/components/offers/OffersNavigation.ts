import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/offers/browse', name: 'Browse' },
  { href: '/offers/submit', name: 'Analyse your offers' },
];

const config = {
  // TODO: Change this to your own GA4 measurement ID.
  googleAnalyticsMeasurementID: 'G-DBLZDQ2ZZN',
  navigation,
  showGlobalNav: false,
  title: 'Offer Profile Repository',
  titleHref: '/offers',
};

export default config;
