import { z } from 'zod';

import { createRouter } from '../context';

import type { Resume } from '~/types/resume';

export const resumesRouter = createRouter()
  .query('findAll', {
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
      const {
        roleFilters,
        locationFilters,
        experienceFilters,
        sortOrder,
        numComments,
        skip,
        searchValue,
      } = input;
      const userId = ctx.session?.user?.id;
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
          comments: true,
          stars: {
            where: {
              OR: {
                userId,
              },
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
  })
  .query('findOne', {
    input: z.object({
      resumeId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { resumeId } = input;
      const userId = ctx.session?.user?.id;

      // Use the resumeId to query all related information of a single resume
      // from Resumesresume:
      return await ctx.prisma.resumesResume.findUnique({
        include: {
          _count: {
            select: {
              stars: true,
            },
          },
          stars: {
            where: {
              OR: {
                userId,
              },
            },
          },
          user: {
            select: {
              name: true,
            },
          },
        },
        where: {
          id: resumeId,
        },
      });
    },
  })
  .query('findUserReviewedResumeCount', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.resumesResume.count({
        where: {
          comments: {
            some: {
              userId: input.userId,
            },
          },
        },
      });
    },
  });
