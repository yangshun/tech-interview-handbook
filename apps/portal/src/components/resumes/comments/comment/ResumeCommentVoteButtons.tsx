import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/20/solid';
import { Vote } from '@prisma/client';

import { useGoogleAnalytics } from '~/components/global/GoogleAnalytics';
import loginPageHref from '~/components/shared/loginPageHref';

import { trpc } from '~/utils/trpc';

type ResumeCommentVoteButtonsProps = {
  commentId: string;
  userId: string | undefined;
};

export default function ResumeCommentVoteButtons({
  commentId,
  userId,
}: ResumeCommentVoteButtonsProps) {
  const [upvoteAnimation, setUpvoteAnimation] = useState(false);
  const [downvoteAnimation, setDownvoteAnimation] = useState(false);
  const { event: gaEvent } = useGoogleAnalytics();

  const trpcContext = trpc.useContext();
  const router = useRouter();

  // COMMENT VOTES
  const commentVotesQuery = trpc.useQuery([
    'resumes.comments.votes.list',
    { commentId },
  ]);
  const commentVotesUpsertMutation = trpc.useMutation(
    'resumes.comments.votes.user.upsert',
    {
      onSuccess: () => {
        // Comment updated, invalidate query to trigger refetch
        trpcContext.invalidateQueries(['resumes.comments.votes.list']);
        gaEvent({
          action: 'resumes.comment_vote',
          category: 'engagement',
          label: 'Upvote/Downvote comment',
        });
      },
    },
  );
  const commentVotesDeleteMutation = trpc.useMutation(
    'resumes.comments.votes.user.delete',
    {
      onSuccess: () => {
        // Comment updated, invalidate query to trigger refetch
        trpcContext.invalidateQueries(['resumes.comments.votes.list']);
        gaEvent({
          action: 'resumes.comment_unvote',
          category: 'engagement',
          label: 'Unvote comment',
        });
      },
    },
  );

  const onVote = async (value: Vote, setAnimation: (_: boolean) => void) => {
    if (!userId) {
      router.push(loginPageHref());
      return;
    }

    setAnimation(true);

    if (commentVotesQuery.data?.userVote?.value === value) {
      return commentVotesDeleteMutation.mutate(
        {
          commentId,
        },
        {
          onSettled: async () => setAnimation(false),
        },
      );
    }
    return commentVotesUpsertMutation.mutate(
      {
        commentId,
        value,
      },
      {
        onSettled: async () => setAnimation(false),
      },
    );
  };

  return (
    <>
      <button
        disabled={
          commentVotesQuery.isLoading ||
          commentVotesUpsertMutation.isLoading ||
          commentVotesDeleteMutation.isLoading
        }
        type="button"
        onClick={() => onVote(Vote.UPVOTE, setUpvoteAnimation)}>
        <ArrowUpCircleIcon
          className={clsx(
            'h-4 w-4',
            commentVotesQuery.data?.userVote?.value === Vote.UPVOTE ||
              upvoteAnimation
              ? 'fill-primary-500'
              : 'fill-slate-400',
            userId &&
              !downvoteAnimation &&
              !upvoteAnimation &&
              'hover:fill-primary-500',
            upvoteAnimation && 'animate-[bounce_0.5s_infinite] cursor-default',
          )}
        />
      </button>

      <div className="flex min-w-[1rem] justify-center text-xs font-semibold text-gray-700">
        {commentVotesQuery.data?.numVotes ?? 0}
      </div>

      <button
        disabled={
          commentVotesQuery.isLoading ||
          commentVotesUpsertMutation.isLoading ||
          commentVotesDeleteMutation.isLoading
        }
        type="button"
        onClick={() => onVote(Vote.DOWNVOTE, setDownvoteAnimation)}>
        <ArrowDownCircleIcon
          className={clsx(
            'h-4 w-4',
            commentVotesQuery.data?.userVote?.value === Vote.DOWNVOTE ||
              downvoteAnimation
              ? 'fill-danger-500'
              : 'fill-slate-400',
            userId &&
              !downvoteAnimation &&
              !upvoteAnimation &&
              'hover:fill-danger-500',
            downvoteAnimation &&
              'animate-[bounce_0.5s_infinite] cursor-default',
          )}
        />
      </button>
    </>
  );
}
