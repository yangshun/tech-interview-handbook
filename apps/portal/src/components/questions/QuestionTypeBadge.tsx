import type { ComponentProps } from 'react';
import {
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  WrenchIcon,
} from '@heroicons/react/20/solid';
import type { QuestionsQuestionType } from '@prisma/client';
import type { BadgeVariant } from '~/ui';
import { Badge } from '~/ui';

import { QUESTION_TYPES } from '~/utils/questions/constants';

export type QuestionTypeBadgeProps = {
  type: QuestionsQuestionType;
};

type BadgeProps = ComponentProps<typeof Badge>;

const variantMap: Record<QuestionsQuestionType, BadgeVariant> = {
  BEHAVIORAL: 'danger',
  CODING: 'info',
  SYSTEM_DESIGN: 'warning',
  THEORY: 'success',
};

const iconMap: Record<QuestionsQuestionType, Required<BadgeProps>['endAddOn']> =
  {
    BEHAVIORAL: ChatBubbleLeftRightIcon,
    CODING: CodeBracketIcon,
    SYSTEM_DESIGN: WrenchIcon,
    THEORY: BookOpenIcon,
  };

export default function QuestionTypeBadge({ type }: QuestionTypeBadgeProps) {
  return (
    <Badge
      label={QUESTION_TYPES.find(({ value }) => value === type)!.label}
      startAddOn={iconMap[type]}
      variant={variantMap[type]}
    />
  );
}
