import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/offers/submit', name: 'Analyze your offers' },
  { href: '/offers/features', name: 'Features' },
];

const config = {
  // TODO: Change this to your own GA4 measurement ID.
  googleAnalyticsMeasurementID: 'G-34XRGLEVCF',
  logo: (
    <img alt="Tech Offers Repo" className="h-8 w-auto" src="/offers-logo.svg" />
  ),
  navigation,
  showGlobalNav: false,
  title: 'Tech Offers Repo',
  titleHref: '/offers',
};

export default config;
