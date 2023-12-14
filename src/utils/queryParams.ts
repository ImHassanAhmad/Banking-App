export const getQueryParam = (paramName: string, location: any): number => {
  const queryParams = new URLSearchParams(location.search);
  return queryParams.size;
};
