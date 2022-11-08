import type {
  City,
  Company,
  Country,
  OffersAnalysis,
  OffersAnalysisUnit,
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
  State,
  User,
} from '@prisma/client';
import { JobType } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import type {
  AddToProfileResponse,
  AdminDashboardOffer,
  AnalysisHighestOffer,
  AnalysisOffer,
  AnalysisUnit,
  Background,
  CreateOfferProfileResponse,
  DashboardOffer,
  Education,
  Experience,
  GetAdminOffersResponse,
  GetOffersResponse,
  Location,
  OffersCompany,
  Paging,
  Profile,
  ProfileAnalysis,
  ProfileOffer,
  SpecificYoe,
  UserProfile,
  UserProfileOffer,
  Valuation,
} from '~/types/offers';

const analysisOfferDtoMapper = (
  offer: OffersOffer & {
    company: Company;
    location: City & { state: State & { country: Country } };
    offersFullTime:
      | (OffersFullTime & { totalCompensation: OffersCurrency })
      | null;
    offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
    profile: OffersProfile & {
      background:
        | (OffersBackground & {
            experiences: Array<
              OffersExperience & {
                company: Company | null;
                location:
                  | (City & { state: State & { country: Country } })
                  | null;
              }
            >;
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
    location: locationDtoMapper(offer.location),
    monthYearReceived: offer.monthYearReceived,
    negotiationStrategy: offer.negotiationStrategy,
    previousCompanies:
      background?.experiences
        ?.filter((exp) => exp.company != null)
        .map((exp) => exp.company?.name ?? '') ?? [],
    profileId: offer.profileId,
    profileName,
    title:
      offer.jobType === JobType.FULLTIME
        ? offer.offersFullTime?.title ?? ''
        : offer.offersIntern?.title ?? '',
    totalYoe: background?.totalYoe ?? -1,
  };

  if (
    offer.offersFullTime?.totalCompensation &&
    offer.jobType === JobType.FULLTIME
  ) {
    analysisOfferDto.income.value =
      offer.offersFullTime.totalCompensation.value;
    analysisOfferDto.income.currency =
      offer.offersFullTime.totalCompensation.currency;
    analysisOfferDto.income.id = offer.offersFullTime.totalCompensation.id;
    analysisOfferDto.income.baseValue =
      offer.offersFullTime.totalCompensation.baseValue;
    analysisOfferDto.income.baseCurrency =
      offer.offersFullTime.totalCompensation.baseCurrency;
  } else if (
    offer.offersIntern?.monthlySalary &&
    offer.jobType === JobType.INTERN
  ) {
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

const analysisUnitDtoMapper = (
  analysisUnit: OffersAnalysisUnit & {
    analysedOffer: OffersOffer & {
      company: Company;
      offersFullTime:
        | (OffersFullTime & { totalCompensation: OffersCurrency })
        | null;
      offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
      profile: OffersProfile & { background: OffersBackground | null };
    };
    topSimilarOffers: Array<
      OffersOffer & {
        company: Company;
        location: City & { state: State & { country: Country } };
        offersFullTime:
          | (OffersFullTime & { totalCompensation: OffersCurrency })
          | null;
        offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
        profile: OffersProfile & {
          background:
            | (OffersBackground & {
                experiences: Array<
                  OffersExperience & {
                    company: Company | null;
                    location:
                      | (City & { state: State & { country: Country } })
                      | null;
                  }
                >;
              })
            | null;
        };
      }
    >;
  },
) => {
  const { analysedOffer } = analysisUnit;
  const { jobType } = analysedOffer;

  const analysisUnitDto: AnalysisUnit = {
    companyId: analysedOffer.companyId,
    companyName: analysedOffer.company.name,
    income: valuationDtoMapper({
      baseCurrency: '',
      baseValue: -1,
      currency: '',
      id: '',
      value: -1,
    }),
    jobType,
    noOfOffers: analysisUnit.noOfSimilarOffers,
    percentile: analysisUnit.percentile,
    title:
      jobType === JobType.FULLTIME && analysedOffer.offersFullTime != null
        ? analysedOffer.offersFullTime.title
        : jobType === JobType.INTERN && analysedOffer.offersIntern != null
        ? analysedOffer.offersIntern.title
        : '',
    topPercentileOffers: analysisUnit.topSimilarOffers.map((offer) =>
      analysisOfferDtoMapper(offer),
    ),
    totalYoe: analysisUnit.analysedOffer.profile.background?.totalYoe ?? 0,
  };

  if (
    analysedOffer.offersFullTime &&
    analysedOffer.jobType === JobType.FULLTIME
  ) {
    analysisUnitDto.income = valuationDtoMapper(
      analysedOffer.offersFullTime.totalCompensation,
    );
  } else if (
    analysedOffer.offersIntern &&
    analysedOffer.jobType === JobType.INTERN
  ) {
    analysisUnitDto.income = valuationDtoMapper(
      analysedOffer.offersIntern.monthlySalary,
    );
  }

  return analysisUnitDto;
};

const analysisHighestOfferDtoMapper = (
  offer: OffersOffer & {
    company: Company;
    location: City & { state: State & { country: Country } };
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
    location: locationDtoMapper(offer.location),
    totalYoe: offer.profile.background?.totalYoe ?? -1,
  };
  return analysisHighestOfferDto;
};

export const profileAnalysisDtoMapper = (
  analysis:
    | (OffersAnalysis & {
        companyAnalysis: Array<
          OffersAnalysisUnit & {
            analysedOffer: OffersOffer & {
              company: Company;
              offersFullTime:
                | (OffersFullTime & { totalCompensation: OffersCurrency })
                | null;
              offersIntern:
                | (OffersIntern & { monthlySalary: OffersCurrency })
                | null;
              profile: OffersProfile & { background: OffersBackground | null };
            };
            topSimilarOffers: Array<
              OffersOffer & {
                company: Company;
                location: City & { state: State & { country: Country } };
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
                          OffersExperience & {
                            company: Company | null;
                            location:
                              | (City & { state: State & { country: Country } })
                              | null;
                          }
                        >;
                      })
                    | null;
                };
              }
            >;
          }
        >;
        overallAnalysis: OffersAnalysisUnit & {
          analysedOffer: OffersOffer & {
            company: Company;
            offersFullTime:
              | (OffersFullTime & { totalCompensation: OffersCurrency })
              | null;
            offersIntern:
              | (OffersIntern & { monthlySalary: OffersCurrency })
              | null;
            profile: OffersProfile & { background: OffersBackground | null };
          };
          topSimilarOffers: Array<
            OffersOffer & {
              company: Company;
              location: City & { state: State & { country: Country } };
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
                        OffersExperience & {
                          company: Company | null;
                          location:
                            | (City & { state: State & { country: Country } })
                            | null;
                        }
                      >;
                    })
                  | null;
              };
            }
          >;
        };
        overallHighestOffer: OffersOffer & {
          company: Company;
          location: City & { state: State & { country: Country } };
          offersFullTime:
            | (OffersFullTime & { totalCompensation: OffersCurrency })
            | null;
          offersIntern:
            | (OffersIntern & { monthlySalary: OffersCurrency })
            | null;
          profile: OffersProfile & { background: OffersBackground | null };
        };
      })
    | null,
) => {
  if (analysis == null) {
    return null;
  }

  const profileAnalysisDto: ProfileAnalysis = {
    companyAnalysis: analysis.companyAnalysis.map((analysisUnit) =>
      analysisUnitDtoMapper(analysisUnit),
    ),
    createdAt: analysis.createdAt,
    id: analysis.id,
    overallAnalysis: analysisUnitDtoMapper(analysis.overallAnalysis),
    overallHighestOffer: analysisHighestOfferDtoMapper(
      analysis.overallHighestOffer,
    ),
    profileId: analysis.profileId,
    updatedAt: analysis.updatedAt,
  };
  return profileAnalysisDto;
};

