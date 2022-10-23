import withHref from '~/utils/questions/withHref';

import type { AnswerCardProps } from './AnswerCard';
import AnswerCard from './AnswerCard';

export type QuestionAnswerCardProps = Required<
  Omit<AnswerCardProps, 'showHover' | 'votingButtonsSize'>
>;

function QuestionAnswerCardWithoutHref(props: QuestionAnswerCardProps) {
  return <AnswerCard {...props} showHover={true} votingButtonsSize="sm" />;
}

const QuestionAnswerCard = withHref(QuestionAnswerCardWithoutHref);
export default QuestionAnswerCard;
