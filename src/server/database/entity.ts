import type {
  ICompanyStructureForm,
  IKycForm,
  ILegalRepresentativeForm
} from '@app/pages/PostOnboarding/types';

export interface BaseEntity {
  id: string;
}

export interface Issuer extends User {
  countryOfIncorporation: string;
  visaTncAgreed: boolean;
  wittyTncAgreed: boolean;
  companyName: string;
  registrationNumber: string;
  dateOfRegister: string;
  tradingName: string;
  isLegalRepresentative: boolean;
  isBusinessRegulated: boolean;
  businessType: string;
  businessCategory: string;
  businessRevenue: string;
  fundingSources: string;
}

export interface Investor extends User {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  countryOfResidence?: string;
  postalCode?: number;
  city?: string;
  street?: string;
  houseNo?: string;
  incomeRange?: string;
  priceAndLimit?: boolean;
}

export interface User extends BaseEntity {
  email?: string;
  password?: string;
  shortenPhoneNumber?: string;
  phoneNumberCountryCode?: string;
  vis?: boolean;
  visaTncAgreed?: boolean;
  wittyTncAgreed?: boolean;
  privacyPolicy?: boolean;
  wittyNews?: boolean;
}

export type UserEntity = BaseEntity & (Issuer | Investor);

export interface AssetEntity extends BaseEntity {
  assetId: string;
}

export interface TokenEntity extends BaseEntity {
  tokenId: string;
}

export interface IssuerDetailsEntity extends BaseEntity {
  completed?: boolean;
  companyStructure?: ICompanyStructureForm;
  legalRepresentatives?: ILegalRepresentativeForm;
  kyc?: { form: IKycForm | null };
}
