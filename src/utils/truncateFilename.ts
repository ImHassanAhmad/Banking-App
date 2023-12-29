export const truncateFilename = (filename: string, maxLength: number): string => {
  if (filename.length <= maxLength) {
    return filename;
  }
  const start = filename.slice(0, maxLength / 2);
  const end = filename.slice(-maxLength / 2);
  return `${start}...${end}`;
};
