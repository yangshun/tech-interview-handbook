import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/offers/browse', name: 'Browse' },
  { href: '/offers/submit', name: 'Analyse your offers' },
];

const config = {
  navigation,
  showGlobalNav: false,
  title: 'Offer Profile Repository',
  titleHref: '/offers',
};

export default config;
