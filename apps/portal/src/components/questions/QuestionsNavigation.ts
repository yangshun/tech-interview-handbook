import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/questions', name: 'Home' },
  { href: '#', name: 'My Lists' },
  { href: '#', name: 'My Questions' },
  { href: '#', name: 'History' },
];

const config = {
  navigation,
  title: 'Questions Bank',
};

export default config;
