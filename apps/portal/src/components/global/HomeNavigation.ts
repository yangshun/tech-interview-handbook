import type { ProductNavigationItems } from '~/components/global/ProductNavigation';

const navigation: ProductNavigationItems = [
  {
    children: [
      { href: '/resumes', name: 'View Resumes' },
      { href: '/resumes/submit', name: 'Submit Resume' },
    ],
    href: '#',
    name: 'Resumes',
  },
  { href: '/questions', name: 'Question Bank' },
  { href: '/offers', name: 'Offers' },
];

const config = {
  navigation,
  title: 'Tech Interview Handbook',
};

export default config;
