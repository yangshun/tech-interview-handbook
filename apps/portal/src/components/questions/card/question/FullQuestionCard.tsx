import type { BaseQuestionCardProps } from './BaseQuestionCard';
import BaseQuestionCard from './BaseQuestionCard';

export type QuestionOverviewCardProps = Omit<
  BaseQuestionCardProps & {
    showActionButton: false;
    showAddToList: true;
    showAggregateStatistics: true;
    showAnswerStatistics: false;
    showCreateEncounterButton: true;
    showDeleteButton: false;
    showReceivedStatistics: false;
    showTagForm: true;
    showVoteButtons: true;
  },
  | 'actionButtonLabel'
  | 'onActionButtonClick'
  | 'showActionButton'
  | 'showAddToList'
  | 'showAggregateStatistics'
  | 'showAnswerStatistics'
  | 'showCreateEncounterButton'
  | 'showDeleteButton'
  | 'showReceivedStatistics'
  | 'showTagForm'
  | 'showVoteButtons'
>;

export default function FullQuestionCard(props: QuestionOverviewCardProps) {
  return (
    <BaseQuestionCard
      {...props}
      showActionButton={false}
      showAddToList={true}
      showAggregateStatistics={true}
      showAnswerStatistics={false}
      showCreateEncounterButton={true}
      showReceivedStatistics={false}
      showTagForm={true}
      showVoteButtons={true}
      truncateContent={false}
    />
  );
}
