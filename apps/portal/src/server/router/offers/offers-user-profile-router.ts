import { z } from 'zod';
import * as trpc from '@trpc/server';

import {
  addToProfileResponseMapper, getUserProfileResponeMapper,
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

                const userId = ctx.session.user.id
                const updated = await ctx.prisma.offersProfile.update({
                data: {
                    user: {
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
    .mutation('getUserProfiles', {
        async resolve({ ctx }) {
            const userId = ctx.session.user.id
            const result = await ctx.prisma.user.findFirst({
                include: {
                    OffersProfile: {
                        include: {
                            offers: {
                                include: {
                                    company: true,
                                    offersFullTime: {
                                        include: {
                                            totalCompensation: true
                                        }
                                    },
                                    offersIntern: {
                                        include: {
                                            monthlySalary: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                where: {
                    id: userId
                }
            })

            return getUserProfileResponeMapper(result)
        }
    });