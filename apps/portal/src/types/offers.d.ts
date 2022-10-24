import type { JobType } from '@prisma/client';

export type Profile = {
  analysis: ProfileAnalysis?;
  background: Background?;
  editToken: string?;
  id: string;
  isEditable: boolean;
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
  company: OffersCompany?;
  durationInMonths: number?;
  id: string;
  jobType: JobType?;
  level: string?;
  location: string?;
  monthlySalary: Valuation?;
  title: string?;
  totalCompensation: Valuation?;
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
  endDate: Date?;
  field: string?;
  id: string;
  school: string?;
  startDate: Date?;
  type: string?;
};

export type SpecificYoe = {
  domain: string;
  id: string;
  yoe: number;
};

export type DashboardOffer = {
  company: OffersCompany;
  id: string;
  income: Valuation;
  monthYearReceived: Date;
  profileId: string;
  title: string;
  totalYoe: number;
};

export type ProfileOffer = {
  comments: string;
  company: OffersCompany;
  id: string;
  jobType: JobType;
  location: string;
  monthYearReceived: Date;
  negotiationStrategy: string;
  offersFullTime: FullTime?;
  offersIntern: Intern?;
};

export type FullTime = {
  baseSalary: Valuation?;
  bonus: Valuation?;
  id: string;
  level: string;
  stocks: Valuation?;
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
  replies: Array<Reply>?;
  replyingToId: string?;
  user: User?;
};

export type User = {
  email: string?;
  emailVerified: Date?;
  id: string;
  image: string?;
  name: string?;
};

export type GetOffersResponse = {
  data: Array<DashboardOffer>;
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
  companyAnalysis: Array<Analysis>;
  id: string;
  overallAnalysis: Analysis;
  overallHighestOffer: AnalysisHighestOffer;
  profileId: string;
};

export type Analysis = {
  noOfOffers: number;
  percentile: number;
  topPercentileOffers: Array<AnalysisOffer>;
};

export type AnalysisHighestOffer = {
  company: OffersCompany;
  id: string;
  level: string;
  location: string;
  totalYoe: number;
};

export type AnalysisOffer = {
  company: OffersCompany;
  id: string;
  income: Valuation;
  jobType: JobType;
  level: string;
  location: string;
  monthYearReceived: Date;
  negotiationStrategy: string;
  previousCompanies: Array<string>;
  profileName: string;
  title: string;
  totalYoe: number;
};

export type AddToProfileResponse = {
  id: string;
  profileName: string;
  userId: string;
};
