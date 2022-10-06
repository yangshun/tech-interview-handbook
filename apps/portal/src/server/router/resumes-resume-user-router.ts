import { z } from 'zod';

import { createProtectedRouter } from './context';

export const resumesResumeUserRouter = createProtectedRouter().mutation(
  'create',
  {
    // TODO: Use enums for experience, location, role
    input: z.object({
      additionalInfo: z.string().optional(),
      experience: z.string(),
      location: z.string(),
      role: z.string(),
      title: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user.id;

      // TODO: Store file in file storage and retrieve URL

      return await ctx.prisma.resumesResume.create({
        data: {
          ...input,
          url: '',
          userId,
        },
      });
    },
  },
);
