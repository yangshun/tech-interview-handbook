import type { BaseQuestionCardProps } from './BaseQuestionCard';
import BaseQuestionCard from './BaseQuestionCard';

export type SimilarQuestionCardProps = Omit<
  BaseQuestionCardProps & {
    showActionButton: false;
    showAggregateStatistics: true;
    showAnswerStatistics: false;
    showCreateEncounterButton: true;
    showDeleteButton: false;
    showHover: true;
    showReceivedStatistics: false;
    showVoteButtons: false;
  },
  | 'actionButtonLabel'
  | 'onActionButtonClick'
  | 'showActionButton'
  | 'showAggregateStatistics'
  | 'showAnswerStatistics'
  | 'showCreateEncounterButton'
  | 'showDeleteButton'
  | 'showHover'
  | 'showReceivedStatistics'
  | 'showVoteButtons'
>;

export default function SimilarQuestionCard(props: SimilarQuestionCardProps) {
  return (
    <BaseQuestionCard
      showActionButton={false}
      showAggregateStatistics={true}
      showAnswerStatistics={false}
      showCreateEncounterButton={true}
      showDeleteButton={false}
      showHover={true}
      showReceivedStatistics={false}
      showVoteButtons={false}
      {...props}
    />
  );
}
