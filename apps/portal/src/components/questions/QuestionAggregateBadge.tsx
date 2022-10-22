import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { Badge } from '@tih/ui';

import 'react-popper-tooltip/dist/styles.css';

type BadgeProps = ComponentProps<typeof Badge>;

export type QuestionAggregateBadgeProps = Omit<BadgeProps, 'label'> & {
  statistics: Record<string, number>;
};

export default function QuestionAggregateBadge({
  statistics,
  ...badgeProps
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
      <button ref={setTriggerRef} className="rounded-full" type="button">
        <Badge label={label} {...badgeProps} />
      </button>
      {visible && (
        <div ref={setTooltipRef} {...getTooltipProps()}>
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
