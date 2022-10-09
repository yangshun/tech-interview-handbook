import withHref from '~/utils/questions/withHref';

import type { QuestionCardProps } from './QuestionCard';
import QuestionCard from './QuestionCard';

export type QuestionOverviewCardProps = Omit<
  QuestionCardProps & {
    showActionButton: false;
    showUserStatistics: true;
    showVoteButtons: true;
  },
  | 'actionButtonLabel'
  | 'onActionButtonClick'
  | 'showActionButton'
  | 'showUserStatistics'
  | 'showVoteButtons'
>;

function QuestionOverviewCardWithoutHref(props: QuestionOverviewCardProps) {
  return (
    <QuestionCard
      {...props}
      showActionButton={false}
      showUserStatistics={true}
      showVoteButtons={true}
    />
  );
}

const QuestionOverviewCard = withHref(QuestionOverviewCardWithoutHref);
export default QuestionOverviewCard;
