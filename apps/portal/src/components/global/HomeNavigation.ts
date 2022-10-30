import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  { href: '/offers', name: 'Offers' },
  { href: '/questions', name: 'Question Bank' },
  {
    children: [
      { href: '/resumes', name: 'View Resumes' },
      { href: '/resumes/submit', name: 'Submit Resume' },
    ],
    href: '#',
    name: 'Resumes',
  },
];

const config = {
  googleAnalyticsMeasurementID: 'G-DBLZDQ2ZZN',
  navigation,
  showGlobalNav: true,
  title: 'Tech Interview Handbook',
  titleHref: '/',
};

export default config;
