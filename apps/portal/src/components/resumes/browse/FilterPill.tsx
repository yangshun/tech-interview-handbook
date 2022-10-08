type Props = Readonly<{
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  title: string;
}>;

export default function FilterPill({ title, onClick }: Props) {
  return (
    <button
      className="rounded-xl border border-indigo-500 border-transparent bg-white px-2 py-1 text-xs font-medium text-indigo-500 focus:bg-indigo-500 focus:text-white"
      type="button"
      onClick={onClick}>
      {title}
    </button>
  );
}
