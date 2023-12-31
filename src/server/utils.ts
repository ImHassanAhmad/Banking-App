export const delay = async (time: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, time));
};
