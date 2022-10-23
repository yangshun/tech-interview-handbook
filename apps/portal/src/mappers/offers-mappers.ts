import type {
  Company,
  OffersAnalysis,
  OffersBackground,
  OffersCurrency,
  OffersEducation,
  OffersExperience,
  OffersFullTime,
  OffersIntern,
  OffersOffer,
  OffersProfile,
  OffersReply,
  OffersSpecificYoe,
  User,
} from '@prisma/client';
import { JobType } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import type {
  AddToProfileResponse,
  Analysis,
  AnalysisHighestOffer,
  AnalysisOffer,
  Background,
  CreateOfferProfileResponse,
  DashboardOffer,
  Education,
  Experience,
  GetOffersResponse,
  OffersCompany,
  Paging,
  Profile,
  ProfileAnalysis,
  ProfileOffer,
  SpecificYoe,
  Valuation,
} from '~/types/offers';

const analysisOfferDtoMapper = (
  offer: OffersOffer & {
    company: Company;
    offersFullTime:
      | (OffersFullTime & { totalCompensation: OffersCurrency })
      | null;
    offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
    profile: OffersProfile & {
      background:
        | (OffersBackground & {
            experiences: Array<OffersExperience & { company: Company | null }>;
          })
        | null;
    };
  },
) => {
  const { background, profileName } = offer.profile;
  const analysisOfferDto: AnalysisOffer = {
    company: offersCompanyDtoMapper(offer.company),
    id: offer.id,
    income: {
      baseCurrency: '',
      baseValue: -1,
      currency: '',
      id: '',
      value: -1,
    },
    jobType: offer.jobType,
    level: offer.offersFullTime?.level ?? '',
    location: offer.location,
    monthYearReceived: offer.monthYearReceived,
    negotiationStrategy: offer.negotiationStrategy,
    previousCompanies:
      background?.experiences
        ?.filter((exp) => exp.company != null)
        .map((exp) => exp.company?.name ?? '') ?? [],
    profileName,
    specialization:
      offer.jobType === JobType.FULLTIME
        ? offer.offersFullTime?.specialization ?? ''
        : offer.offersIntern?.specialization ?? '',
    title:
      offer.jobType === JobType.FULLTIME
        ? offer.offersFullTime?.title ?? ''
        : offer.offersIntern?.title ?? '',
    totalYoe: background?.totalYoe ?? -1,
  };

  if (offer.offersFullTime?.totalCompensation) {
    analysisOfferDto.income.value =
      offer.offersFullTime.totalCompensation.value;
    analysisOfferDto.income.currency =
      offer.offersFullTime.totalCompensation.currency;
    analysisOfferDto.income.id = offer.offersFullTime.totalCompensation.id;
    analysisOfferDto.income.baseValue =
      offer.offersFullTime.totalCompensation.baseValue;
    analysisOfferDto.income.baseCurrency =
      offer.offersFullTime.totalCompensation.baseCurrency;
  } else if (offer.offersIntern?.monthlySalary) {
    analysisOfferDto.income.value = offer.offersIntern.monthlySalary.value;
    analysisOfferDto.income.currency =
      offer.offersIntern.monthlySalary.currency;
    analysisOfferDto.income.id = offer.offersIntern.monthlySalary.id;
    analysisOfferDto.income.baseValue =
      offer.offersIntern.monthlySalary.baseValue;
    analysisOfferDto.income.baseCurrency =
      offer.offersIntern.monthlySalary.baseCurrency;
  } else {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Total Compensation or Salary not found',
    });
  }

  return analysisOfferDto;
};

const analysisDtoMapper = (
  noOfOffers: number,
  percentile: number,
  topPercentileOffers: Array<
    OffersOffer & {
      company: Company;
      offersFullTime:
        | (OffersFullTime & {
            totalCompensation: OffersCurrency;
          })
        | null;
      offersIntern:
        | (OffersIntern & {
            monthlySalary: OffersCurrency;
          })
        | null;
      profile: OffersProfile & {
        background:
          | (OffersBackground & {
              experiences: Array<
                OffersExperience & {
                  company: Company | null;
                }
              >;
            })
          | null;
      };
    }
  >,
) => {
  const analysisDto: Analysis = {
    noOfOffers,
    percentile,
    topPercentileOffers: topPercentileOffers.map((offer) =>
      analysisOfferDtoMapper(offer),
    ),
  };
  return analysisDto;
};