export const locationDtoMapper = (
  city: City & { state: State & { country: Country } },
) => {
  const { state } = city;
  const { country } = state;
  const locationDto: Location = {
    cityId: city.id,
    cityName: city.name,
    countryCode: country.code,
    countryId: country.id,
    countryName: country.name,
    stateId: state.id,
    stateName: state.name,
  };
  return locationDto;
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
    location: (City & { state: State & { country: Country } }) | null;
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
    location:
      experience.location != null
        ? locationDtoMapper(experience.location)
        : null,
    monthlySalary:
      experience.monthlySalary && experience.jobType === JobType.INTERN
        ? valuationDtoMapper(experience.monthlySalary)
        : null,
    title: experience.title,
    totalCompensation:
      experience.totalCompensation && experience.jobType === JobType.FULLTIME
        ? valuationDtoMapper(experience.totalCompensation)
        : null,
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
            location: (City & { state: State & { country: Country } }) | null;
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
    location: City & { state: State & { country: Country } };
    offersFullTime:
      | (OffersFullTime & {
          baseSalary: OffersCurrency | null;
          bonus: OffersCurrency | null;
          stocks: OffersCurrency | null;
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
    location: locationDtoMapper(offer.location),
    monthYearReceived: offer.monthYearReceived,
    negotiationStrategy: offer.negotiationStrategy,
    offersFullTime: null,
    offersIntern: null,
  };

  if (offer.offersFullTime && offer.jobType === JobType.FULLTIME) {
    profileOfferDto.offersFullTime = {
      baseSalary:
        offer.offersFullTime?.baseSalary != null
          ? valuationDtoMapper(offer.offersFullTime.baseSalary)
          : null,
      bonus:
        offer.offersFullTime?.bonus != null
          ? valuationDtoMapper(offer.offersFullTime.bonus)
          : null,
      id: offer.offersFullTime.id,
      level: offer.offersFullTime.level,
      stocks:
        offer.offersFullTime?.stocks != null
          ? valuationDtoMapper(offer.offersFullTime.stocks)
          : null,
      title: offer.offersFullTime.title,
      totalCompensation: valuationDtoMapper(
        offer.offersFullTime.totalCompensation,
      ),
    };
  } else if (offer.offersIntern && offer.jobType === JobType.INTERN) {
    profileOfferDto.offersIntern = {
      id: offer.offersIntern.id,
      internshipCycle: offer.offersIntern.internshipCycle,
      monthlySalary: valuationDtoMapper(offer.offersIntern.monthlySalary),
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
          companyAnalysis: Array<
            OffersAnalysisUnit & {
              analysedOffer: OffersOffer & {
                company: Company;
                offersFullTime:
                  | (OffersFullTime & { totalCompensation: OffersCurrency })
                  | null;
                offersIntern:
                  | (OffersIntern & { monthlySalary: OffersCurrency })
                  | null;
                profile: OffersProfile & {
                  background: OffersBackground | null;
                };
              };
              topSimilarOffers: Array<
                OffersOffer & {
                  company: Company;
                  location: City & { state: State & { country: Country } };
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
                            OffersExperience & {
                              company: Company | null;
                              location:
                                | (City & {
                                    state: State & { country: Country };
                                  })
                                | null;
                            }
                          >;
                        })
                      | null;
                  };
                }
              >;
            }
          >;
          overallAnalysis: OffersAnalysisUnit & {
            analysedOffer: OffersOffer & {
              company: Company;
              offersFullTime:
                | (OffersFullTime & { totalCompensation: OffersCurrency })
                | null;
              offersIntern:
                | (OffersIntern & { monthlySalary: OffersCurrency })
                | null;
              profile: OffersProfile & { background: OffersBackground | null };
            };
            topSimilarOffers: Array<
              OffersOffer & {
                company: Company;
                location: City & { state: State & { country: Country } };
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
                          OffersExperience & {
                            company: Company | null;
                            location:
                              | (City & { state: State & { country: Country } })
                              | null;
                          }
                        >;
                      })
                    | null;
                };
              }
            >;
          };
          overallHighestOffer: OffersOffer & {
            company: Company;
            location: City & { state: State & { country: Country } };
            offersFullTime:
              | (OffersFullTime & { totalCompensation: OffersCurrency })
              | null;
            offersIntern:
              | (OffersIntern & { monthlySalary: OffersCurrency })
              | null;
            profile: OffersProfile & { background: OffersBackground | null };
          };
        })
      | null;
    background:
      | (OffersBackground & {
          educations: Array<OffersEducation>;
          experiences: Array<
            OffersExperience & {
              company: Company | null;
              location: (City & { state: State & { country: Country } }) | null;
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
        location: City & { state: State & { country: Country } };
        offersFullTime:
          | (OffersFullTime & {
              baseSalary: OffersCurrency | null;
              bonus: OffersCurrency | null;
              stocks: OffersCurrency | null;
              totalCompensation: OffersCurrency;
            })
          | null;
        offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
      }
    >;
    users: Array<User>;
  },
  inputToken: string | undefined,
  inputUserId: string | null | undefined,
) => {
  const profileDto: Profile = {
    analysis: profileAnalysisDtoMapper(profile.analysis),
    background: backgroundDtoMapper(profile.background),
    editToken: null,
    id: profile.id,
    isEditable: false,
    isSaved: false,
    offers: profile.offers.map((offer) => profileOfferDtoMapper(offer)),
    profileName: profile.profileName,
  };

  if (inputToken === profile.editToken) {
    profileDto.editToken = profile.editToken ?? null;
    profileDto.isEditable = true;

    const { users } = profile;

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === inputUserId) {
        profileDto.isSaved = true;
      }
    }
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
    location: City & { state: State & { country: Country } };
    offersFullTime:
      | (OffersFullTime & {
          baseSalary: OffersCurrency | null;
          bonus: OffersCurrency | null;
          stocks: OffersCurrency | null;
          totalCompensation: OffersCurrency;
        })
      | null;
    offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
    profile: OffersProfile & {
      background: OffersBackground | null;
      offers: Array<OffersOffer>;
    };
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
    location: locationDtoMapper(offer.location),
    monthYearReceived: offer.monthYearReceived,
    numberOfOtherOffers:
      offer.profile.offers.length < 2 ? 0 : offer.profile.offers.length - 1,
    profileId: offer.profileId,
    title: offer.offersFullTime?.title || offer.offersIntern?.title || '',
    totalYoe: offer.profile.background?.totalYoe ?? -1,
  };

  if (offer.offersFullTime && offer.jobType === JobType.FULLTIME) {
    dashboardOfferDto.income = valuationDtoMapper(
      offer.offersFullTime.totalCompensation,
    );

    if (offer.offersFullTime.baseSalary) {
      dashboardOfferDto.baseSalary = valuationDtoMapper(
        offer.offersFullTime.baseSalary,
      );
    }

    if (offer.offersFullTime.bonus) {
      dashboardOfferDto.bonus = valuationDtoMapper(offer.offersFullTime.bonus);
    }

    if (offer.offersFullTime.stocks) {
      dashboardOfferDto.stocks = valuationDtoMapper(
        offer.offersFullTime.stocks,
      );
    }
  } else if (offer.offersIntern && offer.jobType === JobType.INTERN) {
    dashboardOfferDto.income = valuationDtoMapper(
      offer.offersIntern.monthlySalary,
    );
  }

  return dashboardOfferDto;
};

