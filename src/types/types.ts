import { type InvestorSignUpStepperContextProps } from '@app/context/InvestorSignUpStepperContext';
import { type IssuerSignUpStepperContextProps } from '@app/context/IssuerSignUpStepperContext';
import { type BusinessCategoryType } from '@app/pages/BusinessCategory/types';
import { type BusinessTypes } from '@app/pages/BusinessType/types';
import { type FieldErrorDto } from '@app/pages/MobileCodeVerification//types';
import { type Issuer, type UserEntity } from '@app/server/database/entity';
import { type ICountryData, type TCountryCode } from 'countries-list';
import { type UseFormRegister, type FieldError } from 'react-hook-form';

export type IThemeMode = 'LIGHT' | 'DARK';

export interface BaseIdEntity {
  id: string;
}
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

export enum IncomeSources {
  Investor = 'investor',
  SaleOfProperty = 'sale_of_property',
  SelfEmployed = 'self_employed',
  RetirementPension = 'retirement_pension',
  FundsFromFamily = 'funds_from_family',
  BusinessAndDividends = 'business_and_dividends',
  Savings = 'savings',
  Loans = 'loans',
  StudentGrants = 'student_grant_loans',
  Rental = 'rental',
  StockTrading = 'stock_trading',
  CryptoTrading = 'crypto_trading',
  GamblingOrBetting = 'gambling_or_betting',
  Other = 'other'
}
export enum InvesterOccupation {
  Agriculture = 'agriculture',
  Education = 'education',
  CraftworkTrade = 'craftwork_trade',
  ServiceIt = 'service_it',
  MedicalParamedical = 'medical_paramedical',
  ArtCultureSport = 'art_culture_sport',
  ConstructionPubicWorks = 'construction_pubic_works'
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
  isBusinessRegulated?: boolean;
  isLegalRepresentative?: boolean;
  businessType?: BusinessTypes;
  businessCategory?: BusinessCategoryType;
  incomeSources?: IncomeSources;
  isUsPerson?: boolean;
  businessSubCategory?: string;
  businessRevenue?: string;
  fundingSources?: string[];
  dryRun: boolean;
}

export interface UserRequestDto extends CaptchaTokenRequest {
  email?: string;
  password?: string;
  shortenPhoneNumber?: string;
  phoneNumberCountryCode?: string;
  countryOfIncorporation?: TCountryCode;
  vis?: boolean;
  visaTncAgreed?: boolean;
  wittyTncAgreed?: boolean;
  privacyPolicy?: boolean;
  wittyNews?: boolean;
  dryRun: boolean;
}

export interface SocialSecurityInformation {
  country: string;
  taxNumber: string;
  iso: TCountryCode;
  isDefault?: boolean;
}

export interface InvestorUserRequestDto extends UserRequestDto {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  postalCode?: number;
  city?: string;
  street?: string;
  houseNo?: string;
  address1?: string;
  address2?: string;
  country?: string;
  longitude?: number;
  latitude?: number;
  peselNumber?: string;
  incomeRange?: string;
  priceAndLimit?: boolean;
  isUsResident?: boolean;
  NICNumber?: string;
  sourceOfIncome?: string[];
  investerOccupation?: string[];
  socialSecurityNumber?: SocialSecurityInformation[];
  idCardImage?: File;
  addressProofImage?: File;
  selfieImage?: File;
}