const analysisHighestOfferDtoMapper = (
  offer: OffersOffer & {
    company: Company;
    offersFullTime:
      | (OffersFullTime & { totalCompensation: OffersCurrency })
      | null;
    offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
    profile: OffersProfile & { background: OffersBackground | null };
  },
) => {
  const analysisHighestOfferDto: AnalysisHighestOffer = {
    company: offersCompanyDtoMapper(offer.company),
    id: offer.id,
    level: offer.offersFullTime?.level ?? '',
    location: offer.location,
    specialization:
      offer.jobType === JobType.FULLTIME
        ? offer.offersFullTime?.specialization ?? ''
        : offer.offersIntern?.specialization ?? '',
    totalYoe: offer.profile.background?.totalYoe ?? -1,
  };
  return analysisHighestOfferDto;
};

export const profileAnalysisDtoMapper = (
  analysis:
    | (OffersAnalysis & {
        overallHighestOffer: OffersOffer & {
          company: Company;
          offersFullTime:
            | (OffersFullTime & { totalCompensation: OffersCurrency })
            | null;
          offersIntern:
            | (OffersIntern & { monthlySalary: OffersCurrency })
            | null;
          profile: OffersProfile & { background: OffersBackground | null };
        };
        topCompanyOffers: Array<
          OffersOffer & {
            company: Company;
            offersFullTime:
              | (OffersFullTime & { totalCompensation: OffersCurrency })
              | null;
            offersIntern:
              | (OffersIntern & { monthlySalary: OffersCurrency })
              | null;
            profile: OffersProfile & {
              background:
                | (OffersBackground & {
                    experiences: Array<
                      OffersExperience & { company: Company | null }
                    >;
                  })
                | null;
            };
          }
        >;
        topOverallOffers: Array<
          OffersOffer & {
            company: Company;
            offersFullTime:
              | (OffersFullTime & { totalCompensation: OffersCurrency })
              | null;
            offersIntern:
              | (OffersIntern & { monthlySalary: OffersCurrency })
              | null;
            profile: OffersProfile & {
              background:
                | (OffersBackground & {
                    experiences: Array<
                      OffersExperience & { company: Company | null }
                    >;
                  })
                | null;
            };
          }
        >;
      })
    | null,
) => {
  if (!analysis) {
    return null;
  }

  const profileAnalysisDto: ProfileAnalysis = {
    companyAnalysis: [
      analysisDtoMapper(
        analysis.noOfSimilarCompanyOffers,
        analysis.companyPercentile,
        analysis.topCompanyOffers,
      ),
    ],
    id: analysis.id,
    overallAnalysis: analysisDtoMapper(
      analysis.noOfSimilarOffers,
      analysis.overallPercentile,
      analysis.topOverallOffers,
    ),
    overallHighestOffer: analysisHighestOfferDtoMapper(
      analysis.overallHighestOffer,
    ),
    profileId: analysis.profileId,
  };
  return profileAnalysisDto;
};

export const valuationDtoMapper = (currency: {
  baseCurrency: string;
  baseValue: number;
  currency: string;
  id: string;
  value: number;
}) => {
  const valuationDto: Valuation = {
    baseCurrency: currency.baseCurrency,
    baseValue: currency.baseValue,
    currency: currency.currency,
    id: currency.id,
    value: currency.value,
  };
  return valuationDto;
};

export const offersCompanyDtoMapper = (company: Company) => {
  const companyDto: OffersCompany = {
    createdAt: company.createdAt,
    description: company?.description ?? '',
    id: company.id,
    logoUrl: company.logoUrl ?? '',
    name: company.name,
    slug: company.slug,
    updatedAt: company.updatedAt,
  };
  return companyDto;
};

