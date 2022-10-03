import clsx from 'clsx';

export type SpinnerColor = 'default' | 'inherit';
export type SpinnerSize = 'lg' | 'md' | 'sm' | 'xs';
export type SpinnerDisplay = 'block' | 'inline';

type Props = Readonly<{
  className?: string;
  color?: SpinnerColor;
  display?: SpinnerDisplay;
  label?: string;
  size: SpinnerSize;
}>;

const colorClasses: Record<SpinnerColor, string> = {
  default: 'text-slate-400',
  inherit: '',
};

const sizeClasses: Record<SpinnerSize, string> = {
  lg: 'w-12 h-12 border-[6px]',
  md: 'w-8 h-8 border-4',
  sm: 'w-6 h-6 border-[3px]',
  xs: 'w-4 h-4 border-2',
};

export default function Spinner({
  className,
  color = 'default',
  display = 'inline',
  label = 'Loading...',
  size,
}: Props) {
  const spinner = (
    <div
      className={clsx(
        'inline-block animate-spin rounded-full border-current border-r-transparent',
        colorClasses[color],
        sizeClasses[size],
        className,
      )}
      role="status">
      <span className="sr-only">{label}</span>
    </div>
  );

  if (display === 'block') {
    return <div className="text-center">{spinner}</div>;
  }

  return spinner;
}
