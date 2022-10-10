import type { QuestionsQuestionType } from '@prisma/client';
import { Badge } from '@tih/ui';

import { QUESTION_TYPES } from '~/utils/questions/constants';

export type QuestionTypeBadgeProps = {
  type: QuestionsQuestionType;
};

export default function QuestionTypeBadge({ type }: QuestionTypeBadgeProps) {
  return (
    <Badge
      label={QUESTION_TYPES.find(({ value }) => value === type)!.label}
      variant="info"
    />
  );
}
