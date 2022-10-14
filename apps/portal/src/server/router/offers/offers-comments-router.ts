import { z } from 'zod';
import * as trpc from '@trpc/server';

import { createProtectedRouter } from '../context';

import type { Reply } from '~/types/offers-profile';


export const offersCommentsRouter = createProtectedRouter()
    .query('getComments', {
        input: z.object({
            profileId: z.string()
        }),
        async resolve({ ctx, input }) {

            const profile = await ctx.prisma.offersProfile.findFirst({
                where: {
                    id: input.profileId
                }
            })

            const result = await ctx.prisma.offersProfile.findFirst({
                include: {
                    discussion: {
                        include: {
                            replies: {
                                include: {
                                    user: true
                                }
                            },
                            replyingTo: true,
                            user: true
                        }
                    }
                },
                where: {
                    id: input.profileId
                }
            })

            if (result) {
                return result.discussion
                    .filter((x: Reply) => x.replyingToId === null)
                    .map((x: Reply) => {
                        if (x.user == null) {
                            x.user = {
                                email: "",
                                emailVerified: null,
                                id: "",
                                image: "",
                                name: profile?.profileName ?? "<missing name>"
                            }
                        }

                        x.replies?.map((y) => {
                            if (y.user == null) {
                                y.user = {
                                    email: "",
                                    emailVerified: null,
                                    id: "",
                                    image: "",
                                    name: profile?.profileName ?? "<missing name>"
                                }
                            }
                        })
                        return x;
                    })
            }

            return result
        }
    })
    .mutation("create", {
        input: z.object({
            message: z.string(),
            profileId: z.string(),
            replyingToId: z.string().optional(),
            userId: z.string().optional()
        }),
        async resolve({ ctx, input }) {
            const createdReply = await ctx.prisma.offersReply.create({
                data: {
                    message: input.message,
                    profile: {
                        connect: {
                            id: input.profileId
                        }
                    }
                }
            })

            if (input.replyingToId) {
                await ctx.prisma.offersReply.update({
                    data: {
                        replyingTo: {
                            connect: {
                                id: input.replyingToId
                            }
                        }
                    },
                    where: {
                        id: createdReply.id
                    }
                })
            }

            if (input.userId) {
                await ctx.prisma.offersReply.update({
                    data: {
                        user: {
                            connect: {
                                id: input.userId
                            }
                        }
                    },
                    where: {
                        id: createdReply.id
                    }
                })
            }
            // Get replies
            const result = await ctx.prisma.offersProfile.findFirst({
                include: {
                    discussion: {
                        include: {
                            replies: true,
                            replyingTo: true,
                            user: true
                        }
                    }
                },
                where: {
                    id: input.profileId
                }
            })

            if (result) {
                return result.discussion.filter((x) => x.replyingToId === null)
            }

            return result
        }
    })
    .mutation("update", {
        input: z.object({
            id: z.string(),
            message: z.string(),
            profileId: z.string(),
            // Have to pass in either userID or token for validation
            token: z.string().optional(),
            userId: z.string().optional(),
        }),
        async resolve({ ctx, input }) {
            const messageToUpdate = await ctx.prisma.offersReply.findFirst({
                where: {
                    id: input.id
                }
            })
            const profile = await ctx.prisma.offersProfile.findFirst({
                where: {
                id: input.profileId,
                },
            });

            const profileEditToken = profile?.editToken;

            // To validate user editing, OP or correct user
            // TODO: improve validation process
            if (profileEditToken === input.token || messageToUpdate?.userId === input.userId) {
                await ctx.prisma.offersReply.update({
                    data: {
                        message: input.message
                    },
                    where: {
                        id: input.id
                    }
                })

                const result = await ctx.prisma.offersProfile.findFirst({
                    include: {
                        discussion: {
                            include: {
                                replies: true,
                                replyingTo: true,
                                user: true
                            }
                        }
                    },
                    where: {
                        id: input.profileId
                    }
                })

                if (result) {
                    return result.discussion.filter((x) => x.replyingToId === null)
                }

                return result
            }

            throw new trpc.TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Wrong userId or token.'
            })
        }
    })
    .mutation("delete", {
        input: z.object({
            id: z.string(),
            profileId: z.string(),
            // Have to pass in either userID or token for validation
            token: z.string().optional(),
            userId: z.string().optional(),
        }),
        async resolve({ ctx, input }) {
            const messageToDelete = await ctx.prisma.offersReply.findFirst({
                where: {
                    id: input.id
                }
            })
            const profile = await ctx.prisma.offersProfile.findFirst({
                where: {
                    id: input.profileId,
                },
            });

            const profileEditToken = profile?.editToken;

            // To validate user editing, OP or correct user
            // TODO: improve validation process
            if (profileEditToken === input.token || messageToDelete?.userId === input.userId) {
                await ctx.prisma.offersReply.delete({
                    where: {
                        id: input.id
                    }
                })
                const result = await ctx.prisma.offersProfile.findFirst({
                    include: {
                        discussion: {
                            include: {
                                replies: true,
                                replyingTo: true,
                                user: true
                            }
                        }
                    },
                    where: {
                        id: input.profileId
                    }
                })

                if (result) {
                    return result.discussion.filter((x) => x.replyingToId === null)
                }

                return result
            }

            throw new trpc.TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Wrong userId or token.'
            })
        }
    })