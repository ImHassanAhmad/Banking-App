import { enumToIndexRecord } from '@app/utils/enum';

export enum InvestorSignUpFlowSteps {
  NameAndDateOfBirth = 'NameAndDateOfBirth',
  Address = 'Address',
  Email = 'Email',
  Mobile = 'Mobile',
  IncomeRange = 'IncomeRange',
  Questionaire = 'Questionaire',
  UploadDocument = 'UploadDocument',
  CreatePassword = 'CreatePassword'
}

export const InvestorSignUpFlowStepsIndices = enumToIndexRecord(InvestorSignUpFlowSteps);
