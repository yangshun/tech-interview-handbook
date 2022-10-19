import type { QuestionCardProps } from './QuestionCard';
import QuestionCard from './QuestionCard';

export type QuestionOverviewCardProps = Omit<
  QuestionCardProps & {
    showActionButton: false;
    showAnswerStatistics: false;
    showReceivedStatistics: true;
    showVoteButtons: true;
  },
  | 'actionButtonLabel'
  | 'onActionButtonClick'
  | 'showActionButton'
  | 'showAnswerStatistics'
  | 'showReceivedStatistics'
  | 'showVoteButtons'
>;

export default function FullQuestionCard(props: QuestionOverviewCardProps) {
  return (
    <QuestionCard
      {...props}
      showActionButton={false}
      showAnswerStatistics={false}
      showReceivedStatistics={true}
      showVoteButtons={true}
    />
  );
}
