import { JobTitleLabels } from '~/components/shared/JobTitles';

import type { AggregatedQuestionEncounter } from '~/types/questions';

export default function relabelQuestionAggregates({
  roleCounts,
  ...rest
}: AggregatedQuestionEncounter) {
  const newRoleCounts = Object.fromEntries(
    Object.entries(roleCounts).map(([roleId, count]) => [
      JobTitleLabels[roleId as keyof typeof JobTitleLabels],
      count,
    ]),
  );

  const relabeledAggregate: AggregatedQuestionEncounter = {
    roleCounts: newRoleCounts,
    ...rest,
  };

  return relabeledAggregate;
}
