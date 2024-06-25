import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '~/ui';

import GlobalNavigation from '~/components/global/GlobalNavigation';
import HomeNavigation from '~/components/global/HomeNavigation';
import OffersNavigation, {
  OffersNavigationAdmin,
  OffersNavigationAuthenticated,
} from '~/components/offers/OffersNavigation';
import QuestionsNavigation from '~/components/questions/QuestionsNavigation';
import ResumesNavigation from '~/components/resumes/ResumesNavigation';

import { trpc } from '~/utils/trpc';

import GoogleAnalytics from './GoogleAnalytics';
import MobileNavigation from './MobileNavigation';
import type { ProductNavigationItems } from './ProductNavigation';
import ProductNavigation from './ProductNavigation';
import loginPageHref from '../shared/loginPageHref';

type Props = Readonly<{
  children: ReactNode;
}>;

function ProfileJewel() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isSessionLoading = status === 'loading';

  if (isSessionLoading) {
    return null;
  }

  const loginHref = loginPageHref();
  if (session == null) {
    return router.pathname !== loginHref.pathname ? (
      <div className="flex items-center space-x-4">
        <Link
          className="hover:text-primary-500 text-xs font-medium text-slate-700"
          href={loginHref}>
          Sign In
        </Link>
        <Button
          href={{
            ...loginHref,
            query: {
              ...loginHref.query,
              mode: 'signup',
            },
          }}
          label="Sign Up"
          size="sm"
          variant="tertiary"
        />
      </div>
    ) : null;
  }

  const userNavigation = [
    { href: '/settings', name: 'Settings' },
    {
      href: '/api/auth/signout',
      name: 'Sign Out',
      onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        signOut();
      },
    },
  ];

  return (
    <Menu as="div" className="relative flex-shrink-0">
      <div>
        <Menu.Button className="focus:ring-primary-500 flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          {session?.user?.image == null ? (
            <span>TODO: Render some icon</span>
          ) : (
            <img
              alt={session?.user?.email ?? session?.user?.name ?? ''}
              className="h-8 w-8 rounded-full"
              src={session?.user.image}
            />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {!!session?.user?.name && (
            <Menu.Item>
              {() => (
                <span className="block px-4 py-2 text-sm font-semibold text-slate-700">
                  {session?.user?.name ?? ''}
                </span>
              )}
            </Menu.Item>
          )}
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  className={clsx(
                    active ? 'bg-slate-100' : '',
                    'block px-4 py-2 text-sm text-slate-700',
                  )}
                  href={item.href}
                  onClick={item.onClick}>
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default function AppShell({ children }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  // TODO: Shift this into offers pages and not in this common component.
  const { isLoading: isOffersAdminResultsLoading, data: isOffersAdmin } =
    trpc.useQuery(['offers.admin.isAdmin']);
  const currentProductNavigation: Readonly<{
    logo?: React.ReactNode;
    navigation: ProductNavigationItems;
    showGlobalNav: boolean;
    title: string;
    titleHref: string;
  }> = (() => {
    const path = router.pathname;
    if (path.startsWith('/resumes')) {
      return ResumesNavigation;
    }

    if (path.startsWith('/offers')) {
      if (session == null) {
        return OffersNavigation;
      }
      if (!isOffersAdminResultsLoading && isOffersAdmin) {
        return OffersNavigationAdmin;
      }
      return OffersNavigationAuthenticated;
    }

    if (path.startsWith('/questions')) {
      return QuestionsNavigation;
    }

    return HomeNavigation;
  })();

  return (
    <GoogleAnalytics>
      <div className="flex">
        {/* Narrow sidebar */}
        {currentProductNavigation.showGlobalNav && (
          <div className="hidden w-28 overflow-y-auto border-r border-slate-200 bg-white md:block">
            <div className="flex w-full flex-col items-center py-6">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <img
                    alt="Tech Interview Handbook"
                    className="h-8 w-auto"
                    src="/logo.svg"
                  />
                </Link>
              </div>
              <div className="mt-6 w-full flex-1 space-y-1 px-2">
                {GlobalNavigation.map((item) => (
                  <Link
                    key={item.name}
                    className={clsx(
                      'text-slate-700 hover:bg-slate-100',
                      'group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium',
                    )}
                    href={item.href}>
                    <item.icon
                      aria-hidden="true"
                      className={clsx(
                        'text-slate-500 group-hover:text-slate-700',
                        'h-6 w-6',
                      )}
                    />
                    <span className="mt-2">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Mobile menu */}
        <MobileNavigation
          globalNavigationItems={GlobalNavigation}
          isShown={mobileMenuOpen}
          logo={currentProductNavigation.logo}
          productNavigationItems={currentProductNavigation.navigation}
          productTitle={currentProductNavigation.title}
          setIsShown={setMobileMenuOpen}
        />
        {/* Content area */}
        <div className="w-full">
          {/* Navigation Bar */}
          <header className="sticky top-0 z-10 w-full">
            <div className="relative flex h-16 flex-shrink-0 border-b border-slate-200 bg-white shadow-sm">
              <button
                className="focus:ring-primary-500 border-r border-slate-200 px-4 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset md:hidden"
                type="button"
                onClick={() => setMobileMenuOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3BottomLeftIcon aria-hidden="true" className="h-6 w-6" />
              </button>
              <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex flex-1 items-center">
                  <ProductNavigation
                    items={currentProductNavigation.navigation}
                    logo={currentProductNavigation.logo}
                    title={currentProductNavigation.title}
                    titleHref={currentProductNavigation.titleHref}
                  />
                </div>
                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                  <ProfileJewel />
                </div>
              </div>
            </div>
          </header>
          {/* Main Content */}
          <div className="w-full">{children}</div>
        </div>
      </div>
    </GoogleAnalytics>
  );
}
