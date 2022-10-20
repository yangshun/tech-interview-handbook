import crypto, { randomUUID } from 'crypto';
import { z } from 'zod';
import * as trpc from '@trpc/server';

import {
  addToProfileResponseMapper,
  createOfferProfileResponseMapper,
  profileDtoMapper,
} from '~/mappers/offers-mappers';

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
  jobType: z.string(),
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
  jobType: z.string().nullish(),
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

const reply = z.object({
  createdAt: z.date().nullish(),
  id: z.string().optional(),
  messages: z.string().nullish(),
  profileId: z.string().nullish(),
  replyingToId: z.string().nullish(),
  userId: z.string().nullish(),
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

                  throw new trpc.TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Missing fields.',
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
            create: input.offers.map((x) => {
              if (
                x.jobType === 'INTERN' &&
                x.offersIntern &&
                x.offersIntern.internshipCycle &&
                x.offersIntern.monthlySalary?.currency &&
                x.offersIntern.monthlySalary.value &&
                x.offersIntern.startYear
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
                          currency: x.offersIntern.monthlySalary?.currency,
                          value: x.offersIntern.monthlySalary?.value,
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
                x.jobType === 'FULLTIME' &&
                x.offersFullTime &&
                x.offersFullTime.baseSalary?.currency &&
                x.offersFullTime.baseSalary?.value &&
                x.offersFullTime.bonus?.currency &&
                x.offersFullTime.bonus?.value &&
                x.offersFullTime.stocks?.currency &&
                x.offersFullTime.stocks?.value &&
                x.offersFullTime.totalCompensation?.currency &&
                x.offersFullTime.totalCompensation?.value &&
                x.offersFullTime.level
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
                          currency: x.offersFullTime.baseSalary?.currency,
                          value: x.offersFullTime.baseSalary?.value,
                        },
                      },
                      bonus: {
                        create: {
                          currency: x.offersFullTime.bonus?.currency,
                          value: x.offersFullTime.bonus?.value,
                        },
                      },
                      level: x.offersFullTime.level,
                      specialization: x.offersFullTime.specialization,
                      stocks: {
                        create: {
                          currency: x.offersFullTime.stocks?.currency,
                          value: x.offersFullTime.stocks?.value,
                        },
                      },
                      title: x.offersFullTime.title,
                      totalCompensation: {
                        create: {
                          currency:
                            x.offersFullTime.totalCompensation?.currency,
                          value: x.offersFullTime.totalCompensation?.value,
                        },
                      },
                    },
                  },
                };
              }

              // Throw error
              throw new trpc.TRPCError({
                code: 'BAD_REQUEST',
                message: 'Missing fields.',
              });
            }),
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
      // TODO: Throw 401
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
      discussion: z.array(reply),
      id: z.string(),
      isEditable: z.boolean().nullish(),
      offers: z.array(offer),
      profileName: z.string(),
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
        await ctx.prisma.offersProfile.update({
          data: {
            profileName: input.profileName,
          },
          where: {
            id: input.id,
          },
        });

        await ctx.prisma.offersBackground.update({
          data: {
            totalYoe: input.background.totalYoe,
          },
          where: {
            id: input.background.id,
          },
        });

        for (const edu of input.background.educations) {
          if (edu.id) {
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

        for (const exp of input.background.experiences) {
          if (exp.id) {
            await ctx.prisma.offersExperience.update({
              data: {
                companyId: exp.companyId,
                durationInMonths: exp.durationInMonths,
                level: exp.level,
                specialization: exp.specialization,
              },
              where: {
                id: exp.id,
              },
            });

            if (exp.monthlySalary) {
              await ctx.prisma.offersCurrency.update({
                data: {
                  currency: exp.monthlySalary.currency,
                  value: exp.monthlySalary.value,
                },
                where: {
                  id: exp.monthlySalary.id,
                },
              });
            }

            if (exp.totalCompensation) {
              await ctx.prisma.offersCurrency.update({
                data: {
                  currency: exp.totalCompensation.currency,
                  value: exp.totalCompensation.value,
                },
                where: {
                  id: exp.totalCompensation.id,
                },
              });
            }
          } else if (!exp.id) {
            if (
              exp.jobType === 'FULLTIME' &&
              exp.totalCompensation?.currency !== undefined &&
              exp.totalCompensation.value !== undefined
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
                        specialization: exp.specialization,
                        title: exp.title,
                        totalCompensation: {
                          create: {
                            currency: exp.totalCompensation?.currency,
                            value: exp.totalCompensation?.value,
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
                        specialization: exp.specialization,
                        title: exp.title,
                        totalCompensation: {
                          create: {
                            currency: exp.totalCompensation?.currency,
                            value: exp.totalCompensation?.value,
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
            } else if (
              exp.jobType === 'INTERN' &&
              exp.monthlySalary?.currency !== undefined &&
              exp.monthlySalary.value !== undefined
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
                        monthlySalary: {
                          create: {
                            currency: exp.monthlySalary?.currency,
                            value: exp.monthlySalary?.value,
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
                        monthlySalary: {
                          create: {
                            currency: exp.monthlySalary?.currency,
                            value: exp.monthlySalary?.value,
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
            }
          }
        }

        for (const yoe of input.background.specificYoes) {
          if (yoe.id) {
            await ctx.prisma.offersSpecificYoe.update({
              data: {
                ...yoe,
              },
              where: {
                id: yoe.id,
              },
            });
          } else {
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

        for (const offerToUpdate of input.offers) {
          if (offerToUpdate.id) {
            await ctx.prisma.offersOffer.update({
              data: {
                comments: offerToUpdate.comments,
                companyId: offerToUpdate.companyId,
                location: offerToUpdate.location,
                monthYearReceived: offerToUpdate.monthYearReceived,
                negotiationStrategy: offerToUpdate.negotiationStrategy,
              },
              where: {
                id: offerToUpdate.id,
              },
            });

            if (
              offerToUpdate.jobType === 'INTERN' ||
              offerToUpdate.jobType === 'FULLTIME'
            ) {
              await ctx.prisma.offersOffer.update({
                data: {
                  jobType: offerToUpdate.jobType,
                },
                where: {
                  id: offerToUpdate.id,
                },
              });
            }

            if (offerToUpdate.offersIntern?.monthlySalary) {
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
                  currency: offerToUpdate.offersIntern.monthlySalary.currency,
                  value: offerToUpdate.offersIntern.monthlySalary.value,
                },
                where: {
                  id: offerToUpdate.offersIntern.monthlySalary.id,
                },
              });
            }

            if (offerToUpdate.offersFullTime?.totalCompensation) {
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
              if (offerToUpdate.offersFullTime.baseSalary) {
                await ctx.prisma.offersCurrency.update({
                  data: {
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
            if (
              offerToUpdate.jobType === 'INTERN' &&
              offerToUpdate.offersIntern &&
              offerToUpdate.offersIntern.internshipCycle &&
              offerToUpdate.offersIntern.monthlySalary?.currency &&
              offerToUpdate.offersIntern.monthlySalary.value &&
              offerToUpdate.offersIntern.startYear
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
                              currency:
                                offerToUpdate.offersIntern.monthlySalary
                                  ?.currency,
                              value:
                                offerToUpdate.offersIntern.monthlySalary?.value,
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
              offerToUpdate.jobType === 'FULLTIME' &&
              offerToUpdate.offersFullTime &&
              offerToUpdate.offersFullTime.baseSalary?.currency &&
              offerToUpdate.offersFullTime.baseSalary?.value &&
              offerToUpdate.offersFullTime.bonus?.currency &&
              offerToUpdate.offersFullTime.bonus?.value &&
              offerToUpdate.offersFullTime.stocks?.currency &&
              offerToUpdate.offersFullTime.stocks?.value &&
              offerToUpdate.offersFullTime.totalCompensation?.currency &&
              offerToUpdate.offersFullTime.totalCompensation?.value &&
              offerToUpdate.offersFullTime.level
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
                              currency:
                                offerToUpdate.offersFullTime.baseSalary
                                  ?.currency,
                              value:
                                offerToUpdate.offersFullTime.baseSalary?.value,
                            },
                          },
                          bonus: {
                            create: {
                              currency:
                                offerToUpdate.offersFullTime.bonus?.currency,
                              value: offerToUpdate.offersFullTime.bonus?.value,
                            },
                          },
                          level: offerToUpdate.offersFullTime.level,
                          specialization:
                            offerToUpdate.offersFullTime.specialization,
                          stocks: {
                            create: {
                              currency:
                                offerToUpdate.offersFullTime.stocks?.currency,
                              value: offerToUpdate.offersFullTime.stocks?.value,
                            },
                          },
                          title: offerToUpdate.offersFullTime.title,
                          totalCompensation: {
                            create: {
                              currency:
                                offerToUpdate.offersFullTime.totalCompensation
                                  ?.currency,
                              value:
                                offerToUpdate.offersFullTime.totalCompensation
                                  ?.value,
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
