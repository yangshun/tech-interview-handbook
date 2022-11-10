import type { JobType } from '@prisma/client';

import type { MonthYear } from '~/components/shared/MonthYearPicker';

import type { OffersCompany } from '../../types/offers';

import type { Location } from '~/types/offers';

/**
 * Form data types
 */

export type OffersProfileFormData = {
  background: BackgroundFormData;
  id?: string;
  offers: Array<OfferFormData>;
};

export type BackgroundFormData = {
  educations: Array<EducationFormData>;
  experiences: Array<ExperienceFormData>;
  id?: string;
  specificYoes: Array<SpecificYoeFormData>;
  totalYoe: number;
};

type EducationFormData = {
  endDate?: Date | null;
  field?: string | null;
  school?: string | null;
  startDate?: Date | null;
  type?: string | null;
};

type ExperienceFormData = {
  cityId?: string | null;
  cityName?: string | null;
  companyId?: string | null;
  companyName?: string | null;
  durationInMonths?: number | null;
  id?: string;
  jobType?: string | null;
  level?: string | null;
  monthlySalary?: MoneyFormData | null;
  title?: string | null;
  totalCompensation?: MoneyFormData | null;
  totalCompensationId?: string | null;
};

type SpecificYoeFormData = {
  domain: string;
  id?: string;
  yoe: number;
};

export type OfferFormData = {
  cityId: string;
  cityName?: string;
  comments: string;
  companyId: string;
  companyName?: string;
  id?: string;
  jobType: JobType;
  monthYearReceived: MonthYear;
  negotiationStrategy: string;
  offersFullTime?: OfferFullTimeFormData | null;
  offersIntern?: OfferInternFormData | null;
};

export type OfferFullTimeFormData = {
  baseSalary?: MoneyFormData | null;
  bonus?: MoneyFormData | null;
  id?: string;
  level: string;
  stocks?: MoneyFormData | null;
  title: string;
  totalCompensation: MoneyFormData;
};

export type OfferInternFormData = {
  id?: string;
  internshipCycle: string;
  monthlySalary: MoneyFormData;
  startYear: number;
  title: string;
};

type MoneyFormData = {
  currency: string;
  id?: string;
  value?: number;
};

/**
 * Post request data types
 */

export type OffersProfilePostData = {
  background: BackgroundPostData;
  id?: string;
  offers: Array<OfferPostData>;
};

export type BackgroundPostData = {
  educations: Array<EducationPostData>;
  experiences: Array<ExperiencePostData>;
  id?: string;
  specificYoes: Array<SpecificYoePostData>;
  totalYoe: number;
};

type EducationPostData = EducationFormData;

type ExperiencePostData = {
  cityId?: string | null;
  cityName?: string | null;
  companyId?: string | null;
  companyName?: string | null;
  durationInMonths?: number | null;
  id?: string;
  jobType?: string | null;
  level?: string | null;
  monthlySalary?: Money | null;
  title?: string | null;
  totalCompensation?: Money | null;
  totalCompensationId?: string | null;
};

type SpecificYoePostData = SpecificYoeFormData;

export type OfferPostData = {
  cityId: string;
  comments: string;
  companyId: string;
  id?: string;
  jobType: JobType;
  monthYearReceived: Date;
  negotiationStrategy: string;
  offersFullTime?: OfferFullTimePostData;
  offersIntern?: OfferInternPostData;
};

export type OfferFullTimePostData = {
  baseSalary: Money;
  bonus: Money;
  id?: string;
  level: string;
  stocks: Money;
  title: string;
  totalCompensation: Money;
};

export type OfferInternPostData = {
  id?: string;
  internshipCycle: string;
  monthlySalary: Money;
  startYear: number;
  title: string;
};

export type Money = {
  currency: string;
  id?: string;
  value: number;
};

/**
 * Display data types
 */

export type EducationDisplayData = {
  endDate?: string | null;
  field?: string | null;
  school?: string | null;
  startDate?: string | null;
  type?: string | null;
};

export type OfferDisplayData = {
  base?: string | null;
  bonus?: string | null;
  company?: OffersCompany | null;
  duration?: number | null;
  id?: string;
  internshipCycle?: string;
  jobLevel?: string | null;
  jobTitle?: string | null;
  jobType?: JobType;
  location?: Location | null;
  monthlySalary?: string | null;
  negotiationStrategy?: string | null;
  otherComment?: string | null;
  receivedMonth?: string | null;
  startYear?: number;
  stocks?: string | null;
  totalCompensation?: string | null;
};

export type BackgroundDisplayData = {
  educations: Array<EducationDisplayData>;
  experiences: Array<OfferDisplayData>;
  profileName: string;
  specificYoes: Array<SpecificYoePostData>;
  totalYoe: number;
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
