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
        'relative bg-primary-600',
        size === 'sm' && 'text-sm',
        size === 'xs' && 'text-xs',
      )}>
      <div className="mx-auto max-w-7xl px-3 py-2 sm:px-6 lg:px-8">
        <div
          className={clsx('text-center sm:px-16', onHide != null && 'pr-16')}>
          <p className="font-medium text-white">{children}</p>
        </div>
        {onHide != null && (
          <div
            className={clsx(
              'absolute inset-y-0 right-0 flex items-start sm:items-start',
              size === 'md' && 'pr-2 pt-2',
              size === 'sm' && 'pr-2 pt-2',
              size === 'xs' && 'pr-2 pt-1.5',
            )}>
            <button
              className={clsx(
                'flex rounded-md hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white',
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
