import type { BaseQuestionCardProps } from './BaseQuestionCard';
import BaseQuestionCard from './BaseQuestionCard';

export type SimilarQuestionCardProps = Omit<
  BaseQuestionCardProps & {
    showActionButton: true;
    showAggregateStatistics: false;
    showAnswerStatistics: false;
    showCreateEncounterButton: false;
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
> & {
  onSimilarQuestionClick: () => void;
};

export default function SimilarQuestionCard(props: SimilarQuestionCardProps) {
  const { onSimilarQuestionClick, ...rest } = props;
  return (
    <BaseQuestionCard
      actionButtonLabel="Yes, this is my question"
      showActionButton={true}
      showAggregateStatistics={false}
      showAnswerStatistics={false}
      showCreateEncounterButton={false}
      showDeleteButton={false}
      showHover={true}
      showReceivedStatistics={false}
      showVoteButtons={false}
      onActionButtonClick={onSimilarQuestionClick}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(rest as any)}
    />
  );
}
