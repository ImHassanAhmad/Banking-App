import { Dexie, type Table } from 'dexie';
import type {
  IssuerDetailsEntity,
  AssetEntity,
  UserEntity,
  AssetTokenCreationEntity
} from './entity';

export class AppDatabase extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  users!: Table<UserEntity, string>;
  tokens!: Table<AssetTokenCreationEntity, string>;
  assets!: Table<AssetEntity, string>;
  issuerDetails!: Table<IssuerDetailsEntity, string>;

  constructor() {
    super('Tokenization');
    this.version(1).stores({
      users:
        'id, email, password, shortenPhoneNumber, phoneNumberCountryCode, countryOfIncorporation, visaTncAgreed, wittyTncAgreed, companyName, registrationNumber, dateOfRegister, tradingName, isLegalRepresentative, businessType, businessCategory, isBusinessRegulated, businessRevenue, fundingSources, firstName, lastName, dateOfBirth, postalCode, city, street, houseNo, incomeRange, priceAndLimit, isUsResident, sourceOfIncome',
      tokens:
        'id, tokenName, tokenSymbol, totalSupply, numberOfDecimal, pausable, mintable, burnable, capped, currency, buyPrice',
      assets:
        'id, assetName, assetDescription, assetWebsite, logo, prospectus, businessModel, financialModel, businessPlan, valuationReport, reddit, twitter, telegram, whitepaper, discord',
      issuerDetails: 'id, completed, companyStructure, legalRepresentatives, kyc, issuerId'
    });
  }
}

export const database = new AppDatabase();
