import type { MonthYear } from '~/components/shared/MonthYearPicker';

/*
 *  Offer Profile
 */

export enum JobType {
  FullTime = 'FULLTIME',
  Intern = 'INTERN',
}

export const JobTypeLabel = {
  FULLTIME: 'Full-time',
  INTERN: 'Internship',
};

export enum EducationBackgroundType {
  Bachelor = 'Bachelor',
  Diploma = 'Diploma',
  Masters = 'Masters',
  PhD = 'PhD',
  Professional = 'Professional',
  Secondary = 'Secondary',
  SelfTaught = 'Self-taught',
}

export type OffersProfilePostData = {
  background: BackgroundPostData;
  offers: Array<OfferPostData>;
};

export type OffersProfileFormData = {
  background: BackgroundPostData;
  offers: Array<OfferFormData>;
};

export type BackgroundPostData = {
  educations: Array<EducationPostData>;
  experiences: Array<ExperiencePostData>;
  specificYoes: Array<SpecificYoePostData>;
  totalYoe: number;
};

type ExperiencePostData = {
  companyId?: string | null;
  durationInMonths?: number | null;
  jobType?: string | null;
  level?: string | null;
  location?: string | null;
  monthlySalary?: Money | null;
  specialization?: string | null;
  title?: string | null;
  totalCompensation?: Money | null;
  totalCompensationId?: string | null;
};

type EducationPostData = {
  endDate?: Date | null;
  field?: string | null;
  school?: string | null;
  startDate?: Date | null;
  type?: string | null;
};

type SpecificYoePostData = {
  domain: string;
  yoe: number;
};

type SpecificYoe = SpecificYoePostData;

export type OfferPostData = {
  comments: string;
  companyId: string;
  jobType: string;
  location: string;
  monthYearReceived: Date;
  negotiationStrategy: string;
  offersFullTime?: OfferFullTimePostData | null;
  offersIntern?: OfferInternPostData | null;
};

export type OfferFormData = Omit<OfferPostData, 'monthYearReceived'> & {
  monthYearReceived: MonthYear;
};

export type OfferFullTimePostData = {
  baseSalary: Money;
  bonus: Money;
  level: string;
  specialization: string;
  stocks: Money;
  title: string;
  totalCompensation: Money;
};

export type OfferInternPostData = {
  internshipCycle: string;
  monthlySalary: Money;
  specialization: string;
  startYear: number;
  title: string;
};

export type Money = {
  currency: string;
  value: number;
};

type EducationDisplay = {
  endDate?: string;
  field: string;
  school: string;
  startDate?: string;
  type: string;
};

export type OfferEntity = {
  base?: string;
  bonus?: string;
  companyName?: string;
  duration?: string;
  id?: string;
  jobLevel?: string;
  jobTitle?: string;
  location?: string;
  monthlySalary?: string;
  negotiationStrategy?: string;
  otherComment?: string;
  receivedMonth?: string;
  stocks?: string;
  totalCompensation?: string;
};

export type BackgroundCard = {
  educations: Array<EducationDisplay>;
  experiences: Array<OfferEntity>;
  profileName: string;
  specificYoes: Array<SpecificYoe>;
  totalYoe: string;
};

export type CommentEntity = {
  createdAt: Date;
  id: string;
  message: string;
  profileId: string;
  replies?: Array<CommentEntity>;
  replyingToId: string;
  userId: string;
  username: string;
};
