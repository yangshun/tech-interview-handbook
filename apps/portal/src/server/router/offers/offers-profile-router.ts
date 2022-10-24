import crypto, { randomUUID } from 'crypto';
import { z } from 'zod';
import { JobType } from '@prisma/client';
import * as trpc from '@trpc/server';

import {
  addToProfileResponseMapper,
  createOfferProfileResponseMapper,
  profileDtoMapper,
} from '~/mappers/offers-mappers';
import { baseCurrencyString } from '~/utils/offers/currency';
import { convert } from '~/utils/offers/currency/currencyExchange';
import { createValidationRegex } from '~/utils/offers/zodRegex';

import { createRouter } from '../context';

const valuation = z.object({
  currency: z.string(),
  id: z.string().optional(),
  value: z.number(),
});

const company = z.object({
  createdAt: z.date(),
  description: z.string().nullish(),
  id: z.string().optional(),
  logoUrl: z.string().nullish(),
  name: z.string(),
  slug: z.string(),
  updatedAt: z.date(),
});

const offer = z.object({
  comments: z.string(),
  company: company.nullish(),
  companyId: z.string(),
  id: z.string().optional(),
  jobType: z.string().regex(createValidationRegex(Object.keys(JobType), null)),
  location: z.string(),
  monthYearReceived: z.date(),
  negotiationStrategy: z.string(),
  offersFullTime: z
    .object({
      baseSalary: valuation.nullish(),
      baseSalaryId: z.string().nullish(),
      bonus: valuation.nullish(),
      bonusId: z.string().nullish(),
      id: z.string().optional(),
      level: z.string().nullish(),
      specialization: z.string(),
      stocks: valuation.nullish(),
      stocksId: z.string().nullish(),
      title: z.string(),
      totalCompensation: valuation.nullish(),
      totalCompensationId: z.string().nullish(),
    })
    .nullish(),
  offersFullTimeId: z.string().nullish(),
  offersIntern: z
    .object({
      id: z.string().optional(),
      internshipCycle: z.string().nullish(),
      monthlySalary: valuation.nullish(),
      specialization: z.string(),
      startYear: z.number().nullish(),
      title: z.string(),
      totalCompensation: valuation.nullish(), // Full time
    })
    .nullish(),
  offersInternId: z.string().nullish(),
  profileId: z.string().nullish(),
});

const experience = z.object({
  backgroundId: z.string().nullish(),
  company: company.nullish(),
  companyId: z.string().nullish(),
  durationInMonths: z.number().nullish(),
  id: z.string().optional(),
  jobType: z
    .string()
    .regex(createValidationRegex(Object.keys(JobType), null))
    .nullish(),
  level: z.string().nullish(),
  location: z.string().nullish(),
  monthlySalary: valuation.nullish(),
  monthlySalaryId: z.string().nullish(),
  specialization: z.string().nullish(),
  title: z.string().nullish(),
  totalCompensation: valuation.nullish(),
  totalCompensationId: z.string().nullish(),
});

const education = z.object({
  backgroundId: z.string().nullish(),
  endDate: z.date().nullish(),
  field: z.string().nullish(),
  id: z.string().optional(),
  school: z.string().nullish(),
  startDate: z.date().nullish(),
  type: z.string().nullish(),
});

