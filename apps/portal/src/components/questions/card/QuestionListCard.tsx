import withHref from '~/utils/questions/withHref';

import type { QuestionCardProps } from './QuestionCard';
import QuestionCard from './QuestionCard';

export type QuestionListCardProps = Omit<
  QuestionCardProps & {
    showActionButton: false;
    showDeleteButton: true;
    showUserStatistics: false;
    showVoteButtons: false;
  },
  | 'actionButtonLabel'
  | 'onActionButtonClick'
  | 'showActionButton'
  | 'showDeleteButton'
  | 'showUserStatistics'
  | 'showVoteButtons'
>;

function QuestionListCardWithoutHref(props: QuestionListCardProps) {
  return (
    <QuestionCard
      {...props}
      showActionButton={false}
      showDeleteButton={true}
      showHover={true}
      showUserStatistics={false}
      showVoteButtons={false}
    />
  );
}

const QuestionListCard = withHref(QuestionListCardWithoutHref);
export default QuestionListCard;
