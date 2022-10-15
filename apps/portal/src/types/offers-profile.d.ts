export type OffersProfile = {
  background?: Background | null;
  createdAt: Date;
//   Discussions: Array<discussion>;
  editToken: string;
  id: string;
  offers: Array<Offer>;
  profileName: string;
  userId?: string | null;
};

export type Background = {
  educations: Array<Education>;
  experiences: Array<Experience>;
  id: string;
  offersProfileId: string;
  specificYoes: Array<SpecificYoe>;
  totalYoe?: number | null;
}

export type Experience = {
  backgroundId: string;
  company?: Company | null;
  companyId?: string | null;
  durationInMonths?: number | null;
  id: string;
  jobType?: string | null;
  level?: string | null;
  monthlySalary?: Valuation | null;
  monthlySalaryId?: string | null;
  specialization?: string | null;
  title?: string | null;
  totalCompensation?: Valuation | null;
  totalCompensationId?: string | null;
}

export type Company = {
  createdAt: Date;
  description: string | null;
  id: string;
  logoUrl: string | null;
  name: string;
  slug: string;
  updatedAt: Date
}

export type Valuation = {
    currency: string;
    id: string;
    value: number;
}

export type Education = {
  backgroundId: string;
  endDate?: Date | null;
  field?: string | null;
  id: string;
  school?: string | null;
  startDate?: Date | null;
  type?: string | null;
}

export type SpecificYoe = {
  backgroundId: string;
  domain: string;
  id: string;
  yoe: number;
}

export type Offers = {
  OffersFullTime?: OffersFullTime | null;
  OffersIntern?: OffersIntern | null;
  comments?: string | null;
  company: Company;
  companyId: string;
  id: string;
  jobType: string;
  location: string;
  monthYearReceived: Date;
  negotiationStrategy?: string | null;
  offersFullTimeId?: string | null;
  offersInternId?: string | null;
  profileId: string;
}

export type OffersFullTime = {
  baseSalary: Valuation;
  baseSalaryId: string;
  bonus: Valuation;
  bonusId: string;
  id: string;
  level: string;
  specialization: string;
  stocks: Valuation;
  stocksId: string;
  title?: string | null;
  totalCompensation: Valuation;
  totalCompensationId: string;
}

export type OffersIntern = {
  id: string;
  internshipCycle: string;
  monthlySalary: Valuation;
  monthlySalaryId: string;
  specialization: string;
  startYear: number;
}

export type Reply = {
  createdAt: Date;
  id: string;
  message: string;
  // Profile: OffersProfile | null;
  profileId: string;
  replies: Array<Discussion>?;
  replyingTo: Discussion?;
  replyingToId: string | null;
  user: User?;
  userId: string | null;
}

export type User = {
  email: string?;
  emailVerified: Date?;
  id: string;
  image: string?;
  name: string?;
}