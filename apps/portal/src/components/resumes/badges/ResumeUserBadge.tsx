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
        className="absolute left-6 z-10 hidden w-48 flex-col
        justify-center gap-1 rounded-xl bg-white px-2 py-2 text-center drop-shadow-lg

        before:absolute before:top-12 before:-translate-x-6
        before:border-8 before:border-y-transparent before:border-l-transparent
        before:border-r-white before:drop-shadow-lg before:content-['']
        group-hover:flex">
        <Icon className="h-12 w-12 self-center" />
        <p className="font-medium">{title}</p>
        <p className="text-sm">{description}.</p>
      </div>
      <Icon className="h-4 w-4" />
    </div>
  );
}
