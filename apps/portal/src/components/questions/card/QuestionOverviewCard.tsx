import withHref from '~/utils/questions/withHref';

import type { QuestionCardProps } from './QuestionCard';
import QuestionCard from './QuestionCard';

export type QuestionOverviewCardProps = Omit<
  QuestionCardProps & {
    showActionButton: false;
    showAnswerStatistics: true;
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

function QuestionOverviewCardWithoutHref(props: QuestionOverviewCardProps) {
  return (
    <QuestionCard
      {...props}
      showActionButton={false}
      showAnswerStatistics={true}
      showHover={true}
      showReceivedStatistics={true}
      showVoteButtons={true}
    />
  );
}

const QuestionOverviewCard = withHref(QuestionOverviewCardWithoutHref);
export default QuestionOverviewCard;
