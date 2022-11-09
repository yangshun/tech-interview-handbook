// TODO: Remove this after Steps

import clsx from 'clsx';
import React from 'react';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
  variant?: 'md' | 'sm' | 'xs';
}>;

export default function QuestionContainer({
  children,
  className,
  variant = 'md',
}: Props) {
  return (
    <div
      className={clsx(
        'mx-auto px-4 sm:px-6 lg:px-8',
        variant === 'md' && 'max-w-7xl',
        variant === 'sm' && 'max-w-7xl',
        variant === 'xs' && 'max-w-3xl',
        className,
      )}>
      {children}
    </div>
  );
}
