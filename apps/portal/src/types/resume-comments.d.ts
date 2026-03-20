import type { ResumesCommentVote, ResumesSection } from '@prisma/client';

/**
 * Returned by `resumeCommentsRouter` (query for 'resumes.comments.list') and received as prop by `Comment` in `CommentsList`
 * frontend-friendly representation of the query
 */
export type ResumeComment = Readonly<{
  children: Array<ResumeComment>;
  createdAt: Date;
  description: string;
  id: string;
  parentId?: string | null;
  resumeId: string;
  section: ResumesSection;
  updatedAt: Date;
  user: {
    image?: string | null;
    name?: string | null;
    userId: string;
  };
}>;

export type ResumeCommentVote = Readonly<{
  numVotes: number;
  userVote?: ResumesCommentVote | null;
}>;
