/* eslint-disable no-shadow */
import type { MonthYear } from '../shared/MonthYearPicker';

/*
 *  Offer Profile
 */

export enum JobType {
  FullTime = 'FULLTIME',
  Internship = 'INTERNSHIP',
}

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

export type OfferDetailsFormData = {
  comments: string;
  companyId: string;
  job: FullTimeJobData | InternshipJobData;
  jobType: string;
  location: string;
  monthYearReceived: MonthYear;
  negotiationStrategy: string;
};

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
  level: string;
  totalCompensation: Money;
};

type InternshipExperience = {
  monthlySalary: Money;
};

type GeneralExperience = {
  companyId: string;
  durationInMonths: number;
  jobType: string;
  specialization: string;
  title: string;
};

type Experience =
  | (FullTimeExperience & GeneralExperience)
  | (GeneralExperience & InternshipExperience);

type Education = {
  endDate: Date;
  field: string;
  school: string;
  startDate: Date;
  type: string;
};

type BackgroundFormData = {
  educations: Array<Education>;
  experiences: Array<Experience>;
  specificYoes: Array<SpecificYoe>;
  totalYoe: number;
};

export type SubmitOfferFormData = {
  background: BackgroundFormData;
  offers: Array<OfferDetailsFormData>;
};

export type OfferPostData = {
  background: BackgroundFormData;
  offers: Array<OfferDetailsPostData>;
};
