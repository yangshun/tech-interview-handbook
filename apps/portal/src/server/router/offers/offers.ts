import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import {
  dashboardOfferDtoMapper,
  getOffersResponseMapper,
} from '~/mappers/offers-mappers';
import { Currency } from '~/utils/offers/currency/CurrencyEnum';
import { convertWithDate } from '~/utils/offers/currency/currencyExchange';
import { createValidationRegex } from '~/utils/offers/zodRegex';

import { createRouter } from '../context';

const getOrder = (prefix: string) => {
  if (prefix === '+') {
    return 'asc';
  }
  return 'desc';
};

const sortingKeysMap = {
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

const getYoeRange = (yoeCategory: number) => {
  return yoeCategoryMap[yoeCategory] === 'Fresh Grad'
    ? { maxYoe: 2, minYoe: 0 }
    : yoeCategoryMap[yoeCategory] === 'Mid'
    ? { maxYoe: 5, minYoe: 3 }
    : yoeCategoryMap[yoeCategory] === 'Senior'
    ? { maxYoe: 100, minYoe: 6 }
    : null; // Internship
};

export const offersRouter = createRouter().query('list', {
  input: z.object({
    companyId: z.string().nullish(),
    currency: z.string().nullish(),
    dateEnd: z.date().nullish(),
    dateStart: z.date().nullish(),
    limit: z.number().positive(),
    location: z.string(),
    offset: z.number().nonnegative(),
    salaryMax: z.number().nonnegative().nullish(),
    salaryMin: z.number().nonnegative().nullish(),
    sortBy: z
      .string()
      .regex(createValidationRegex(Object.keys(sortingKeysMap), '[+-]{1}'))
      .nullish(),
    title: z.string().nullish(),
    yoeCategory: z.number().min(0).max(3),
    yoeMax: z.number().max(100).nullish(),
    yoeMin: z.number().min(0).nullish(),
  }),
  async resolve({ ctx, input }) {
    const yoeRange = getYoeRange(input.yoeCategory);
    const yoeMin = input.yoeMin ? input.yoeMin : yoeRange?.minYoe;
    const yoeMax = input.yoeMax ? input.yoeMax : yoeRange?.maxYoe;

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
              : { monthYearReceived: 'desc' },
          where: {
            AND: [
              {
                location:
                  input.location.length === 0 ? undefined : input.location,
              },
              {
                offersIntern: {
                  isNot: null,
                },
              },
              {
                offersIntern: {
                  title:
                    input.title && input.title.length !== 0
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
              : { monthYearReceived: 'desc' },
          where: {
            AND: [
              {
                location:
                  input.location.length === 0 ? undefined : input.location,
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
                    input.title && input.title.length !== 0
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

    return getOffersResponseMapper(
      paginatedData.map((offer) => dashboardOfferDtoMapper(offer)),
      {
        currentPage: input.offset,
        numOfItems: paginatedData.length,
        numOfPages: Math.ceil(data.length / input.limit),
        totalItems: data.length,
      },
    );
  },
});
