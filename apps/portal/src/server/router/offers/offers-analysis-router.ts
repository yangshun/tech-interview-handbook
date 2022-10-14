import { z } from 'zod';
import type {
  Company,
  OffersBackground,
  OffersCurrency,
  OffersFullTime,
  OffersIntern,
  OffersOffer,
  OffersProfile,
} from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createRouter } from '../context';

const binarySearchOfferPercentile = (
  offer: OffersOffer & {
    OffersFullTime:
      | (OffersFullTime & {
          baseSalary: OffersCurrency;
          bonus: OffersCurrency;
          stocks: OffersCurrency;
          totalCompensation: OffersCurrency;
        })
      | null;
    OffersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
    company: Company;
    profile: OffersProfile & { background: OffersBackground | null };
  },
  similarOffers: Array<any> | string,
) => {
  let start = 0;
  let end = similarOffers.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (similarOffers[mid].id === offer.id) {
      return mid;
    }

    if (offer.id < similarOffers[mid].id) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
};

export const offersAnalysisRouter = createRouter().query('generate', {
  input: z.object({
    profileId: z.string(),
  }),
  async resolve({ ctx, input }) {
    const offers = await ctx.prisma.offersOffer.findMany({
      include: {
        OffersFullTime: {
          include: {
            baseSalary: true,
            bonus: true,
            stocks: true,
            totalCompensation: true,
          },
        },
        OffersIntern: {
          include: {
            monthlySalary: true,
          },
        },
        company: true,
        profile: {
          include: {
            background: true,
          },
        },
      },
      orderBy: [
        {
          OffersFullTime: {
            totalCompensation: {
              value: 'desc',
            },
          },
        },
        {
          OffersIntern: {
            monthlySalary: {
              value: 'desc',
            },
          },
        },
      ],
      where: {
        profileId: input.profileId,
      },
    });

    if (!offers || offers.length === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No offers found on this profile',
      });
    }

    const overallHighestOffer = offers[0];

    // TODO: Shift yoe to background to make it mandatory
    if (
      !overallHighestOffer.profile.background ||
      !overallHighestOffer.profile.background.totalYoe
    ) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Cannot analyse without YOE',
      });
    }

    const yoe = overallHighestOffer.profile.background.totalYoe as number;

    let similarOffers = await ctx.prisma.offersOffer.findMany({
      include: {
        OffersFullTime: {
          include: {
            totalCompensation: true,
          },
        },
        OffersIntern: {
          include: {
            monthlySalary: true,
          },
        },
        company: true,
        profile: {
          include: {
            background: {
              include: {
                experiences: {
                  include: {
                    company: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: [
        {
          OffersFullTime: {
            totalCompensation: {
              value: 'desc',
            },
          },
        },
        {
          OffersIntern: {
            monthlySalary: {
              value: 'desc',
            },
          },
        },
      ],
      where: {
        AND: [
          {
            location: overallHighestOffer.location,
          },
          {
            OR: [
              {
                OffersFullTime: {
                  level: overallHighestOffer.OffersFullTime?.level,
                  specialization:
                    overallHighestOffer.OffersFullTime?.specialization,
                },
                OffersIntern: {
                  specialization:
                    overallHighestOffer.OffersIntern?.specialization,
                },
              },
            ],
          },
          {
            profile: {
              background: {
                AND: [
                  {
                    totalYoe: {
                      gte: Math.max(yoe - 1, 0),
                      lte: yoe + 1,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    });

    let similarCompanyOffers = similarOffers.filter(
      (offer) => offer.companyId === overallHighestOffer.companyId,
    );

    // CALCULATE PERCENTILES
    const highestOfferAgainstOverallIndex = binarySearchOfferPercentile(
      overallHighestOffer,
      similarOffers,
    );
    const highestOfferAgainstOverallPercentile =
      highestOfferAgainstOverallIndex / similarOffers.length;

    const highestOfferAgainstCompanyIndex = binarySearchOfferPercentile(
      overallHighestOffer,
      similarCompanyOffers,
    );
    const highestOfferAgainstCompanyPercentile =
      highestOfferAgainstCompanyIndex / similarCompanyOffers.length;

    // FIND TOP >=90 PERCENTILE OFFERS
    similarOffers = similarOffers.filter(
      (offer) => offer.id !== overallHighestOffer.id,
    );
    similarCompanyOffers = similarCompanyOffers.filter(
      (offer) => offer.id !== overallHighestOffer.id,
    );

    const similarOffersCount = similarOffers.length;
    const similarOffers90PercentileIndex =
      Math.floor(similarOffersCount * 0.9) - 1;
    const topPercentileOffers =
      similarOffersCount > 1
        ? similarOffers.slice(
            similarOffers90PercentileIndex,
            similarOffers90PercentileIndex + 2,
          )
        : similarOffers;

    const similarCompanyOffersCount = similarCompanyOffers.length;
    const similarCompanyOffers90PercentileIndex =
      Math.floor(similarCompanyOffersCount * 0.9) - 1;
    const topPercentileCompanyOffers =
      similarCompanyOffersCount > 1
        ? similarCompanyOffers.slice(
            similarCompanyOffers90PercentileIndex,
            similarCompanyOffers90PercentileIndex + 2,
          )
        : similarCompanyOffers;

    return {
      company: {
        highestOfferAgainstCompanyPercentile,
        similarCompanyOffersCount,
        topPercentileCompanyOffers,
      },
      overall: {
        highestOfferAgainstOverallPercentile,
        similarOffersCount,
        topPercentileOffers,
      },
      overallHighestOffer,
    };
  },
});
