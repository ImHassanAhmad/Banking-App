export const formatDate = (date?: Date): string | undefined => {
  return date ? date.toISOString().split('T')[0] : undefined;
};
