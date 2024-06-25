import { HorizontalDivider } from '~/ui';

export default function FormSection({
  children,
  title,
}: Readonly<{ children: React.ReactNode; title: string }>) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-medium leading-6 text-slate-900">
          {title}
        </h2>
        <HorizontalDivider />
      </div>
      <div className="space-y-4 sm:space-y-6">{children}</div>
    </div>
  );
}
