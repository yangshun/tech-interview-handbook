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

import { profileAnalysisDtoMapper } from '~/mappers/offers-mappers';

import { createRouter } from '../context';

type Offer = OffersOffer & {
  company: Company;
  offersFullTime:
    | (OffersFullTime & { totalCompensation: OffersCurrency })
    | null;
  offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
  profile: OffersProfile & { background: OffersBackground | null };
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

export const offersAnalysisRouter = createRouter()
  .query('get', {
    input: z.object({
      profileId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const analysis = await ctx.prisma.offersAnalysis.findFirst({
        include: {
          companyAnalysis: {
            include: {
              topSimilarOffers: {
                include: {
                  company: true,
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
          overallAnalysis: {
            include: {
              topSimilarOffers: {
                include: {
                  company: true,
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
          overallHighestOffer: {
            include: {
              company: true,
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
                  background: true,
                },
              },
            },
          },
        },
        where: {
          profileId: input.profileId,
        },
      });

      if (!analysis) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No analysis found on this profile',
        });
      }

      return profileAnalysisDtoMapper(analysis);
    },
  })
  .mutation('generate', {
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
          company: true,
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

      if (
        !overallHighestOffer.profile.background ||
        overallHighestOffer.profile.background.totalYoe == null
      ) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'YOE not found',
        });
      }

      const yoe = overallHighestOffer.profile.background.totalYoe as number;
      const monthYearReceived = new Date(overallHighestOffer.monthYearReceived);
      monthYearReceived.setFullYear(monthYearReceived.getFullYear() - 1);

      const similarOffers = await ctx.prisma.offersOffer.findMany({
        include: {
          company: true,
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
              location: overallHighestOffer.location,
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
                    title: overallHighestOffer.offersFullTime?.title,
                  },
                  offersIntern: {
                    title: overallHighestOffer.offersIntern?.title,
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

      // COMPANY ANALYSIS
      const companyMap = new Map<string, Offer>();
      offers.forEach((offer) => {
        if (companyMap.get(offer.companyId) == null) {
          companyMap.set(offer.companyId, offer);
        }
      });

      const companyAnalysis = Array.from(companyMap.values()).map(
        (companyOffer) => {
          // TODO: Refactor calculating analysis into a function
          const similarCompanyOffers = similarOffers.filter(
            (offer) => offer.companyId === companyOffer.companyId,
          );

          const companyIndex = searchOfferPercentile(
            companyOffer,
            similarCompanyOffers,
          );
          const companyPercentile =
            similarCompanyOffers.length <= 1
              ? 100
              : 100 - (100 * companyIndex) / (similarCompanyOffers.length - 1);

          // Get top offers (excluding user's offer)
          const similarCompanyOffersWithoutUsersOffers =
            similarCompanyOffers.filter(
              (offer) => offer.profileId !== input.profileId,
            );

          const noOfSimilarCompanyOffers =
            similarCompanyOffersWithoutUsersOffers.length;
          const similarCompanyOffers90PercentileIndex = Math.ceil(
            noOfSimilarCompanyOffers * 0.1,
          );
          const topPercentileCompanyOffers =
            noOfSimilarCompanyOffers > 2
              ? similarCompanyOffersWithoutUsersOffers.slice(
                  similarCompanyOffers90PercentileIndex,
                  similarCompanyOffers90PercentileIndex + 2,
                )
              : similarCompanyOffersWithoutUsersOffers;

          return {
            companyName: companyOffer.company.name,
            noOfSimilarOffers: noOfSimilarCompanyOffers,
            percentile: companyPercentile,
            topSimilarOffers: topPercentileCompanyOffers,
          };
        },
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

      const similarOffersWithoutUsersOffers = similarOffers.filter(
        (similarOffer) => similarOffer.profileId !== input.profileId,
      );

      const noOfSimilarOffers = similarOffersWithoutUsersOffers.length;
      const similarOffers90PercentileIndex = Math.ceil(noOfSimilarOffers * 0.1);
      const topPercentileOffers =
        noOfSimilarOffers > 2
          ? similarOffersWithoutUsersOffers.slice(
              similarOffers90PercentileIndex,
              similarOffers90PercentileIndex + 2,
            )
          : similarOffersWithoutUsersOffers;

      const analysis = await ctx.prisma.offersAnalysis.create({
        data: {
          companyAnalysis: {
            create: companyAnalysis.map((analysisUnit) => {
              return {
                companyName: analysisUnit.companyName,
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
              companyName: overallHighestOffer.company.name,
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
        include: {
          companyAnalysis: {
            include: {
              topSimilarOffers: {
                include: {
                  company: true,
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
          overallAnalysis: {
            include: {
              topSimilarOffers: {
                include: {
                  company: true,
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
          overallHighestOffer: {
            include: {
              company: true,
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
                  background: true,
                },
              },
            },
          },
        },
      });

      return profileAnalysisDtoMapper(analysis);
    },
  });
