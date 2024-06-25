import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid';

export type AlertVariant = 'danger' | 'info' | 'success' | 'warning';

type Props = Readonly<{
  children: ReactNode;
  title?: string;
  variant: AlertVariant;
}>;

const classes: Record<
  AlertVariant,
  Readonly<{
    backgroundClass: string;
    bodyClass: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    iconClass: string;
    titleClass: string;
  }>
> = {
  danger: {
    backgroundClass: 'bg-danger-50',
    bodyClass: 'text-danger-700',
    icon: XCircleIcon,
    iconClass: 'text-danger-400',
    titleClass: 'text-danger-800',
  },
  info: {
    backgroundClass: 'bg-info-50',
    bodyClass: 'text-info-700',
    icon: InformationCircleIcon,
    iconClass: 'text-info-400',
    titleClass: 'text-info-800',
  },
  success: {
    backgroundClass: 'bg-success-50',
    bodyClass: 'text-success-700',
    icon: CheckCircleIcon,
    iconClass: 'text-success-400',
    titleClass: 'text-success-800',
  },
  warning: {
    backgroundClass: 'bg-warning-50',
    bodyClass: 'text-warning-700',
    icon: ExclamationTriangleIcon,
    iconClass: 'text-warning-400',
    titleClass: 'text-warning-800',
  },
};

export default function Alert({ children, title, variant }: Props) {
  const {
    backgroundClass,
    iconClass,
    titleClass,
    bodyClass,
    icon: Icon,
  } = classes[variant];

  return (
    <div className={clsx('rounded-md p-4', backgroundClass)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon aria-hidden="true" className={clsx('h-5 w-5', iconClass)} />
        </div>
        <div className="ml-3 space-y-2">
          {title && (
            <h3 className={clsx('text-sm font-medium', titleClass)}>{title}</h3>
          )}
          <div className={clsx('text-sm', bodyClass)}>
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
