import clsx from 'clsx';
import { useState } from 'react';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
type Props = Readonly<{
  alt: string;
  className: string;
  src: string;
}>;

export default function CompanyProfileImage({ alt, className, src }: Props) {
  const [hasError, setHasError] = useState(false);

  return hasError ? (
    <div
      className={clsx(
        'shrink-0 rounded bg-slate-50 p-0.5 text-slate-400',
        className,
      )}>
      <BuildingOffice2Icon />
    </div>
  ) : (
    <img
      alt={alt}
      className={clsx('object-contain', className)}
      src={src}
      onError={() => {
        setHasError(true);
      }}
    />
  );
}
