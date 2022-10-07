import type { ResumesSection } from '@prisma/client';

declare module 'resume-comments' {
  /**
   * Returned by `resumeReviewsRouter` (query for 'resumes.reviews.list') and received as prop by `Comment` in `CommentsList`
   * frontend-friendly representation of the query
   */
  type ResumeComment = {
    createdAt: Date;
    description: string;
    hasVoted: boolean;
    id: string;
    numVotes: number;
    resumeId: string;
    resumesProfileId: string;
    section: ResumesSection;
    updatedAt: Date;
    user: {
      image: string;
      name: string;
      userId: string;
    };
  };
}
