import { trpc } from '~/utils/trpc';

import type { BadgePayload } from './resumeBadgeConstants';
import { RESUME_USER_BADGES } from './resumeBadgeConstants';
import ResumeUserBadge from './ResumeUserBadge';

type Props = Readonly<{
  userId: string;
}>;

const STALE_TIME = 60;

export default function ResumeUserBadges({ userId }: Props) {
  const userReviewedResumeCountQuery = trpc.useQuery(
    ['resumes.resume.findUserReviewedResumeCount', { userId }],
    {
      retry: false,
      staleTime: STALE_TIME,
    },
  );
  const userMaxResumeUpvoteCountQuery = trpc.useQuery(
    ['resumes.resume.findUserMaxResumeUpvoteCount', { userId }],
    {
      retry: false,
      staleTime: STALE_TIME,
    },
  );
  const userTopUpvotedCommentCountQuery = trpc.useQuery(
    ['resumes.resume.findUserTopUpvotedCommentCount', { userId }],
    {
      retry: false,
      staleTime: STALE_TIME,
    },
  );

  const payload: BadgePayload = {
    maxResumeUpvoteCount: userMaxResumeUpvoteCountQuery.data ?? 0,
    reviewedResumesCount: userReviewedResumeCountQuery.data ?? 0,
    topUpvotedCommentCount: userTopUpvotedCommentCountQuery.data ?? 0,
  };

  const badges = RESUME_USER_BADGES.filter((badge) => badge.isValid(payload));

  if (badges.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-1">
      {badges.map((badge) => (
        <ResumeUserBadge
          key={badge.id}
          description={badge.description}
          icon={badge.icon}
          title={badge.title}
        />
      ))}
    </div>
  );
}
