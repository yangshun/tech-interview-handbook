import type { JobType } from '@prisma/client';

export type Profile = {
  analysis?: ProfileAnalysis | null;
  background?: Background | null;
  editToken?: string | null;
  id: string;
  isEditable: boolean;
  isSaved: boolean;
  offers: Array<ProfileOffer>;
  profileName: string;
};

export type Background = {
  educations: Array<Education>;
  experiences: Array<Experience>;
  id: string;
  specificYoes: Array<SpecificYoe>;
  totalYoe: number;
};

export type Experience = {
  company?: OffersCompany | null;
  durationInMonths?: number | null;
  id: string;
  jobType?: JobType | null;
  level?: string | null;
  location?: Location | null;
  monthlySalary?: Valuation | null;
  title?: string | null;
  totalCompensation?: Valuation | null;
};

export type OffersCompany = {
  createdAt: Date;
  description: string;
  id: string;
  logoUrl: string;
  name: string;
  slug: string;
  updatedAt: Date;
};

export type Valuation = {
  baseCurrency: string;
  baseValue: number;
  currency: string;
  id: string;
  value: number;
};

export type Education = {
  endDate?: Date | null;
  field?: string | null;
  id: string;
  school?: string | null;
  startDate?: Date | null;
  type?: string | null;
};

export type SpecificYoe = {
  domain: string;
  id: string;
  yoe: number;
};

export type DashboardOffer = {
  baseSalary?: Valuation;
  bonus?: Valuation;
  company: OffersCompany;
  id: string;
  income: Valuation;
  location: Location;
  monthYearReceived: Date;
  numberOfOtherOffers: number;
  profileId: string;
  stocks?: Valuation;
  title: string;
  totalYoe: number;
};

export type ProfileOffer = {
  comments: string;
  company: OffersCompany;
  id: string;
  jobType: JobType;
  location: Location;
  monthYearReceived: Date;
  negotiationStrategy: string;
  offersFullTime?: FullTime | null;
  offersIntern?: Intern | null;
};

export type FullTime = {
  baseSalary?: Valuation | null;
  bonus?: Valuation | null;
  id: string;
  level: string;
  stocks?: Valuation | null;
  title: string;
  totalCompensation: Valuation;
};

export type Intern = {
  id: string;
  internshipCycle: string;
  monthlySalary: Valuation;
  startYear: number;
  title: string;
};

export type Reply = {
  createdAt: Date;
  id: string;
  message: string;
  replies?: Array<Reply> | null;
  replyingToId?: string | null;
  user?: User | null;
};

export type User = {
  email?: string | null;
  emailVerified?: Date | null;
  id: string;
  image?: string | null;
  name?: string | null;
};

export type GetOffersResponse = {
  data: Array<DashboardOffer>;
  jobType: JobType;
  paging: Paging;
};

export type Paging = {
  currentPage: number;
  numOfItems: number;
  numOfPages: number;
  totalItems: number;
};

export type CreateOfferProfileResponse = {
  id: string;
  token: string;
};

export type OffersDiscussion = {
  data: Array<Reply>;
};

export type ProfileAnalysis = {
  companyAnalysis: Array<AnalysisUnit>;
  createdAt: Date;
  id: string;
  overallAnalysis: AnalysisUnit;
  overallHighestOffer: AnalysisHighestOffer;
  profileId: string;
  updatedAt: Date;
};

export type AnalysisUnit = {
  companyId: string;
  companyName: string;
  income: Valuation;
  jobType: JobType;
  noOfOffers: number;
  percentile: number;
  title: string;
  topPercentileOffers: Array<AnalysisOffer>;
  totalYoe: number;
};

export type AnalysisHighestOffer = {
  company: OffersCompany;
  id: string;
  level: string;
  location: Location;
  totalYoe: number;
};

export type AnalysisOffer = {
  company: OffersCompany;
  id: string;
  income: Valuation;
  jobType: JobType;
  level: string;
  location: Location;
  monthYearReceived: Date;
  negotiationStrategy: string;
  previousCompanies: Array<string>;
  profileId: string;
  profileName: string;
  title: string;
  totalYoe: number;
};

export type AddToProfileResponse = {
  id: string;
  profileName: string;
  userId: string;
};

export type UserProfile = {
  createdAt: Date;
  id: string;
  offers: Array<UserProfileOffer>;
  profileName: string;
  token: string;
};

export type UserProfileOffer = {
  company: OffersCompany;
  id: string;
  income: Valuation;
  jobType: JobType;
  level: string;
  location: Location;
  monthYearReceived: Date;
  title: string;
};

export type Location = {
  cityId: string;
  cityName: string;
  countryCode: string;
  countryId: string;
  countryName: string;
  stateId: string;
  stateName: string;
};

export type GetAdminOffersResponse = {
  data: Array<AdminDashboardOffer>;
  jobType: JobType;
  paging: Paging;
};

export type AdminDashboardOffer = {
  baseSalary?: Valuation;
  bonus?: Valuation;
  company: OffersCompany;
  id: string;
  income: Valuation;
  location: Location;
  monthYearReceived: Date;
  numberOfOtherOffers: number;
  profileId: string;
  stocks?: Valuation;
  title: string;
  token: string;
  totalYoe: number;
};
