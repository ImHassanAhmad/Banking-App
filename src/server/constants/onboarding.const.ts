import {
  type OnboardingError,
  type AccountError,
  type RegisterUserResponseDto
} from '@app/common/types';
import { type VerifyLoginOTPResponseDto } from 'types';
import { type ApiError } from '../middleware/withErrorHandler';

export const MOCK_LOGIN_EMAIL = 'test@witty.tech';
export const MOCK_LOGIN_PASSWORD = 'Pass123456789@';
export const MOCK_CAPTCHA_VALUE = 'mock-captcha';
export const SYSTEM_ERROR_RESPONSE = (error: Error): AccountError => ({
  code: '500',
  detail: 'Something went wrong.',
  error: error.message,
  message: error.message,
  path: 'Something went wrong.',
  status: 500,
  timestamp: new Date().toString(),
  traceId: Date.now().toString()
});

export const DICTIONARY_COUNTRY_OF_INCORPORATION_RESPONSE = {
  supportedCountriesOfIncorporation: [
    'AT',
    'BE',
    'BG',
    'HR',
    'CY',
    'CZ',
    'DK',
    'EE',
    'FI',
    'FR',
    'DE',
    'GR',
    'HU',
    'IE',
    'IT',
    'LV',
    'LT',
    'LU',
    'MT',
    'NL',
    'PL',
    'PT',
    'RO',
    'SK',
    'SI',
    'ES',
    'SE',
    'IS',
    'LI',
    'NO'
  ],
  supportedPhoneCountries: [
    'AL',
    'AT',
    'BE',
    'BG',
    'HR',
    'CY',
    'CZ',
    'DK',
    'EE',
    'FI',
    'FR',
    'DE',
    'GR',
    'HU',
    'IS',
    'IE',
    'IT',
    'LV',
    'LT',
    'LU',
    'MT',
    'NL',
    'NO',
    'PL',
    'PT',
    'RO',
    'SK',
    'SI',
    'ES',
    'SE',
    'CH',
    'UA',
    'GB',
    'BH',
    'AE',
    'SA',
    'OM',
    'QA',
    'KW',
    'YT',
    'RE',
    'GP',
    'GF',
    'PF',
    'MQ',
    'NC',
    'BL',
    'MF',
    'PM',
    'WF',
    'NL'
  ]
};

export const LOGIN_RESPONSE: VerifyLoginOTPResponseDto = {
  otpId: '2434-3434-433343SFDFF3'
};

export const ERROR_MESSAGE_RESPONSE = ({ message }: ApiError): OnboardingError => ({
  error: { errorMessage: message }
});

export type MockRegisterUserResponse = RegisterUserResponseDto | OnboardingError;
export type MockVerifySignUpOtpResponse = null | OnboardingError;
