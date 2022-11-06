import type { Session } from 'next-auth';
import type {
  City,
  Company,
  Country,
  OffersBackground,
  OffersCurrency,
  OffersFullTime,
  OffersIntern,
  OffersOffer,
  OffersProfile,
  Prisma,
  PrismaClient,
  State,
} from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { analysisInclusion } from './analysisInclusion';
import { profileAnalysisDtoMapper } from '../../../mappers/offers-mappers';

type Offer = OffersOffer & {
  company: Company;
  location: City & { state: State & { country: Country } };
  offersFullTime:
    | (OffersFullTime & {
        baseSalary: OffersCurrency | null;
        bonus: OffersCurrency | null;
        stocks: OffersCurrency | null;
        totalCompensation: OffersCurrency;
      })
    | null;
  offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
  profile: OffersProfile & { background: OffersBackground | null };
};

const getSimilarOffers = async (
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  comparedOffer: Offer,
  companyIdFilter: string | undefined = undefined,
) => {
  if (
    !comparedOffer.profile.background ||
    comparedOffer.profile.background.totalYoe == null
  ) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'YOE not found',
    });
  }

  const yoe = comparedOffer.profile.background.totalYoe as number;
  const monthYearReceived = new Date(comparedOffer.monthYearReceived);
  monthYearReceived.setFullYear(monthYearReceived.getFullYear() - 1);

  return await prisma.offersOffer.findMany({
    include: {
      company: true,
      location: {
        include: {
          state: {
            include: {
              country: true,
            },
          },
        },
      },
      offersFullTime: {
        include: {
          totalCompensation: true,
        },
      },
      offersIntern: {
        include: {
          monthlySalary: true,
        },
      },
      profile: {
        include: {
          background: {
            include: {
              experiences: {
                include: {
                  company: true,
                  location: {
                    include: {
                      state: {
                        include: {
                          country: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    orderBy: [
      {
        offersFullTime: {
          totalCompensation: {
            baseValue: 'desc',
          },
        },
      },
      {
        offersIntern: {
          monthlySalary: {
            baseValue: 'desc',
          },
        },
      },
    ],
    where: {
      AND: [
        {
          location: comparedOffer.location,
        },
        {
          companyId: companyIdFilter,
        },
        {
          monthYearReceived: {
            gte: monthYearReceived,
          },
        },
        {
          OR: [
            {
              offersFullTime: {
                title: comparedOffer.offersFullTime?.title,
              },
              offersIntern: {
                title: comparedOffer.offersIntern?.title,
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
};

const searchOfferPercentile = (
  offer: Offer,
  similarOffers: Array<
    OffersOffer & {
      company: Company;
      offersFullTime:
        | (OffersFullTime & {
            totalCompensation: OffersCurrency;
          })
        | null;
      offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
      profile: OffersProfile & { background: OffersBackground | null };
    }
  >,
) => {
  for (let i = 0; i < similarOffers.length; i++) {
    if (similarOffers[i].id === offer.id) {
      return i;
    }
  }

  return -1;
};

export const generateAnalysis = async (params: {
  ctx: {
    prisma: PrismaClient<
      Prisma.PrismaClientOptions,
      never,
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;
    session: Session | null;
  };
  input: { profileId: string };
}) => {
  const { ctx, input } = params;
  await ctx.prisma.offersAnalysis.deleteMany({
    where: {
      profileId: input.profileId,
    },
  });

  const offers = await ctx.prisma.offersOffer.findMany({
    include: {
      company: true,
      location: {
        include: {
          state: {
            include: {
              country: true,
            },
          },
        },
      },
      offersFullTime: {
        include: {
          baseSalary: true,
          bonus: true,
          stocks: true,
          totalCompensation: true,
        },
      },
      offersIntern: {
        include: {
          monthlySalary: true,
        },
      },
      profile: {
        include: {
          background: true,
        },
      },
    },
    orderBy: [
      {
        offersFullTime: {
          totalCompensation: {
            baseValue: 'desc',
          },
        },
      },
      {
        offersIntern: {
          monthlySalary: {
            baseValue: 'desc',
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

  let similarOffers = await getSimilarOffers(ctx.prisma, overallHighestOffer);

  const offerIds = offers.map((offer) => offer.id);

  // COMPANY ANALYSIS
  const companyMap = new Map<string, Offer>();
  offers.forEach((offer) => {
    if (companyMap.get(offer.companyId) == null) {
      companyMap.set(offer.companyId, offer);
    }
  });

  const companyAnalysis = await Promise.all(
    Array.from(companyMap.values()).map(async (companyOffer) => {
      // TODO: Refactor calculating analysis into a function
      let similarCompanyOffers = await getSimilarOffers(
        ctx.prisma,
        companyOffer,
        companyOffer.companyId,
      );

      const companyIndex = searchOfferPercentile(
        companyOffer,
        similarCompanyOffers,
      );
      const companyPercentile =
        similarCompanyOffers.length <= 1
          ? 100
          : 100 - (100 * companyIndex) / (similarCompanyOffers.length - 1);

      // Get top offers (excluding user's offers)
      similarCompanyOffers = similarCompanyOffers.filter(
        (offer) => !offerIds.includes(offer.id),
      );

      const noOfSimilarCompanyOffers = similarCompanyOffers.length;
      const similarCompanyOffers90PercentileIndex = Math.ceil(
        noOfSimilarCompanyOffers * 0.1,
      );
      const topPercentileCompanyOffers =
        noOfSimilarCompanyOffers > 2
          ? similarCompanyOffers.slice(
              similarCompanyOffers90PercentileIndex,
              similarCompanyOffers90PercentileIndex + 2,
            )
          : similarCompanyOffers;

      return {
        analysedOfferId: companyOffer.id,
        noOfSimilarOffers: noOfSimilarCompanyOffers,
        percentile: companyPercentile,
        topSimilarOffers: topPercentileCompanyOffers,
      };
    }),
  );

  // OVERALL ANALYSIS
  const overallIndex = searchOfferPercentile(
    overallHighestOffer,
    similarOffers,
  );
  const overallPercentile =
    similarOffers.length <= 1
      ? 100
      : 100 - (100 * overallIndex) / (similarOffers.length - 1);

  similarOffers = similarOffers.filter((offer) => !offerIds.includes(offer.id));

  const noOfSimilarOffers = similarOffers.length;
  const similarOffers90PercentileIndex = Math.ceil(noOfSimilarOffers * 0.1);
  const topPercentileOffers =
    noOfSimilarOffers > 2
      ? similarOffers.slice(
          similarOffers90PercentileIndex,
          similarOffers90PercentileIndex + 2,
        )
      : similarOffers;

  const analysis = await ctx.prisma.offersAnalysis.create({
    data: {
      companyAnalysis: {
        create: companyAnalysis.map((analysisUnit) => {
          return {
            analysedOffer: {
              connect: {
                id: analysisUnit.analysedOfferId,
              },
            },
            noOfSimilarOffers: analysisUnit.noOfSimilarOffers,
            percentile: analysisUnit.percentile,
            topSimilarOffers: {
              connect: analysisUnit.topSimilarOffers.map((offer) => {
                return { id: offer.id };
              }),
            },
          };
        }),
      },
      overallAnalysis: {
        create: {
          analysedOffer: {
            connect: {
              id: overallHighestOffer.id,
            },
          },
          noOfSimilarOffers,
          percentile: overallPercentile,
          topSimilarOffers: {
            connect: topPercentileOffers.map((offer) => {
              return { id: offer.id };
            }),
          },
        },
      },
      overallHighestOffer: {
        connect: {
          id: overallHighestOffer.id,
        },
      },
      profile: {
        connect: {
          id: input.profileId,
        },
      },
    },
    include: analysisInclusion,
  });

  return profileAnalysisDtoMapper(analysis);
};
