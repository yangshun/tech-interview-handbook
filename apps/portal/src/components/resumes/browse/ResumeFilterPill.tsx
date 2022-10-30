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
        'border-primary-500 focus:bg-primary-500 rounded-xl border border-transparent px-2 py-1 text-xs font-medium focus:text-white',
        isSelected
          ? 'bg-primary-500 text-white'
          : 'text-primary-500 hover:text-primary-700 bg-white hover:bg-slate-100',
      )}
      type="button"
      onClick={onClick}>
      {title}
    </button>
  );
}
