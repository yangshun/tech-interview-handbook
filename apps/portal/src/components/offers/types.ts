import type { MonthYear } from '~/components/shared/MonthYearPicker';

/*
 *  Offer Profile
 */

export enum JobType {
  FullTime = 'FULLTIME',
  Internship = 'INTERNSHIP',
}

export const JobTypeLabel = {
  FULLTIME: 'Full-time',
  INTERNSHIP: 'Internship',
};

export enum EducationBackgroundType {
  Bachelor = 'Bachelor',
  Diploma = 'Diploma',
  Masters = 'Masters',
  PhD = 'PhD',
  Professional = 'Professional',
  Seconday = 'Secondary',
  SelfTaught = 'Self-taught',
}

export type Money = {
  currency: string;
  value: number;
};

type FullTimeJobData = {
  base: Money;
  bonus: Money;
  level: string;
  specialization: string;
  stocks: Money;
  title: string;
  totalCompensation: Money;
};

type InternshipJobData = {
  internshipCycle: string;
  monthlySalary: Money;
  specialization: string;
  startYear: number;
  title: string;
};

type OfferDetailsGeneralData = {
  comments: string;
  companyId: string;
  jobType: string;
  location: string;
  monthYearReceived: MonthYear;
  negotiationStrategy: string;
};

export type FullTimeOfferDetailsFormData = OfferDetailsGeneralData & {
  job: FullTimeJobData;
};

export type InternshipOfferDetailsFormData = OfferDetailsGeneralData & {
  job: InternshipJobData;
};

export type OfferDetailsFormData =
  | FullTimeOfferDetailsFormData
  | InternshipOfferDetailsFormData;

export type OfferDetailsPostData = Omit<
  OfferDetailsFormData,
  'monthYearReceived'
> & {
  monthYearReceived: Date;
};

type SpecificYoe = {
  domain: string;
  yoe: number;
};

type FullTimeExperience = {
  level?: string;
  totalCompensation?: Money;
};

type InternshipExperience = {
  monthlySalary?: Money;
};

type GeneralExperience = {
  companyId?: string;
  durationInMonths?: number;
  jobType?: string;
  specialization?: string;
  title?: string;
};

export type Experience =
  | (FullTimeExperience & GeneralExperience)
  | (GeneralExperience & InternshipExperience);

type Education = {
  endDate?: Date;
  field?: string;
  school?: string;
  startDate?: Date;
  type?: string;
};

type BackgroundFormData = {
  educations: Array<Education>;
  experiences: Array<Experience>;
  specificYoes: Array<SpecificYoe>;
  totalYoe?: number;
};

export type OfferProfileFormData = {
  background: BackgroundFormData;
  offers: Array<OfferDetailsFormData>;
};

export type OfferProfilePostData = {
  background: BackgroundFormData;
  offers: Array<OfferDetailsPostData>;
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
