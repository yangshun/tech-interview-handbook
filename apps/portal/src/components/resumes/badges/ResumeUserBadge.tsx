import type { BadgeIcon } from './resumeBadgeConstants';

type Props = Readonly<{
  description: string;
  icon: BadgeIcon;
  toolTip: string;
}>;

export default function ResumeUserBadge({
  description,
  icon: Icon,
  toolTip,
}: Props) {
  return (
    <div className="group">
      <div
        className="absolute left-16 -top-1 hidden w-64 -translate-y-full flex-col justify-center
        rounded-lg bg-slate-50 px-2 py-2 text-center shadow-md
       after:absolute after:left-1/2 after:top-[100%]
       after:-translate-x-1/2 after:border-8 after:border-x-transparent
       after:border-b-transparent after:border-t-slate-50
       after:content-['']
       group-hover:flex">
        <Icon className="text-center" />
        <p className="text-lg font-medium">{toolTip}</p>
        <p className="text-sm font-light">{description}</p>
      </div>
      <Icon className="h-3 w-3" />
    </div>
  );
}
