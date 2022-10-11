export type offersProfile = {
  background?: background | null;
  createdAt: Date;
//   Discussions: Array<discussion>;
  editToken: string;
  id: string;
  offers: Array<offer>;
  profileName: string;
  userId?: string | null;
};

export type background = {
  educations: Array<education>;
  experiences: Array<experience>;
  id: string;
  offersProfileId: string;
  specificYoes: Array<specificYoe>;
  totalYoe?: number | null;
}

export type experience = {
  backgroundId: string;
  company?: company | null;
  companyId?: string | null;
  durationInMonths?: number | null;
  id: string;
  jobType?: string | null;
  level?: string | null;
  monthlySalary?: valuation | null;
  monthlySalaryId?: string | null;
  specialization?: string | null;
  title?: string | null;
  totalCompensation?: valuation | null;
  totalCompensationId?: string | null;
}

export type company = {
  createdAt: Date;
  description: string | null;
  id: string;
  logoUrl: string | null;
  name: string;
  slug: string;
  updatedAt: Date
}

export type valuation = {
    currency: string;
    id: string;
    value: number;
}

export type education = {
  backgroundId: string;
  endDate?: Date | null;
  field?: string | null;
  id: string;
  school?: string | null;
  startDate?: Date | null;
  type?: string | null;
}

export type specificYoe = {
    backgroundId: string;
    domain: string;
    id: string;
    yoe: number;
}

export type offers = {
    OffersFullTime?: offersFullTime | null;
    OffersIntern?: offersIntern | null;
    comments?: string | null;
    company: company;
    companyId: string;
    id: string;
    jobType: string;
    location: string;
    monthYearReceived: string;
    negotiationStrategy?: string | null;
    offersFullTimeId?: string | null;
    offersInternId?: string | null;
    profileId: string;
}

export type offersFullTime = {
    baseSalary: valuation;
    baseSalaryId: string;
    bonus: valuation;
    bonusId: string;
    id: string;
    level: string;
    specialization: string;
    stocks: valuation;
    stocksId: string;
    title?: string | null;
    totalCompensation: valuation;
    totalCompensationId: string;
}

export type offersIntern = {
    id: string;
    internshipCycle: string;
    monthlySalary: valuation;
    monthlySalaryId: string;
    specialization: string;
    startYear: number;
}

// TODO: fill in next time
export type discussion = {
    id: string;
}