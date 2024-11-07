export type CreateHandleChangeArgsWithDescriptions<T> =
  | [field: Exclude<keyof T, "descriptions">, value: T[keyof T]]
  | [field: "descriptions", value: string[]];
