import clsx from 'clsx';
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export type BannerSize = 'md' | 'sm' | 'xs';

type Props = Readonly<{
  children: React.ReactNode;
  onHide?: () => void;
  size?: BannerSize;
}>;

export default function Banner({ children, size = 'md', onHide }: Props) {
  return (
    <div
      className={clsx(
        'bg-primary-600 relative',
        size === 'sm' && 'text-sm',
        size === 'xs' && 'text-xs',
      )}>
      <div className="mx-auto max-w-7xl py-2 px-3 sm:px-6 lg:px-8">
        <div
          className={clsx('text-center sm:px-16', onHide != null && 'pr-16')}>
          <p className="font-medium text-white">{children}</p>
        </div>
        {onHide != null && (
          <div
            className={clsx(
              'absolute inset-y-0 right-0 flex items-start sm:items-start',
              size === 'md' && 'pt-2 pr-2',
              size === 'sm' && 'pt-2 pr-2',
              size === 'xs' && 'pt-1.5 pr-2',
            )}>
            <button
              className={clsx(
                'hover:bg-primary-400 flex rounded-md focus:outline-none focus:ring-2 focus:ring-white',
                size === 'md' && 'p-1',
                size === 'sm' && 'p-0.5',
                size === 'xs' && 'p-0.5',
              )}
              type="button"
              onClick={onHide}>
              <span className="sr-only">Dismiss</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
