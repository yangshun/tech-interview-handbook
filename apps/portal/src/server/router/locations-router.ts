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
          name: 'asc',
        },
        select: {
          id: true,
          name: true,
          state: {
            select: {
              country: {
                select: {
                  name: true,
                },
              },
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
          name: 'asc',
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
  });
