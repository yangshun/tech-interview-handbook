import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/offers', name: 'Home' },
  { href: '/offers/submit', name: 'Benchmark your offer' },
];

const config = {
  navigation,
  showGlobalNav: false,
  title: 'Tech Offers Repo',
  titleHref: '/offers',
};

export default config;
