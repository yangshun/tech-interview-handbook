import { z } from 'zod';

import { createRouter } from './context';

export const locationsRouter = createRouter()
  .query('cities.list', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.city.findMany({
        orderBy: {
          ranking: 'desc',
        },
        select: {
          id: true,
          name: true,
          state: {
            select: {
              country: {
                select: {
                  id: true,
                  name: true,
                },
              },
              id: true,
              name: true,
            },
          },
        },
        take: 10,
        where: {
          name: {
            contains: input.name,
            mode: 'insensitive',
          },
        },
      });
    },
  })
  .query('countries.list', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.country.findMany({
        orderBy: {
          ranking: 'desc',
        },
        take: 10,
        where: {
          OR: [
            {
              name: {
                contains: input.name,
                mode: 'insensitive',
              },
            },
            {
              code: {
                contains: input.name,
                mode: 'insensitive',
              },
            },
          ],
        },
      });
    },
  });
