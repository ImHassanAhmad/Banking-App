import { enumToIndexRecord } from '@app/utils/enum';

export enum InvestorSignUpFlowSteps {
  NameAndDateOfBirth = 'NameAndDateOfBirth',
  Address = 'Address',
  Email = 'Email',
  Mobile = 'Mobile',
  IncomeRange = 'IncomeRange',
  UsPerson = 'UsPerson',
  SourceOfIncome = 'SourceOfIncome',
  Questionaire = 'Questionaire',
  CreatePassword = 'CreatePassword',
  EmailVerify = 'EmailVerify',
  MobileVerify = 'MobileVerify'
}

export const InvestorSignUpFlowStepsIndices = enumToIndexRecord(InvestorSignUpFlowSteps);
