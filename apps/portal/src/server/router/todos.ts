import { createRouter } from './context';

export const todosRouter = createRouter().query('list', {
  async resolve({ ctx }) {
    return await ctx.prisma.todo.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
});
