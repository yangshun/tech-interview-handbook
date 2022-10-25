import type { BadgeIcon } from './resumeBadgeConstants';

type Props = Readonly<{
  description: string;
  icon: BadgeIcon;
  title: string;
}>;

export default function ResumeUserBadge({
  description,
  icon: Icon,
  title,
}: Props) {
  return (
    <div className="group relative flex items-center justify-center">
      <div
        className="absolute top-7 z-10 hidden h-36 w-48 flex-col justify-center
        gap-1 rounded-xl bg-white pb-2 text-center drop-shadow-lg

        after:absolute after:left-1/2 after:top-[-11%] after:-translate-x-1/2
        after:border-8 after:border-x-transparent after:border-t-transparent
        after:border-b-slate-200 after:drop-shadow-sm after:content-['']
        group-hover:flex">
        <Icon className="h-16 w-full self-center rounded-t-xl bg-slate-200 py-2" />
        <div className="flex h-20 flex-col justify-evenly px-2">
          <p className="font-medium">{title}</p>
          <p className="text-sm">{description}.</p>
        </div>
      </div>
      <Icon className="h-5 w-5 rounded-xl border bg-slate-200 shadow-sm" />
    </div>
  );
}
