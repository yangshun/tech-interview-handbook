import { z } from 'zod';
import * as trpc from '@trpc/server';

import { createRouter } from '../context';

import type { OffersDiscussion, Reply } from '~/types/offers';

export const offersCommentsRouter = createRouter()
  .query('getComments', {
    input: z.object({
      profileId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const profile = await ctx.prisma.offersProfile.findFirst({
        where: {
          id: input.profileId,
        },
      });

      const result = await ctx.prisma.offersProfile.findFirst({
        include: {
          discussion: {
            include: {
              replies: {
                include: {
                  user: true,
                },
                orderBy: {
                  createdAt: 'desc',
                },
              },
              replyingTo: true,
              user: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
        where: {
          id: input.profileId,
        },
      });

      const discussions: OffersDiscussion = {
        data:
          result?.discussion
            .filter((x) => {
              return x.replyingToId === null;
            })
            .map((x) => {
              if (x.user == null) {
                x.user = {
                  email: '',
                  emailVerified: null,
                  id: '',
                  image: '',
                  name: profile?.profileName ?? '<missing name>',
                };
              }

              x.replies?.map((y) => {
                if (y.user == null) {
                  y.user = {
                    email: '',
                    emailVerified: null,
                    id: '',
                    image: '',
                    name: profile?.profileName ?? '<missing name>',
                  };
                }
              });

              const replyType: Reply = {
                createdAt: x.createdAt,
                id: x.id,
                message: x.message,
                replies: x.replies.map((reply) => {
                  return {
                    createdAt: reply.createdAt,
                    id: reply.id,
                    message: reply.message,
                    replies: [],
                    replyingToId: reply.replyingToId,
                    user: reply.user,
                  };
                }),
                replyingToId: x.replyingToId,
                user: x.user,
              };

              return replyType;
            }) ?? [],
      };

      return discussions;
    },
  })
  .mutation('create', {
    input: z.object({
      message: z.string(),
      profileId: z.string(),
      replyingToId: z.string().optional(),
      token: z.string().optional(),
      userId: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const profile = await ctx.prisma.offersProfile.findFirst({
        where: {
          id: input.profileId,
        },
      });

      const profileEditToken = profile?.editToken;

      if (input.token === profileEditToken || input.userId) {
        const createdReply = await ctx.prisma.offersReply.create({
          data: {
            message: input.message,
            profile: {
              connect: {
                id: input.profileId,
              },
            },
          },
        });

        if (input.replyingToId) {
          await ctx.prisma.offersReply.update({
            data: {
              replyingTo: {
                connect: {
                  id: input.replyingToId,
                },
              },
            },
            where: {
              id: createdReply.id,
            },
          });
        }

        if (input.userId) {
          await ctx.prisma.offersReply.update({
            data: {
              user: {
                connect: {
                  id: input.userId,
                },
              },
            },
            where: {
              id: createdReply.id,
            },
          });
        }

        const created = await ctx.prisma.offersReply.findFirst({
          include: {
            user: true,
          },
          where: {
            id: createdReply.id,
          },
        });

        const result: Reply = {
          createdAt: created!.createdAt,
          id: created!.id,
          message: created!.message,
          replies: [], // New message should have no replies
          replyingToId: created!.replyingToId,
          user: created!.user ?? {
            email: '',
            emailVerified: null,
            id: '',
            image: '',
            name: profile?.profileName ?? '<missing name>',
          },
        };

        return result;
      }

      throw new trpc.TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Missing userId or wrong token.',
      });
    },
  })
  .mutation('update', {
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
          id: input.id,
        },
      });
      const profile = await ctx.prisma.offersProfile.findFirst({
        where: {
          id: input.profileId,
        },
      });

      const profileEditToken = profile?.editToken;

      // To validate user editing, OP or correct user
      // TODO: improve validation process
      if (
        profileEditToken === input.token ||
        messageToUpdate?.userId === input.userId
      ) {
        const updated = await ctx.prisma.offersReply.update({
          data: {
            message: input.message,
          },
          include: {
            replies: {
              include: {
                user: true,
              },
            },
            user: true,
          },
          where: {
            id: input.id,
          },
        });

        const result: Reply = {
          createdAt: updated!.createdAt,
          id: updated!.id,
          message: updated!.message,
          replies: updated!.replies.map((x) => {
            return {
              createdAt: x.createdAt,
              id: x.id,
              message: x.message,
              replies: [],
              replyingToId: x.replyingToId,
              user: x.user ?? {
                email: '',
                emailVerified: null,
                id: '',
                image: '',
                name: profile?.profileName ?? '<missing name>',
              },
            };
          }),
          replyingToId: updated!.replyingToId,
          user: updated!.user ?? {
            email: '',
            emailVerified: null,
            id: '',
            image: '',
            name: profile?.profileName ?? '<missing name>',
          },
        };

        return result;
      }

      throw new trpc.TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Wrong userId or token.',
      });
    },
  })
  .mutation('delete', {
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
          id: input.id,
        },
      });
      const profile = await ctx.prisma.offersProfile.findFirst({
        where: {
          id: input.profileId,
        },
      });

      const profileEditToken = profile?.editToken;

      // To validate user editing, OP or correct user
      // TODO: improve validation process
      if (
        profileEditToken === input.token ||
        messageToDelete?.userId === input.userId
      ) {
        await ctx.prisma.offersReply.delete({
          where: {
            id: input.id,
          },
        });
        await ctx.prisma.offersProfile.findFirst({
          include: {
            discussion: {
              include: {
                replies: true,
                replyingTo: true,
                user: true,
              },
            },
          },
          where: {
            id: input.profileId,
          },
        });

      } else {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Wrong userId or token.',
        });
      }
    },
  });
