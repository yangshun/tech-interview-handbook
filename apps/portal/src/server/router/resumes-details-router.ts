import { z } from 'zod';

import { createRouter } from './context';

export const resumesDetailsRouter = createRouter().query('find', {
  input: z.object({
    resumeId: z.string(),
  }),
  async resolve({ ctx, input }) {
    const { resumeId } = input;

    // Use the resumeId to query all related information of a single resume
    // from Resumesresume:
    return await ctx.prisma.resumesResume.findUnique({
      include: {
        _count: {
          select: {
            stars: true,
          },
        },
        resumesProfile: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        id: resumeId,
      },
    });
  },
});
