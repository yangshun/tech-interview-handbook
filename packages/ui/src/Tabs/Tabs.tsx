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
        <nav aria-label={label} className="flex space-x-2">
          {tabs.map((tab) => {
            const isSelected = tab.value === value;
            const commonProps = {
              'aria-label': tab.label,
              'aria-selected': isSelected,
              children: tab.label,
              className: clsx(
                isSelected
                  ? 'bg-primary-100 text-primary-700'
                  : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700',
                'px-3 py-2 font-medium text-sm rounded-md',
              ),
              onClick: onChange != null ? () => onChange(tab.value) : undefined,
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
              <button key={String(tab.value)} type="button" {...commonProps} />
            );
          })}
        </nav>
      </div>
    </div>
  );
}
