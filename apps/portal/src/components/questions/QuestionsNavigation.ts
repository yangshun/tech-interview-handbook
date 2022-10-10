import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/questions', name: 'Home' },
  { href: '/questions', name: 'My Lists' },
  { href: '/questions', name: 'My Questions' },
  { href: '/questions', name: 'History' },
];

const config = {
  navigation,
  showGlobalNav: false,
  title: 'Questions Bank',
};

export default config;
