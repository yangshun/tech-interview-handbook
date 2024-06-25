import clsx from 'clsx';
import { useMemo, useState } from 'react';
import {
  BuildingOfficeIcon,
  CalendarIcon,
  MapPinIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';
import {
  ChatBubbleBottomCenterTextIcon,
  CheckIcon,
  EyeIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import type { QuestionsQuestionType } from '@prisma/client';
import { Button } from '~/ui';

import { useProtectedCallback } from '~/utils/questions/useProtectedCallback';
import { useQuestionVote } from '~/utils/questions/vote/useQuestionVote';

import AddToListDropdown from '../../AddToListDropdown';
import type { CreateQuestionEncounterData } from '../../forms/CreateQuestionEncounterForm';
import CreateQuestionEncounterForm from '../../forms/CreateQuestionEncounterForm';
import QuestionAggregateBadge from '../../QuestionAggregateBadge';
import QuestionTypeBadge from '../../QuestionTypeBadge';
import VotingButtons from '../../VotingButtons';

import type { CountryInfo } from '~/types/questions';

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

type AggregateStatisticsProps =
  | {
      companies: Record<string, number>;
      countries: Record<string, CountryInfo>;
      roles: Record<string, number>;
      showAggregateStatistics: true;
    }
  | {
      companies?: never;
      countries?: never;
      roles?: never;
      showAggregateStatistics?: false;
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
      receivedCount: number;
      showReceivedStatistics: true;
    }
  | {
      receivedCount?: never;
      showReceivedStatistics?: false;
    };

type CreateEncounterProps =
  | {
      createEncounterButtonText: string;
      onReceivedSubmit: (data: CreateQuestionEncounterData) => Promise<void>;
      showCreateEncounterButton: true;
    }
  | {
      createEncounterButtonText?: never;
      onReceivedSubmit?: never;
      showCreateEncounterButton?: false;
    };

type AddToListProps =
  | {
      showAddToList: true;
    }
  | {
      showAddToList?: false;
    };

export type BaseQuestionCardProps = ActionButtonProps &
  AddToListProps &
  AggregateStatisticsProps &
  AnswerStatisticsProps &
  CreateEncounterProps &
  DeleteProps &
  ReceivedStatisticsProps &
  UpvoteProps & {
    content: string;
    hideCard?: boolean;
    questionId: string;
    showHover?: boolean;
    timestamp: Date | null;
    truncateContent?: boolean;
    type: QuestionsQuestionType;
  };

export default function BaseQuestionCard({
  questionId,
  companies,
  answerCount,
  content,
  receivedCount,
  type,
  showVoteButtons,
  showAggregateStatistics,
  showAnswerStatistics,
  showReceivedStatistics,
  showCreateEncounterButton,
  createEncounterButtonText,
  showActionButton,
  actionButtonLabel,
  onActionButtonClick,
  upvoteCount,
  hideCard,
  timestamp,
  roles,
  countries,
  showHover,
  onReceivedSubmit,
  showDeleteButton,
  showAddToList,
  onDelete,
  truncateContent = true,
}: BaseQuestionCardProps) {
  const [showReceivedForm, setShowReceivedForm] = useState(false);
  const { handleDownvote, handleUpvote, vote } = useQuestionVote(questionId);

  const locations = useMemo(() => {
    if (countries === undefined) {
      return undefined;
    }

    const countryCount: Record<string, number> = {};
    // Decompose countries
    for (const country of Object.keys(countries)) {
      const { total } = countries[country];
      countryCount[country] = total;
    }

    return countryCount;
  }, [countries]);

  const handleCreateEncounterClick = useProtectedCallback(() => {
    setShowReceivedForm(true);
  });

  const cardContent = (
    <>
      {showVoteButtons && (
        <>
          <div className="md:hidden">
            <VotingButtons
              size="sm"
              upvoteCount={upvoteCount}
              vote={vote}
              onDownvote={handleDownvote}
              onUpvote={handleUpvote}
            />
          </div>
          <div className="hidden md:block">
            <VotingButtons
              size="md"
              upvoteCount={upvoteCount}
              vote={vote}
              onDownvote={handleDownvote}
              onUpvote={handleUpvote}
            />
          </div>
        </>
      )}
      <div className="flex flex-1 flex-col items-start gap-4">
        <div className="flex items-center justify-between self-stretch">
          <div className="flex flex-wrap items-center gap-3 text-slate-500">
            {showAggregateStatistics && (
              <>
                <QuestionTypeBadge type={type} />
                <QuestionAggregateBadge
                  icon={BuildingOfficeIcon}
                  statistics={companies}
                />
                <QuestionAggregateBadge
                  icon={MapPinIcon}
                  statistics={locations!}
                />
                <QuestionAggregateBadge
                  icon={UserCircleIcon}
                  statistics={roles}
                />
              </>
            )}
            {timestamp !== null && (
              <div className="flex items-center text-slate-500">
                <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400" />
                <p className="text-xs font-medium">
                  {timestamp.toLocaleDateString(undefined, {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            )}
            {showAddToList && (
              <div className="pl-4">
                <AddToListDropdown questionId={questionId} />
              </div>
            )}
          </div>
          {showActionButton && (
            <Button
              label={actionButtonLabel}
              size="sm"
              variant="secondary"
              onClick={onActionButtonClick}
            />
          )}
        </div>
        <p
          className={clsx(
            'md:text-md whitespace-pre-line text-base font-medium leading-6 text-slate-900',
            truncateContent && 'line-clamp-2 text-ellipsis',
          )}>
          {content}
        </p>

        {!showReceivedForm &&
          (showAnswerStatistics ||
            showReceivedStatistics ||
            showCreateEncounterButton) && (
            <div className="flex w-full gap-4">
              {showAnswerStatistics && (
                <div>
                  <button
                    className="-my-1 flex items-center rounded-md px-2
                  py-1 text-xs font-medium
                  text-slate-500 hover:bg-slate-100 hover:text-slate-600"
                    type="button">
                    <ChatBubbleBottomCenterTextIcon
                      aria-hidden={true}
                      className="mr-2 h-5 w-5"
                    />
                    {answerCount} {answerCount === 1 ? 'answer' : 'answers'}
                  </button>
                </div>
              )}
              {showReceivedStatistics && (
                <div>
                  <button
                    className="-my-1 flex items-center rounded-md px-2
                  py-1 text-xs font-medium
                  text-slate-500 hover:bg-slate-100 hover:text-slate-600"
                    type="button">
                    <EyeIcon aria-hidden={true} className="mr-2 h-5 w-5" />
                    {receivedCount} received this
                  </button>
                </div>
              )}
              {showCreateEncounterButton && (
                <Button
                  addonPosition="start"
                  icon={CheckIcon}
                  label={createEncounterButtonText}
                  size="sm"
                  variant="tertiary"
                  onClick={handleCreateEncounterClick}
                />
              )}
            </div>
          )}
        {showReceivedForm && (
          <CreateQuestionEncounterForm
            onCancel={() => {
              setShowReceivedForm(false);
            }}
            onSubmit={async (data) => {
              await onReceivedSubmit?.(data);
            }}
          />
        )}
      </div>
    </>
  );

  return (
    <article
      className={clsx(
        'group flex gap-4 border-slate-200',
        showHover && 'hover:border-primary-500 transition',
        !hideCard && 'rounded-md border bg-white px-2 py-4 sm:rounded-lg',
      )}>
      {cardContent}
      {showDeleteButton && (
        <div className="fill-danger-700 invisible	self-center group-hover:visible">
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
