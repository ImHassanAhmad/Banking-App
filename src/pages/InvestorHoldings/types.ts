export const headers = [
  {
    id: 'id',
    align: 'center',
    isSpecial: false
  },
  {
    id: 'name',
    align: 'center',
    isSpecial: false
  },
  {
    id: 'amount',
    align: 'right',
    isSpecial: false
  }
];

export interface InvestorHoldingDto {
  id: string;
  name?: string;
  amount: number;
}
