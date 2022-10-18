import type { JobType } from '@prisma/client';

export type OffersProfile = {
  analysis: OffersAnalysis;
  background: Background;
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
  company: Company?;
  durationInMonths: number?;
  id: string;
  jobType: JobType?;
  level: string?;
  monthlySalary: Valuation?;
  specialization: string?;
  title: string?;
  totalCompensation: Valuation?;
};

export type Company = {
  createdAt: Date;
  description: string;
  id: string;
  logoUrl: string;
  name: string;
  slug: string;
  updatedAt: Date;
};

export type Valuation = {
  currency: string;
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
  backgroundId: string;
  domain: string;
  id: string;
  yoe: number;
};

export type DashboardOffer = {
  company: Company;
  id: string;
  income: Valuation;
  monthYearReceived: Date;
  title: string;
  totalYoe: number;
};

export type ProfileOffer = {
  comments: string;
  company: Company;
  id: string;
  jobType: JobType;
  location: string;
  monthYearReceived: Date;
  negotiationStrategy: string;
  offersFullTime: OffersFullTime?;
  offersIntern: OffersIntern?;
};

export type OffersFullTime = {
  baseSalary: Valuation;
  bonus: Valuation;
  id: string;
  level: string;
  specialization: string;
  stocks: Valuation;
  title: string;
  totalCompensation: Valuation;
};

export type OffersIntern = {
  id: string;
  internshipCycle: string;
  monthlySalary: Valuation;
  specialization: string;
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
  currPage: number;
  numOfItemsInPage: number;
  numOfPages: number;
  totalNumberOfOffers: number;
};

export type CreateOfferProfileResponse = {
  analysis: OffersAnalysis;
  id: string;
  token: string;
};

export type OffersDiscussion = {
  data: Array<OReply>;
};

export type OffersAnalysis = {
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
  company: Company;
  id: string;
  level: string;
  location: string;
  specialization: string;
  totalYoe: number;
};

export type AnalysisOffer = {
  company: Company;
  id: string;
  income: number;
  jobType: JobType;
  level: string;
  location: string;
  monthYearReceived: Date;
  negotiationStrategy: string;
  previousCompanies: Array<string>;
  profileName: string;
  specialization: string;
  title: string;
  totalYoe: number;
};
