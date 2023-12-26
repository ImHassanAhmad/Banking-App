import { type InvestorSignUpStepperContextProps } from '@app/context/InvestorSignUpStepperContext';
import { type IssuerSignUpStepperContextProps } from '@app/context/IssuerSignUpStepperContext';
import { type BusinessCategoryType } from '@app/pages/BusinessCategory/types';
import { type BusinessTypes } from '@app/pages/BusinessType/types';
import { type FieldErrorDto } from '@app/pages/MobileCodeVerification//types';
import { type ICountryData, type TCountryCode } from 'countries-list';
import { type CaptchaTokenRequest } from 'types';

export type IThemeMode = 'LIGHT' | 'DARK';
export interface AccessTokenRefreshResponse {
  accessToken?: string;
  refreshToken?: string;
}

export interface SupportedCountriesIncorporation {
  supportedCountriesOfIncorporation: string[];
}

export interface SupportedCountriesPhone {
  supportedPhoneCountries: string[];
}

export interface ICountryCodeItem {
  country: string;
  countryCodes: string[];
  isoCode2: string;
  isoCode3: string;
}

export interface RegisterUserResponseDto {
  userId: string;
}

export interface RegisterUserRequestDto extends CaptchaTokenRequest {
  countryOfIncorporation?: TCountryCode;
  email?: string;
  password?: string;
  shortenPhoneNumber?: string;
  phoneNumberCountryCode?: string;
  visaTncAgreed?: boolean;
  wittyTncAgreed?: boolean;
  companyName?: string;
  registrationNumber?: string;
  dateOfRegister?: string;
  tradingName?: string;
  isLegalRepresentative?: boolean;
  businessType?: BusinessTypes;
  businessCategory?: BusinessCategoryType;
  dryRun: boolean;
}

export type CountryWithIcon = ICountryData & { icon: string };
export type CountrySelectOption = Pick<CountryWithIcon, 'name' | 'iso2' | 'icon'>;
export interface RegisterUser {
  data: RegisterUserResponseDto;
}

export interface AccountError {
  code: string;
  detail: string;
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: string;
  traceId: string;
}

export interface FieldErrors {
  errors: FieldErrorDto[];
}

export interface ErrorMessage {
  error: {
    errorMessage: string;
  };
}

export class AuthSystemError implements AuthApiError {
  data: AccountError;
  status: number;
  constructor(data: AccountError, status: number) {
    this.data = data;
    this.status = status;
  }
}

export class AuthNetworkFetchError implements AuthApiError {
  data: string;
  error: string;
  status: string;

  constructor(error: string, status: string) {
    this.data = error;
    this.error = error;
    this.status = status;
  }
}
export class AuthErrorMessage implements AuthApiError {
  data: ErrorMessage;
  status: number;
  constructor(data: ErrorMessage, status: number) {
    this.data = data;
    this.status = status;
  }
}
export class AuthFieldErrors implements AuthApiError {
  data: FieldErrors;
  status: number;
  constructor(data: FieldErrors, status: number) {
    this.data = data;
    this.status = status;
  }
}

export interface AuthApiError {
  data?: AccountError | FieldErrors | ErrorMessage | string;
  error?: string;
  status: number | string;
}

export type RegisterUserResponse = RegisterUser | AuthApiError;

export enum AuthErrorLevel {
  Field = 'Field',
  Account = 'Account',
  System = 'System'
}

export const isAuthFieldError = (errorPayload: AuthApiError): errorPayload is AuthFieldErrors => {
  return typeof errorPayload.data === 'object' && 'errors' in errorPayload.data;
};

export const isAuthErrorMessage = (
  errorPayload: AuthApiError
): errorPayload is AuthErrorMessage => {
  return typeof errorPayload.data === 'object' && 'error' in errorPayload.data;
};

export const isSystemError = (errorPayload: AuthApiError): errorPayload is AuthSystemError => {
  return typeof errorPayload.data === 'object' && 'message' in errorPayload.data;
};

export const isNetworkFetchError = (
  errorPayload: AuthApiError
): errorPayload is AuthNetworkFetchError => {
  return (
    typeof errorPayload.status === 'string' &&
    typeof errorPayload.data === 'string' &&
    'error' in errorPayload
  );
};

export interface AuthFetchQueryError {
  message: string;
  errorLevel: AuthErrorLevel;
}

export const transformErrorResponse = (
  errorPayload: AuthApiError,
  meta: any,
  args: any
): AuthFetchQueryError => {
  if (isNetworkFetchError(errorPayload)) {
    return {
      message: errorPayload.error,
      errorLevel: AuthErrorLevel.System
    };
  }
  if (isAuthFieldError(errorPayload)) {
    // Find index of the request key present into the error response else `errorIndex`
    // will be assign -1
    const errorIndex: number = (errorPayload.data.errors ?? [])?.findIndex(
      ({ fieldName }: FieldErrorDto) => Object.keys(args).findIndex((_) => _ === fieldName) !== -1
    );
    return {
      // Assigning error message of the field if error index is greater than -1
      message: errorIndex > -1 ? errorPayload.data.errors?.at(errorIndex)?.errorMessage ?? '' : '',
      errorLevel: AuthErrorLevel.Field
    };
  }
  if (isSystemError(errorPayload)) {
    return {
      message: errorPayload.data.message,
      errorLevel: AuthErrorLevel.System
    };
  }
  if (isAuthErrorMessage(errorPayload)) {
    return {
      message: errorPayload.data.error.errorMessage,
      errorLevel: AuthErrorLevel.Account
    };
  }
  if (isNetworkFetchError(errorPayload)) {
    return {
      message: errorPayload.error,
      errorLevel: AuthErrorLevel.System
    };
  }

  return {
    message: (errorPayload as AuthNetworkFetchError).error,
    errorLevel: AuthErrorLevel.System
  };
};

export type SignUpStepperContextProps =
  | InvestorSignUpStepperContextProps
  | IssuerSignUpStepperContextProps;

export enum onBoardType {
  Issuer = 'issuer',
  Investor = 'investor'
}
