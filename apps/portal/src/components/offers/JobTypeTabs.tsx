import clsx from 'clsx';
import { JobType } from '@prisma/client';

import { JobTypeLabel } from '~/components/offers/constants';

type Props = Readonly<{
  onChange: (jobType: JobType) => void;
  value: JobType;
}>;

const tabs = [
  {
    label: JobTypeLabel.FULLTIME,
    value: JobType.FULLTIME,
  },
  {
    label: JobTypeLabel.INTERN,
    value: JobType.INTERN,
  },
];

export default function JobTypeTabs({ value, onChange }: Props) {
  return (
    <div className="block">
      <nav
        aria-label="Job Types"
        className="isolate flex divide-x divide-slate-200 rounded-lg border border-slate-200 bg-white">
        {tabs.map((tab, tabIdx) => (
          <button
            key={tab.value}
            aria-current={tab.value === value ? 'page' : undefined}
            className={clsx(
              tab.value === value
                ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700',
              tabIdx === 0 && 'rounded-l-lg',
              tabIdx === tabs.length - 1 && 'rounded-r-lg',
              'focus:ring-primary-500 group relative min-w-0 flex-1 overflow-hidden py-3 px-4 text-center font-medium focus:z-10',
            )}
            type="button"
            onClick={() => {
              onChange(tab.value);
            }}>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
