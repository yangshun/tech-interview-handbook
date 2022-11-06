import type { JobTitleType } from '~/components/shared/JobTitles';
import { getLabelForJobTitleType } from '~/components/shared/JobTitles';

import type { AggregatedQuestionEncounter } from '~/types/questions';

export default function relabelQuestionAggregates({
  roleCounts,
  ...rest
}: AggregatedQuestionEncounter) {
  const newRoleCounts = Object.fromEntries(
    Object.entries(roleCounts).map(([roleId, count]) => [
      getLabelForJobTitleType(roleId as JobTitleType),
      count,
    ]),
  );

  const relabeledAggregate: AggregatedQuestionEncounter = {
    roleCounts: newRoleCounts,
    ...rest,
  };

  return relabeledAggregate;
}
