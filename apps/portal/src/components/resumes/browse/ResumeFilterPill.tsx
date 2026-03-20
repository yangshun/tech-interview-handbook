import clsx from 'clsx';

type Props = Readonly<{
  isSelected: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  title: string;
}>;

export default function ResumeFilterPill({
  title,
  onClick,
  isSelected,
}: Props) {
  return (
    <button
      className={clsx(
        'rounded-xl border border-primary-500 border-transparent px-2 py-1 text-xs font-medium focus:bg-primary-500 focus:text-white',
        isSelected
          ? 'bg-primary-500 text-white'
          : 'bg-white text-primary-500 hover:bg-slate-100 hover:text-primary-700',
      )}
      type="button"
      onClick={onClick}>
      {title}
    </button>
  );
}