export const offersProfileRouter = createRouter()
  .query('listOne', {
    input: z.object({
      profileId: z.string(),
      token: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const result = await ctx.prisma.offersProfile.findFirst({
        include: {
          analysis: {
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
          },
          background: {
            include: {
              educations: true,
              experiences: {
                include: {
                  company: true,
                  monthlySalary: true,
                  totalCompensation: true,
                },
              },
              specificYoes: true,
            },
          },
          discussion: {
            include: {
              replies: true,
              replyingTo: true,
              user: true,
            },
          },
          offers: {
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
            },
          },
        },
        where: {
          id: input.profileId,
        },
      });

      if (result) {
        return profileDtoMapper(result, input.token);
      }

      throw new trpc.TRPCError({
        code: 'NOT_FOUND',
        message: 'Profile does not exist',
      });
    },
  })
  .mutation('create', {
    input: z.object({
      background: z.object({
        educations: z.array(education),
        experiences: z.array(experience),
        specificYoes: z.array(
          z.object({
            domain: z.string(),
            yoe: z.number(),
          }),
        ),
        totalYoe: z.number(),
      }),
      offers: z.array(offer),
    }),
    async resolve({ ctx, input }) {
      // TODO: add more
      const token = crypto
        .createHash('sha256')
        .update(Date.now().toString())
        .digest('hex');

      const profile = await ctx.prisma.offersProfile.create({
        data: {
          background: {
            create: {
              educations: {
                create: input.background.educations.map((x) => ({
                  endDate: x.endDate,
                  field: x.field,
                  school: x.school,
                  startDate: x.startDate,
                  type: x.type,
                })),
              },
              experiences: {
                create: input.background.experiences.map(async (x) => {
                  if (
                    x.jobType === JobType.FULLTIME &&
                    x.totalCompensation?.currency != null &&
                    x.totalCompensation?.value != null
                  ) {
                    if (x.companyId) {
                      return {
                        company: {
                          connect: {
                            id: x.companyId,
                          },
                        },
                        durationInMonths: x.durationInMonths,
                        jobType: x.jobType,
                        level: x.level,
                        specialization: x.specialization,
                        title: x.title,
                        totalCompensation: {
                          create: {
                            baseCurrency: baseCurrencyString,
                            baseValue: await convert(
                              x.totalCompensation.value,
                              x.totalCompensation.currency,
                              baseCurrencyString,
                            ),
                            currency: x.totalCompensation.currency,
                            value: x.totalCompensation.value,
                          },
                        },
                      };
                    }
                    return {
                      durationInMonths: x.durationInMonths,
                      jobType: x.jobType,
                      level: x.level,
                      location: x.location,
                      specialization: x.specialization,
                      title: x.title,
                      totalCompensation: {
                        create: {
                          baseCurrency: baseCurrencyString,
                          baseValue: await convert(
                            x.totalCompensation.value,
                            x.totalCompensation.currency,
                            baseCurrencyString,
                          ),
                          currency: x.totalCompensation.currency,
                          value: x.totalCompensation.value,
                        },
                      },
                    };
                  }
                  if (
                    x.jobType === JobType.INTERN &&
                    x.monthlySalary?.currency != null &&
                    x.monthlySalary?.value != null
                  ) {
                    if (x.companyId) {
                      return {
                        company: {
                          connect: {
                            id: x.companyId,
                          },
                        },
                        durationInMonths: x.durationInMonths,
                        jobType: x.jobType,
                        monthlySalary: {
                          create: {
                            baseCurrency: baseCurrencyString,
                            baseValue: await convert(
                              x.monthlySalary.value,
                              x.monthlySalary.currency,
                              baseCurrencyString,
                            ),
                            currency: x.monthlySalary.currency,
                            value: x.monthlySalary.value,
                          },
                        },
                        specialization: x.specialization,
                        title: x.title,
                      };
                    }
                    return {
                      durationInMonths: x.durationInMonths,
                      jobType: x.jobType,
                      monthlySalary: {
                        create: {
                          baseCurrency: baseCurrencyString,
                          baseValue: await convert(
                            x.monthlySalary.value,
                            x.monthlySalary.currency,
                            baseCurrencyString,
                          ),
                          currency: x.monthlySalary.currency,
                          value: x.monthlySalary.value,
                        },
                      },
                      specialization: x.specialization,
                      title: x.title,
                    };
                  }

                  throw new trpc.TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Missing fields in background experiences.',
                  });
                }),
              },
              specificYoes: {
                create: input.background.specificYoes.map((x) => {
                  return {
                    domain: x.domain,
                    yoe: x.yoe,
                  };
                }),
              },
              totalYoe: input.background.totalYoe,
            },
          },
          editToken: token,
          offers: {
            create: await Promise.all(
              input.offers.map(async (x) => {
                if (
                  x.jobType === JobType.INTERN &&
                  x.offersIntern &&
                  x.offersIntern.internshipCycle != null &&
                  x.offersIntern.monthlySalary?.currency != null &&
                  x.offersIntern.monthlySalary?.value != null &&
                  x.offersIntern.startYear != null
                ) {
                  return {
                    comments: x.comments,
                    company: {
                      connect: {
                        id: x.companyId,
                      },
                    },
                    jobType: x.jobType,
                    location: x.location,
                    monthYearReceived: x.monthYearReceived,
                    negotiationStrategy: x.negotiationStrategy,
                    offersIntern: {
                      create: {
                        internshipCycle: x.offersIntern.internshipCycle,
                        monthlySalary: {
                          create: {
                            baseCurrency: baseCurrencyString,
                            baseValue: await convert(
                              x.offersIntern.monthlySalary.value,
                              x.offersIntern.monthlySalary.currency,
                              baseCurrencyString,
                            ),
                            currency: x.offersIntern.monthlySalary.currency,
                            value: x.offersIntern.monthlySalary.value,
                          },
                        },
                        specialization: x.offersIntern.specialization,
                        startYear: x.offersIntern.startYear,
                        title: x.offersIntern.title,
                      },
                    },
                  };
                }
                if (
                  x.jobType === JobType.FULLTIME &&
                  x.offersFullTime &&
                  x.offersFullTime.baseSalary?.currency != null &&
                  x.offersFullTime.baseSalary?.value != null &&
                  x.offersFullTime.bonus?.currency != null &&
                  x.offersFullTime.bonus?.value != null &&
                  x.offersFullTime.stocks?.currency != null &&
                  x.offersFullTime.stocks?.value != null &&
                  x.offersFullTime.totalCompensation?.currency != null &&
                  x.offersFullTime.totalCompensation?.value != null &&
                  x.offersFullTime.level != null &&
                  x.offersFullTime.title != null &&
                  x.offersFullTime.specialization != null
                ) {
                  return {
                    comments: x.comments,
                    company: {
                      connect: {
                        id: x.companyId,
                      },
                    },
                    jobType: x.jobType,
                    location: x.location,
                    monthYearReceived: x.monthYearReceived,
                    negotiationStrategy: x.negotiationStrategy,
                    offersFullTime: {
                      create: {
                        baseSalary: {
                          create: {
                            baseCurrency: baseCurrencyString,
                            baseValue: await convert(
                              x.offersFullTime.baseSalary.value,
                              x.offersFullTime.baseSalary.currency,
                              baseCurrencyString,
                            ),
                            currency: x.offersFullTime.baseSalary.currency,
                            value: x.offersFullTime.baseSalary.value,
                          },
                        },
                        bonus: {
                          create: {
                            baseCurrency: baseCurrencyString,
                            baseValue: await convert(
                              x.offersFullTime.bonus.value,
                              x.offersFullTime.bonus.currency,
                              baseCurrencyString,
                            ),
                            currency: x.offersFullTime.bonus.currency,
                            value: x.offersFullTime.bonus.value,
                          },
                        },
                        level: x.offersFullTime.level,
                        specialization: x.offersFullTime.specialization,
                        stocks: {
                          create: {
                            baseCurrency: baseCurrencyString,
                            baseValue: await convert(
                              x.offersFullTime.stocks.value,
                              x.offersFullTime.stocks.currency,
                              baseCurrencyString,
                            ),
                            currency: x.offersFullTime.stocks.currency,
                            value: x.offersFullTime.stocks.value,
                          },
                        },
                        title: x.offersFullTime.title,
                        totalCompensation: {
                          create: {
                            baseCurrency: baseCurrencyString,
                            baseValue: await convert(
                              x.offersFullTime.totalCompensation.value,
                              x.offersFullTime.totalCompensation.currency,
                              baseCurrencyString,
                            ),
                            currency:
                              x.offersFullTime.totalCompensation.currency,
                            value: x.offersFullTime.totalCompensation.value,
                          },
                        },
                      },
                    },
                  };
                }

                // Throw error
                throw new trpc.TRPCError({
                  code: 'BAD_REQUEST',
                  message: 'Missing fields in offers.',
                });
              }),
            ),
          },
          profileName: randomUUID().substring(0, 10),
        },
      });

      return createOfferProfileResponseMapper(profile, token);
    },
  })
  .mutation('delete', {
    input: z.object({
      profileId: z.string(),
      token: z.string(),
    }),
    async resolve({ ctx, input }) {
      const profileToDelete = await ctx.prisma.offersProfile.findFirst({
        where: {
          id: input.profileId,
        },
      });
      const profileEditToken = profileToDelete?.editToken;

      if (profileEditToken === input.token) {
        const deletedProfile = await ctx.prisma.offersProfile.delete({
          where: {
            id: input.profileId,
          },
        });

        return deletedProfile.id;
      }

      throw new trpc.TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid token.',
      });
    },
  })
  .mutation('update', {
    input: z.object({
      background: z.object({
        educations: z.array(education),
        experiences: z.array(experience),
        id: z.string().optional(),
        offersProfileId: z.string().optional(),
        specificYoes: z.array(
          z.object({
            backgroundId: z.string().optional(),
            domain: z.string(),
            id: z.string().optional(),
            yoe: z.number(),
          }),
        ),
        totalYoe: z.number(),
      }),
      createdAt: z.string().optional(),
      id: z.string(),
      isEditable: z.boolean().nullish(),
      offers: z.array(offer),
      profileName: z.string().optional(),
      token: z.string(),
      userId: z.string().nullish(),
    }),
    async resolve({ ctx, input }) {
      const profileToUpdate = await ctx.prisma.offersProfile.findFirst({
        where: {
          id: input.id,
        },
      });
      const profileEditToken = profileToUpdate?.editToken;

      if (profileEditToken === input.token) {
        if (input.profileName) {
          await ctx.prisma.offersProfile.update({
            data: {
              profileName: input.profileName,
            },
            where: {
              id: input.id,
            },
          });
        }

        await ctx.prisma.offersBackground.update({
          data: {
            totalYoe: input.background.totalYoe,
          },
          where: {
            id: input.background.id,
          },
        });

        // Delete educations
        const educationsId = (
          await ctx.prisma.offersEducation.findMany({
            where: {
              backgroundId: input.background.id,
            },
          })
        ).map((x) => x.id);

        for (const id of educationsId) {
          if (!input.background.educations.map((x) => x.id).includes(id)) {
            await ctx.prisma.offersEducation.delete({
              where: {
                id,
              },
            });
          }
        }

        for (const edu of input.background.educations) {
          if (edu.id) {
            // Update existing education
            await ctx.prisma.offersEducation.update({
              data: {
                endDate: edu.endDate,
                field: edu.field,
                school: edu.school,
                startDate: edu.startDate,
                type: edu.type,
              },
              where: {
                id: edu.id,
              },
            });
          } else {
            // Create new education
            await ctx.prisma.offersBackground.update({
              data: {
                educations: {
                  create: {
                    endDate: edu.endDate,
                    field: edu.field,
                    school: edu.school,
                    startDate: edu.startDate,
                    type: edu.type,
                  },
                },
              },
              where: {
                id: input.background.id,
              },
            });
          }
        }

        // Delete experiences
        const experiencesId = (
          await ctx.prisma.offersExperience.findMany({
            where: {
              backgroundId: input.background.id,
            },
          })
        ).map((x) => x.id);

        for (const id of experiencesId) {
          if (!input.background.experiences.map((x) => x.id).includes(id)) {
            await ctx.prisma.offersExperience.delete({
              where: {
                id,
              },
            });
          }
        }

        for (const exp of input.background.experiences) {
          if (exp.id) {
            // Update existing experience
            await ctx.prisma.offersExperience.update({
              data: {
                companyId: exp.companyId, // TODO: check if can change with connect or whether there is a difference
                durationInMonths: exp.durationInMonths,
                level: exp.level,
                specialization: exp.specialization,
              },
              where: {
                id: exp.id,
              },
            });

            if (exp.monthlySalary) {
              if (exp.monthlySalary.id) {
                await ctx.prisma.offersCurrency.update({
                  data: {
                    baseCurrency: baseCurrencyString,
                    baseValue: await convert(
                      exp.monthlySalary.value,
                      exp.monthlySalary.currency,
                      baseCurrencyString,
                    ),
                    currency: exp.monthlySalary.currency,
                    value: exp.monthlySalary.value,
                  },
                  where: {
                    id: exp.monthlySalary.id,
                  },
                });
              } else {
                await ctx.prisma.offersExperience.update({
                  data: {
                    monthlySalary: {
                      create: {
                        baseCurrency: baseCurrencyString,
                        baseValue: await convert(
                          exp.monthlySalary.value,
                          exp.monthlySalary.currency,
                          baseCurrencyString,
                        ),
                        currency: exp.monthlySalary.currency,
                        value: exp.monthlySalary.value,
                      },
                    },
                  },
                  where: {
                    id: exp.id,
                  },
                });
              }
            }

            if (exp.totalCompensation) {
              if (exp.totalCompensation.id) {
                await ctx.prisma.offersCurrency.update({
                  data: {
                    baseCurrency: baseCurrencyString,
                    baseValue: await convert(
                      exp.totalCompensation.value,
                      exp.totalCompensation.currency,
                      baseCurrencyString,
                    ),
                    currency: exp.totalCompensation.currency,
                    value: exp.totalCompensation.value,
                  },
                  where: {
                    id: exp.totalCompensation.id,
                  },
                });
              } else {
                await ctx.prisma.offersExperience.update({
                  data: {
                    totalCompensation: {
                      create: {
                        baseCurrency: baseCurrencyString,
                        baseValue: await convert(
                          exp.totalCompensation.value,
                          exp.totalCompensation.currency,
                          baseCurrencyString,
                        ),
                        currency: exp.totalCompensation.currency,
                        value: exp.totalCompensation.value,
                      },
                    },
                  },
                  where: {
                    id: exp.id,
                  },
                });
              }
            }
          } else if (!exp.id) {
            // Create new experience
            if (exp.jobType === JobType.FULLTIME) {
              if (
                exp.totalCompensation?.currency != null &&
                exp.totalCompensation?.value != null
              ) {
                if (exp.companyId) {
                  await ctx.prisma.offersBackground.update({
                    data: {
                      experiences: {
                        create: {
                          company: {
                            connect: {
                              id: exp.companyId,
                            },
                          },
                          durationInMonths: exp.durationInMonths,
                          jobType: exp.jobType,
                          level: exp.level,
                          location: exp.location,
                          specialization: exp.specialization,
                          title: exp.title,
                          totalCompensation: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                exp.totalCompensation.value,
                                exp.totalCompensation.currency,
                                baseCurrencyString,
                              ),
                              currency: exp.totalCompensation.currency,
                              value: exp.totalCompensation.value,
                            },
                          },
                        },
                      },
                    },
                    where: {
                      id: input.background.id,
                    },
                  });
                } else {
                  await ctx.prisma.offersBackground.update({
                    data: {
                      experiences: {
                        create: {
                          durationInMonths: exp.durationInMonths,
                          jobType: exp.jobType,
                          level: exp.level,
                          location: exp.location,
                          specialization: exp.specialization,
                          title: exp.title,
                          totalCompensation: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                exp.totalCompensation.value,
                                exp.totalCompensation.currency,
                                baseCurrencyString,
                              ),
                              currency: exp.totalCompensation.currency,
                              value: exp.totalCompensation.value,
                            },
                          },
                        },
                      },
                    },
                    where: {
                      id: input.background.id,
                    },
                  });
                }
              } else if (exp.companyId) {
                await ctx.prisma.offersBackground.update({
                  data: {
                    experiences: {
                      create: {
                        company: {
                          connect: {
                            id: exp.companyId,
                          },
                        },
                        durationInMonths: exp.durationInMonths,
                        jobType: exp.jobType,
                        level: exp.level,
                        location: exp.location,
                        specialization: exp.specialization,
                        title: exp.title,
                      },
                    },
                  },
                  where: {
                    id: input.background.id,
                  },
                });
              } else {
                await ctx.prisma.offersBackground.update({
                  data: {
                    experiences: {
                      create: {
                        durationInMonths: exp.durationInMonths,
                        jobType: exp.jobType,
                        level: exp.level,
                        location: exp.location,
                        specialization: exp.specialization,
                        title: exp.title,
                      },
                    },
                  },
                  where: {
                    id: input.background.id,
                  },
                });
              }
            } else if (exp.jobType === JobType.INTERN) {
              if (
                exp.monthlySalary?.currency != null &&
                exp.monthlySalary?.value != null
              ) {
                if (exp.companyId) {
                  await ctx.prisma.offersBackground.update({
                    data: {
                      experiences: {
                        create: {
                          company: {
                            connect: {
                              id: exp.companyId,
                            },
                          },
                          durationInMonths: exp.durationInMonths,
                          jobType: exp.jobType,
                          location: exp.location,
                          monthlySalary: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                exp.monthlySalary.value,
                                exp.monthlySalary.currency,
                                baseCurrencyString,
                              ),
                              currency: exp.monthlySalary.currency,
                              value: exp.monthlySalary.value,
                            },
                          },
                          specialization: exp.specialization,
                          title: exp.title,
                        },
                      },
                    },
                    where: {
                      id: input.background.id,
                    },
                  });
                } else {
                  await ctx.prisma.offersBackground.update({
                    data: {
                      experiences: {
                        create: {
                          durationInMonths: exp.durationInMonths,
                          jobType: exp.jobType,
                          location: exp.location,
                          monthlySalary: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                exp.monthlySalary.value,
                                exp.monthlySalary.currency,
                                baseCurrencyString,
                              ),
                              currency: exp.monthlySalary.currency,
                              value: exp.monthlySalary.value,
                            },
                          },
                          specialization: exp.specialization,
                          title: exp.title,
                        },
                      },
                    },
                    where: {
                      id: input.background.id,
                    },
                  });
                }
              } else if (exp.companyId) {
                await ctx.prisma.offersBackground.update({
                  data: {
                    experiences: {
                      create: {
                        company: {
                          connect: {
                            id: exp.companyId,
                          },
                        },
                        durationInMonths: exp.durationInMonths,
                        jobType: exp.jobType,
                        location: exp.location,
                        specialization: exp.specialization,
                        title: exp.title,
                      },
                    },
                  },
                  where: {
                    id: input.background.id,
                  },
                });
              } else {
                await ctx.prisma.offersBackground.update({
                  data: {
                    experiences: {
                      create: {
                        durationInMonths: exp.durationInMonths,
                        jobType: exp.jobType,
                        location: exp.location,
                        specialization: exp.specialization,
                        title: exp.title,
                      },
                    },
                  },
                  where: {
                    id: input.background.id,
                  },
                });
              }
            }
          }
        }

        // Delete specific yoes
        const yoesId = (
          await ctx.prisma.offersSpecificYoe.findMany({
            where: {
              backgroundId: input.background.id,
            },
          })
        ).map((x) => x.id);

        for (const id of yoesId) {
          if (!input.background.specificYoes.map((x) => x.id).includes(id)) {
            await ctx.prisma.offersSpecificYoe.delete({
              where: {
                id,
              },
            });
          }
        }

        for (const yoe of input.background.specificYoes) {
          if (yoe.id) {
            // Update existing yoe
            await ctx.prisma.offersSpecificYoe.update({
              data: {
                ...yoe,
              },
              where: {
                id: yoe.id,
              },
            });
          } else {
            // Create new yoe
            await ctx.prisma.offersBackground.update({
              data: {
                specificYoes: {
                  create: {
                    domain: yoe.domain,
                    yoe: yoe.yoe,
                  },
                },
              },
              where: {
                id: input.background.id,
              },
            });
          }
        }

        // Delete specific offers
        const offers = (
          await ctx.prisma.offersOffer.findMany({
            where: {
              profileId: input.id,
            },
          })
        ).map((x) => x.id);

        for (const id of offers) {
          if (!input.offers.map((x) => x.id).includes(id)) {
            await ctx.prisma.offersOffer.delete({
              where: {
                id,
              },
            });
          }
        }

        // Update remaining offers
        for (const offerToUpdate of input.offers) {
          if (offerToUpdate.id) {
            // Update existing offer
            await ctx.prisma.offersOffer.update({
              data: {
                comments: offerToUpdate.comments,
                companyId: offerToUpdate.companyId,
                jobType:
                  offerToUpdate.jobType === JobType.FULLTIME
                    ? JobType.FULLTIME
                    : JobType.INTERN,
                location: offerToUpdate.location,
                monthYearReceived: offerToUpdate.monthYearReceived,
                negotiationStrategy: offerToUpdate.negotiationStrategy,
              },
              where: {
                id: offerToUpdate.id,
              },
            });

            if (offerToUpdate.offersIntern?.monthlySalary != null) {
              await ctx.prisma.offersIntern.update({
                data: {
                  internshipCycle:
                    offerToUpdate.offersIntern.internshipCycle ?? undefined,
                  specialization: offerToUpdate.offersIntern.specialization,
                  startYear: offerToUpdate.offersIntern.startYear ?? undefined,
                  title: offerToUpdate.offersIntern.title,
                },
                where: {
                  id: offerToUpdate.offersIntern.id,
                },
              });
              await ctx.prisma.offersCurrency.update({
                data: {
                  baseCurrency: baseCurrencyString,
                  baseValue: await convert(
                    offerToUpdate.offersIntern.monthlySalary.value,
                    offerToUpdate.offersIntern.monthlySalary.currency,
                    baseCurrencyString,
                  ),
                  currency: offerToUpdate.offersIntern.monthlySalary.currency,
                  value: offerToUpdate.offersIntern.monthlySalary.value,
                },
                where: {
                  id: offerToUpdate.offersIntern.monthlySalary.id,
                },
              });
            }

            if (offerToUpdate.offersFullTime?.totalCompensation != null) {
              await ctx.prisma.offersFullTime.update({
                data: {
                  level: offerToUpdate.offersFullTime.level ?? undefined,
                  specialization: offerToUpdate.offersFullTime.specialization,
                  title: offerToUpdate.offersFullTime.title,
                },
                where: {
                  id: offerToUpdate.offersFullTime.id,
                },
              });
              if (offerToUpdate.offersFullTime.baseSalary != null) {
                await ctx.prisma.offersCurrency.update({
                  data: {
                    baseCurrency: baseCurrencyString,
                    baseValue: await convert(
                      offerToUpdate.offersFullTime.baseSalary.value,
                      offerToUpdate.offersFullTime.baseSalary.currency,
                      baseCurrencyString,
                    ),
                    currency: offerToUpdate.offersFullTime.baseSalary.currency,
                    value: offerToUpdate.offersFullTime.baseSalary.value,
                  },
                  where: {
                    id: offerToUpdate.offersFullTime.baseSalary.id,
                  },
                });
              }
              if (offerToUpdate.offersFullTime.bonus) {
                await ctx.prisma.offersCurrency.update({
                  data: {
                    baseCurrency: baseCurrencyString,
                    baseValue: await convert(
                      offerToUpdate.offersFullTime.bonus.value,
                      offerToUpdate.offersFullTime.bonus.currency,
                      baseCurrencyString,
                    ),
                    currency: offerToUpdate.offersFullTime.bonus.currency,
                    value: offerToUpdate.offersFullTime.bonus.value,
                  },
                  where: {
                    id: offerToUpdate.offersFullTime.bonus.id,
                  },
                });
              }
              if (offerToUpdate.offersFullTime.stocks) {
                await ctx.prisma.offersCurrency.update({
                  data: {
                    baseCurrency: baseCurrencyString,
                    baseValue: await convert(
                      offerToUpdate.offersFullTime.stocks.value,
                      offerToUpdate.offersFullTime.stocks.currency,
                      baseCurrencyString,
                    ),
                    currency: offerToUpdate.offersFullTime.stocks.currency,
                    value: offerToUpdate.offersFullTime.stocks.value,
                  },
                  where: {
                    id: offerToUpdate.offersFullTime.stocks.id,
                  },
                });
              }
              await ctx.prisma.offersCurrency.update({
                data: {
                  baseCurrency: baseCurrencyString,
                  baseValue: await convert(
                    offerToUpdate.offersFullTime.totalCompensation.value,
                    offerToUpdate.offersFullTime.totalCompensation.currency,
                    baseCurrencyString,
                  ),
                  currency:
                    offerToUpdate.offersFullTime.totalCompensation.currency,
                  value: offerToUpdate.offersFullTime.totalCompensation.value,
                },
                where: {
                  id: offerToUpdate.offersFullTime.totalCompensation.id,
                },
              });
            }
          } else {
            // Create new offer
            if (
              offerToUpdate.jobType === JobType.INTERN &&
              offerToUpdate.offersIntern &&
              offerToUpdate.offersIntern.internshipCycle != null &&
              offerToUpdate.offersIntern.monthlySalary?.currency != null &&
              offerToUpdate.offersIntern.monthlySalary?.value != null &&
              offerToUpdate.offersIntern.startYear != null
            ) {
              await ctx.prisma.offersProfile.update({
                data: {
                  offers: {
                    create: {
                      comments: offerToUpdate.comments,
                      company: {
                        connect: {
                          id: offerToUpdate.companyId,
                        },
                      },
                      jobType: offerToUpdate.jobType,
                      location: offerToUpdate.location,
                      monthYearReceived: offerToUpdate.monthYearReceived,
                      negotiationStrategy: offerToUpdate.negotiationStrategy,
                      offersIntern: {
                        create: {
                          internshipCycle:
                            offerToUpdate.offersIntern.internshipCycle,
                          monthlySalary: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                offerToUpdate.offersIntern.monthlySalary.value,
                                offerToUpdate.offersIntern.monthlySalary
                                  .currency,
                                baseCurrencyString,
                              ),
                              currency:
                                offerToUpdate.offersIntern.monthlySalary
                                  .currency,
                              value:
                                offerToUpdate.offersIntern.monthlySalary.value,
                            },
                          },
                          specialization:
                            offerToUpdate.offersIntern.specialization,
                          startYear: offerToUpdate.offersIntern.startYear,
                          title: offerToUpdate.offersIntern.title,
                        },
                      },
                    },
                  },
                },
                where: {
                  id: input.id,
                },
              });
            }
            if (
              offerToUpdate.jobType === JobType.FULLTIME &&
              offerToUpdate.offersFullTime &&
              offerToUpdate.offersFullTime.baseSalary?.currency != null &&
              offerToUpdate.offersFullTime.baseSalary?.value != null &&
              offerToUpdate.offersFullTime.bonus?.currency != null &&
              offerToUpdate.offersFullTime.bonus?.value != null &&
              offerToUpdate.offersFullTime.stocks?.currency != null &&
              offerToUpdate.offersFullTime.stocks?.value != null &&
              offerToUpdate.offersFullTime.totalCompensation?.currency !=
                null &&
              offerToUpdate.offersFullTime.totalCompensation?.value != null &&
              offerToUpdate.offersFullTime.level != null
            ) {
              await ctx.prisma.offersProfile.update({
                data: {
                  offers: {
                    create: {
                      comments: offerToUpdate.comments,
                      company: {
                        connect: {
                          id: offerToUpdate.companyId,
                        },
                      },
                      jobType: offerToUpdate.jobType,
                      location: offerToUpdate.location,
                      monthYearReceived: offerToUpdate.monthYearReceived,
                      negotiationStrategy: offerToUpdate.negotiationStrategy,
                      offersFullTime: {
                        create: {
                          baseSalary: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                offerToUpdate.offersFullTime.baseSalary.value,
                                offerToUpdate.offersFullTime.baseSalary
                                  .currency,
                                baseCurrencyString,
                              ),
                              currency:
                                offerToUpdate.offersFullTime.baseSalary
                                  .currency,
                              value:
                                offerToUpdate.offersFullTime.baseSalary.value,
                            },
                          },
                          bonus: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                offerToUpdate.offersFullTime.bonus.value,
                                offerToUpdate.offersFullTime.bonus.currency,
                                baseCurrencyString,
                              ),
                              currency:
                                offerToUpdate.offersFullTime.bonus.currency,
                              value: offerToUpdate.offersFullTime.bonus.value,
                            },
                          },
                          level: offerToUpdate.offersFullTime.level,
                          specialization:
                            offerToUpdate.offersFullTime.specialization,
                          stocks: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                offerToUpdate.offersFullTime.stocks.value,
                                offerToUpdate.offersFullTime.stocks.currency,
                                baseCurrencyString,
                              ),
                              currency:
                                offerToUpdate.offersFullTime.stocks.currency,
                              value: offerToUpdate.offersFullTime.stocks.value,
                            },
                          },
                          title: offerToUpdate.offersFullTime.title,
                          totalCompensation: {
                            create: {
                              baseCurrency: baseCurrencyString,
                              baseValue: await convert(
                                offerToUpdate.offersFullTime.totalCompensation
                                  .value,
                                offerToUpdate.offersFullTime.totalCompensation
                                  .currency,
                                baseCurrencyString,
                              ),
                              currency:
                                offerToUpdate.offersFullTime.totalCompensation
                                  .currency,
                              value:
                                offerToUpdate.offersFullTime.totalCompensation
                                  .value,
                            },
                          },
                        },
                      },
                    },
                  },
                },
                where: {
                  id: input.id,
                },
              });
            }
          }
        }

        const result = await ctx.prisma.offersProfile.findFirst({
          where: {
            id: input.id,
          },
        });

        if (result) {
          return createOfferProfileResponseMapper(result, input.token);
        }

        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Profile does not exist',
        });
      }

      throw new trpc.TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid token.',
      });
    },
  })
  .mutation('addToUserProfile', {
    input: z.object({
      profileId: z.string(),
      token: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const profile = await ctx.prisma.offersProfile.findFirst({
        where: {
          id: input.profileId,
        },
      });

      const profileEditToken = profile?.editToken;

      if (profileEditToken === input.token) {
        const updated = await ctx.prisma.offersProfile.update({
          data: {
            user: {
              connect: {
                id: input.userId,
              },
            },
          },
          where: {
            id: input.profileId,
          },
        });

        return addToProfileResponseMapper(updated);
      }

      throw new trpc.TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid token.',
      });
    },
  });
