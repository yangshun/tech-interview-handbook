export enum Status {
    New = 0,
    Active = 1,
    Archived = 2,
    Trashed = 3,
    Deleted = 4
}

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