export const educationDtoMapper = (education: {
  backgroundId?: string;
  endDate: Date | null;
  field: string | null;
  id: string;
  school: string | null;
  startDate: Date | null;
  type: string | null;
}) => {
  const educationDto: Education = {
    endDate: education.endDate,
    field: education.field,
    id: education.id,
    school: education.school,
    startDate: education.startDate,
    type: education.type,
  };
  return educationDto;
};

export const experienceDtoMapper = (
  experience: OffersExperience & {
    company: Company | null;
    monthlySalary: OffersCurrency | null;
    totalCompensation: OffersCurrency | null;
  },
) => {
  const experienceDto: Experience = {
    company: experience.company
      ? offersCompanyDtoMapper(experience.company)
      : null,
    durationInMonths: experience.durationInMonths,
    id: experience.id,
    jobType: experience.jobType,
    level: experience.level,
    location: experience.location,
    monthlySalary: experience.monthlySalary
      ? valuationDtoMapper(experience.monthlySalary)
      : experience.monthlySalary,
    specialization: experience.specialization,
    title: experience.title,
    totalCompensation: experience.totalCompensation
      ? valuationDtoMapper(experience.totalCompensation)
      : experience.totalCompensation,
  };
  return experienceDto;
};

export const specificYoeDtoMapper = (specificYoe: {
  backgroundId?: string;
  domain: string;
  id: string;
  yoe: number;
}) => {
  const specificYoeDto: SpecificYoe = {
    domain: specificYoe.domain,
    id: specificYoe.id,
    yoe: specificYoe.yoe,
  };
  return specificYoeDto;
};

export const backgroundDtoMapper = (
  background:
    | (OffersBackground & {
        educations: Array<OffersEducation>;
        experiences: Array<
          OffersExperience & {
            company: Company | null;
            monthlySalary: OffersCurrency | null;
            totalCompensation: OffersCurrency | null;
          }
        >;
        specificYoes: Array<OffersSpecificYoe>;
      })
    | null,
) => {
  if (!background) {
    return null;
  }

  const educations = background.educations.map((education) =>
    educationDtoMapper(education),
  );

  const experiences = background.experiences.map((experience) =>
    experienceDtoMapper(experience),
  );

  const specificYoes = background.specificYoes.map((specificYoe) =>
    specificYoeDtoMapper(specificYoe),
  );

  const backgroundDto: Background = {
    educations,
    experiences,
    id: background.id,
    specificYoes,
    totalYoe: background.totalYoe,
  };

  return backgroundDto;
};

export const profileOfferDtoMapper = (
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
  },
) => {
  const profileOfferDto: ProfileOffer = {
    comments: offer.comments,
    company: offersCompanyDtoMapper(offer.company),
    id: offer.id,
    jobType: offer.jobType,
    location: offer.location,
    monthYearReceived: offer.monthYearReceived,
    negotiationStrategy: offer.negotiationStrategy,
    offersFullTime: offer.offersFullTime,
    offersIntern: offer.offersIntern,
  };

  if (offer.offersFullTime) {
    profileOfferDto.offersFullTime = {
      baseSalary: valuationDtoMapper(offer.offersFullTime.baseSalary),
      bonus: valuationDtoMapper(offer.offersFullTime.bonus),
      id: offer.offersFullTime.id,
      level: offer.offersFullTime.level,
      specialization: offer.offersFullTime.specialization,
      stocks: valuationDtoMapper(offer.offersFullTime.stocks),
      title: offer.offersFullTime.title,
      totalCompensation: valuationDtoMapper(
        offer.offersFullTime.totalCompensation,
      ),
    };
  } else if (offer.offersIntern) {
    profileOfferDto.offersIntern = {
      id: offer.offersIntern.id,
      internshipCycle: offer.offersIntern.internshipCycle,
      monthlySalary: valuationDtoMapper(offer.offersIntern.monthlySalary),
      specialization: offer.offersIntern.specialization,
      startYear: offer.offersIntern.startYear,
      title: offer.offersIntern.title,
    };
  }

  return profileOfferDto;
};

