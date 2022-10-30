import { z } from 'zod';

import { createRouter } from '../context';

import { createAggregatedQuestionEncounter } from '~/utils/questions/server/aggregate-encounters';

export const questionsQuestionEncounterRouter = createRouter().query(
  'getAggregatedEncounters',
  {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const questionEncountersData =
        await ctx.prisma.questionsQuestionEncounter.findMany({
          include: {
            company: true,
          },
          where: {
            ...input,
          },
        });

      return createAggregatedQuestionEncounter(questionEncountersData);
    },
  },
);
