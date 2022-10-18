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
  OffersFullTime: z
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
  OffersIntern: z
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
  comments: z.string(),
  company: company.nullish(),
  companyId: z.string(),
  id: z.string().optional(),
  jobType: z.string(),
  location: z.string(),
  monthYearReceived: z.date(),
  negotiationStrategy: z.string(),
  offersFullTimeId: z.string().nullish(),
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
                x.OffersIntern &&
                x.OffersIntern.internshipCycle &&
                x.OffersIntern.monthlySalary?.currency &&
                x.OffersIntern.monthlySalary.value &&
                x.OffersIntern.startYear
              ) {
                return {
                  OffersIntern: {
                    create: {
                      internshipCycle: x.OffersIntern.internshipCycle,
                      monthlySalary: {
                        create: {
                          currency: x.OffersIntern.monthlySalary?.currency,
                          value: x.OffersIntern.monthlySalary?.value,
                        },
                      },
                      specialization: x.OffersIntern.specialization,
                      startYear: x.OffersIntern.startYear,
                      title: x.OffersIntern.title,
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
                x.OffersFullTime &&
                x.OffersFullTime.baseSalary?.currency &&
                x.OffersFullTime.baseSalary?.value &&
                x.OffersFullTime.bonus?.currency &&
                x.OffersFullTime.bonus?.value &&
                x.OffersFullTime.stocks?.currency &&
                x.OffersFullTime.stocks?.value &&
                x.OffersFullTime.totalCompensation?.currency &&
                x.OffersFullTime.totalCompensation?.value &&
                x.OffersFullTime.level
              ) {
                return {
                  OffersFullTime: {
                    create: {
                      baseSalary: {
                        create: {
                          currency: x.OffersFullTime.baseSalary?.currency,
                          value: x.OffersFullTime.baseSalary?.value,
                        },
                      },
                      bonus: {
                        create: {
                          currency: x.OffersFullTime.bonus?.currency,
                          value: x.OffersFullTime.bonus?.value,
                        },
                      },
                      level: x.OffersFullTime.level,
                      specialization: x.OffersFullTime.specialization,
                      stocks: {
                        create: {
                          currency: x.OffersFullTime.stocks?.currency,
                          value: x.OffersFullTime.stocks?.value,
                        },
                      },
                      title: x.OffersFullTime.title,
                      totalCompensation: {
                        create: {
                          currency:
                            x.OffersFullTime.totalCompensation?.currency,
                          value: x.OffersFullTime.totalCompensation?.value,
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

            if (offerToUpdate.OffersIntern?.monthlySalary) {
              await ctx.prisma.offersIntern.update({
                data: {
                  internshipCycle:
                    offerToUpdate.OffersIntern.internshipCycle ?? undefined,
                  specialization: offerToUpdate.OffersIntern.specialization,
                  startYear: offerToUpdate.OffersIntern.startYear ?? undefined,
                  title: offerToUpdate.OffersIntern.title,
                },
                where: {
                  id: offerToUpdate.OffersIntern.id,
                },
              });
              await ctx.prisma.offersCurrency.update({
                data: {
                  currency: offerToUpdate.OffersIntern.monthlySalary.currency,
                  value: offerToUpdate.OffersIntern.monthlySalary.value,
                },
                where: {
                  id: offerToUpdate.OffersIntern.monthlySalary.id,
                },
              });
            }

            if (offerToUpdate.OffersFullTime?.totalCompensation) {
              await ctx.prisma.offersFullTime.update({
                data: {
                  level: offerToUpdate.OffersFullTime.level ?? undefined,
                  specialization: offerToUpdate.OffersFullTime.specialization,
                  title: offerToUpdate.OffersFullTime.title,
                },
                where: {
                  id: offerToUpdate.OffersFullTime.id,
                },
              });
              if (offerToUpdate.OffersFullTime.baseSalary) {
                await ctx.prisma.offersCurrency.update({
                  data: {
                    currency: offerToUpdate.OffersFullTime.baseSalary.currency,
                    value: offerToUpdate.OffersFullTime.baseSalary.value,
                  },
                  where: {
                    id: offerToUpdate.OffersFullTime.baseSalary.id,
                  },
                });
              }
              if (offerToUpdate.OffersFullTime.bonus) {
                await ctx.prisma.offersCurrency.update({
                  data: {
                    currency: offerToUpdate.OffersFullTime.bonus.currency,
                    value: offerToUpdate.OffersFullTime.bonus.value,
                  },
                  where: {
                    id: offerToUpdate.OffersFullTime.bonus.id,
                  },
                });
              }
              if (offerToUpdate.OffersFullTime.stocks) {
                await ctx.prisma.offersCurrency.update({
                  data: {
                    currency: offerToUpdate.OffersFullTime.stocks.currency,
                    value: offerToUpdate.OffersFullTime.stocks.value,
                  },
                  where: {
                    id: offerToUpdate.OffersFullTime.stocks.id,
                  },
                });
              }
              await ctx.prisma.offersCurrency.update({
                data: {
                  currency:
                    offerToUpdate.OffersFullTime.totalCompensation.currency,
                  value: offerToUpdate.OffersFullTime.totalCompensation.value,
                },
                where: {
                  id: offerToUpdate.OffersFullTime.totalCompensation.id,
                },
              });
            }
          } else {
            if (
              offerToUpdate.jobType === 'INTERN' &&
              offerToUpdate.OffersIntern &&
              offerToUpdate.OffersIntern.internshipCycle &&
              offerToUpdate.OffersIntern.monthlySalary?.currency &&
              offerToUpdate.OffersIntern.monthlySalary.value &&
              offerToUpdate.OffersIntern.startYear
            ) {
              await ctx.prisma.offersProfile.update({
                data: {
                  offers: {
                    create: {
                      OffersIntern: {
                        create: {
                          internshipCycle:
                            offerToUpdate.OffersIntern.internshipCycle,
                          monthlySalary: {
                            create: {
                              currency:
                                offerToUpdate.OffersIntern.monthlySalary
                                  ?.currency,
                              value:
                                offerToUpdate.OffersIntern.monthlySalary?.value,
                            },
                          },
                          specialization:
                            offerToUpdate.OffersIntern.specialization,
                          startYear: offerToUpdate.OffersIntern.startYear,
                          title: offerToUpdate.OffersIntern.title,
                        },
                      },
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
              offerToUpdate.OffersFullTime &&
              offerToUpdate.OffersFullTime.baseSalary?.currency &&
              offerToUpdate.OffersFullTime.baseSalary?.value &&
              offerToUpdate.OffersFullTime.bonus?.currency &&
              offerToUpdate.OffersFullTime.bonus?.value &&
              offerToUpdate.OffersFullTime.stocks?.currency &&
              offerToUpdate.OffersFullTime.stocks?.value &&
              offerToUpdate.OffersFullTime.totalCompensation?.currency &&
              offerToUpdate.OffersFullTime.totalCompensation?.value &&
              offerToUpdate.OffersFullTime.level
            ) {
              await ctx.prisma.offersProfile.update({
                data: {
                  offers: {
                    create: {
                      OffersFullTime: {
                        create: {
                          baseSalary: {
                            create: {
                              currency:
                                offerToUpdate.OffersFullTime.baseSalary
                                  ?.currency,
                              value:
                                offerToUpdate.OffersFullTime.baseSalary?.value,
                            },
                          },
                          bonus: {
                            create: {
                              currency:
                                offerToUpdate.OffersFullTime.bonus?.currency,
                              value: offerToUpdate.OffersFullTime.bonus?.value,
                            },
                          },
                          level: offerToUpdate.OffersFullTime.level,
                          specialization:
                            offerToUpdate.OffersFullTime.specialization,
                          stocks: {
                            create: {
                              currency:
                                offerToUpdate.OffersFullTime.stocks?.currency,
                              value: offerToUpdate.OffersFullTime.stocks?.value,
                            },
                          },
                          title: offerToUpdate.OffersFullTime.title,
                          totalCompensation: {
                            create: {
                              currency:
                                offerToUpdate.OffersFullTime.totalCompensation
                                  ?.currency,
                              value:
                                offerToUpdate.OffersFullTime.totalCompensation
                                  ?.value,
                            },
                          },
                        },
                      },
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
