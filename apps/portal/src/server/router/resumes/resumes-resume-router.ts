import { z } from 'zod';
import { Vote } from '@prisma/client';

import type { FilterCounts } from '~/utils/resumes/resumeFilters';
import {
  getWhereClauseFilters,
  resumeGetFilterCounts,
} from '~/utils/resumes/resumePrismaUtils';

import { createRouter } from '../context';

import type { Resume } from '~/types/resume';

export const resumesRouter = createRouter()
  .query('findAll', {
    input: z.object({
      experienceFilters: z.string().array(),
      isTop10: z.boolean(),
      isUnreviewed: z.boolean(),
      locationFilters: z.string().array(),
      roleFilters: z.string().array(),
      searchValue: z.string(),
      skip: z.number(),
      sortOrder: z.string(),
      take: z.number(),
    }),
    async resolve({ ctx, input }) {
      const {
        roleFilters,
        locationFilters,
        experienceFilters,
        sortOrder,
        isUnreviewed,
        skip,
        isTop10,
        searchValue,
        take,
      } = input;
      const userId = ctx.session?.user?.id;
      let totalRecords = 10;
      let filterCounts = {} as FilterCounts;

      const resumesData = await ctx.prisma.resumesResume.findMany({
        include: {
          _count: {
            select: {
              comments: true,
              stars: true,
            },
          },
          comments: true,
          location: {
            select: {
              name: true,
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
        skip: isTop10 ? 0 : skip,
        take,
        where: {
          ...getWhereClauseFilters(
            experienceFilters,
            roleFilters,
            locationFilters,
          ),
          isResolved: isUnreviewed ? false : {},
          title: { contains: searchValue, mode: 'insensitive' },
        },
      });
      const mappedResumeData = resumesData.map((r) => {
        const resume: Resume = {
          additionalInfo: r.additionalInfo,
          createdAt: r.createdAt,
          experience: r.experience,
          id: r.id,
          isResolved: r.isResolved,
          isStarredByUser: r.stars.length > 0,
          location: r.location.name,
          locationId: r.locationId,
          numComments: r._count.comments,
          numStars: r._count.stars,
          role: r.role,
          title: r.title,
          url: r.url,
          user: r.user.name!,
        };
        return resume;
      });

      if (isTop10) {
        filterCounts = resumeGetFilterCounts(mappedResumeData);
      } else {
        totalRecords = await ctx.prisma.resumesResume.count({
          where: {
            ...getWhereClauseFilters(
              experienceFilters,
              roleFilters,
              locationFilters,
            ),
            isResolved: isUnreviewed ? false : {},
            title: { contains: searchValue, mode: 'insensitive' },
          },
        });

        // Group by role and count, taking into account all role/experience/locationId/isUnreviewed filters and search value
        const roleCounts = await ctx.prisma.resumesResume.groupBy({
          _count: {
            _all: true,
          },
          by: ['role'],
          where: {
            ...getWhereClauseFilters(experienceFilters, [], locationFilters),
            isResolved: isUnreviewed ? false : {},
            title: { contains: searchValue, mode: 'insensitive' },
          },
        });

        // Map all nonzero counts from array to object where key = role and value = count
        const mappedRoleCounts = Object.fromEntries(
          roleCounts.map((rc) => [rc.role, rc._count._all]),
        );

        const experienceCounts = await ctx.prisma.resumesResume.groupBy({
          _count: {
            _all: true,
          },
          by: ['experience'],
          where: {
            isResolved: isUnreviewed ? false : {},
            ...getWhereClauseFilters([], roleFilters, locationFilters),
            title: { contains: searchValue, mode: 'insensitive' },
          },
        });
        const mappedExperienceCounts = Object.fromEntries(
          experienceCounts.map((ec) => [ec.experience, ec._count._all]),
        );

        const locationCounts = await ctx.prisma.resumesResume.groupBy({
          _count: {
            _all: true,
          },
          by: ['locationId'],
          where: {
            ...getWhereClauseFilters(experienceFilters, roleFilters, []),
            isResolved: isUnreviewed ? false : {},
            title: { contains: searchValue, mode: 'insensitive' },
          },
        });
        const mappedLocationCounts = Object.fromEntries(
          locationCounts.map((lc) => [lc.locationId, lc._count._all]),
        );

        filterCounts = {
          experience: mappedExperienceCounts,
          location: mappedLocationCounts,
          role: mappedRoleCounts,
        };
      }

      return {
        filterCounts,
        mappedResumeData,
        totalRecords,
      };
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
          location: {
            select: {
              name: true,
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
          // User has commented on this resume
          comments: {
            some: {
              userId: input.userId,
            },
          },
          // Not user's own resume
          userId: {
            not: input.userId,
          },
        },
      });
    },
  })
  .query('findUserMaxResumeUpvoteCount', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const highestUpvotedResume = await ctx.prisma.resumesResume.findFirst({
        orderBy: {
          stars: {
            _count: 'desc',
          },
        },
        select: {
          _count: {
            select: {
              stars: true,
            },
          },
        },
        where: {
          userId: input.userId,
        },
      });

      return highestUpvotedResume?._count?.stars ?? 0;
    },
  })
  .query('findUserTopUpvotedCommentCount', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const resumes = await ctx.prisma.resumesResume.findMany({
        select: {
          comments: {
            select: {
              userId: true,
              votes: {
                select: {
                  value: true,
                },
              },
            },
          },
        },
      });

      let topUpvotedCommentCount = 0;

      for (const resume of resumes) {
        // Set minimum upvote count >= 2 to qualify
        let highestVoteCount = 2;

        // Get Map of {userId, voteCount} for each comment
        const commentUpvotePairs = [];
        for (const comment of resume.comments) {
          const { userId, votes } = comment;
          let voteCount = 0;
          for (const vote of votes) {
            if (vote.value === Vote.UPVOTE) {
              voteCount++;
            } else {
              voteCount--;
            }
          }
          if (voteCount >= highestVoteCount) {
            highestVoteCount = voteCount;
            commentUpvotePairs.push({ userId, voteCount });
          }
        }

        // Filter to get the userIds with the highest vote counts
        const userIds = commentUpvotePairs
          .filter((pair) => pair.voteCount === highestVoteCount)
          .map((pair) => pair.userId);

        // Increment if input userId is the highest voted comment
        if (userIds.includes(input.userId)) {
          topUpvotedCommentCount++;
        }
      }

      return topUpvotedCommentCount;
    },
  });
