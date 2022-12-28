import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/questions/browse', name: 'Browse' },
  { href: '/questions/lists', name: 'My Lists' },
  { href: '/questions/about', name: 'About' },
];

const config = {
  logo: (
    <img
      alt="Questions Bank"
      className="h-8 w-auto"
      src="/logos/bank-logo.png"
    />
  ),
  navigation,
  showGlobalNav: false,
  title: 'Tech Interview Question Bank',
  titleHref: '/questions',
};

export default config;
