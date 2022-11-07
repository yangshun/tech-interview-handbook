import type { Session } from 'next-auth';
import type {
  City,
  Company,
  Country,
  OffersAnalysis,
  OffersAnalysisUnit,
  OffersBackground,
  OffersCurrency,
  OffersExperience,
  OffersFullTime,
  OffersIntern,
  OffersOffer,
  OffersProfile,
  Prisma,
  PrismaClient,
  State,
} from '@prisma/client';
import { JobType } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { analysisInclusion } from './analysisInclusion';
import { profileAnalysisDtoMapper } from '../../../mappers/offers-mappers';

type Analysis =
  | (OffersAnalysis & {
      companyAnalysis: Array<
        OffersAnalysisUnit & {
          analysedOffer: OffersOffer & {
            company: Company;
            offersFullTime:
              | (OffersFullTime & { totalCompensation: OffersCurrency })
              | null;
            offersIntern:
              | (OffersIntern & { monthlySalary: OffersCurrency })
              | null;
            profile: OffersProfile & { background: OffersBackground | null };
          };
          topSimilarOffers: Array<
            OffersOffer & {
              company: Company;
              location: City & { state: State & { country: Country } };
              offersFullTime:
                | (OffersFullTime & { totalCompensation: OffersCurrency })
                | null;
              offersIntern:
                | (OffersIntern & { monthlySalary: OffersCurrency })
                | null;
              profile: OffersProfile & {
                background:
                  | (OffersBackground & {
                      experiences: Array<
                        OffersExperience & {
                          company: Company | null;
                          location:
                            | (City & { state: State & { country: Country } })
                            | null;
                        }
                      >;
                    })
                  | null;
              };
            }
          >;
        }
      >;
      overallAnalysis: OffersAnalysisUnit & {
        analysedOffer: OffersOffer & {
          company: Company;
          offersFullTime:
            | (OffersFullTime & { totalCompensation: OffersCurrency })
            | null;
          offersIntern:
            | (OffersIntern & { monthlySalary: OffersCurrency })
            | null;
          profile: OffersProfile & { background: OffersBackground | null };
        };
        topSimilarOffers: Array<
          OffersOffer & {
            company: Company;
            location: City & { state: State & { country: Country } };
            offersFullTime:
              | (OffersFullTime & { totalCompensation: OffersCurrency })
              | null;
            offersIntern:
              | (OffersIntern & { monthlySalary: OffersCurrency })
              | null;
            profile: OffersProfile & {
              background:
                | (OffersBackground & {
                    experiences: Array<
                      OffersExperience & {
                        company: Company | null;
                        location:
                          | (City & { state: State & { country: Country } })
                          | null;
                      }
                    >;
                  })
                | null;
            };
          }
        >;
      };
      overallHighestOffer: OffersOffer & {
        company: Company;
        location: City & { state: State & { country: Country } };
        offersFullTime:
          | (OffersFullTime & { totalCompensation: OffersCurrency })
          | null;
        offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
        profile: OffersProfile & { background: OffersBackground | null };
      };
    })
  | null;

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

type SimilarOffer = OffersOffer & {
  company: Company;
  location: City & { state: State & { country: Country } };
  offersFullTime:
    | (OffersFullTime & { totalCompensation: OffersCurrency })
    | null;
  offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
  profile: OffersProfile & {
    background:
      | (OffersBackground & {
          experiences: Array<
            OffersExperience & {
              company: Company | null;
              location: (City & { state: State & { country: Country } }) | null;
            }
          >;
        })
      | null;
  };
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

// OFFERS MUST BE ORDERED
const calculatePercentile = (
  orderedOffers: Array<SimilarOffer>,
  offerToCalculate: Offer,
) => {
  let offerToCalculateIndex = -1;
  let numberOfNoDuplicateOffers = 0;
  let lastOfferSalary = -1;
  const offerToCalculateSalary = getSalary(offerToCalculate);

  for (let i = 0; i < orderedOffers.length; i++) {
    const offer = orderedOffers[i];
    const salary = getSalary(offer, lastOfferSalary);

    if (salary !== lastOfferSalary) {
      if (salary === offerToCalculateSalary && offerToCalculateIndex === -1) {
        offerToCalculateIndex = numberOfNoDuplicateOffers;
      }
      numberOfNoDuplicateOffers++;
      lastOfferSalary = salary;
    }
  }

  const percentile =
    numberOfNoDuplicateOffers <= 1
      ? 100
      : 100 - (100 * offerToCalculateIndex) / (numberOfNoDuplicateOffers - 1);

  return percentile;
};

const getSalary = (offer: Offer | SimilarOffer, defaultSalary = 0) => {
  return offer.jobType === JobType.FULLTIME &&
    offer.offersFullTime?.totalCompensation?.baseValue != null
    ? offer.offersFullTime.totalCompensation.baseValue
    : offer.jobType === JobType.INTERN &&
      offer.offersIntern?.monthlySalary?.baseValue != null
    ? offer.offersIntern.monthlySalary.baseValue
    : defaultSalary;
};

const getTopOffers = (
  similarOffers: Array<SimilarOffer>,
  noOfSimilarOffers: number,
) => {
  const similarOffers90PercentileIndex = Math.ceil(noOfSimilarOffers * 0.1);
  const topPercentileOffers =
    noOfSimilarOffers > 2
      ? similarOffers.slice(
          similarOffers90PercentileIndex,
          similarOffers90PercentileIndex + 2,
        )
      : similarOffers;

  return topPercentileOffers;
};

const generateAnalysisUnit = async (
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  analysedOffer: Offer,
  usersOfferIds: Array<string>,
  isCompanyAnalysisUnit = false,
) => {
  let similarOffers = await getSimilarOffers(
    prisma,
    analysedOffer,
    isCompanyAnalysisUnit ? analysedOffer.companyId : undefined,
  );

  const percentile = calculatePercentile(similarOffers, analysedOffer);

  similarOffers = similarOffers.filter(
    (offer) => !usersOfferIds.includes(offer.id),
  );
  const noOfSimilarOffers = similarOffers.length;

  const topSimilarOffers = getTopOffers(similarOffers, noOfSimilarOffers);

  return {
    analysedOfferId: analysedOffer.id,
    noOfSimilarOffers,
    percentile,
    topSimilarOffers,
  };
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
  let analysis: Analysis = null;

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
  const usersOfferIds = offers.map((offer) => offer.id);

  const companyMap = new Map<string, Offer>();
  offers.forEach((offer) => {
    if (companyMap.get(offer.companyId) == null) {
      companyMap.set(offer.companyId, offer);
    }
  });

  Promise.all([
    generateAnalysisUnit(ctx.prisma, overallHighestOffer, usersOfferIds),
    Promise.all(
      Array.from(companyMap.values()).map(async (companyOffer) => {
        return await generateAnalysisUnit(
          ctx.prisma,
          companyOffer,
          usersOfferIds,
          true,
        );
      }),
    ),
  ]).then(async (analyses) => {
    const [overallAnalysisUnit, companyAnalysis] = analyses;

    analysis = await ctx.prisma.offersAnalysis.create({
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
                id: overallAnalysisUnit.analysedOfferId,
              },
            },
            noOfSimilarOffers: overallAnalysisUnit.noOfSimilarOffers,
            percentile: overallAnalysisUnit.percentile,
            topSimilarOffers: {
              connect: overallAnalysisUnit.topSimilarOffers.map((offer) => {
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
  });

  return profileAnalysisDtoMapper(analysis);
};
