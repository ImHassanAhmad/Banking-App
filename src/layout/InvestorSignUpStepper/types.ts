import { enumToIndexRecord } from '@app/utils/enum';

export enum InvestorSignUpFlowSteps {
  Email = 'Email',
  NameAndDateOfBirth = 'NameAndDateOfBirth',
  Address = 'Address',
  Mobile = 'Mobile',
  VerifyIdentity = 'VerifyIdentity',
  IncomeRange = 'IncomeRange',
  UsPerson = 'UsPerson',
  SecurityNumber = 'SecurityNumber',
  CountryTaxes = 'CountryTaxes',
  SourceOfIncome = 'SourceOfIncome',
  InvesterOccupation = 'InvesterOccupation',
  TaxReporter = 'TaxReporter',
  PoliticalExposed = 'PoliticalExposed',
  PoliticalExposedPerson = 'PoliticalExposedPerson',
  Questionaire = 'Questionaire',
  CreatePassword = 'CreatePassword',
  EmailVerify = 'EmailVerify',
  MobileVerify = 'MobileVerify'
}

export const InvestorSignUpFlowStepsIndices = enumToIndexRecord(InvestorSignUpFlowSteps);
