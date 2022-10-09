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
  seenAt: Date;
  updatedAt: Date;
  user: string;
};

export type AnswerComment = {
  content: string;
  id: string;
  numVotes: number;
};

export type Answer = {
  content: string;
  createdAt: Date;
  id: string;
  numComments: number;
  numVotes: number;
};

export type QuestionComment = {
  content: string;
  createdAt: Date;
  id: string;
  numVotes: number;
  user: string;
};
