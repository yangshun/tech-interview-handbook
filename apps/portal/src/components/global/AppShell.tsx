import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3BottomLeftIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import HomeNavigation from '~/components/global/HomeNavigation';
import OffersNavigation from '~/components/offers/OffersNavigation';
import QuestionsNavigation from '~/components/questions/QuestionsNavigation';
import ResumesNavigation from '~/components/resumes/ResumesNavigation';

import type { ProductNavigationItems } from './ProductNavigation';
import ProductNavigation from './ProductNavigation';

const sidebarNavigation = [
  { current: false, href: '/', icon: HomeIcon, name: 'Home' },
  { current: false, href: '/resumes', icon: DocumentTextIcon, name: 'Resumes' },
  {
    current: false,
    href: '/questions',
    icon: BriefcaseIcon,
    name: 'Questions',
  },
  { current: false, href: '/offers', icon: CurrencyDollarIcon, name: 'Offers' },
];

type Props = Readonly<{
  children: ReactNode;
}>;

function ProfileJewel() {
  const { data: session, status } = useSession();
  const isSessionLoading = status === 'loading';

  if (isSessionLoading) {
    return null;
  }

  if (session == null) {
    return (
      <Link
        className="text-sm font-medium"
        href="/api/auth/signin"
        onClick={(event) => {
          event.preventDefault();
          signIn();
        }}>
        Sign in
      </Link>
    );
  }

  const userNavigation = [
    { href: '/profile', name: 'Profile' },
    {
      href: '/api/auth/signout',
      name: 'Sign out',
      onClick: (event: MouseEvent) => {
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
            <span>Render some icon</span>
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
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  className={clsx(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
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

  const currentProductNavigation: Readonly<{
    navigation: ProductNavigationItems;
    title: string;
  }> = (() => {
    const path = router.pathname;
    if (path.startsWith('/resumes')) {
      return ResumesNavigation;
    }

    if (path.startsWith('/offers')) {
      return OffersNavigation;
    }

    if (path.startsWith('/questions')) {
      return QuestionsNavigation;
    }

    return HomeNavigation;
  })();

  return (
    <div className="flex h-full min-h-screen">
      {/* Narrow sidebar */}
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
            {sidebarNavigation.map((item) => (
              <Link
                key={item.name}
                aria-current={item.current ? 'page' : undefined}
                className={clsx(
                  item.current
                    ? 'bg-primary-50 text-slate-700'
                    : 'text-slate-700 hover:bg-slate-200',
                  'group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium',
                )}
                href={item.href}>
                <item.icon
                  aria-hidden="true"
                  className={clsx(
                    item.current
                      ? 'text-primary-500'
                      : 'text-slate-500 group-hover:text-slate-700',
                    'h-6 w-6',
                  )}
                />
                <span className="mt-2">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition.Root as={Fragment} show={mobileMenuOpen}>
        <Dialog
          as="div"
          className="relative z-20 md:hidden"
          onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="absolute top-1 right-0 -mr-14 p-1">
                    <button
                      className="flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}>
                      <XMarkIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <Link href="/">
                    <img
                      alt="Tech Interview Handbook"
                      className="h-8 w-auto"
                      src="/logo.svg"
                    />
                  </Link>
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                  <nav className="flex h-full flex-col">
                    <div className="space-y-1">
                      {sidebarNavigation.map((item) => (
                        <a
                          key={item.name}
                          aria-current={item.current ? 'page' : undefined}
                          className={clsx(
                            item.current
                              ? 'bg-primary-50 text-slate-700'
                              : 'text-slate-700 hover:bg-slate-200',
                            'group flex items-center rounded-md py-2 px-3 text-sm font-medium',
                          )}
                          href={item.href}>
                          <item.icon
                            aria-hidden="true"
                            className={clsx(
                              item.current
                                ? 'text-primary-500'
                                : 'text-slate-500 group-hover:text-slate-700',
                              'mr-3 h-6 w-6',
                            )}
                          />
                          <span>{item.name}</span>
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div aria-hidden="true" className="w-14 flex-shrink-0">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="w-full">
          <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
            <button
              className="focus:ring-primary-500 border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset md:hidden"
              type="button"
              onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <div className="flex flex-1 justify-between px-4 sm:px-6">
              <div className="flex flex-1 items-center">
                <ProductNavigation
                  items={currentProductNavigation.navigation}
                  title={currentProductNavigation.title}
                />
              </div>
              <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                <ProfileJewel />
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-1 items-stretch overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
