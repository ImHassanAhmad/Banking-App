import { enumToIndexRecord } from '@app/utils/enum';

export enum InvestorSignUpFlowSteps {
  Email = 'Email',
  NameAndDateOfBirth = 'NameAndDateOfBirth',
  Address = 'Address',
  Mobile = 'Mobile',
  VerifyIdentity = 'VerifyIdentity',
  TaxReporter = 'TaxReporter',
  IncomeRange = 'IncomeRange',
  UsPerson = 'UsPerson',
  SecurityNumber = 'SecurityNumber',
  CountryTaxes = 'CountryTaxes',
  PoliticalExposed = 'PoliticalExposed',
  PoliticalExposedPerson = 'PoliticalExposedPerson',
  SourceOfIncome = 'SourceOfIncome',
  InvesterOccupation = 'InvesterOccupation',
  AboutOurServices = 'AboutOurServices',
  CreatePassword = 'CreatePassword',
  EmailVerify = 'EmailVerify',
  MobileVerify = 'MobileVerify'
}

export const InvestorSignUpFlowStepsIndices = enumToIndexRecord(InvestorSignUpFlowSteps);
