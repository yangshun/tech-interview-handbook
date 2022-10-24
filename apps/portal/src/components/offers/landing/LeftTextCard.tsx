import type { ReactNode } from 'react';

import { HOME_URL } from '~/components/offers/types';

type LeftTextCardProps = Readonly<{
  description: string;
  icon: ReactNode;
  imageAlt: string;
  imageSrc: string;
  title: string;
}>;

export default function LeftTextCard({
  description,
  icon,
  imageAlt,
  imageSrc,
  title,
}: LeftTextCardProps) {
  return (
    <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
        <div>
          <div>
            <span className="to-primary-500 flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600">
              {icon}
            </span>
          </div>
          <div className="mt-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>
            <p className="mt-4 text-lg text-gray-500">{description}</p>
            <div className="mt-6">
              <a
                className="to-primary-500 inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                href={HOME_URL}>
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 sm:mt-16 lg:mt-0">
        <div className="-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
          <img
            alt={imageAlt}
            className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
            src={imageSrc}
          />
        </div>
      </div>
    </div>
  );
}
