import { type ICategories } from '@app/components/OnboardingList/types';

export enum RevenueRangeType {
  Under2M = 'less than 2 million',
  Between2And5M = 'between 2 and 5 million',
  Over5M = 'Over 5 million'
}

export const RevenueRange: ICategories[] = [
  { id: RevenueRangeType.Under2M, topic: 'Less than €2,000,000' },
  { id: RevenueRangeType.Between2And5M, topic: '€2,000,000 - €5,000,000' },
  { id: RevenueRangeType.Over5M, topic: 'More than €5,000,000' }
];
