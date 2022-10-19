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
    OffersFullTime:
      | (OffersFullTime & { totalCompensation: OffersCurrency })
      | null;
    OffersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
    company: Company;
    profile: OffersProfile & { background: OffersBackground | null };
  },
) => {
  const { background, profileName } = offer.profile;
  const analysisOfferDto: AnalysisOffer = {
    company: offersCompanyDtoMapper(offer.company),
    id: offer.id,
    income: -1,
    jobType: offer.jobType,
    level: offer.OffersFullTime?.level ?? '',
    location: offer.location,
    monthYearReceived: offer.monthYearReceived,
    negotiationStrategy: offer.negotiationStrategy,
    previousCompanies: [],
    profileName,
    specialization:
      offer.jobType === JobType.FULLTIME
        ? offer.OffersFullTime?.specialization ?? ''
        : offer.OffersIntern?.specialization ?? '',
    title:
      offer.jobType === JobType.FULLTIME
        ? offer.OffersFullTime?.title ?? ''
        : offer.OffersIntern?.title ?? '',
    totalYoe: background?.totalYoe ?? -1,
  };

  if (offer.OffersFullTime?.totalCompensation) {
    analysisOfferDto.income = offer.OffersFullTime.totalCompensation.value;
  } else if (offer.OffersIntern?.monthlySalary) {
    analysisOfferDto.income = offer.OffersIntern.monthlySalary.value;
  }

  return analysisOfferDto;
};

const analysisDtoMapper = (
  noOfOffers: number,
  percentile: number,
  topPercentileOffers: Array<
    OffersOffer & {
      OffersFullTime:
        | (OffersFullTime & { totalCompensation: OffersCurrency })
        | null;
      OffersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
      company: Company;
      profile: OffersProfile & { background: OffersBackground | null };
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
    OffersFullTime:
      | (OffersFullTime & { totalCompensation: OffersCurrency })
      | null;
    OffersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
    company: Company;
    profile: OffersProfile & { background: OffersBackground | null };
  },
) => {
  const analysisHighestOfferDto: AnalysisHighestOffer = {
    company: offersCompanyDtoMapper(offer.company),
    id: offer.id,
    level: offer.OffersFullTime?.level ?? '',
    location: offer.location,
    specialization:
      offer.jobType === JobType.FULLTIME
        ? offer.OffersFullTime?.specialization ?? ''
        : offer.OffersIntern?.specialization ?? '',
    totalYoe: offer.profile.background?.totalYoe ?? -1,
  };
  return analysisHighestOfferDto;
};

export const profileAnalysisDtoMapper = (
  analysis:
    | (OffersAnalysis & {
        overallHighestOffer: OffersOffer & {
          OffersFullTime:
            | (OffersFullTime & { totalCompensation: OffersCurrency })
            | null;
          OffersIntern:
            | (OffersIntern & { monthlySalary: OffersCurrency })
            | null;
          company: Company;
          profile: OffersProfile & { background: OffersBackground | null };
        };
        topCompanyOffers: Array<
          OffersOffer & {
            OffersFullTime:
              | (OffersFullTime & { totalCompensation: OffersCurrency })
              | null;
            OffersIntern:
              | (OffersIntern & { monthlySalary: OffersCurrency })
              | null;
            company: Company;
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
            OffersFullTime:
              | (OffersFullTime & { totalCompensation: OffersCurrency })
              | null;
            OffersIntern:
              | (OffersIntern & { monthlySalary: OffersCurrency })
              | null;
            company: Company;
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
  currency: string;
  id?: string;
  value: number;
}) => {
  const valuationDto: Valuation = {
    currency: currency.currency,
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
    OffersFullTime:
      | (OffersFullTime & {
          baseSalary: OffersCurrency;
          bonus: OffersCurrency;
          stocks: OffersCurrency;
          totalCompensation: OffersCurrency;
        })
      | null;
    OffersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
    company: Company;
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
    offersFullTime: offer.OffersFullTime,
    offersIntern: offer.OffersIntern,
  };

  if (offer.OffersFullTime) {
    profileOfferDto.offersFullTime = {
      baseSalary: valuationDtoMapper(offer.OffersFullTime.baseSalary),
      bonus: valuationDtoMapper(offer.OffersFullTime.bonus),
      id: offer.OffersFullTime.id,
      level: offer.OffersFullTime.level,
      specialization: offer.OffersFullTime.specialization,
      stocks: valuationDtoMapper(offer.OffersFullTime.stocks),
      title: offer.OffersFullTime.title,
      totalCompensation: valuationDtoMapper(
        offer.OffersFullTime.totalCompensation,
      ),
    };
  } else if (offer.OffersIntern) {
    profileOfferDto.offersIntern = {
      id: offer.OffersIntern.id,
      internshipCycle: offer.OffersIntern.internshipCycle,
      monthlySalary: valuationDtoMapper(offer.OffersIntern.monthlySalary),
      specialization: offer.OffersIntern.specialization,
      startYear: offer.OffersIntern.startYear,
      title: offer.OffersIntern.title,
    };
  }

  return profileOfferDto;
};

export const profileDtoMapper = (
  profile: OffersProfile & {
    analysis:
      | (OffersAnalysis & {
          overallHighestOffer: OffersOffer & {
            OffersFullTime:
              | (OffersFullTime & { totalCompensation: OffersCurrency })
              | null;
            OffersIntern:
              | (OffersIntern & { monthlySalary: OffersCurrency })
              | null;
            company: Company;
            profile: OffersProfile & { background: OffersBackground | null };
          };
          topCompanyOffers: Array<
            OffersOffer & {
              OffersFullTime:
                | (OffersFullTime & { totalCompensation: OffersCurrency })
                | null;
              OffersIntern:
                | (OffersIntern & { monthlySalary: OffersCurrency })
                | null;
              company: Company;
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
              OffersFullTime:
                | (OffersFullTime & { totalCompensation: OffersCurrency })
                | null;
              OffersIntern:
                | (OffersIntern & { monthlySalary: OffersCurrency })
                | null;
              company: Company;
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
        OffersFullTime:
          | (OffersFullTime & {
              baseSalary: OffersCurrency;
              bonus: OffersCurrency;
              stocks: OffersCurrency;
              totalCompensation: OffersCurrency;
            })
          | null;
        OffersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
        company: Company;
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
    OffersFullTime:
      | (OffersFullTime & {
          baseSalary: OffersCurrency;
          bonus: OffersCurrency;
          stocks: OffersCurrency;
          totalCompensation: OffersCurrency;
        })
      | null;
    OffersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
    company: Company;
    profile: OffersProfile & { background: OffersBackground | null };
  },
) => {
  const dashboardOfferDto: DashboardOffer = {
    company: offersCompanyDtoMapper(offer.company),
    id: offer.id,
    income: valuationDtoMapper({ currency: '', value: -1 }),
    monthYearReceived: offer.monthYearReceived,
    profileId: offer.profileId,
    title: offer.OffersFullTime?.title ?? '',
    totalYoe: offer.profile.background?.totalYoe ?? -1,
  };

  if (offer.OffersFullTime) {
    dashboardOfferDto.income = valuationDtoMapper(
      offer.OffersFullTime.totalCompensation,
    );
  } else if (offer.OffersIntern) {
    dashboardOfferDto.income = valuationDtoMapper(
      offer.OffersIntern.monthlySalary,
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
