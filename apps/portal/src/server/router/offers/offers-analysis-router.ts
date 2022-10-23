import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { profileAnalysisDtoMapper } from '~/mappers/offers-mappers';
import { analysisInclusion } from '~/utils/offers/analysis/analysisInclusion';

import { createRouter } from '../context';
import { generateAnalysis } from '../../../utils/offers/analysis/analysisGeneration';

export const offersAnalysisRouter = createRouter()
  .query('get', {
    input: z.object({
      profileId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const analysis = await ctx.prisma.offersAnalysis.findFirst({
        include: analysisInclusion,
        where: {
          profileId: input.profileId,
        },
      });

      if (!analysis) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No analysis found on this profile',
        });
      }

      return profileAnalysisDtoMapper(analysis);
    },
  })
  .mutation('generate', {
    input: z.object({
      profileId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return generateAnalysis({ ctx, input });
    },
  });