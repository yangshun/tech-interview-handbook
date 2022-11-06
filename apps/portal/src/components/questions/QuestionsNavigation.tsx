import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/questions/browse', name: 'Browse' },
  { href: '/questions/lists', name: 'My Lists' },
  { href: '/questions/about', name: 'About' },
  // { href: '/questions/my-questions', name: 'My Questions' },
  // { href: '/questions/history', name: 'History' },
];

const config = {
  googleAnalyticsMeasurementID: 'G-0T4LYWMK8L',
  logo: (
    <img
      alt="Questions Bank"
      className="h-8 w-auto"
      src="/logos/bank-logo.png"
    />
  ),
  navigation,
  showGlobalNav: false,
  title: 'Questions Bank',
  titleHref: '/questions',
};

export default config;
