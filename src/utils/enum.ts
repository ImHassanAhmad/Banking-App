/*
  We can use this function to create an object with indices of the enum values
  so we can use
*/
export const enumToIndexRecord = <T extends string>(
  enumeration: Record<T, string>
): Record<T, number> => {
  const result: Record<T, number> = {} as any;

  Object.values(enumeration).forEach((value, index) => {
    result[value as T] = index;
  });

  return result;
};
