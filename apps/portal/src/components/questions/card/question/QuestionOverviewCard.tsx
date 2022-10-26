import withHref from '~/utils/questions/withHref';

import type { BaseQuestionCardProps } from './BaseQuestionCard';
import BaseQuestionCard from './BaseQuestionCard';

export type QuestionOverviewCardProps = Omit<
  BaseQuestionCardProps & {
    showActionButton: false;
    showAggregateStatistics: true;
    showAnswerStatistics: true;
    showCreateEncounterButton: false;
    showDeleteButton: false;
    showReceivedStatistics: true;
    showVoteButtons: true;
  },
  | 'actionButtonLabel'
  | 'onActionButtonClick'
  | 'onDelete'
  | 'showActionButton'
  | 'showAggregateStatistics'
  | 'showAnswerStatistics'
  | 'showCreateEncounterButton'
  | 'showDeleteButton'
  | 'showReceivedStatistics'
  | 'showVoteButtons'
>;

function QuestionOverviewCardWithoutHref(props: QuestionOverviewCardProps) {
  return (
    <BaseQuestionCard
      {...props}
      showActionButton={false}
      showAggregateStatistics={true}
      showAnswerStatistics={true}
      showCreateEncounterButton={false}
      showDeleteButton={false}
      showHover={true}
      showReceivedStatistics={true}
      showVoteButtons={true}
    />
  );
}

const QuestionOverviewCard = withHref(QuestionOverviewCardWithoutHref);
export default QuestionOverviewCard;
