import { useMemo } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

import 'react-popper-tooltip/dist/styles.css';

export type QuestionAggregateBadgeProps = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  statistics: Record<string, number>;
}>;

export default function QuestionAggregateBadge({
  icon: Icon,
  statistics,
}: QuestionAggregateBadgeProps) {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      interactive: true,
      placement: 'bottom-start',
      trigger: ['focus', 'hover'],
    });

  const mostCommonStatistic = useMemo(
    () =>
      Object.entries(statistics).reduce(
        (mostCommon, [key, value]) => {
          if (value > mostCommon.value) {
            return { key, value };
          }
          return mostCommon;
        },
        { key: '', value: 0 },
      ),
    [statistics],
  );

  const sortedStatistics = useMemo(
    () =>
      Object.entries(statistics)
        .sort((a, b) => b[1] - a[1])
        .map(([key, value]) => ({ key, value })),

    [statistics],
  );

  const additionalStatisticCount = Object.keys(statistics).length - 1;

  const label = useMemo(() => {
    if (additionalStatisticCount === 0) {
      return mostCommonStatistic.key;
    }
    return `${mostCommonStatistic.key} (+${additionalStatisticCount})`;
  }, [mostCommonStatistic, additionalStatisticCount]);

  return (
    <>
      <button
        ref={setTriggerRef}
        className="-my-1 flex items-center rounded-md px-2
                  py-1 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-slate-600"
        type="button">
        <Icon
          aria-hidden={true}
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
        />
        {label}
      </button>
      {visible && (
        <div ref={setTooltipRef} {...getTooltipProps()} className="z-10">
          <div className="flex flex-col gap-2 rounded-md bg-white p-2 shadow-md">
            <ul>
              {sortedStatistics.map(({ key, value }) => (
                <li
                  key={key}
                  className="flex justify-between gap-x-4 rtl:flex-row-reverse">
                  <span className="flex text-start font-semibold">{key}</span>
                  <span className="float-end">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
