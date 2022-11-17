import { z } from 'zod';
import { JobType } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import {
  adminDashboardOfferDtoMapper,
  getAdminOffersResponseMapper,
} from '~/mappers/offers-mappers';
import { Currency } from '~/utils/offers/currency/CurrencyEnum';
import { convertWithDate } from '~/utils/offers/currency/currencyExchange';
import { createValidationRegex } from '~/utils/offers/zodRegex';

import { createProtectedRouter } from '../context';

const getOrder = (prefix: string) => {
  return prefix === '+' ? 'asc' : 'desc';
};

const sortingKeysMap = {
  companyName: 'companyName',
  jobTitle: 'jobTitle',
  monthYearReceived: 'monthYearReceived',
  totalCompensation: 'totalCompensation',
  totalYoe: 'totalYoe',
};

const yoeCategoryMap: Record<number, string> = {
  0: 'Internship',
  1: 'Fresh Grad',
  2: 'Mid',
  3: 'Senior',
};

const getYoeRange = (yoeCategory: number | null | undefined) => {
  return yoeCategory == null
    ? { maxYoe: 100, minYoe: 0 }
    : yoeCategoryMap[yoeCategory] === 'Fresh Grad'
    ? { maxYoe: 2, minYoe: 0 }
    : yoeCategoryMap[yoeCategory] === 'Mid'
    ? { maxYoe: 5, minYoe: 3 }
    : yoeCategoryMap[yoeCategory] === 'Senior'
    ? { maxYoe: 100, minYoe: 6 }
    : null; // Internship
};

