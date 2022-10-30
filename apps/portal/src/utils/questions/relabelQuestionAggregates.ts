import { JobTitleLabels } from '~/components/shared/JobTitles';

import type { AggregatedQuestionEncounter } from '~/types/questions';

export default function relabelQuestionAggregates({
  locationCounts,
  companyCounts,
  roleCounts,
  latestSeenAt,
}: AggregatedQuestionEncounter) {
  const newRoleCounts = Object.fromEntries(
    Object.entries(roleCounts).map(([roleId, count]) => [
      JobTitleLabels[roleId as keyof typeof JobTitleLabels],
      count,
    ]),
  );

  const relabeledAggregate: AggregatedQuestionEncounter = {
    companyCounts,
    latestSeenAt,
    locationCounts,
    roleCounts: newRoleCounts,
  };

  return relabeledAggregate;
}
