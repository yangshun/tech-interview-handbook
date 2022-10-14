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
import { JobType } from '@prisma/client';
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

  const salary =
    offer.jobType === JobType.FULLTIME
      ? offer.OffersFullTime?.totalCompensation.value
      : offer.OffersIntern?.monthlySalary.value;

  if (!salary) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Cannot analyse without salary',
    });
  }

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    const similarOffer = similarOffers[mid];
    const similarSalary =
      similarOffer.jobType === JobType.FULLTIME
        ? similarOffer.OffersFullTime?.totalCompensation.value
        : similarOffer.OffersIntern?.monthlySalary.value;

    if (similarSalary === salary) {
      return mid;
    }

    if (salary < similarSalary) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
};

const topPercentileDtoMapper = (topPercentileOffers: Array<any>) => {
  return topPercentileOffers.map((offer) => {
    const { background } = offer.profile;
    return {
      company: { id: offer.company.id, name: offer.company.name },
      id: offer.id,
      jobType: offer.jobType,
      level: offer.OffersFullTime?.level,
      monthYearReceived: offer.monthYearReceived,
      monthlySalary: offer.OffersIntern?.monthlySalary?.value,
      negotiationStrategy: offer.negotiationStrategy,
      profile: {
        background: {
          experiences: background?.experiences.map(
            (exp: { company: { id: any; name: any }; id: any }) => {
              return {
                company: { id: exp.company.id, name: exp.company.name },
                id: exp.id,
              };
            },
          ),
          id: background?.id,
          totalYoe: background?.totalYoe,
        },
        id: offer.profileId,
        name: offer.profile.profileName,
      },
      specialization:
        offer.jobType === JobType.FULLTIME
          ? offer.OffersFullTime?.specialization
          : offer.OffersIntern?.specialization,
      title:
        offer.jobType === JobType.FULLTIME
          ? offer.OffersFullTime?.title
          : offer.OffersIntern?.title,
      totalCompensation: offer.OffersFullTime?.totalCompensation?.value,
    };
  });
};

const specificAnalysisDtoMapper = (
  noOfOffers: number,
  percentile: number,
  topPercentileOffers: Array<any>,
) => {
  return {
    noOfOffers,
    percentile,
    topPercentileCompanyOffers: topPercentileDtoMapper(topPercentileOffers),
  };
};

const highestOfferDtoMapper = (
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
) => {
  return {
    company: { id: offer.company.id, name: offer.company.name },
    id: offer.id,
    level: offer.OffersFullTime?.level,
    location: offer.location,
    specialization:
      offer.jobType === JobType.FULLTIME
        ? offer.OffersFullTime?.specialization
        : offer.OffersIntern?.specialization,
    totalYoe: offer.profile.background?.totalYoe,
  };
};

export const offersAnalysisRouter = createRouter().query('generate', {
  input: z.object({
    profileId: z.string(),
  }),
  async resolve({ ctx, input }) {
    await ctx.prisma.offersAnalysis.deleteMany({
      where: {
        profileId: input.profileId,
      },
    });

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
      (offer: { companyId: string }) =>
        offer.companyId === overallHighestOffer.companyId,
    );

    // CALCULATE PERCENTILES
    const overallIndex = binarySearchOfferPercentile(
      overallHighestOffer,
      similarOffers,
    );
    const overallPercentile = overallIndex / similarOffers.length;

    const companyIndex = binarySearchOfferPercentile(
      overallHighestOffer,
      similarCompanyOffers,
    );
    const companyPercentile = companyIndex / similarCompanyOffers.length;

    // FIND TOP >=90 PERCENTILE OFFERS
    similarOffers = similarOffers.filter(
      (offer: { id: string }) => offer.id !== overallHighestOffer.id,
    );
    similarCompanyOffers = similarCompanyOffers.filter(
      (offer: { id: string }) => offer.id !== overallHighestOffer.id,
    );

    const noOfSimilarOffers = similarOffers.length;
    const similarOffers90PercentileIndex =
      Math.floor(noOfSimilarOffers * 0.9) - 1;
    const topPercentileOffers =
      noOfSimilarOffers > 1
        ? similarOffers.slice(
            similarOffers90PercentileIndex,
            similarOffers90PercentileIndex + 2,
          )
        : similarOffers;

    const noOfSimilarCompanyOffers = similarCompanyOffers.length;
    const similarCompanyOffers90PercentileIndex =
      Math.floor(noOfSimilarCompanyOffers * 0.9) - 1;
    const topPercentileCompanyOffers =
      noOfSimilarCompanyOffers > 1
        ? similarCompanyOffers.slice(
            similarCompanyOffers90PercentileIndex,
            similarCompanyOffers90PercentileIndex + 2,
          )
        : similarCompanyOffers;

    const analysis = await ctx.prisma.offersAnalysis.create({
      data: {
        companyPercentile,
        noOfSimilarCompanyOffers,
        noOfSimilarOffers,
        overallHighestOffer: {
          connect: {
            id: overallHighestOffer.id,
          },
        },
        overallPercentile,
        profile: {
          connect: {
            id: input.profileId,
          },
        },
        topCompanyOffers: {
          connect: topPercentileCompanyOffers.map((offer) => {
            return { id: offer.id };
          }),
        },
        topOverallOffers: {
          connect: topPercentileOffers.map((offer) => {
            return { id: offer.id };
          }),
        },
      },
      include: {
        overallHighestOffer: {
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
                background: true,
              },
            },
          },
        },
        topCompanyOffers: {
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
        },
        topOverallOffers: {
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
        },
      },
    });

    return {
      companyAnalysis: specificAnalysisDtoMapper(
        noOfSimilarCompanyOffers,
        companyPercentile,
        topPercentileCompanyOffers,
      ),
      id: analysis.id,
      overallAnalysis: specificAnalysisDtoMapper(
        noOfSimilarOffers,
        overallPercentile,
        topPercentileOffers,
      ),
      overallHighestOffer: highestOfferDtoMapper(overallHighestOffer),
      profileId: analysis.profileId,
    };
  },
});
