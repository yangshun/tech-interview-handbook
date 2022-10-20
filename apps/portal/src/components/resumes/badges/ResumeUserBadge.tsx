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
    <div className="group flex items-center justify-center">
      <div
        className="absolute -top-0 hidden w-64 -translate-y-full flex-col
        justify-center gap-1 rounded-lg bg-white px-2 py-2 text-center drop-shadow-xl
        after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2
        after:border-8 after:border-x-transparent after:border-b-transparent
       after:border-t-white after:drop-shadow-lg after:content-['']
        group-hover:flex">
        <Icon className="h-12 w-12 self-center" />
        <p className="font-medium">{title}</p>
        <p className="text-sm">{description}.</p>
      </div>
      <Icon className="h-4 w-4" />
    </div>
  );
}
