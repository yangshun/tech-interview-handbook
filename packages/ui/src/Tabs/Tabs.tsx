import clsx from 'clsx';
import Link from 'next/link';
import type { UrlObject } from 'url';

export type TabItem<T> = Readonly<{
  href?: UrlObject | string;
  label: string;
  value: T;
}>;

type Props<T> = Readonly<{
  label: string;
  onChange?: (value: T) => void;
  tabs: ReadonlyArray<TabItem<T>>;
  value: T;
}>;

export default function Tabs<T>({ label, tabs, value, onChange }: Props<T>) {
  return (
    <div className="w-full">
      <div role="tablist">
        <div className="border-b border-slate-200">
          <nav aria-label={label} className="-mb-px flex space-x-4">
            {tabs.map((tab) => {
              const isSelected = tab.value === value;
              const commonProps = {
                'aria-label': tab.label,
                'aria-selected': isSelected,
                children: tab.label,
                className: clsx(
                  isSelected
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                ),
                onClick:
                  onChange != null ? () => onChange(tab.value) : undefined,
                role: 'tab',
              };

              if (tab.href != null) {
                // TODO: Allow passing in of Link component.
                return (
                  <Link
                    key={String(tab.value)}
                    href={tab.href}
                    {...commonProps}
                  />
                );
              }

              return (
                <button
                  key={String(tab.value)}
                  type="button"
                  {...commonProps}
                />
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
