export type RequireAllOrNone<T> = T | { [K in keyof T]?: never };
