import { z } from 'zod';

import { createRouter } from '../context';

export const questionsQuestionTagRouter = createRouter().query('getTags', {
  input: z.object({}),
  async resolve({ ctx }) {
    return await ctx.prisma.questionsQuestionTag.findMany({});
  },
});
