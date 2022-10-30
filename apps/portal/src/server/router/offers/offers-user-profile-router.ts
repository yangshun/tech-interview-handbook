import { z } from 'zod';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';

import {
  addToProfileResponseMapper,
  getUserProfileResponseMapper,
} from '~/mappers/offers-mappers';

import { createProtectedRouter } from '../context';

export const offersUserProfileRouter = createProtectedRouter()
  .mutation('addToUserProfile', {
    input: z.object({
      profileId: z.string(),
      token: z.string(),
    }),
    async resolve({ ctx, input }) {
      const profile = await ctx.prisma.offersProfile.findFirst({
        where: {
          id: input.profileId,
        },
      });

      const profileEditToken = profile?.editToken;
      if (profileEditToken === input.token) {
        const userId = ctx.session.user.id;
        const updated = await ctx.prisma.offersProfile.update({
          data: {
            users: {
              connect: {
                id: userId,
              },
            },
          },
          where: {
            id: input.profileId,
          },
        });

        return addToProfileResponseMapper(updated);
      }

      throw new trpc.TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid token.',
      });
    },
  })
  .query('getUserProfiles', {
    async resolve({ ctx }) {
      const userId = ctx.session.user.id;
      const result = await ctx.prisma.user.findFirst({
        include: {
          OffersProfile: {
            include: {
              offers: {
                include: {
                  company: true,
                  location: {
                    include: {
                      state: {
                        include: {
                          country: true,
                        },
                      },
                    },
                  },
                  offersFullTime: {
                    include: {
                      totalCompensation: true,
                    },
                  },
                  offersIntern: {
                    include: {
                      monthlySalary: true,
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          id: userId,
        },
      });

      return getUserProfileResponseMapper(result);
    },
  })
  .mutation('removeFromUserProfile', {
    input: z.object({
      profileId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;

      const profiles = await ctx.prisma.user.findFirst({
        include: {
          OffersProfile: true,
        },
        where: {
          id: userId,
        },
      });

      // Validation
      let doesProfileExist = false;

      if (profiles?.OffersProfile) {
        for (let i = 0; i < profiles.OffersProfile.length; i++) {
          if (profiles.OffersProfile[i].id === input.profileId) {
            doesProfileExist = true;
          }
        }
      }

      if (!doesProfileExist) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No such profile id saved.',
        });
      }

      await ctx.prisma.user.update({
        data: {
          OffersProfile: {
            disconnect: [
              {
                id: input.profileId,
              },
            ],
          },
        },
        where: {
          id: userId,
        },
      });
    },
  });