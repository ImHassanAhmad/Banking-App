export const headers = [
  {
    id: 'holder_id',
    align: 'center',
    isSpecial: false
  },
  {
    id: 'holder_name',
    align: 'center',
    isSpecial: false
  },
  {
    id: 'holder_address',
    align: 'center',
    isSpecial: false
  },
  {
    id: 'holder_amount',
    align: 'center',
    isSpecial: false
  },
  {
    id: 'holder_holdings',
    align: 'center',
    isSpecial: false
  },
  {
    id: 'transfered',
    align: 'center',
    isSpecial: false
  }
];

export interface InvestorHoldingDto {
  holder_id: string;
  holder_name?: string;
  holder_address: string;
  holder_amount: string;
  holder_holdings: string;
  transfered: string;
}

export interface InvestorHoldingColumns {
  id: string;
  title: string;
}
