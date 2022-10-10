import type { QuestionCardProps } from './QuestionCard';
import QuestionCard from './QuestionCard';

export type QuestionOverviewCardProps = Omit<
  QuestionCardProps & {
    showActionButton: false;
    showUserStatistics: false;
    showVoteButtons: true;
  },
  | 'actionButtonLabel'
  | 'onActionButtonClick'
  | 'showActionButton'
  | 'showUserStatistics'
  | 'showVoteButtons'
>;

export default function FullQuestionCard(props: QuestionOverviewCardProps) {
  return (
    <QuestionCard
      {...props}
      showActionButton={false}
      showUserStatistics={false}
      showVoteButtons={true}
    />
  );
}
