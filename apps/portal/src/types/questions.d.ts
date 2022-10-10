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
  type: stringl;
  updatedAt: Date;
  user: string;
};

export type AnswerComment = {
  content: string;
  createdAt: Date;
  id: string;
  numVotes: number;
  updatedAt: Date;
  user: string;
  userImage: string;
};

export type Answer = {
  content: string;
  createdAt: Date;
  id: string;
  numComments: number;
  numVotes: number;
  user: string;
  userImage: string;
};

export type QuestionComment = {
  content: string;
  createdAt: Date;
  id: string;
  numVotes: number;
  user: string;
  userImage: string;
};
