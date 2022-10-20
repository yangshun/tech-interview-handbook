import { Badge } from '@tih/ui';

import { trpc } from '~/utils/trpc';

type Props = {
  userId: string;
};

type BadgeInfo = {
  description: string;
  id: string;
  isValid: (userId: string) => boolean;
  label: string;
};

const badges: Array<BadgeInfo> = [
  {
    description: 'User has reviewed over 50 resumes',
    id: 'VeteranReviewer',
    isValid: (userId: string) => {
      const userReviewedResumesCountQuery = trpc.useQuery([
        'resumes.resume.findUserReviewedResumeCount',
        { userId },
      ]);

      return (
        userReviewedResumesCountQuery.data != null &&
        userReviewedResumesCountQuery.data >= 5
      );
    },
    label: 'Veteran',
  },
  {
    description: 'User has reviewed over 50 resumes',
    id: 'NoviceReviewer',
    isValid: (userId: string) => {
      const userReviewedResumesCountQuery = trpc.useQuery([
        'resumes.resume.findUserReviewedResumeCount',
        { userId },
      ]);

      return (
        userReviewedResumesCountQuery.data != null &&
        userReviewedResumesCountQuery.data >= 2
      );
    },
    label: 'Veteran',
  },
];

export default function ResumeUserBadges({ userId }: Props) {
  return (
    <>
      {badges
        .filter((badge) => badge.isValid(userId))
        .map((badge) => (
          <Badge key={badge.id} label={badge.label} variant="primary" />
        ))}
    </>
  );
}
