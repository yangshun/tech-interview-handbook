import clsx from 'clsx';
import type { FC } from 'react';

type ContainerProps = {
  children: Array<JSX.Element> | JSX.Element;
  className?: string;
};

export const Container: FC<ContainerProps> = ({ className, ...props }) => {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 lg:px-2', className)}
      {...props}
    />
  );
};
