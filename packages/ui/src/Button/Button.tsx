import clsx from 'clsx';
import Link from 'next/link';
import type { HTMLAttributeAnchorTarget } from 'react';
import type { UrlObject } from 'url';

import { Spinner } from '../';

export type ButtonAddOnPosition = 'end' | 'start';
export type ButtonDisplay = 'block' | 'inline';
export type ButtonSize = 'lg' | 'md' | 'sm';
export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonVariant =
  | 'danger'
  | 'info'
  | 'primary'
  | 'secondary'
  | 'special'
  | 'success'
  | 'tertiary'
  | 'warning';

type Props = Readonly<{
  addonPosition?: ButtonAddOnPosition;
  'aria-controls'?: string;
  'aria-label'?: string;
  className?: string;
  disabled?: boolean;
  display?: ButtonDisplay;
  href?: UrlObject | string;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isLabelHidden?: boolean;
  isLoading?: boolean;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  rel?: string;
  size?: ButtonSize;
  target?: HTMLAttributeAnchorTarget;
  type?: ButtonType;
  variant: ButtonVariant;
}>;

const sizeClasses: Record<ButtonSize, string> = {
  lg: 'px-5 py-2.5',
  md: 'px-4 py-2',
  sm: 'px-2.5 py-1.5',
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  lg: 'p-3',
  md: 'p-2',
  sm: 'p-1.5',
};

const baseClasses: Record<ButtonSize, string> = {
  lg: 'text-base rounded-xl',
  md: 'text-sm rounded-lg',
  sm: 'text-xs rounded-md',
};

const sizeIconSpacingEndClasses: Record<ButtonSize, string> = {
  lg: 'ml-3 -mr-1',
  md: 'ml-2 -mr-1',
  sm: 'ml-2 -mr-0.5',
};

const sizeIconSpacingStartClasses: Record<ButtonSize, string> = {
  lg: 'mr-3 -ml-1',
  md: 'mr-2 -ml-1',
  sm: 'mr-2 -ml-0.5',
};

const sizeIconClasses: Record<ButtonSize, string> = {
  lg: '!h-5 !w-5',
  md: '!h-5 !w-5',
  sm: '!h-4 !w-4',
};

const variantClasses: Record<ButtonVariant, string> = {
  danger:
    'border-transparent text-white bg-danger-600 hover:bg-danger-500 focus:ring-danger-500',
  info: 'border-transparent text-white bg-info-600 hover:bg-info-500 focus:ring-info-500',
  primary:
    'border-transparent text-white bg-primary-600 hover:bg-primary-500 focus:ring-primary-500',
  secondary:
    'border-transparent text-primary-700 bg-primary-100 hover:bg-primary-200 focus:ring-primary-500',
  special:
    'border-slate-900 text-white bg-slate-900 hover:bg-slate-700 focus:ring-slate-900',
  success:
    'border-transparent text-white bg-success-600 hover:bg-success-500 focus:ring-success-500',
  tertiary:
    'border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus:ring-slate-600',
  warning:
    'border-transparent text-white bg-warning-600 hover:bg-warning-500 focus:ring-warning-500',
};

const variantDisabledClasses: Record<ButtonVariant, string> = {
  danger: 'border-transparent text-slate-500 bg-slate-300',
  info: 'border-transparent text-slate-500 bg-slate-300',
  primary: 'border-transparent text-slate-500 bg-slate-300',
  secondary: 'border-transparent text-slate-400 bg-slate-200',
  special: 'border-transparent text-slate-500 bg-slate-300',
  success: 'border-transparent text-slate-500 bg-slate-300',
  tertiary: 'border-slate-300 text-slate-400 bg-slate-100',
  warning: 'border-transparent text-slate-500 bg-slate-300',
};

export default function Button({
  addonPosition = 'end',
  'aria-controls': ariaControls,
  'aria-label': ariaLabel,
  className,
  display = 'inline',
  href,
  icon: Icon,
  disabled = false,
  isLabelHidden = false,
  isLoading = false,
  label,
  size = 'md',
  type = 'button',
  variant,
  onClick,
  rel,
  target,
}: Props) {
  const iconSpacingClass = (() => {
    if (!isLabelHidden && addonPosition === 'start') {
      return sizeIconSpacingStartClasses[size];
    }

    if (!isLabelHidden && addonPosition === 'end') {
      return sizeIconSpacingEndClasses[size];
    }
  })();
  const addOnClass = clsx(iconSpacingClass, sizeIconClasses[size]);

  const addOn = isLoading ? (
    <Spinner className={addOnClass} color="inherit" size="xs" />
  ) : Icon != null ? (
    <Icon aria-hidden="true" className={addOnClass} />
  ) : null;

  const children = (
    <>
      {addonPosition === 'start' && addOn}
      {!isLabelHidden && label}
      {addonPosition === 'end' && addOn}
    </>
  );

  const commonProps = {
    'aria-controls': ariaControls ?? undefined,
    'aria-label': isLabelHidden ? ariaLabel ?? label : undefined,
    children,
    className: clsx(
      display === 'block' ? 'flex w-full justify-center' : 'inline-flex',
      'whitespace-nowrap items-center border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
      disabled ? variantDisabledClasses[variant] : variantClasses[variant],
      disabled && 'pointer-events-none',
      isLabelHidden ? iconOnlySizeClasses[size] : sizeClasses[size],
      baseClasses[size],
      className,
    ),
    disabled,
    onClick,
  };

  if (href == null) {
    return (
      <button type={type === 'button' ? 'button' : 'submit'} {...commonProps} />
    );
  }

  return (
    // TODO: Allow passing in of Link component.
    <Link href={href} rel={rel} target={target} {...commonProps} />
  );
}
