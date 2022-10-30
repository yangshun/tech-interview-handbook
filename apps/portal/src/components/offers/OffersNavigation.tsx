import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/offers/submit', name: 'Analyze your offers' },
  { href: '/offers/features', name: 'Features' },
];

const config = {
  // TODO: Change this to your own GA4 measurement ID.
  googleAnalyticsMeasurementID: 'G-34XRGLEVCF',
  logo: (
    <CurrencyDollarIcon
      aria-label="Tech Interview Handbook Offers"
      className="h-8 w-8"
    />
  ),
  navigation,
  showGlobalNav: false,
  title: 'Tech Offers Repo',
  titleHref: '/offers',
};

export default config;
