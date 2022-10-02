import { z } from 'zod';
import { TodoStatus } from '@prisma/client';

import { createProtectedRouter } from './context';

// Example Todos router that can only be hit if the user requesting is signed in.
export const todosUserRouter = createProtectedRouter()
  .mutation('create', {
    // Validate that the creation payload is of this shape using Zod: https://zod.dev.
    // This adds typesafety to the useMutation payloads on the client.
    input: z.object({
      text: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;
      return await ctx.prisma.todo.create({
        data: {
          text: input.text,
          userId,
        },
      });
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.string(),
      status: z.nativeEnum(TodoStatus).optional(),
      text: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      // TODO: Check if session user owns this Todo.
      return await ctx.prisma.todo.update({
        data: {
          status: input.status,
          text: input.text,
        },
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      // TODO: Check if session user owns this Todo.
      return await ctx.prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
