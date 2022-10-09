export type Question = {
  // TODO: company, location, role maps
  company: string;
  content: string;
  id: string;
  location: string;
  numAnswers: number;
  numComments: number;
  numVotes: number;
  role: string;
  updatedAt: Date;
  user: string;
};

export type AggregatedQuestionEncounter = {
  companyCount: Record<string, number>;
  locationCount: Record<string, number>;
  roleCount:Record<string, number>;
}