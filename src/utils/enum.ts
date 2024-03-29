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

/*
  We can use this function to get the key sitting on the particular index
  so we can use
*/
export const indexToEnumKeyRecord = <T extends string>(
  enumeration: Record<T, string>
): Record<number, T> => {
  const result: Record<number, T> = {} as any;

  Object.values(enumeration).forEach((value, index) => {
    result[index] = value as T;
  });

  return result;
};
