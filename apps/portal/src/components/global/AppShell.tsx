import clsx from 'clsx';
import Link from 'next/link';
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
      <a
        href="/api/auth/signin"
        onClick={(event) => {
          event.preventDefault();
          signIn();
        }}>
        Sign in
      </a>
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
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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

  return (
    <div className="flex min-h-screen h-full">
      {/* Narrow sidebar */}
      <div className="hidden w-28 overflow-y-auto bg-indigo-700 md:block">
        <div className="flex w-full flex-col items-center py-6">
          <div className="flex flex-shrink-0 items-center">
            <img
              alt="Your Company"
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=white"
            />
          </div>
          <div className="mt-6 w-full flex-1 space-y-1 px-2">
            {sidebarNavigation.map((item) => (
              <Link
                key={item.name}
                aria-current={item.current ? 'page' : undefined}
                className={clsx(
                  item.current
                    ? 'bg-indigo-800 text-white'
                    : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                  'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium',
                )}
                href={item.href}>
                <item.icon
                  aria-hidden="true"
                  className={clsx(
                    item.current
                      ? 'text-white'
                      : 'text-indigo-300 group-hover:text-white',
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
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4">
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
                  <img
                    alt="Your Company"
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white"
                  />
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
                              ? 'bg-indigo-800 text-white'
                              : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                            'group py-2 px-3 rounded-md flex items-center text-sm font-medium',
                          )}
                          href={item.href}>
                          <item.icon
                            aria-hidden="true"
                            className={clsx(
                              item.current
                                ? 'text-white'
                                : 'text-indigo-300 group-hover:text-white',
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
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              type="button"
              onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <div className="flex flex-1 justify-between px-4 sm:px-6">
              <div className="flex flex-1 items-center">Some menu items</div>
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
