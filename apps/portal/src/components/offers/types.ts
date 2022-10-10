/* eslint-disable no-shadow */
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

type Money = {
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

export type FullTimeOfferFormData = {
  comments: string;
  companyId: string;
  job: FullTimeJobData;
  jobType: string;
  location: string;
  monthYearReceived: string;
  negotiationStrategy: string;
};

type InternshipJobData = {
  internshipCycle: string;
  monthlySalary: Money;
  specialization: string;
  startYear: number;
  title: string;
};

export type InternshipOfferFormData = {
  comments: string;
  companyId: string;
  job: InternshipJobData;
  jobType: string;
  location: string;
  monthYearReceived: string;
  negotiationStrategy: string;
};

type OfferDetailsFormData = FullTimeOfferFormData | InternshipOfferFormData;

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
  education: Education;
  experience: Experience;
  specificYoes: Array<SpecificYoe>;
  totalYoe: number;
};

export type SubmitOfferFormData = {
  background: BackgroundFormData;
  offers: Array<OfferDetailsFormData>;
};
