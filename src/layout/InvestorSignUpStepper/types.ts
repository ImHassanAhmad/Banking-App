import { enumToIndexRecord } from '@app/utils/enum';

export enum InvestorSignUpFlowSteps {
  Country = 'Country',
  Email = 'Email',
  NameAndDateOfBirth = 'NameAndDateOfBirth',
  Address = 'Address',
  Mobile = 'Mobile',
  IncomeRange = 'IncomeRange',
  Questionaire = 'Questionaire',
  AboutOurServices = 'AboutOurServices',
  CreatePassword = 'CreatePassword',
  EmailVerify = 'EmailVerify',
  MobileVerify = 'MobileVerify'
}

export const InvestorSignUpFlowStepsIndices = enumToIndexRecord(InvestorSignUpFlowSteps);
