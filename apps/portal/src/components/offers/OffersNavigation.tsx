import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/offers/submit', name: 'Analyze your offers' },
  { href: '/offers/features', name: 'Features' },
];

const navigationAuthenticated: ProductNavigationItems = [
  { href: '/offers/submit', name: 'Analyze your offers' },
  { href: '/offers/dashboard', name: 'Your repository' },
  { href: '/offers/features', name: 'Features' },
];

const config = {
  googleAnalyticsMeasurementID: 'G-34XRGLEVCF',
  logo: (
    <img alt="Tech Offers Repo" className="h-8 w-auto" src="/offers-logo.svg" />
  ),
  navigation,
  showGlobalNav: false,
  title: 'Tech Offers Repo',
  titleHref: '/offers',
};

export const OffersNavigationAuthenticated = {
  ...config,
  navigation: navigationAuthenticated,
};

export default config;
