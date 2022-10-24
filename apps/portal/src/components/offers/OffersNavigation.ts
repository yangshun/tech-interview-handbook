import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/offers/submit', name: 'Benchmark your offer' },
];

const config = {
  navigation,
  showGlobalNav: false,
  title: 'Offer Profile Repository',
  titleHref: '/offers',
};

export default config;
