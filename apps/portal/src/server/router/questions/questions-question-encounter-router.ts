import { z } from 'zod';

import { createAggregatedQuestionEncounter } from '~/utils/questions/server/aggregate-encounters';

import { createRouter } from '../context';

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
            city: true,
            company: true,
            country: true,
            state: true,
          },
          where: {
            ...input,
          },
        });

      return createAggregatedQuestionEncounter(questionEncountersData);
    },
  },
);
