import { createProtectedRouter } from './context';

import type { Resume } from '~/types/resume';

export const resumesResumeProtectedTabsRouter = createProtectedRouter()
  .query('stars', {
    async resolve({ ctx }) {
      const userId = ctx.session?.user?.id;
      const resumeStarsData = await ctx.prisma.resumesStar.findMany({
        include: {
          resume: {
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
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          userId,
        },
      });
      return resumeStarsData.map((rs) => {
        const resume: Resume = {
          additionalInfo: rs.resume.additionalInfo,
          createdAt: rs.resume.createdAt,
          experience: rs.resume.experience,
          id: rs.id,
          location: rs.resume.location,
          numComments: rs.resume._count.comments,
          numStars: rs.resume._count.stars,
          role: rs.resume.role,
          title: rs.resume.title,
          url: rs.resume.url,
          user: rs.resume.user.name!,
        };
        return resume;
      });
    },
  })
  .query('my', {
    async resolve({ ctx }) {
      const userId = ctx.session?.user?.id;
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
        where: {
          userId,
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
