import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

type GlobalNavigationItem = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  name: string;
}>;
export type GlobalNavigationItems = ReadonlyArray<GlobalNavigationItem>;

const globalNavigation: GlobalNavigationItems = [
  { href: '/offers', icon: CurrencyDollarIcon, name: 'Offers' },
  {
    href: '/questions',
    icon: BriefcaseIcon,
    name: 'Questions',
  },
  { href: '/resumes', icon: DocumentTextIcon, name: 'Resumes' },
];

export default globalNavigation;
