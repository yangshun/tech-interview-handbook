import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { Popover } from '@headlessui/react';
import { Badge } from '@tih/ui';

type BadgeProps = ComponentProps<typeof Badge>;

export type QuestionAggregateBadgeProps = Omit<BadgeProps, 'label'> & {
  statistics: Record<string, number>;
};

export default function QuestionAggregateBadge({
  statistics,
  ...badgeProps
}: QuestionAggregateBadgeProps) {
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

  const additionalStatisticCount = Object.keys(statistics).length - 1;

  const label = useMemo(() => {
    if (additionalStatisticCount === 0) {
      return mostCommonStatistic.key;
    }
    return `${mostCommonStatistic.key} (+${additionalStatisticCount})`;
  }, [mostCommonStatistic, additionalStatisticCount]);

  return (
    <Popover>
      <Popover.Button>
        <Badge label={label} {...badgeProps} />
      </Popover.Button>
      <Popover.Panel>
        <div className="flex flex-col gap-2">
          <h1>Hello</h1>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
