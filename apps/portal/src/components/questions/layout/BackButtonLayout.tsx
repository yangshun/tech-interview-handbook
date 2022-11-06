import type { PropsWithChildren } from 'react';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@tih/ui';

export type BackButtonLayoutProps = PropsWithChildren<{
  href: string;
}>;

export default function BackButtonLayout({
  href,
  children,
}: BackButtonLayoutProps) {
  return (
    <div className="flex w-full flex-1 flex-col items-stretch gap-4 p-4 lg:flex-row">
      <div>
        <Button
          addonPosition="start"
          display="inline"
          href={href}
          icon={ArrowSmallLeftIcon}
          label="Back"
          variant="secondary"
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
