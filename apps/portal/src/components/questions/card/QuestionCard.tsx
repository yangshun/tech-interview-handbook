import clsx from 'clsx';
import { useState } from 'react';
import {
  ChatBubbleBottomCenterTextIcon,
  CheckIcon,
  EyeIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import type { QuestionsQuestionType } from '@prisma/client';
import { Badge, Button } from '@tih/ui';

import { useQuestionVote } from '~/utils/questions/useVote';

import type { CreateQuestionEncounterData } from '../forms/CreateQuestionEncounterForm';
import CreateQuestionEncounterForm from '../forms/CreateQuestionEncounterForm';
import QuestionTypeBadge from '../QuestionTypeBadge';
import VotingButtons from '../VotingButtons';

type UpvoteProps =
  | {
      showVoteButtons: true;
      upvoteCount: number;
    }
  | {
      showVoteButtons?: false;
      upvoteCount?: never;
    };

type DeleteProps =
  | {
      onDelete: () => void;
      showDeleteButton: true;
    }
  | {
      onDelete?: never;
      showDeleteButton?: false;
    };

type AnswerStatisticsProps =
  | {
      answerCount: number;
      showAnswerStatistics: true;
    }
  | {
      answerCount?: never;
      showAnswerStatistics?: false;
    };

type ActionButtonProps =
  | {
      actionButtonLabel: string;
      onActionButtonClick: () => void;
      showActionButton: true;
    }
  | {
      actionButtonLabel?: never;
      onActionButtonClick?: never;
      showActionButton?: false;
    };

type ReceivedStatisticsProps =
  | {
      onReceivedSubmit: (data: CreateQuestionEncounterData) => void;
      receivedCount: number;
      showReceivedStatistics: true;
    }
  | {
      onReceivedSubmit?: never;
      receivedCount?: never;
      showReceivedStatistics?: false;
    };

export type QuestionCardProps = ActionButtonProps &
  AnswerStatisticsProps &
  DeleteProps &
  ReceivedStatisticsProps &
  UpvoteProps & {
    company: string;
    content: string;
    location: string;
    questionId: string;
    role: string;
    showHover?: boolean;
    timestamp: string;
    truncateContent?: boolean;
    type: QuestionsQuestionType;
  };

export default function QuestionCard({
  questionId,
  company,
  answerCount,
  content,
  receivedCount,
  type,
  showVoteButtons,
  showAnswerStatistics,
  showReceivedStatistics,
  showActionButton,
  actionButtonLabel,
  onActionButtonClick,
  upvoteCount,
  timestamp,
  role,
  location,
  showHover,
  onReceivedSubmit,
  showDeleteButton,
  onDelete,
  truncateContent = true,
}: QuestionCardProps) {
  const [showReceivedForm, setShowReceivedForm] = useState(false);
  const { handleDownvote, handleUpvote, vote } = useQuestionVote(questionId);
  const hoverClass = showHover ? 'hover:bg-slate-50' : '';
  const cardContent = (
    <>
      {showVoteButtons && (
        <VotingButtons
          upvoteCount={upvoteCount}
          vote={vote}
          onDownvote={handleDownvote}
          onUpvote={handleUpvote}
        />
      )}
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2 text-slate-500">
            <Badge label={company} variant="primary" />
            <QuestionTypeBadge type={type} />
            <p className="text-xs">
              {timestamp} · {location} · {role}
            </p>
          </div>
          {showActionButton && (
            <Button
              label={actionButtonLabel}
              size="sm"
              variant="tertiary"
              onClick={onActionButtonClick}
            />
          )}
        </div>
        <p className={clsx(truncateContent && 'line-clamp-2 text-ellipsis')}>
          {content}
        </p>
        {!showReceivedForm && (showAnswerStatistics || showReceivedStatistics) && (
          <div className="flex gap-2">
            {showAnswerStatistics && (
              <Button
                addonPosition="start"
                icon={ChatBubbleBottomCenterTextIcon}
                label={`${answerCount} answers`}
                size="sm"
                variant="tertiary"
              />
            )}
            {showReceivedStatistics && (
              <>
                <Button
                  addonPosition="start"
                  icon={EyeIcon}
                  label={`${receivedCount} received this`}
                  size="sm"
                  variant="tertiary"
                />
                <Button
                  addonPosition="start"
                  icon={CheckIcon}
                  label="I received this too"
                  size="sm"
                  variant="tertiary"
                  onClick={(event) => {
                    event.preventDefault();
                    setShowReceivedForm(true);
                  }}
                />
              </>
            )}
          </div>
        )}
        {showReceivedForm && (
          <CreateQuestionEncounterForm
            onCancel={() => {
              setShowReceivedForm(false);
            }}
            onSubmit={(data) => {
              onReceivedSubmit?.(data);
              setShowReceivedForm(false);
            }}
          />
        )}
      </div>
    </>
  );

  return (
    <article
      className={`group flex gap-4 rounded-md border border-slate-300 bg-white p-4 ${hoverClass}`}>
      {cardContent}
      {showDeleteButton && (
        <div className="invisible self-center	fill-red-700 group-hover:visible">
          <Button
            icon={TrashIcon}
            isLabelHidden={true}
            label="Delete"
            size="md"
            variant="tertiary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>
      )}
    </article>
  );
}
