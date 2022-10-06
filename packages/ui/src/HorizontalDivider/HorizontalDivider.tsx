import clsx from 'clsx';

type Props = Readonly<{
  className?: string;
}>;

export default function HorizontalDivider({ className }: Props) {
  return (
    <hr
      aria-hidden={true}
      className={clsx('my-2 h-0 border-t border-slate-200', className)}
    />
  );
}