export const getOffersResponseMapper = (
  data: Array<DashboardOffer>,
  paging: Paging,
  jobType: JobType,
) => {
  const getOffersResponse: GetOffersResponse = {
    data,
    jobType,
    paging,
  };
  return getOffersResponse;
};

export const getUserProfileResponseMapper = (
  res:
    | (User & {
        OffersProfile: Array<
          OffersProfile & {
            offers: Array<
              OffersOffer & {
                company: Company;
                location: City & { state: State & { country: Country } };
                offersFullTime:
                  | (OffersFullTime & { totalCompensation: OffersCurrency })
                  | null;
                offersIntern:
                  | (OffersIntern & { monthlySalary: OffersCurrency })
                  | null;
              }
            >;
          }
        >;
      })
    | null,
): Array<UserProfile> => {
  if (res) {
    return res.OffersProfile.map((profile) => {
      return {
        createdAt: profile.createdAt,
        id: profile.id,
        offers: profile.offers.map((offer) => {
          return userProfileOfferDtoMapper(offer);
        }),
        profileName: profile.profileName,
        token: profile.editToken,
      };
    }).sort((a, b) => {
      return b.createdAt > a.createdAt ? 1 : -1;
    });
  }

  return [];
};

const userProfileOfferDtoMapper = (
  offer: OffersOffer & {
    company: Company;
    location: City & { state: State & { country: Country } };
    offersFullTime:
      | (OffersFullTime & { totalCompensation: OffersCurrency })
      | null;
    offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
  },
): UserProfileOffer => {
  const mappedOffer: UserProfileOffer = {
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
    location: locationDtoMapper(offer.location),
    monthYearReceived: offer.monthYearReceived,
    title:
      offer.jobType === JobType.FULLTIME
        ? offer.offersFullTime?.title ?? ''
        : offer.offersIntern?.title ?? '',
  };

  if (
    offer.offersFullTime?.totalCompensation &&
    offer.jobType === JobType.FULLTIME
  ) {
    mappedOffer.income.value = offer.offersFullTime.totalCompensation.value;
    mappedOffer.income.currency =
      offer.offersFullTime.totalCompensation.currency;
    mappedOffer.income.id = offer.offersFullTime.totalCompensation.id;
    mappedOffer.income.baseValue =
      offer.offersFullTime.totalCompensation.baseValue;
    mappedOffer.income.baseCurrency =
      offer.offersFullTime.totalCompensation.baseCurrency;
  } else if (
    offer.offersIntern?.monthlySalary &&
    offer.jobType === JobType.INTERN
  ) {
    mappedOffer.income.value = offer.offersIntern.monthlySalary.value;
    mappedOffer.income.currency = offer.offersIntern.monthlySalary.currency;
    mappedOffer.income.id = offer.offersIntern.monthlySalary.id;
    mappedOffer.income.baseValue = offer.offersIntern.monthlySalary.baseValue;
    mappedOffer.income.baseCurrency =
      offer.offersIntern.monthlySalary.baseCurrency;
  } else {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Total Compensation or Salary not found',
    });
  }

  return mappedOffer;
};

