import { z } from 'zod';

import { createRouter } from '../context';

import type { AggregatedQuestionEncounter } from '~/types/questions';

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

      const companyCounts: Record<string, number> = {};
      const locationCounts: Record<string, number> = {};
      const roleCounts: Record<string, number> = {};

      let latestSeenAt = questionEncountersData[0].seenAt;

      for (let i = 0; i < questionEncountersData.length; i++) {
        const encounter = questionEncountersData[i];

        latestSeenAt =
          latestSeenAt < encounter.seenAt ? encounter.seenAt : latestSeenAt;

        if (!(encounter.company!.name in companyCounts)) {
          companyCounts[encounter.company!.name] = 1;
        }
        companyCounts[encounter.company!.name] += 1;

        if (!(encounter.location in locationCounts)) {
          locationCounts[encounter.location] = 1;
        }
        locationCounts[encounter.location] += 1;

        if (!(encounter.role in roleCounts)) {
          roleCounts[encounter.role] = 1;
        }
        roleCounts[encounter.role] += 1;
      }

      const questionEncounter: AggregatedQuestionEncounter = {
        companyCounts,
        latestSeenAt,
        locationCounts,
        roleCounts,
      };
      return questionEncounter;
    },
  },
);
