import crypto, { randomUUID } from 'crypto';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

import { createRouter } from '../context';

import type { offersProfile } from '~/types/offers-profile';

const valuation = z.object({
  currency: z.string(),
  value: z.number(),
});

// TODO: handle both full time and intern
const offer = z.object({
  comments: z.string().optional(),
  companyId: z.string(),
  job: z.object({
    base: valuation.optional(), // Full time
    bonus: valuation.optional(), // Full time
    internshipCycle: z.string().optional(), // Intern
    level: z.string().optional(), // Full time
    monthlySalary: valuation.optional(), // Intern
    specialization: z.string(),
    startYear: z.number().optional(), // Intern
    stocks: valuation.optional(), // Full time
    title: z.string(),
    totalCompensation: valuation.optional(), // Full time
  }),
  jobType: z.string(),
  location: z.string(),
  monthYearReceived: z.date(),
  negotiationStrategy: z.string().optional(),
});

const experience = z.object({
  companyId: z.string().optional(),
  durationInMonths: z.number().optional(),
  jobType: z.string().optional(),
  level: z.string().optional(),
  monthlySalary: valuation.optional(),
  specialization: z.string().optional(),
  title: z.string().optional(),
  totalCompensation: valuation.optional(),
});

const education = z.object({
  endDate: z.date().optional(),
  field: z.string().optional(),
  school: z.string().optional(),
  startDate: z.date().optional(),
  type: z.string().optional(),
});

type WithIsEditable<T> = T & {
  isEditable: boolean;
};

function computeIsEditable(
  profileInput: offersProfile,
  editToken?: string,
): WithIsEditable<offersProfile> {
  return {
    ...profileInput,
    isEditable: profileInput.editToken === editToken,
  };
}

function exclude<Key extends keyof WithIsEditable<offersProfile>>(
  profile: WithIsEditable<offersProfile>,
  ...keys: Array<Key>
): Omit<WithIsEditable<offersProfile>, Key> {
  for (const key of keys) {
    delete profile[key];
  }
  return profile;
}

export const offersProfileRouter = createRouter()
  .query('listOne', {
    input: z.object({
      profileId: z.string(),
      token: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const result = await ctx.prisma.offersProfile.findFirst({
        include: {
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
            },
          },
          offers: {
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
            },
          },
        },
        where: {
          id: input.profileId,
        },
      });

      return result
        ? exclude(computeIsEditable(result, input.token), 'editToken')
        : result;
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
                create: input.background.experiences.map((x) => {
                  if (
                    x.jobType === 'FULLTIME' &&
                    x.totalCompensation?.currency !== undefined &&
                    x.totalCompensation.value !== undefined
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
                            currency: x.totalCompensation?.currency,
                            value: x.totalCompensation?.value,
                          },
                        },
                      };
                    }
                    return {
                      durationInMonths: x.durationInMonths,
                      jobType: x.jobType,
                      level: x.level,
                      specialization: x.specialization,
                      title: x.title,
                      totalCompensation: {
                        create: {
                          currency: x.totalCompensation?.currency,
                          value: x.totalCompensation?.value,
                        },
                      },
                    };
                  }
                  if (
                    x.jobType === 'INTERN' &&
                    x.monthlySalary?.currency !== undefined &&
                    x.monthlySalary.value !== undefined
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
                            currency: x.monthlySalary?.currency,
                            value: x.monthlySalary?.value,
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
                          currency: x.monthlySalary?.currency,
                          value: x.monthlySalary?.value,
                        },
                      },
                      specialization: x.specialization,
                      title: x.title,
                    };
                  }

                  throw Prisma.PrismaClientKnownRequestError;
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
            create: input.offers.map((x) => {
              if (
                x.jobType === 'INTERN' &&
                x.job.internshipCycle !== undefined &&
                x.job.monthlySalary?.currency !== undefined &&
                x.job.monthlySalary.value !== undefined &&
                x.job.startYear !== undefined
              ) {
                return {
                  OffersIntern: {
                    create: {
                      internshipCycle: x.job.internshipCycle,
                      monthlySalary: {
                        create: {
                          currency: x.job.monthlySalary?.currency,
                          value: x.job.monthlySalary?.value,
                        },
                      },
                      specialization: x.job.specialization,
                      startYear: x.job.startYear,
                      title: x.job.title,
                    },
                  },
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
                };
              }
              if (
                x.jobType === 'FULLTIME' &&
                x.job.base?.currency !== undefined &&
                x.job.base?.value !== undefined &&
                x.job.bonus?.currency !== undefined &&
                x.job.bonus?.value !== undefined &&
                x.job.stocks?.currency !== undefined &&
                x.job.stocks?.value !== undefined &&
                x.job.totalCompensation?.currency !== undefined &&
                x.job.totalCompensation?.value !== undefined &&
                x.job.level !== undefined
              ) {
                return {
                  OffersFullTime: {
                    create: {
                      baseSalary: {
                        create: {
                          currency: x.job.base?.currency,
                          value: x.job.base?.value,
                        },
                      },
                      bonus: {
                        create: {
                          currency: x.job.bonus?.currency,
                          value: x.job.bonus?.value,
                        },
                      },
                      level: x.job.level,
                      specialization: x.job.specialization,
                      stocks: {
                        create: {
                          currency: x.job.stocks?.currency,
                          value: x.job.stocks?.value,
                        },
                      },
                      title: x.job.title,
                      totalCompensation: {
                        create: {
                          currency: x.job.totalCompensation?.currency,
                          value: x.job.totalCompensation?.value,
                        },
                      },
                    },
                  },
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
                };
              }

              // Throw error
              throw Prisma.PrismaClientKnownRequestError;
            }),
          },
          profileName: randomUUID().substring(0, 10),
        },
        include: {
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
          offers: {
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
            },
          },
        },
      });
      // TODO: add analysis to profile object then return
      return profile;
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
        return await ctx.prisma.offersProfile.delete({
          where: {
            id: input.profileId,
          },
        });
      }
      // TODO: Throw 401
    },
  });
