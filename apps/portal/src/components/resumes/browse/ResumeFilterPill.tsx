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
        'rounded-xl border border-indigo-500 border-transparent px-2 py-1 text-xs font-medium focus:bg-indigo-500 focus:text-white',
        isSelected ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500',
      )}
      type="button"
      onClick={onClick}>
      {title}
    </button>
  );
}
