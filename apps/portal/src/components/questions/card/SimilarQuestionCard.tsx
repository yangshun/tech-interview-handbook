import type { QuestionCardProps } from './QuestionCard';
import QuestionCard from './QuestionCard';

export type SimilarQuestionCardProps = Omit<
  QuestionCardProps & {
    showActionButton: true;
    showUserStatistics: false;
    showVoteButtons: false;
  },
  | 'actionButtonLabel'
  | 'answerCount'
  | 'onActionButtonClick'
  | 'showActionButton'
  | 'showUserStatistics'
  | 'showVoteButtons'
  | 'upvoteCount'
> & {
  onSimilarQuestionClick: () => void;
};

export default function SimilarQuestionCard(props: SimilarQuestionCardProps) {
  const { onSimilarQuestionClick, ...rest } = props;
  return (
    <QuestionCard
      {...rest}
      actionButtonLabel="Yes, this is my question"
      showActionButton={true}
      onActionButtonClick={onSimilarQuestionClick}
    />
  );
}
