export const BASE_URL = process.env.REACT_APP_BASE_URL ?? '';
export const REFRESH_TOKEN = process.env.REACT_APP_REFRESH_TOKEN ?? '';
export const ACCOUNT_ID = process.env.REACT_APP_ACCOUNT_ID ?? '';
export const SME_BASE_URL = process.env.REACT_APP_SME_BASE_URL ?? '';
export const TRANSACTION_PER_PAGE = '10';

export const strengthProgress: any = {
  0: {
    color: '#E4E4E4',
    title: ''
  },
  10: {
    color: '#FF8200',
    title: 'Weak'
  },
  25: {
    color: '#FF8200',
    title: 'Weak'
  },
  50: {
    color: '#FF8200',
    title: 'Good'
  },
  75: {
    color: '#008000',
    title: 'Strong'
  },
  100: {
    color: '#008000',
    title: 'Strong'
  }
};

interface NOT_SUPPORTED_MODES_TYPES {
  country: 'country';
  phoneNumber: 'phone-number';
}

export const NOT_SUPPORTED_MODES: NOT_SUPPORTED_MODES_TYPES = {
  country: 'country',
  phoneNumber: 'phone-number'
};
