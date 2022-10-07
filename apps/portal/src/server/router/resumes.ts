import { createRouter } from './context';

import type { Resume } from '~/types/resume';

export const resumesRouter = createRouter().query('list', {
  async resolve({ ctx }) {
    const resumesData = await ctx.prisma.resumesResume.findMany({
      include: {
        _count: {
          select: {
            comments: true,
            stars: true,
          },
        },
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
    return resumesData.map((r) => {
      const resume: Resume = {
        additionalInfo: r.additionalInfo,
        createdAt: r.createdAt,
        experience: r.experience,
        id: r.id,
        location: r.location,
        numComments: r._count.comments,
        numStars: r._count.stars,
        role: r.role,
        title: r.title,
        url: r.url,
        user: r.user.name!,
      };
      return resume;
    });
  },
});
