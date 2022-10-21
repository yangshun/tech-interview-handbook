import { z } from 'zod';

import { createRouter } from '../context';

import type { ResumeComment } from '~/types/resume-comments';

export const resumeCommentsRouter = createRouter().query('list', {
  input: z.object({
    resumeId: z.string(),
  }),
  async resolve({ ctx, input }) {
    const { resumeId } = input;

    // For this resume, we retrieve every comment's information, along with:
    // The user's name and image to render
    const comments = await ctx.prisma.resumesComment.findMany({
      include: {
        children: {
          include: {
            user: {
              select: {
                image: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        user: {
          select: {
            image: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        AND: [{ resumeId }, { parentId: null }],
      },
    });

    return comments.map((data) => {
      const children: Array<ResumeComment> = data.children.map((child) => {
        return {
          children: [],
          createdAt: child.createdAt,
          description: child.description,
          id: child.id,
          parentId: data.id,
          resumeId: child.resumeId,
          section: child.section,
          updatedAt: child.updatedAt,
          user: {
            image: child.user.image,
            name: child.user.name,
            userId: child.userId,
          },
        };
      });

      const comment: ResumeComment = {
        children,
        createdAt: data.createdAt,
        description: data.description,
        id: data.id,
        parentId: data.parentId,
        resumeId: data.resumeId,
        section: data.section,
        updatedAt: data.updatedAt,
        user: {
          image: data.user.image,
          name: data.user.name,
          userId: data.userId,
        },
      };

      return comment;
    });
  },
});
