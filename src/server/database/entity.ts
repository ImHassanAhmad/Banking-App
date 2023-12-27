import { type TCountryCode } from 'countries-list';

export interface BaseEntity {
  id: string;
}

export interface UserEntity extends BaseEntity {
  countryOfIncorporation?: TCountryCode;
  email: string;
  password?: string;
  shortenPhoneNumber?: string;
  phoneNumberCountryCode?: string;
  visaTncAgreed?: boolean;
  wittyTncAgreed?: boolean;
}

export interface AssetEntity extends BaseEntity {
  assetId: string;
}

export interface TokenEntity extends BaseEntity {
  tokenId: string;
}
