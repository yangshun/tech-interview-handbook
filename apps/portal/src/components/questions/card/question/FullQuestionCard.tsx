import type { BaseQuestionCardProps } from './BaseQuestionCard';
import BaseQuestionCard from './BaseQuestionCard';

export type QuestionOverviewCardProps = Omit<
  BaseQuestionCardProps & {
    showActionButton: false;
    showAnswerStatistics: false;
    showCreateEncounterButton: true;
    showDeleteButton: false;
    showReceivedStatistics: false;
    showVoteButtons: true;
  },
  | 'actionButtonLabel'
  | 'onActionButtonClick'
  | 'showActionButton'
  | 'showAnswerStatistics'
  | 'showCreateEncounterButton'
  | 'showDeleteButton'
  | 'showReceivedStatistics'
  | 'showVoteButtons'
>;

export default function FullQuestionCard(props: QuestionOverviewCardProps) {
  return (
    <BaseQuestionCard
      {...props}
      showActionButton={false}
      showAnswerStatistics={false}
      showCreateEncounterButton={true}
      showReceivedStatistics={false}
      showVoteButtons={true}
      truncateContent={false}
    />
  );
}
