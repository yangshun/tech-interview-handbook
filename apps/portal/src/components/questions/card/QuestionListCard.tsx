import withHref from '~/utils/questions/withHref';

import type { QuestionCardProps } from './QuestionCard';
import QuestionCard from './QuestionCard';

export type QuestionListCardProps = Omit<
  QuestionCardProps & {
    showActionButton: false;
    showAnswerStatistics: false;
    showDeleteButton: true;
    showVoteButtons: false;
  },
  | 'actionButtonLabel'
  | 'onActionButtonClick'
  | 'showActionButton'
  | 'showAnswerStatistics'
  | 'showDeleteButton'
  | 'showVoteButtons'
>;

function QuestionListCardWithoutHref(props: QuestionListCardProps) {
  return (
    <QuestionCard
      {...props}
      showActionButton={false}
      showAnswerStatistics={false}
      showDeleteButton={true}
      showHover={true}
      showVoteButtons={false}
    />
  );
}

const QuestionListCard = withHref(QuestionListCardWithoutHref);
export default QuestionListCard;
