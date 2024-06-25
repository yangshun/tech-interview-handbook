import type { PropsWithChildren } from 'react';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '~/ui';

import Container from '~/components/shared/Container';

export type BackButtonLayoutProps = PropsWithChildren<{
  href: string;
}>;

export default function BackButtonLayout({
  href,
  children,
}: BackButtonLayoutProps) {
  return (
    <Container className="flex flex-col gap-4 pt-4 pb-12" variant="sm">
      <div>
        <Button
          addonPosition="start"
          display="inline"
          href={href}
          icon={ArrowSmallLeftIcon}
          label="Back"
          size="sm"
          variant="secondary"
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto">
        {children}
      </div>
    </Container>
  );
}