export const profileDtoMapper = (
  profile: OffersProfile & {
    analysis:
      | (OffersAnalysis & {
          overallHighestOffer: OffersOffer & {
            company: Company;
            offersFullTime:
              | (OffersFullTime & { totalCompensation: OffersCurrency })
              | null;
            offersIntern:
              | (OffersIntern & { monthlySalary: OffersCurrency })
              | null;
            profile: OffersProfile & { background: OffersBackground | null };
          };
          topCompanyOffers: Array<
            OffersOffer & {
              company: Company;
              offersFullTime:
                | (OffersFullTime & { totalCompensation: OffersCurrency })
                | null;
              offersIntern:
                | (OffersIntern & { monthlySalary: OffersCurrency })
                | null;
              profile: OffersProfile & {
                background:
                  | (OffersBackground & {
                      experiences: Array<
                        OffersExperience & { company: Company | null }
                      >;
                    })
                  | null;
              };
            }
          >;
          topOverallOffers: Array<
            OffersOffer & {
              company: Company;
              offersFullTime:
                | (OffersFullTime & { totalCompensation: OffersCurrency })
                | null;
              offersIntern:
                | (OffersIntern & { monthlySalary: OffersCurrency })
                | null;
              profile: OffersProfile & {
                background:
                  | (OffersBackground & {
                      experiences: Array<
                        OffersExperience & { company: Company | null }
                      >;
                    })
                  | null;
              };
            }
          >;
        })
      | null;
    background:
      | (OffersBackground & {
          educations: Array<OffersEducation>;
          experiences: Array<
            OffersExperience & {
              company: Company | null;
              monthlySalary: OffersCurrency | null;
              totalCompensation: OffersCurrency | null;
            }
          >;
          specificYoes: Array<OffersSpecificYoe>;
        })
      | null;
    discussion: Array<
      OffersReply & {
        replies: Array<OffersReply>;
        replyingTo: OffersReply | null;
        user: User | null;
      }
    >;
    offers: Array<
      OffersOffer & {
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
      }
    >;
  },
  inputToken: string | undefined,
) => {
  const profileDto: Profile = {
    analysis: profileAnalysisDtoMapper(profile.analysis),
    background: backgroundDtoMapper(profile.background),
    editToken: null,
    id: profile.id,
    isEditable: false,
    offers: profile.offers.map((offer) => profileOfferDtoMapper(offer)),
    profileName: profile.profileName,
  };

  if (inputToken === profile.editToken) {
    profileDto.editToken = profile.editToken;
    profileDto.isEditable = true;
  }

  return profileDto;
};

export const createOfferProfileResponseMapper = (
  profile: { id: string },
  token: string,
) => {
  const res: CreateOfferProfileResponse = {
    id: profile.id,
    token,
  };
  return res;
};

export const addToProfileResponseMapper = (updatedProfile: {
  id: string;
  profileName: string;
  userId?: string | null;
}) => {
  const addToProfileResponse: AddToProfileResponse = {
    id: updatedProfile.id,
    profileName: updatedProfile.profileName,
    userId: updatedProfile.userId ?? '',
  };

  return addToProfileResponse;
};

export const dashboardOfferDtoMapper = (
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
) => {
  const dashboardOfferDto: DashboardOffer = {
    company: offersCompanyDtoMapper(offer.company),
    id: offer.id,
    income: valuationDtoMapper({
      baseCurrency: '',
      baseValue: -1,
      currency: '',
      id: '',
      value: -1,
    }),
    monthYearReceived: offer.monthYearReceived,
    profileId: offer.profileId,
    title: offer.offersFullTime?.title || offer.offersIntern?.title || '',
    totalYoe: offer.profile.background?.totalYoe ?? -1,
  };

  if (offer.offersFullTime) {
    dashboardOfferDto.income = valuationDtoMapper(
      offer.offersFullTime.totalCompensation,
    );
  } else if (offer.offersIntern) {
    dashboardOfferDto.income = valuationDtoMapper(
      offer.offersIntern.monthlySalary,
    );
  }

  return dashboardOfferDto;
};

export const getOffersResponseMapper = (
  data: Array<DashboardOffer>,
  paging: Paging,
) => {
  const getOffersResponse: GetOffersResponse = {
    data,
    paging,
  };
  return getOffersResponse;
};
