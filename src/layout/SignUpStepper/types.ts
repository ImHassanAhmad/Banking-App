import { enumToIndexRecord } from '@app/utils/enum';

export enum SignUpFlowSteps {
  Country = 'Country',
  Email = 'Email',
  Mobile = 'Mobile',
  AboutOurServices = 'AboutOurServices',
  CreatePassword = 'CreatePassword',
  EmailVerify = 'EmailVerify',
  MobileVerify = 'MobileVerify',
  BusinessCategory = 'BusinessCategory',
  BusinessDescription = 'BusinessDescription',
  BusinessRegulation = 'BusinessRegulation',
  BusinessRevenue = 'BusinessRevenue'
}

export const SignUpFlowStepsIndices = enumToIndexRecord(SignUpFlowSteps);