export const offerAdminRouter = createProtectedRouter().query('list', {
  input: z.object({
    companyId: z.string().nullish(),
    countryId: z.string().nullish(),
    currency: z.string().nullish(),
    dateEnd: z.date().nullish(),
    dateStart: z.date().nullish(),
    limit: z.number().positive(),
    offset: z.number().nonnegative(),
    salaryMax: z.number().nonnegative().nullish(),
    salaryMin: z.number().nonnegative().nullish(),
    sortBy: z
      .string()
      .regex(createValidationRegex(Object.keys(sortingKeysMap), '[+-]{1}'))
      .nullish(),
    title: z.string().nullish(),
    yoeCategory: z.number().min(0).max(3).nullish(),
    yoeMax: z.number().max(100).nullish(),
    yoeMin: z.number().min(0).nullish(),
  }),
  async resolve({ ctx, input }) {
    const userId = ctx.session.user.id;
    const adminAccount = await ctx.prisma.offersAdmin.findFirst({
      where: {
        userId
      }
    })

    if (!adminAccount) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Not an admin.',
      });
    }

    const yoeRange = getYoeRange(input.yoeCategory);
    const yoeMin = input.yoeMin != null ? input.yoeMin : yoeRange?.minYoe;
    const yoeMax = input.yoeMax != null ? input.yoeMax : yoeRange?.maxYoe;

    if (!input.sortBy) {
      input.sortBy = '-' + sortingKeysMap.monthYearReceived;
    }

    const order = getOrder(input.sortBy.charAt(0));
    const sortingKey = input.sortBy.substring(1);

    const data = !yoeRange
      ? await ctx.prisma.offersOffer.findMany({
          // Internship
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
                offers: true,
              },
            },
          },
          orderBy:
            sortingKey === sortingKeysMap.monthYearReceived
              ? {
                  monthYearReceived: order,
                }
              : sortingKey === sortingKeysMap.totalCompensation
              ? [
                  {
                    offersIntern: {
                      monthlySalary: {
                        baseValue: order,
                      },
                    },
                  },
                  {
                    monthYearReceived: 'desc',
                  },
                ]
              : sortingKey === sortingKeysMap.totalYoe
              ? [
                  {
                    profile: {
                      background: {
                        totalYoe: order,
                      },
                    },
                  },
                  {
                    monthYearReceived: 'desc',
                  },
                ]
              : sortingKey === sortingKeysMap.companyName
              ? [
                  {
                    company: {
                      name: order,
                    },
                  },
                  {
                    monthYearReceived: 'desc',
                  },
                ]
              : sortingKey === sortingKeysMap.jobTitle
              ? [
                  {
                    offersIntern: {
                      title: order,
                    },
                  },
                  {
                    monthYearReceived: 'desc',
                  },
                ]
              : { monthYearReceived: 'desc' },
          where: {
            AND: [
              {
                location: {
                  state: {
                    countryId:
                      input.countryId != null && input.countryId.length !== 0
                        ? input.countryId
                        : undefined,
                  },
                },
              },
              {
                offersIntern: {
                  isNot: null,
                },
              },
              {
                offersIntern: {
                  title:
                    input.title != null && input.title.length !== 0
                      ? input.title
                      : undefined,
                },
              },
              {
                offersIntern: {
                  monthlySalary: {
                    baseValue: {
                      gte: input.salaryMin ?? undefined,
                      lte: input.salaryMax ?? undefined,
                    },
                  },
                },
              },
              {
                offersFullTime: {
                  is: null,
                },
              },
              {
                companyId:
                  input.companyId && input.companyId.length !== 0
                    ? input.companyId
                    : undefined,
              },
              {
                profile: {
                  background: {
                    totalYoe: {
                      gte: yoeMin,
                      lte: yoeMax,
                    },
                  },
                },
              },
              {
                monthYearReceived: {
                  gte: input.dateStart ?? undefined,
                  lte: input.dateEnd ?? undefined,
                },
              },
            ],
          },
        })
      : await ctx.prisma.offersOffer.findMany({
          // Junior, Mid, Senior
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
                offers: true,
              },
            },
          },
          orderBy:
            sortingKey === sortingKeysMap.monthYearReceived
              ? {
                  monthYearReceived: order,
                }
              : sortingKey === sortingKeysMap.totalCompensation
              ? [
                  {
                    offersFullTime: {
                      totalCompensation: {
                        baseValue: order,
                      },
                    },
                  },
                  {
                    monthYearReceived: 'desc',
                  },
                ]
              : sortingKey === sortingKeysMap.totalYoe
              ? [
                  {
                    profile: {
                      background: {
                        totalYoe: order,
                      },
                    },
                  },
                  {
                    monthYearReceived: 'desc',
                  },
                ]
              : sortingKey === sortingKeysMap.companyName
              ? [
                  {
                    company: {
                      name: order,
                    },
                  },
                  {
                    monthYearReceived: 'desc',
                  },
                ]
              : sortingKey === sortingKeysMap.jobTitle
              ? [
                  {
                    offersFullTime: {
                      title: order,
                    },
                  },
                  {
                    monthYearReceived: 'desc',
                  },
                ]
              : { monthYearReceived: 'desc' },
          where: {
            AND: [
              {
                location: {
                  state: {
                    countryId:
                      input.countryId != null && input.countryId.length !== 0
                        ? input.countryId
                        : undefined,
                  },
                },
              },
              {
                offersIntern: {
                  is: null,
                },
              },
              {
                offersFullTime: {
                  isNot: null,
                },
              },
              {
                offersFullTime: {
                  title:
                    input.title != null && input.title.length !== 0
                      ? input.title
                      : undefined,
                },
              },
              {
                offersFullTime: {
                  totalCompensation: {
                    baseValue: {
                      gte: input.salaryMin ?? undefined,
                      lte: input.salaryMax ?? undefined,
                    },
                  },
                },
              },
              {
                companyId:
                  input.companyId && input.companyId.length !== 0
                    ? input.companyId
                    : undefined,
              },
              {
                profile: {
                  background: {
                    totalYoe: {
                      gte: yoeMin,
                      lte: yoeMax,
                    },
                  },
                },
              },
              {
                monthYearReceived: {
                  gte: input.dateStart ?? undefined,
                  lte: input.dateEnd ?? undefined,
                },
              },
            ],
          },
        });

    const startRecordIndex: number = input.limit * input.offset;
    const endRecordIndex: number =
      startRecordIndex + input.limit <= data.length
        ? startRecordIndex + input.limit
        : data.length;
    let paginatedData = data.slice(startRecordIndex, endRecordIndex);

    // CONVERTING
    const currency = input.currency?.toUpperCase();
    if (currency != null && currency in Currency) {
      paginatedData = await Promise.all(
        paginatedData.map(async (offer) => {
          if (offer.offersFullTime?.totalCompensation != null) {
            offer.offersFullTime.totalCompensation.value =
              await convertWithDate(
                offer.offersFullTime.totalCompensation.value,
                offer.offersFullTime.totalCompensation.currency,
                currency,
                offer.offersFullTime.totalCompensation.updatedAt,
              );
            offer.offersFullTime.totalCompensation.currency = currency;

            if (offer.offersFullTime?.baseSalary != null) {
              offer.offersFullTime.baseSalary.value = await convertWithDate(
                offer.offersFullTime.baseSalary.value,
                offer.offersFullTime.baseSalary.currency,
                currency,
                offer.offersFullTime.baseSalary.updatedAt,
              );
              offer.offersFullTime.baseSalary.currency = currency;
            }

            if (offer.offersFullTime?.stocks != null) {
              offer.offersFullTime.stocks.value = await convertWithDate(
                offer.offersFullTime.stocks.value,
                offer.offersFullTime.stocks.currency,
                currency,
                offer.offersFullTime.stocks.updatedAt,
              );
              offer.offersFullTime.stocks.currency = currency;
            }

            if (offer.offersFullTime?.bonus != null) {
              offer.offersFullTime.bonus.value = await convertWithDate(
                offer.offersFullTime.bonus.value,
                offer.offersFullTime.bonus.currency,
                currency,
                offer.offersFullTime.bonus.updatedAt,
              );
              offer.offersFullTime.bonus.currency = currency;
            }
          } else if (offer.offersIntern?.monthlySalary != null) {
            offer.offersIntern.monthlySalary.value = await convertWithDate(
              offer.offersIntern.monthlySalary.value,
              offer.offersIntern.monthlySalary.currency,
              currency,
              offer.offersIntern.monthlySalary.updatedAt,
            );
            offer.offersIntern.monthlySalary.currency = currency;
          } else {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Total Compensation or Salary not found',
            });
          }

          return offer;
        }),
      );
    }

    return getAdminOffersResponseMapper(
      paginatedData.map((offer) => adminDashboardOfferDtoMapper(offer)),
      {
        currentPage: input.offset,
        numOfItems: paginatedData.length,
        numOfPages: Math.ceil(data.length / input.limit),
        totalItems: data.length,
      },
      !yoeRange ? JobType.INTERN : JobType.FULLTIME,
    );
  },
}).query('isAdmin', {
  async resolve({ ctx }) {
    const userId = ctx.session.user.id;
    const result = await ctx.prisma.offersAdmin.findFirst({
      where: {
        userId
      }
    })

    return result ? true : false
  }
});
