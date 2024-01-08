import { type AssetStatus } from '@app/common/types';
import type {
  ICompanyStructureForm,
  IKycForm,
  ILegalRepresentativeForm,
  IUploadedFilesEntity
} from '@app/pages/IssuerOnboarding/types';

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
  address1?: string;
  address2?: string;
  country?: string;
  longitude?: number;
  latitude?: number;
  peselNumber?: string;
  incomeRange?: string;
  sourceOfIncome?: string[];
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

export interface AssetInformation extends BaseEntity {
  assetName: string;
  assetDescription: string;
  assetWebsite: string;
  logo: string;
  status: AssetStatus;
}

export interface AssetDocuments extends BaseEntity {
  prospectus: string;
  businessModel: string;
  financialModel: string;
  businessPlan: string;
  valuationReport: string;
}

export interface AssetSocialMediaLinks extends BaseEntity {
  reddit?: string;
  twitter?: string;
  telegram?: string;
  whitepaper?: string;
  discord?: string;
}

export type AssetEntity = AssetInformation | AssetDocuments | AssetSocialMediaLinks;

export interface TokenEntity extends BaseEntity {
  tokenId: string;
}

export interface IssuerDetailsEntity extends BaseEntity {
  completed?: boolean;
  companyStructure?: ICompanyStructureForm;
  legalRepresentatives?: ILegalRepresentativeForm;
  kyc?: { form: IKycForm | null; uploadedFiles: IUploadedFilesEntity };
}

export interface InvestorDetailsEntity extends BaseEntity {
  accountType?: 'investor';
}

export interface AssetTokenCreationEntity extends BaseEntity {
  assetId: string;
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number | null;
  numberOfDecimal: number | null;
  pausable: boolean;
  mintable: boolean;
  burnable: boolean;
  capped: boolean;
  currency: string;
  buyPrice: number;
  tokenLogo: string;
}
