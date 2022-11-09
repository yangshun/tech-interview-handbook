import crypto from 'crypto';
import { z } from 'zod';
import type { OffersProfile } from '@prisma/client';
import { JobType } from '@prisma/client';
import * as trpc from '@trpc/server';

import {
  createOfferProfileResponseMapper,
  profileDtoMapper,
} from '~/mappers/offers-mappers';
import { analysisInclusion } from '~/utils/offers/analysis/analysisInclusion';
import { baseCurrencyString } from '~/utils/offers/currency';
import { convert } from '~/utils/offers/currency/currencyExchange';
import {
  generateRandomName,
  generateRandomStringForToken,
} from '~/utils/offers/randomGenerator';
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
  cityId: z.string(),
  comments: z.string(),
  company: company.nullish(),
  companyId: z.string(),
  id: z.string().optional(),
  jobType: z.string().regex(createValidationRegex(Object.keys(JobType), null)),
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
  cityId: z.string().nullish(),
  company: company.nullish(),
  companyId: z.string().nullish(),
  durationInMonths: z.number().nullish(),
  id: z.string().optional(),
  jobType: z
    .string()
    .regex(createValidationRegex(Object.keys(JobType), null))
    .nullish(),
  level: z.string().nullish(),
  monthlySalary: valuation.nullish(),
  monthlySalaryId: z.string().nullish(),
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
  .query('isValidToken', {
    input: z.object({
      profileId: z.string(),
      token: z.string(),
    }),
    async resolve({ ctx, input }) {
      const profile: OffersProfile | null =
        await ctx.prisma.offersProfile.findFirst({
          where: {
            id: input.profileId,
          },
        });

      return profile?.editToken === input.token;
    },
  })
  .query('isSaved', {
    input: z.object({
      profileId: z.string(),
      userId: z.string().nullish(),
    }),
    async resolve({ ctx, input }) {
      if (!input.userId) {
        return false;
      }

      const profile = await ctx.prisma.offersProfile.findFirst({
        include: {
          users: true,
        },
        where: {
          id: input.profileId,
        },
      });

      const users = profile?.users;

      if (!users) {
        return false;
      }

      let isSaved = false;

      for (let i = 0; i < users.length; i++) {
        if (users[i].id === input.userId) {
          isSaved = true;
        }
      }

      return isSaved;
    },
  })
  .query('listOne', {
    input: z.object({
      profileId: z.string(),
      token: z.string().optional(),
      userId: z.string().nullish(),
    }),
    async resolve({ ctx, input }) {
      const result = await ctx.prisma.offersProfile.findFirst({
        include: {
          analysis: {
            include: analysisInclusion,
          },
          background: {
            include: {
              educations: true,
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
            },
          },
          users: true,
        },
        where: {
          id: input.profileId,
        },
      });

      if (result) {
        return profileDtoMapper(result, input.token, input.userId);
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
        .update(Date.now().toString() + generateRandomStringForToken())
        .digest('hex');

      // Generate random name until unique
      const uniqueName: string = await generateRandomName();

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
                create: await Promise.all(
                  input.background.experiences.map(async (x) => {
                    if (x.jobType === JobType.FULLTIME) {
                      if (x.companyId) {
                        if (x.cityId) {
                          return {
                            company: {
                              connect: {
                                id: x.companyId,
                              },
                            },
                            durationInMonths: x.durationInMonths,
                            jobType: x.jobType,
                            level: x.level,
                            location: {
                              connect: {
                                id: x.cityId,
                              },
                            },
                            title: x.title,
                            totalCompensation:
                              x.totalCompensation != null
                                ? {
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
                                  }
                                : undefined,
                          };
                        }
                        return {
                          company: {
                            connect: {
                              id: x.companyId,
                            },
                          },
                          durationInMonths: x.durationInMonths,
                          jobType: x.jobType,
                          level: x.level,
                          title: x.title,
                          totalCompensation:
                            x.totalCompensation != null
                              ? {
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
                                }
                              : undefined,
                        };
                      }
                      if (x.cityId) {
                        return {
                          durationInMonths: x.durationInMonths,
                          jobType: x.jobType,
                          level: x.level,
                          location: {
                            connect: {
                              id: x.cityId,
                            },
                          },
                          title: x.title,
                          totalCompensation:
                            x.totalCompensation != null
                              ? {
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
                                }
                              : undefined,
                        };
                      }
                      return {
                        durationInMonths: x.durationInMonths,
                        jobType: x.jobType,
                        level: x.level,
                        title: x.title,
                        totalCompensation:
                          x.totalCompensation != null
                            ? {
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
                              }
                            : undefined,
                      };
                    }
                    if (x.jobType === JobType.INTERN) {
                      if (x.companyId) {
                        if (x.cityId) {
                          return {
                            company: {
                              connect: {
                                id: x.companyId,
                              },
                            },
                            durationInMonths: x.durationInMonths,
                            jobType: x.jobType,
                            location: {
                              connect: {
                                id: x.cityId,
                              },
                            },
                            monthlySalary:
                              x.monthlySalary != null
                                ? {
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
                                  }
                                : undefined,
                            title: x.title,
                          };
                        }
                        return {
                          company: {
                            connect: {
                              id: x.companyId,
                            },
                          },
                          durationInMonths: x.durationInMonths,
                          jobType: x.jobType,
                          monthlySalary:
                            x.monthlySalary != null
                              ? {
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
                                }
                              : undefined,
                          title: x.title,
                        };
                      }

                      if (x.cityId) {
                        return {
                          durationInMonths: x.durationInMonths,
                          jobType: x.jobType,
                          location: {
                            location: {
                              connect: {
                                id: x.cityId,
                              },
                            },
                          },
                          monthlySalary:
                            x.monthlySalary != null
                              ? {
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
                                }
                              : undefined,
                          title: x.title,
                        };
                      }

                      return {
                        durationInMonths: x.durationInMonths,
                        jobType: x.jobType,
                        monthlySalary:
                          x.monthlySalary != null
                            ? {
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
                              }
                            : undefined,
                        title: x.title,
                      };
                    }

                    throw new trpc.TRPCError({
                      code: 'BAD_REQUEST',
                      message: 'Missing fields in background experiences.',
                    });
                  }),
                ),
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
                    location: {
                      connect: {
                        id: x.cityId,
                      },
                    },
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
                        startYear: x.offersIntern.startYear,
                        title: x.offersIntern.title,
                      },
                    },
                  };
                }
                if (
                  x.jobType === JobType.FULLTIME &&
                  x.offersFullTime &&
                  x.offersFullTime.totalCompensation?.currency != null &&
                  x.offersFullTime.totalCompensation?.value != null &&
                  x.offersFullTime.level != null &&
                  x.offersFullTime.title != null
                ) {
                  return {
                    comments: x.comments,
                    company: {
                      connect: {
                        id: x.companyId,
                      },
                    },
                    jobType: x.jobType,
                    location: {
                      connect: {
                        id: x.cityId,
                      },
                    },
                    monthYearReceived: x.monthYearReceived,
                    negotiationStrategy: x.negotiationStrategy,
                    offersFullTime: {
                      create: {
                        baseSalary:
                          x.offersFullTime?.baseSalary != null
                            ? {
                                create: {
                                  baseCurrency: baseCurrencyString,
                                  baseValue: await convert(
                                    x.offersFullTime.baseSalary.value,
                                    x.offersFullTime.baseSalary.currency,
                                    baseCurrencyString,
                                  ),
                                  currency:
                                    x.offersFullTime.baseSalary.currency,
                                  value: x.offersFullTime.baseSalary.value,
                                },
                              }
                            : undefined,
                        bonus:
                          x.offersFullTime?.bonus != null
                            ? {
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
                              }
                            : undefined,
                        level: x.offersFullTime.level,
                        stocks:
                          x.offersFullTime?.stocks != null
                            ? {
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
                              }
                            : undefined,
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
          profileName: uniqueName,
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
            const currentExp = await ctx.prisma.offersExperience.findFirst({
              where: {
                id: exp.id,
              },
            });

            if (!currentExp) {
              throw new trpc.TRPCError({
                code: 'NOT_FOUND',
                message: 'Experience does not exist',
              });
            }

            await ctx.prisma.offersExperience.update({
              data: {
                companyId: exp.companyId, // TODO: check if can change with connect or whether there is a difference
                durationInMonths: exp.durationInMonths,
                jobType: exp.jobType as JobType,
                level: exp.level,
              },
              where: {
                id: exp.id,
              },
            });
            if (currentExp.jobType === exp.jobType) {
              // Update existing experience
              if (exp.monthlySalary) {
                await ctx.prisma.offersExperience.update({
                  data: {
                    monthlySalary: {
                      upsert: {
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
                        update: {
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
                  },
                  where: {
                    id: exp.id,
                  },
                });
              }

              if (exp.totalCompensation) {
                await ctx.prisma.offersExperience.update({
                  data: {
                    totalCompensation: {
                      upsert: {
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
                        update: {
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
                  where: {
                    id: exp.id,
                  },
                });
              }
            } else if (exp.jobType === JobType.INTERN) {
              // Add 1 remove the other
              if (exp.monthlySalary) {
                await ctx.prisma.offersExperience.update({
                  data: {
                    monthlySalary: {
                      upsert: {
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
                        update: {
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
                  },
                  where: {
                    id: exp.id,
                  },
                });
              }

              await ctx.prisma.offersExperience.update({
                data: {
                  totalCompensation: undefined,
                  totalCompensationId: null,
                },
                where: {
                  id: exp.id,
                },
              });
            } else if (exp.jobType === JobType.FULLTIME) {
              if (exp.totalCompensation) {
                await ctx.prisma.offersExperience.update({
                  data: {
                    totalCompensation: {
                      upsert: {
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
                        update: {
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
                  where: {
                    id: exp.id,
                  },
                });
              }

              await ctx.prisma.offersExperience.update({
                data: {
                  monthlySalary: undefined,
                  monthlySalaryId: null,
                },
                where: {
                  id: exp.id,
                },
              });
            }
          } else if (!exp.id) {
            // Create new experience
            if (exp.jobType === JobType.FULLTIME) {
              if (
                exp.totalCompensation?.currency != null &&
                exp.totalCompensation?.value != null
              ) {
                // FULLTIME
                if (exp.companyId) {
                  if (exp.cityId) {
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
                            location: {
                              connect: {
                                id: exp.cityId,
                              },
                            },
                            title: exp.title,
                            totalCompensation: exp.totalCompensation
                              ? {
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
                                }
                              : undefined,
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
                            company: {
                              connect: {
                                id: exp.companyId,
                              },
                            },
                            durationInMonths: exp.durationInMonths,
                            jobType: exp.jobType,
                            level: exp.level,
                            title: exp.title,
                            totalCompensation: exp.totalCompensation
                              ? {
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
                                }
                              : undefined,
                          },
                        },
                      },
                      where: {
                        id: input.background.id,
                      },
                    });
                  }
                } else if (exp.cityId) {
                  await ctx.prisma.offersBackground.update({
                    data: {
                      experiences: {
                        create: {
                          durationInMonths: exp.durationInMonths,
                          jobType: exp.jobType,
                          level: exp.level,
                          location: {
                            connect: {
                              id: exp.cityId,
                            },
                          },
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
                if (exp.cityId) {
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
                          location: {
                            connect: {
                              id: exp.cityId,
                            },
                          },
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
                          company: {
                            connect: {
                              id: exp.companyId,
                            },
                          },
                          durationInMonths: exp.durationInMonths,
                          jobType: exp.jobType,
                          level: exp.level,
                          title: exp.title,
                        },
                      },
                    },
                    where: {
                      id: input.background.id,
                    },
                  });
                }
              } else if (exp.cityId) {
                await ctx.prisma.offersBackground.update({
                  data: {
                    experiences: {
                      create: {
                        durationInMonths: exp.durationInMonths,
                        jobType: exp.jobType,
                        level: exp.level,
                        location: {
                          connect: {
                            id: exp.cityId,
                          },
                        },
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
                // INTERN
                if (exp.companyId) {
                  if (exp.cityId) {
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
                            location: {
                              connect: {
                                id: exp.cityId,
                              },
                            },
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
                            company: {
                              connect: {
                                id: exp.companyId,
                              },
                            },
                            durationInMonths: exp.durationInMonths,
                            jobType: exp.jobType,
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
                            title: exp.title,
                          },
                        },
                      },
                      where: {
                        id: input.background.id,
                      },
                    });
                  }
                } else if (exp.cityId) {
                  await ctx.prisma.offersBackground.update({
                    data: {
                      experiences: {
                        create: {
                          durationInMonths: exp.durationInMonths,
                          jobType: exp.jobType,
                          location: {
                            connect: {
                              id: exp.cityId,
                            },
                          },
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
                if (exp.cityId) {
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
                          location: {
                            connect: {
                              id: exp.cityId,
                            },
                          },
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
                          company: {
                            connect: {
                              id: exp.companyId,
                            },
                          },
                          durationInMonths: exp.durationInMonths,
                          jobType: exp.jobType,
                          title: exp.title,
                        },
                      },
                    },
                    where: {
                      id: input.background.id,
                    },
                  });
                }
              } else if (exp.cityId) {
                await ctx.prisma.offersBackground.update({
                  data: {
                    experiences: {
                      create: {
                        durationInMonths: exp.durationInMonths,
                        jobType: exp.jobType,
                        location: {
                          connect: {
                            id: exp.cityId,
                          },
                        },
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
            const currentOffer = await ctx.prisma.offersOffer.findFirst({
              where: {
                id: offerToUpdate.id,
              },
            });

            if (!currentOffer) {
              throw new trpc.TRPCError({
                code: 'NOT_FOUND',
                message: 'Offer to update does not exist',
              });
            }
            await ctx.prisma.offersOffer.update({
              data: {
                comments: offerToUpdate.comments,
                company: {
                  connect: {
                    id: offerToUpdate.companyId,
                  },
                },
                jobType:
                  offerToUpdate.jobType === JobType.FULLTIME
                    ? JobType.FULLTIME
                    : JobType.INTERN,
                location: {
                  connect: {
                    id: offerToUpdate.cityId,
                  },
                },
                monthYearReceived: offerToUpdate.monthYearReceived,
                negotiationStrategy: offerToUpdate.negotiationStrategy,
              },
              where: {
                id: offerToUpdate.id,
              },
            });

            if (currentOffer.jobType === offerToUpdate.jobType) {
              if (offerToUpdate.offersIntern?.monthlySalary != null) {
                await ctx.prisma.offersIntern.update({
                  data: {
                    internshipCycle:
                      offerToUpdate.offersIntern.internshipCycle ?? undefined,
                    monthlySalary: {
                      upsert: {
                        create: {
                          baseCurrency: baseCurrencyString,
                          baseValue: await convert(
                            offerToUpdate.offersIntern.monthlySalary.value,
                            offerToUpdate.offersIntern.monthlySalary.currency,
                            baseCurrencyString,
                          ),
                          currency:
                            offerToUpdate.offersIntern.monthlySalary.currency,
                          value: offerToUpdate.offersIntern.monthlySalary.value,
                        },
                        update: {
                          baseCurrency: baseCurrencyString,
                          baseValue: await convert(
                            offerToUpdate.offersIntern.monthlySalary.value,
                            offerToUpdate.offersIntern.monthlySalary.currency,
                            baseCurrencyString,
                          ),
                          currency:
                            offerToUpdate.offersIntern.monthlySalary.currency,
                          value: offerToUpdate.offersIntern.monthlySalary.value,
                        },
                      },
                    },
                    startYear:
                      offerToUpdate.offersIntern.startYear ?? undefined,
                    title: offerToUpdate.offersIntern.title,
                  },
                  where: {
                    id: offerToUpdate.offersIntern.id,
                  },
                });
              }

              if (offerToUpdate.offersFullTime?.totalCompensation != null) {
                await ctx.prisma.offersFullTime.update({
                  data: {
                    level: offerToUpdate.offersFullTime.level ?? undefined,
                    title: offerToUpdate.offersFullTime.title,
                  },
                  where: {
                    id: offerToUpdate.offersFullTime.id,
                  },
                });
                if (offerToUpdate.offersFullTime.baseSalary != null) {
                  await ctx.prisma.offersFullTime.update({
                    data: {
                      baseSalary: {
                        upsert: {
                          create: {
                            baseCurrency: baseCurrencyString,
                            baseValue: await convert(
                              offerToUpdate.offersFullTime.baseSalary.value,
                              offerToUpdate.offersFullTime.baseSalary.currency,
                              baseCurrencyString,
                            ),
                            currency:
                              offerToUpdate.offersFullTime.baseSalary.currency,
                            value:
                              offerToUpdate.offersFullTime.baseSalary.value,
                          },
                          update: {
                            baseCurrency: baseCurrencyString,
                            baseValue: await convert(
                              offerToUpdate.offersFullTime.baseSalary.value,
                              offerToUpdate.offersFullTime.baseSalary.currency,
                              baseCurrencyString,
                            ),
                            currency:
                              offerToUpdate.offersFullTime.baseSalary.currency,
                            value:
                              offerToUpdate.offersFullTime.baseSalary.value,
                          },
                        },
                      },
                    },
                    where: {
                      id: offerToUpdate.offersFullTime.id,
                    },
                  });
                }
                if (offerToUpdate.offersFullTime.bonus != null) {
                  await ctx.prisma.offersFullTime.update({
                    data: {
                      bonus: {
                        upsert: {
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
                          update: {
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
                      },
                    },
                    where: {
                      id: offerToUpdate.offersFullTime.id,
                    },
                  });
                }
                if (offerToUpdate.offersFullTime.stocks != null) {
                  await ctx.prisma.offersFullTime.update({
                    data: {
                      stocks: {
                        upsert: {
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
                          update: {
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
                      },
                    },
                    where: {
                      id: offerToUpdate.offersFullTime.id,
                    },
                  });
                }
                await ctx.prisma.offersFullTime.update({
                  data: {
                    totalCompensation: {
                      upsert: {
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
                        update: {
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
                  where: {
                    id: offerToUpdate.offersFullTime.id,
                  },
                });
              }
            } else if (currentOffer.jobType === JobType.FULLTIME) {
              if (offerToUpdate.offersFullTime?.totalCompensation != null) {
                await ctx.prisma.offersFullTime.update({
                  data: {
                    level: offerToUpdate.offersFullTime.level ?? undefined,
                    title: offerToUpdate.offersFullTime.title,
                  },
                  where: {
                    id: offerToUpdate.offersFullTime.id,
                  },
                });
                if (offerToUpdate.offersFullTime.baseSalary != null) {
                  await ctx.prisma.offersFullTime.update({
                    data: {
                      baseSalary: {
                        upsert: {
                          create: {
                            baseCurrency: baseCurrencyString,
                            baseValue: await convert(
                              offerToUpdate.offersFullTime.baseSalary.value,
                              offerToUpdate.offersFullTime.baseSalary.currency,
                              baseCurrencyString,
                            ),
                            currency:
                              offerToUpdate.offersFullTime.baseSalary.currency,
                            value:
                              offerToUpdate.offersFullTime.baseSalary.value,
                          },
                          update: {
                            baseCurrency: baseCurrencyString,
                            baseValue: await convert(
                              offerToUpdate.offersFullTime.baseSalary.value,
                              offerToUpdate.offersFullTime.baseSalary.currency,
                              baseCurrencyString,
                            ),
                            currency:
                              offerToUpdate.offersFullTime.baseSalary.currency,
                            value:
                              offerToUpdate.offersFullTime.baseSalary.value,
                          },
                        },
                      },
                    },
                    where: {
                      id: offerToUpdate.offersFullTime.id,
                    },
                  });
                }
                if (offerToUpdate.offersFullTime.bonus != null) {
                  await ctx.prisma.offersFullTime.update({
                    data: {
                      bonus: {
                        upsert: {
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
                          update: {
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
                      },
                    },
                    where: {
                      id: offerToUpdate.offersFullTime.id,
                    },
                  });
                }
                if (offerToUpdate.offersFullTime.stocks != null) {
                  await ctx.prisma.offersFullTime.update({
                    data: {
                      stocks: {
                        upsert: {
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
                          update: {
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
                      },
                    },
                    where: {
                      id: offerToUpdate.offersFullTime.id,
                    },
                  });
                }
                await ctx.prisma.offersFullTime.update({
                  data: {
                    totalCompensation: {
                      upsert: {
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
                        update: {
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
                  where: {
                    id: offerToUpdate.offersFullTime.id,
                  },
                });
              }

              await ctx.prisma.offersOffer.update({
                data: {
                  offersIntern: undefined,
                  offersInternId: null,
                },
                where: {
                  id: offerToUpdate.id,
                },
              });
            } else if (currentOffer.jobType === JobType.INTERN) {
              if (offerToUpdate.offersIntern?.monthlySalary != null) {
                await ctx.prisma.offersIntern.update({
                  data: {
                    internshipCycle:
                      offerToUpdate.offersIntern.internshipCycle ?? undefined,
                    monthlySalary: {
                      upsert: {
                        create: {
                          baseCurrency: baseCurrencyString,
                          baseValue: await convert(
                            offerToUpdate.offersIntern.monthlySalary.value,
                            offerToUpdate.offersIntern.monthlySalary.currency,
                            baseCurrencyString,
                          ),
                          currency:
                            offerToUpdate.offersIntern.monthlySalary.currency,
                          value: offerToUpdate.offersIntern.monthlySalary.value,
                        },
                        update: {
                          baseCurrency: baseCurrencyString,
                          baseValue: await convert(
                            offerToUpdate.offersIntern.monthlySalary.value,
                            offerToUpdate.offersIntern.monthlySalary.currency,
                            baseCurrencyString,
                          ),
                          currency:
                            offerToUpdate.offersIntern.monthlySalary.currency,
                          value: offerToUpdate.offersIntern.monthlySalary.value,
                        },
                      },
                    },
                    startYear:
                      offerToUpdate.offersIntern.startYear ?? undefined,
                    title: offerToUpdate.offersIntern.title,
                  },
                  where: {
                    id: offerToUpdate.offersIntern.id,
                  },
                });
              }

              await ctx.prisma.offersOffer.update({
                data: {
                  offersFullTime: undefined,
                  offersFullTimeId: null,
                },
                where: {
                  id: offerToUpdate.id,
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
                      location: {
                        connect: {
                          id: offerToUpdate.cityId,
                        },
                      },
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
                      location: {
                        connect: {
                          id: offerToUpdate.cityId,
                        },
                      },
                      monthYearReceived: offerToUpdate.monthYearReceived,
                      negotiationStrategy: offerToUpdate.negotiationStrategy,
                      offersFullTime: {
                        create: {
                          baseSalary:
                            offerToUpdate.offersFullTime?.baseSalary != null
                              ? {
                                  create: {
                                    baseCurrency: baseCurrencyString,
                                    baseValue: await convert(
                                      offerToUpdate.offersFullTime.baseSalary
                                        .value,
                                      offerToUpdate.offersFullTime.baseSalary
                                        .currency,
                                      baseCurrencyString,
                                    ),
                                    currency:
                                      offerToUpdate.offersFullTime.baseSalary
                                        .currency,
                                    value:
                                      offerToUpdate.offersFullTime.baseSalary
                                        .value,
                                  },
                                }
                              : undefined,
                          bonus:
                            offerToUpdate.offersFullTime?.bonus != null
                              ? {
                                  create: {
                                    baseCurrency: baseCurrencyString,
                                    baseValue: await convert(
                                      offerToUpdate.offersFullTime.bonus.value,
                                      offerToUpdate.offersFullTime.bonus
                                        .currency,
                                      baseCurrencyString,
                                    ),
                                    currency:
                                      offerToUpdate.offersFullTime.bonus
                                        .currency,
                                    value:
                                      offerToUpdate.offersFullTime.bonus.value,
                                  },
                                }
                              : undefined,
                          level: offerToUpdate.offersFullTime.level,
                          stocks:
                            offerToUpdate.offersFullTime?.stocks != null
                              ? {
                                  create: {
                                    baseCurrency: baseCurrencyString,
                                    baseValue: await convert(
                                      offerToUpdate.offersFullTime.stocks.value,
                                      offerToUpdate.offersFullTime.stocks
                                        .currency,
                                      baseCurrencyString,
                                    ),
                                    currency:
                                      offerToUpdate.offersFullTime.stocks
                                        .currency,
                                    value:
                                      offerToUpdate.offersFullTime.stocks.value,
                                  },
                                }
                              : undefined,
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
  });
