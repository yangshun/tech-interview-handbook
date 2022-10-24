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
        className="h-34 absolute left-6 z-10 hidden w-48 flex-col justify-center
        gap-1 rounded-xl bg-white pb-2 text-center drop-shadow-lg

        before:absolute before:top-14 before:-translate-x-4
        before:border-8 before:border-y-transparent before:border-l-transparent
        before:border-r-white before:drop-shadow-lg before:content-['']
        group-hover:flex">
        <Icon className="h-16 w-full self-center rounded-t-xl bg-slate-200 py-2" />
        <div className="px-2">
          <p className="font-medium">{title}</p>
          <p className="text-sm">{description}.</p>
        </div>
      </div>
      <Icon className="h-5 w-5 rounded-xl border bg-slate-200 shadow-sm" />
    </div>
  );
}
