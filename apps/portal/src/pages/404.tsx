import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const links = [
  {
    description: (
      <>
        Explore offer data points, benchmark and analyze your offers
        anonymously.
      </>
    ),
    href: '/offers',
    icon: CurrencyDollarIcon,
    title: 'Offers Repo',
  },
  {
    description: (
      <>
        A community driven interview question bank. Learn how others are
        answering interview questions.
      </>
    ),
    href: '/questions',
    icon: BriefcaseIcon,
    title: 'Questions Bank',
  },
  {
    description: (
      <>
        Submit your resume and collect invaluable feedback from our helpful
        community of Software Engineers and hiring managers.
      </>
    ),
    href: '/resumes',
    icon: DocumentTextIcon,
    title: 'Resumes Review',
  },
];

export default function Example() {
  return (
    <div className="bg-white">
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl py-16 sm:py-24">
          <div className="text-center">
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Page Not Found
            </h1>
            <p className="mt-2 text-lg text-slate-500">
              Oops! You tried to access a page that doesn't exist.
            </p>
          </div>
          <div className="mt-12">
            <h2 className="text-base font-medium text-slate-500">
              You may be trying to access the following services
            </h2>
            <ul
              className="mt-4 divide-y divide-slate-200 border-t border-b border-slate-200"
              role="list">
              {links.map((link) => (
                <li
                  key={link.href}
                  className="relative flex items-start space-x-4 py-6">
                  <div className="flex-shrink-0">
                    <span className="bg-primary-50 flex h-12 w-12 items-center justify-center rounded-lg">
                      <link.icon
                        aria-hidden="true"
                        className="text-primary-700 h-6 w-6"
                      />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-medium text-slate-900">
                      <span className="focus-within:ring-primary-500 rounded-sm focus-within:ring-2 focus-within:ring-offset-2">
                        <Link className="focus:outline-none" href={link.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {link.title}
                        </Link>
                      </span>
                    </h3>
                    <p className="text-base text-slate-500">
                      {link.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <ChevronRightIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-slate-400"
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                className="text-primary-600 hover:text-primary-500 text-base font-medium"
                href="/">
                Or go back home
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
