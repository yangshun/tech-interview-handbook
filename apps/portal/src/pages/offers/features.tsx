import Head from 'next/head';
import type { SVGProps } from 'react';
import {
  BookmarkSquareIcon,
  ChartBarSquareIcon,
  InformationCircleIcon,
  ShareIcon,
  TableCellsIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

import { HOME_URL, OFFERS_SUBMIT_URL } from '~/components/offers/constants';
import offersAnalysis from '~/components/offers/features/images/offers-analysis.png';
import offersBrowse from '~/components/offers/features/images/offers-browse.png';
import offersProfile from '~/components/offers/features/images/offers-profile.png';
import LeftTextCard from '~/components/offers/features/LeftTextCard';
import RightTextCard from '~/components/offers/features/RightTextCard';

const features = [
  {
    description:
      'Profile names are randomly generated to keep your offers strictly anonymous.',
    icon: UsersIcon,
    name: 'Anonymized Profile Name',
  },
  {
    description:
      'Only users with the edit link can edit that profile. Share profiles to others using a public link without giving edit permission.',
    icon: ShareIcon,
    name: 'Edit Link v.s. Public Link',
  },
  {
    description:
      "Offer profiles will not be automatically saved under creators' account in our database unless explicit permission is given.",
    icon: BookmarkSquareIcon,
    name: 'Save with Permission',
  },
];

const footerNavigation = {
  social: [
    {
      href: 'https://www.linkedin.com/company/tech-offers-repo',
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 50 50" {...props}>
          <path
            clipRule="evenodd"
            d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
            fillRule="evenodd"
          />
        </svg>
      ),
      name: 'LinkedIn',
    },
    {
      href: 'https://www.instagram.com/techinterviewhandbook',
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            clipRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            fillRule="evenodd"
          />
        </svg>
      ),
      name: 'Instagram',
    },
    {
      href: 'https://github.com/yangshun/tech-interview-handbook',
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            fillRule="evenodd"
          />
        </svg>
      ),
      name: 'GitHub',
    },
  ],
};

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Features - Tech Offers Repo</title>
      </Head>
      <div className="mx-auto w-full overflow-y-auto bg-white">
        <main>
          {/* Hero section */}
          <div className="relative h-full">
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <img
                alt="Tech Offers Repo"
                className="mx-auto mb-8 w-auto"
                src="/logos/offers-logo.svg"
              />
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span>Choosing offers </span>
                <span className="from-primary-600 -mb-1 mr-2 bg-gradient-to-r to-purple-500 bg-clip-text pb-1 pr-4 italic text-transparent">
                  made easier
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl sm:max-w-3xl">
                Analyze your offers using profiles from fellow software
                engineers.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5 sm:space-y-0 md:grid-cols-2">
                  <a
                    className="border-grey-600 flex items-center justify-center rounded-md border bg-white px-4 py-3 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 sm:px-8"
                    href={HOME_URL}>
                    Get started
                  </a>
                  <a
                    className="bg-primary-500 flex items-center justify-center rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                    href="https://youtu.be/e4g1lS6zWGA">
                    Promo Video
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Alternating Feature Sections */}
          <div className="relative overflow-hidden pt-16 pb-32">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
            />
            <div className="relative">
              <LeftTextCard
                buttonLabel="View offers"
                description="Filter relevant offers by job title, company, submission date, salary and more."
                icon={
                  <TableCellsIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                }
                imageAlt="Browse page"
                imageSrc={offersBrowse}
                title="Stay informed of recent offers"
                url={HOME_URL}
              />
            </div>
            <div className="mt-36">
              <RightTextCard
                buttonLabel="Analyse offers"
                description="With our offer engine analysis, you can benchmark your offers against other offers on the market and make an informed decision."
                icon={
                  <ChartBarSquareIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                }
                imageAlt="Offers analysis page"
                imageSrc={offersAnalysis}
                title="Better understand your offers"
                url={OFFERS_SUBMIT_URL}
              />
            </div>
            <div className="mt-36">
              <LeftTextCard
                buttonLabel="View offer profiles"
                description="An offer profile includes not only offers that a person received in their application cycle, but also background information such as education and work experience. Use offer profiles to help you better contextualize offers."
                icon={
                  <InformationCircleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                }
                imageAlt="Offer profile page"
                imageSrc={offersProfile}
                title="Choosing an offer needs context"
                url={HOME_URL}
              />
            </div>
          </div>

          {/* Gradient Feature Section */}
          <div className="to-primary-600 bg-gradient-to-r from-purple-800">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pt-24">
              <h2 className="flex justify-center text-4xl font-bold tracking-tight text-white">
                Your privacy is our priority.
              </h2>
              <p className="text-primary-100 mt-4 flex flex-row justify-center text-lg">
                All offer profiles are anonymized and we do not store
                information about your personal identity.
              </p>
              <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name}>
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white bg-opacity-10">
                        <feature.icon
                          aria-hidden="true"
                          className="h-6 w-6 text-white"
                        />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white">
                        {feature.name}
                      </h3>
                      <p className="text-primary-100 mt-2 text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white">
            <div className="mx-auto max-w-4xl py-16 px-4 sm:px-6 sm:py-24 lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Ready to get started?</span>
                <span className="to-primary-600 -mb-1 block bg-gradient-to-r from-purple-600 bg-clip-text pb-1 text-transparent">
                  Create your own offer profile today.
                </span>
              </h2>
              <div className="mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-5">
                <a
                  className="to-primary-500 flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                  href={OFFERS_SUBMIT_URL}>
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </main>

        <footer aria-labelledby="footer-heading" className="bg-gray-50">
          <h2 className="sr-only" id="footer-heading">
            Footer
          </h2>
          <div className="mx-auto max-w-7xl px-4 pt-0 pb-8 sm:px-6 lg:px-8">
            <div className="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
              <div className="flex space-x-6 md:order-2">
                {footerNavigation.social.map((item) => (
                  <a
                    key={item.name}
                    className="text-gray-400 hover:text-gray-500"
                    href={item.href}>
                    <span className="sr-only">{item.name}</span>
                    <item.icon aria-hidden="true" className="h-6 w-6" />
                  </a>
                ))}
              </div>
              <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
                &copy; 2022 Tech Offers Repo. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
