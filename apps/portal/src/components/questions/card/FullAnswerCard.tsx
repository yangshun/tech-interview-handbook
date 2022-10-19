import type { AnswerCardProps } from './AnswerCard';
import AnswerCard from './AnswerCard';

export type FullAnswerCardProps = Omit<
  AnswerCardProps,
  'commentCount' | 'votingButtonsSize'
>;

export default function FullAnswerCard(props: FullAnswerCardProps) {
  return <AnswerCard {...props} votingButtonsSize="md" />;
}
