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

export type QuestionComment = {
  content: string;
  createdAt: Date;
  id: string;
  numVotes: number;
};