import { z } from 'zod';
import { ResumesSection } from '@prisma/client';

import { createProtectedRouter } from '../context';

type ResumeCommentInput = Readonly<{
  description: string;
  resumeId: string;
  section: ResumesSection;
  userId: string;
}>;

export const resumesCommentsUserRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      education: z.string(),
      experience: z.string(),
      general: z.string(),
      projects: z.string(),
      resumeId: z.string(),
      skills: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;
      const { resumeId, education, experience, general, projects, skills } =
        input;

      // For each section, convert them into ResumesComment model if provided
      const comments: Array<ResumeCommentInput> = [
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
            section,
            userId,
          };
        });

      const prevCommentCount = await ctx.prisma.resumesComment.count({
        where: {
          resumeId,
        },
      });
      const result = await ctx.prisma.resumesComment.createMany({
        data: comments,
      });

      return {
        newCount: Number(prevCommentCount) + result.count,
        prevCount: prevCommentCount,
      };
    },
  })
  .mutation('update', {
    input: z.object({
      description: z.string(),
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id, description } = input;

      return await ctx.prisma.resumesComment.update({
        data: {
          description,
        },
        where: {
          id,
        },
      });
    },
  })
  .mutation('reply', {
    input: z.object({
      description: z.string(),
      parentId: z.string(),
      resumeId: z.string(),
      section: z.nativeEnum(ResumesSection),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;
      const { description, parentId, resumeId, section } = input;

      return await ctx.prisma.resumesComment.create({
        data: {
          description,
          parentId,
          resumeId,
          section,
          userId,
        },
      });
    },
  })
  .mutation('delete', {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      const { id } = input;

      return await ctx.prisma.resumesComment.delete({
        where: {
          id,
        },
      });
    },
  });
