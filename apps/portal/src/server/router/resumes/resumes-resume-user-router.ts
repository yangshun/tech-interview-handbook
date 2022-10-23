import { z } from 'zod';

import { createProtectedRouter } from '../context';

import type { Resume } from '~/types/resume';

export const resumesResumeUserRouter = createProtectedRouter()
  .mutation('upsert', {
    // TODO: Use enums for experience, location, role
    input: z.object({
      additionalInfo: z.string().optional(),
      experience: z.string(),
      id: z.string().optional(),
      location: z.string(),
      role: z.string(),
      title: z.string(),
      url: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;

      return await ctx.prisma.resumesResume.upsert({
        create: {
          additionalInfo: input.additionalInfo,
          experience: input.experience,
          location: input.location,
          role: input.role,
          title: input.title,
          url: input.url,
          userId,
        },
        update: {
          additionalInfo: input.additionalInfo,
          experience: input.experience,
          location: input.location,
          role: input.role,
          title: input.title,
          url: input.url,
          userId,
        },
        where: {
          id: input.id ?? '',
        },
      });
    },
  })
  .query('findUserStarred', {
    input: z.object({
      experienceFilters: z.string().array(),
      locationFilters: z.string().array(),
      numComments: z.number().optional(),
      roleFilters: z.string().array(),
      searchValue: z.string(),
      skip: z.number(),
      sortOrder: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;
      const {
        roleFilters,
        locationFilters,
        experienceFilters,
        searchValue,
        sortOrder,
        numComments,
        skip,
      } = input;
      const totalRecords = await ctx.prisma.resumesStar.count({
        where: {
          resume: {
            ...(numComments === 0 && {
              comments: {
                none: {},
              },
            }),
            experience: { in: experienceFilters },
            location: { in: locationFilters },
            role: { in: roleFilters },
          },
          userId,
        },
      });
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
        orderBy:
          sortOrder === 'latest'
            ? {
                resume: {
                  createdAt: 'desc',
                },
              }
            : sortOrder === 'popular'
            ? {
                resume: {
                  stars: {
                    _count: 'desc',
                  },
                },
              }
            : {
                resume: {
                  comments: {
                    _count: 'desc',
                  },
                },
              },
        skip,
        take: 10,
        where: {
          resume: {
            ...(numComments === 0 && {
              comments: {
                none: {},
              },
            }),
            experience: { in: experienceFilters },
            location: { in: locationFilters },
            role: { in: roleFilters },
            title: { contains: searchValue, mode: 'insensitive' },
          },
          userId,
        },
      });

      const mappedResumeData = resumeStarsData.map((rs) => {
        const resume: Resume = {
          additionalInfo: rs.resume.additionalInfo,
          createdAt: rs.resume.createdAt,
          experience: rs.resume.experience,
          id: rs.resume.id,
          isStarredByUser: true,
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
      return { mappedResumeData, totalRecords };
    },
  })
  .query('findUserCreated', {
    input: z.object({
      experienceFilters: z.string().array(),
      locationFilters: z.string().array(),
      numComments: z.number().optional(),
      roleFilters: z.string().array(),
      searchValue: z.string(),
      skip: z.number(),
      sortOrder: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;
      const {
        roleFilters,
        locationFilters,
        experienceFilters,
        sortOrder,
        searchValue,
        numComments,
        skip,
      } = input;
      const totalRecords = await ctx.prisma.resumesResume.count({
        where: {
          ...(numComments === 0 && {
            comments: {
              none: {},
            },
          }),
          experience: { in: experienceFilters },
          location: { in: locationFilters },
          role: { in: roleFilters },
          userId,
        },
      });
      const resumesData = await ctx.prisma.resumesResume.findMany({
        include: {
          _count: {
            select: {
              comments: true,
              stars: true,
            },
          },
          stars: {
            where: {
              userId,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy:
          sortOrder === 'latest'
            ? {
                createdAt: 'desc',
              }
            : sortOrder === 'popular'
            ? {
                stars: {
                  _count: 'desc',
                },
              }
            : { comments: { _count: 'desc' } },
        skip,
        take: 10,
        where: {
          ...(numComments === 0 && {
            comments: {
              none: {},
            },
          }),
          experience: { in: experienceFilters },
          location: { in: locationFilters },
          role: { in: roleFilters },
          title: { contains: searchValue, mode: 'insensitive' },
          userId,
        },
      });
      const mappedResumeData = resumesData.map((r) => {
        const resume: Resume = {
          additionalInfo: r.additionalInfo,
          createdAt: r.createdAt,
          experience: r.experience,
          id: r.id,
          isStarredByUser: r.stars.length > 0,
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
      return { mappedResumeData, totalRecords };
    },
  });
