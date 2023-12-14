export const padZeroStart = (value: number): string => (value < 10 ? '0' : '') + value;

export const randomNumber = (maximum = 10): number => (new Date().getTime() % maximum) + 1;

export const minuteToMilli = (minutes: number): number => 1000 * 60 * minutes;
