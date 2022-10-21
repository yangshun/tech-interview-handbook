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

const searchOfferPercentile = (
  offer: OffersOffer & {
    company: Company;
    offersFullTime:
      | (OffersFullTime & {
          baseSalary: OffersCurrency;
          bonus: OffersCurrency;
          stocks: OffersCurrency;
          totalCompensation: OffersCurrency;
        })
      | null;
    offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
    profile: OffersProfile & { background: OffersBackground | null };
  },
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
          topCompanyOffers: {
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
          topOverallOffers: {
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
                value: 'desc',
              },
            },
          },
          {
            offersIntern: {
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

      // TODO: Shift yoe out of background to make it mandatory
      if (
        !overallHighestOffer.profile.background ||
        overallHighestOffer.profile.background.totalYoe === undefined
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot analyse without YOE',
        });
      }

      const yoe = overallHighestOffer.profile.background.totalYoe as number;

      let similarOffers = await ctx.prisma.offersOffer.findMany({
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
                value: 'desc',
              },
            },
          },
          {
            offersIntern: {
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
                  offersFullTime: {
                    level: overallHighestOffer.offersFullTime?.level,
                    specialization:
                      overallHighestOffer.offersFullTime?.specialization,
                  },
                  offersIntern: {
                    specialization:
                      overallHighestOffer.offersIntern?.specialization,
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
      const overallIndex = searchOfferPercentile(
        overallHighestOffer,
        similarOffers,
      );
      const overallPercentile =
        similarOffers.length === 0 ? 0 : overallIndex / similarOffers.length;

      const companyIndex = searchOfferPercentile(
        overallHighestOffer,
        similarCompanyOffers,
      );
      const companyPercentile =
        similarCompanyOffers.length === 0
          ? 0
          : companyIndex / similarCompanyOffers.length;

      // FIND TOP >=90 PERCENTILE OFFERS
      similarOffers = similarOffers.filter(
        (offer) => offer.id !== overallHighestOffer.id,
      );
      similarCompanyOffers = similarCompanyOffers.filter(
        (offer) => offer.id !== overallHighestOffer.id,
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
          topCompanyOffers: {
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
          topOverallOffers: {
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
      });

      return profileAnalysisDtoMapper(analysis);
    },
  });
