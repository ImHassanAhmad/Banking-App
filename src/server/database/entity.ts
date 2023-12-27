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
  countryOfResidence: string;
}

export interface User {
  email: string;
  password: string;
  shortenPhoneNumber: string;
  phoneNumberCountryCode: string;
}

export type UserEntity = BaseEntity & (Issuer | Investor);

export interface AssetEntity extends BaseEntity {
  assetId: string;
}

export interface TokenEntity extends BaseEntity {
  tokenId: string;
}
