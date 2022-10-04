import clsx from 'clsx';

export type BadgeVariant =
  | 'danger'
  | 'info'
  | 'primary'
  | 'success'
  | 'warning';

type Props = Readonly<{
  label: string;
  variant: BadgeVariant;
}>;

const classes: Record<
  BadgeVariant,
  Readonly<{
    backgroundClass: string;
    textClass: string;
  }>
> = {
  danger: {
    backgroundClass: 'bg-danger-100',
    textClass: 'text-danger-800',
  },
  info: {
    backgroundClass: 'bg-info-100',
    textClass: 'text-info-800',
  },
  primary: {
    backgroundClass: 'bg-primary-100',
    textClass: 'text-primary-800',
  },
  success: {
    backgroundClass: 'bg-success-100',
    textClass: 'text-success-800',
  },
  warning: {
    backgroundClass: 'bg-warning-100',
    textClass: 'text-warning-800',
  },
};

export default function Badge({ label, variant }: Props) {
  const { backgroundClass, textClass } = classes[variant];

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        backgroundClass,
        textClass,
      )}>
      {label}
    </span>
  );
}
