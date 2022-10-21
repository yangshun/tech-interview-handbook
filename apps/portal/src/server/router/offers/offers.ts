import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import {
  dashboardOfferDtoMapper,
  getOffersResponseMapper,
} from '~/mappers/offers-mappers';
import { convert } from '~/utils/offers/currency/currency-exchange';
import { Currency } from '~/utils/offers/currency/CurrencyEnum';

import { createRouter } from '../context';

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

const ascOrder = '+';
const descOrder = '-';
const sortingKeys = ['monthYearReceived', 'totalCompensation', 'totalYoe'];

const createSortByValidationRegex = () => {
  const startsWithPlusOrMinusOnly = '^[+-]{1}';
  const sortingKeysRegex = sortingKeys.join('|');
  return new RegExp(startsWithPlusOrMinusOnly + '(' + sortingKeysRegex + ')');
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
    sortBy: z.string().regex(createSortByValidationRegex()).nullish(),
    title: z.string().nullish(),
    yoeCategory: z.number().min(0).max(3),
    yoeMax: z.number().max(100).nullish(),
    yoeMin: z.number().min(0).nullish(),
  }),
  async resolve({ ctx, input }) {
    const yoeRange = getYoeRange(input.yoeCategory);
    const yoeMin = input.yoeMin ? input.yoeMin : yoeRange?.minYoe;
    const yoeMax = input.yoeMax ? input.yoeMax : yoeRange?.maxYoe;

    let data = !yoeRange
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
          orderBy: {
            monthYearReceived: 'desc',
          },
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
                    value: {
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
          orderBy: {
            monthYearReceived: 'desc',
          },
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
                    value: {
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

    // CONVERTING
    const currency = input.currency?.toUpperCase();
    if (currency != null && currency in Currency) {
      data = await Promise.all(
        data.map(async (offer) => {
          if (offer.offersFullTime?.totalCompensation) {
            offer.offersFullTime.totalCompensation.value = await convert(
              offer.offersFullTime.totalCompensation.value,
              offer.offersFullTime.totalCompensation.currency,
              currency,
            );
            offer.offersFullTime.totalCompensation.currency = currency;
            offer.offersFullTime.baseSalary.value = await convert(
              offer.offersFullTime.totalCompensation.value,
              offer.offersFullTime.totalCompensation.currency,
              currency,
            );
            offer.offersFullTime.baseSalary.currency = currency;
            offer.offersFullTime.stocks.value = await convert(
              offer.offersFullTime.totalCompensation.value,
              offer.offersFullTime.totalCompensation.currency,
              currency,
            );
            offer.offersFullTime.stocks.currency = currency;
            offer.offersFullTime.bonus.value = await convert(
              offer.offersFullTime.totalCompensation.value,
              offer.offersFullTime.totalCompensation.currency,
              currency,
            );
            offer.offersFullTime.bonus.currency = currency;
          } else if (offer.offersIntern?.monthlySalary) {
            offer.offersIntern.monthlySalary.value = await convert(
              offer.offersIntern.monthlySalary.value,
              offer.offersIntern.monthlySalary.currency,
              currency,
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

    // SORTING
    data = data.sort((offer1, offer2) => {
      const defaultReturn =
        offer2.monthYearReceived.getTime() - offer1.monthYearReceived.getTime();

      if (!input.sortBy) {
        return defaultReturn;
      }

      const order = input.sortBy.charAt(0);
      const sortingKey = input.sortBy.substring(1);

      if (order === ascOrder) {
        return (() => {
          if (sortingKey === 'monthYearReceived') {
            return (
              offer1.monthYearReceived.getTime() -
              offer2.monthYearReceived.getTime()
            );
          }

          if (sortingKey === 'totalCompensation') {
            const salary1 = offer1.offersFullTime?.totalCompensation.value
              ? offer1.offersFullTime?.totalCompensation.value
              : offer1.offersIntern?.monthlySalary.value;

            const salary2 = offer2.offersFullTime?.totalCompensation.value
              ? offer2.offersFullTime?.totalCompensation.value
              : offer2.offersIntern?.monthlySalary.value;

            if (salary1 == null || salary2 == null) {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Total Compensation or Salary not found',
              });
            }

            return salary1 - salary2;
          }

          if (sortingKey === 'totalYoe') {
            const yoe1 = offer1.profile.background?.totalYoe;
            const yoe2 = offer2.profile.background?.totalYoe;

            if (yoe1 == null || yoe2 == null) {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Total years of experience not found',
              });
            }

            return yoe1 - yoe2;
          }

          return defaultReturn;
        })();
      }

      if (order === descOrder) {
        return (() => {
          if (sortingKey === 'monthYearReceived') {
            return (
              offer2.monthYearReceived.getTime() -
              offer1.monthYearReceived.getTime()
            );
          }

          if (sortingKey === 'totalCompensation') {
            const salary1 = offer1.offersFullTime?.totalCompensation.value
              ? offer1.offersFullTime?.totalCompensation.value
              : offer1.offersIntern?.monthlySalary.value;

            const salary2 = offer2.offersFullTime?.totalCompensation.value
              ? offer2.offersFullTime?.totalCompensation.value
              : offer2.offersIntern?.monthlySalary.value;

            if (salary1 == null || salary2 == null) {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Total Compensation or Salary not found',
              });
            }

            return salary2 - salary1;
          }

          if (sortingKey === 'totalYoe') {
            const yoe1 = offer1.profile.background?.totalYoe;
            const yoe2 = offer2.profile.background?.totalYoe;

            if (yoe1 == null || yoe2 == null) {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Total years of experience not found',
              });
            }

            return yoe2 - yoe1;
          }

          return defaultReturn;
        })();
      }
      return defaultReturn;
    });

    const startRecordIndex: number = input.limit * input.offset;
    const endRecordIndex: number =
      startRecordIndex + input.limit <= data.length
        ? startRecordIndex + input.limit
        : data.length;
    const paginatedData = data.slice(startRecordIndex, endRecordIndex);

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