export interface IssuerUserRequestDto extends UserRequestDto {
  companyName?: string;
  registrationNumber?: string;
  dateOfRegister?: string;
  tradingName?: string;
  isBusinessRegulated?: boolean;
  isLegalRepresentative?: boolean;
  businessType?: BusinessTypes;
  businessCategory?: BusinessCategoryType;
  businessSubCategory?: string;
  businessRevenue?: string;
  fundingSources?: string[];
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

export type OnboardingError = AccountError | FieldErrors | ErrorMessage | string;

export interface AuthApiError {
  data?: OnboardingError;
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

export const isIssuer = (userEntity: UserEntity): userEntity is Issuer => {
  return (
    'dateOfRegister' in userEntity &&
    'registrationNumber' in userEntity &&
    'companyName' in userEntity &&
    'tradingName' in userEntity
  );
};

export interface AuthFetchQueryError {
  message: string;
  errorLevel: AuthErrorLevel;
}

export interface RequestError {
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

export type WithSignUpStepperContextProps<T = any> = (
  | InvestorSignUpStepperContextProps
  | IssuerSignUpStepperContextProps
) &
  T;
export interface AssetResponseDto {
  assetId?: string;
}

export interface AssetInformationRequestDto {
  assetName: string;
  assetDescription: string;
  assetWebsite: string;
  logo: File;
}

export interface AssetDocumentsRequestDto extends AssetResponseDto {
  prospectus: File;
  businessModel: File;
  financialModel: File;
  businessPlan: File;
  valuationReport: File;
}

export interface AssetSocialMediaRequestDto extends AssetResponseDto {
  reddit?: string;
  twitter?: string;
  telegram?: string;
  whitepaper?: string;
  discord?: string;
}

export type AssetRequestDto =
  | AssetInformationRequestDto
  | AssetDocumentsRequestDto
  | AssetSocialMediaRequestDto;

export interface AssetListResponse
  extends AssetInformationRequestDto,
    AssetDocumentsRequestDto,
    AssetSocialMediaRequestDto,
    BaseIdEntity {
  status: AssetStatus;
  token?: AssetTokenCreationResponseDTO;
}

export interface AssetLegalDocumentsRequestDto {
  assetId: string;
  prospectus: File;
  businessModel: File;
  financialModel: File;
  businessPlan: File;
  valuationReport: File;
}

export enum AssetStatus {
  Created = 'Created',
  InReview = 'In_Review',
  Approved = 'Approved',
  Live = 'Live'
}

export enum onBoardType {
  Issuer = 'issuer',
  Investor = 'investor'
}

export interface AssetTokenCreationRequestDTO {
  assetId: string;
  tokenName: string;
  tokenSymbol: string;
  totalSupply?: number;
  numberOfDecimal?: number;
  pausable: boolean;
  mintable: boolean;
  burnable: boolean;
  capped: boolean;
  currency: string;
  buyPrice: number;
  tokenLogo: File;
}

export interface AssetTokenCreationResponseDTO extends AssetTokenCreationRequestDTO {
  id: string;
}

export enum AllowedFileFormats {
  PDF = '.pdf',
  DOC = '.doc',
  DOCX = '.docx',
  JPG = '.jpg',
  JPEG = '.jpeg',
  PNG = '.png'
}

export enum AllowedImageFormats {
  JPG = '.jpg',
  JPEG = '.jpeg',
  PNG = '.png',
  SVG = '.svg'
}

export interface UseFormField {
  register?: UseFormRegister<any>;
}

export interface ITextFieldProps extends UseFormField {
  name?: string;
  errorValue?: FieldError | undefined;
  noPopper?: boolean;
  label?: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface CaptchaTokenRequest {
  captchaToken?: string | null;
}

export interface LoginRequest extends ILoginForm, CaptchaTokenRequest {}

export interface IErrorMessage {
  title?: string;
  message?: string;
  errorLevel?: AuthErrorLevel;
}

export interface VerifyLoginOTPResponseDto {
  otpId: string;
}

export interface VerifyLoginOTPRequestDto {
  otpId: string;
  otpCode: string;
}

export interface ResendLoginOtpRequestDto {
  otpId: string;
}

export interface ResendLoginOtpResponseDto {
  newOtpId: string;
}

export interface RefreshSessionDto {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  data?: VerifyLoginOTPResponseDto;
  // error?: ApiTypeError;
}

export interface Category {
  id: string;
  topic: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  name: string;
}
