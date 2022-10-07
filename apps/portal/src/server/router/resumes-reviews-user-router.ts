import { z } from 'zod';
import { ResumesSection } from '@prisma/client';

import { createProtectedRouter } from './context';

type IResumeCommentInput = Readonly<{
  description: string;
  resumeId: string;
  resumesProfileId: string;
  section: ResumesSection;
}>;

export const resumesReviewsUserRouter = createProtectedRouter().mutation(
  'create',
  {
    input: z.object({
      education: z.string(),
      experience: z.string(),
      general: z.string(),
      projects: z.string(),
      resumeId: z.string(),
      skills: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { resumeId, education, experience, general, projects, skills } =
        input;

      const { resumesProfileId } =
        await ctx.prisma.resumesResume.findUniqueOrThrow({
          select: {
            resumesProfileId: true,
          },
          where: {
            id: resumeId,
          },
        });

      // For each section, convert them into ResumesComment model if provided
      const comments: Array<IResumeCommentInput> = [
        { description: education, section: ResumesSection.EDUCATION },
        { description: experience, section: ResumesSection.EXPERIENCE },
        { description: general, section: ResumesSection.GENERAL },
        { description: projects, section: ResumesSection.PROJECTS },
        { description: skills, section: ResumesSection.SKILLS },
      ]
        .filter(({ description }) => {
          return description.trim().length > 0;
        })
        .map(({ description, section }) => {
          return {
            description,
            resumeId,
            resumesProfileId,
            section,
          };
        });

      return await ctx.prisma.resumesComment.createMany({
        data: comments,
      });
    },
  },
);