export const adminDashboardOfferDtoMapper = (
  offer: OffersOffer & {
    company: Company;
    location: City & { state: State & { country: Country } };
    offersFullTime:
      | (OffersFullTime & {
          baseSalary: OffersCurrency | null;
          bonus: OffersCurrency | null;
          stocks: OffersCurrency | null;
          totalCompensation: OffersCurrency;
        })
      | null;
    offersIntern: (OffersIntern & { monthlySalary: OffersCurrency }) | null;
    profile: OffersProfile & {
      background: OffersBackground | null;
      offers: Array<OffersOffer>;
    };
  },
) => {
  const adminDashboardOfferDto: AdminDashboardOffer = {
    company: offersCompanyDtoMapper(offer.company),
    id: offer.id,
    income: valuationDtoMapper({
      baseCurrency: '',
      baseValue: -1,
      currency: '',
      id: '',
      value: -1,
    }),
    location: locationDtoMapper(offer.location),
    monthYearReceived: offer.monthYearReceived,
    numberOfOtherOffers:
      offer.profile.offers.length < 2 ? 0 : offer.profile.offers.length - 1,
    profileId: offer.profileId,
    title: offer.offersFullTime?.title || offer.offersIntern?.title || '',
    token: offer.profile.editToken,
    totalYoe: offer.profile.background?.totalYoe ?? -1,
  };

  if (offer.offersFullTime && offer.jobType === JobType.FULLTIME) {
    adminDashboardOfferDto.income = valuationDtoMapper(
      offer.offersFullTime.totalCompensation,
    );

    if (offer.offersFullTime.baseSalary) {
      adminDashboardOfferDto.baseSalary = valuationDtoMapper(
        offer.offersFullTime.baseSalary,
      );
    }

    if (offer.offersFullTime.bonus) {
      adminDashboardOfferDto.bonus = valuationDtoMapper(
        offer.offersFullTime.bonus,
      );
    }

    if (offer.offersFullTime.stocks) {
      adminDashboardOfferDto.stocks = valuationDtoMapper(
        offer.offersFullTime.stocks,
      );
    }
  } else if (offer.offersIntern && offer.jobType === JobType.INTERN) {
    adminDashboardOfferDto.income = valuationDtoMapper(
      offer.offersIntern.monthlySalary,
    );
  }

  return adminDashboardOfferDto;
};

export const getAdminOffersResponseMapper = (
  data: Array<AdminDashboardOffer>,
  paging: Paging,
  jobType: JobType,
) => {
  const getAdminOffersResponse: GetAdminOffersResponse = {
    data,
    jobType,
    paging,
  };
  return getAdminOffersResponse;
};
