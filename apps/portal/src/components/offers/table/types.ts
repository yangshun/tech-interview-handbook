// eslint-disable-next-line no-shadow
export enum YOE_CATEGORY {
  INTERN = 0,
  ENTRY = 1,
  MID = 2,
  SENIOR = 3,
}

export type PaginationType = {
  currentPage: number;
  numOfItems: number;
  numOfPages: number;
  totalItems: number;
};
