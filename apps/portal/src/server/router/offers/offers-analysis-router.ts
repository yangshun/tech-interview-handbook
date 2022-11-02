import { z } from 'zod';
<<<<<<< HEAD
=======
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
  State,
} from '@prisma/client';
>>>>>>> BryannYeap/location
import { TRPCError } from '@trpc/server';

import { generateAnalysis } from '~/utils/offers/analysisGeneration';

import { createRouter } from '../context';
import { profileAnalysisDtoMapper } from '../../../mappers/offers-mappers';

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
              },
            },
          },
          overallAnalysis: {
            include: {
              topSimilarOffers: {
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
              },
            },
          },
          overallHighestOffer: {
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
      return generateAnalysis({ ctx, input });
    },
  });
