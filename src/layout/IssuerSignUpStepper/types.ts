import { enumToIndexRecord } from '@app/utils/enum';

export enum IssuerSignUpFlowSteps {
  BusinessCategory = 'BusinessCategory',
  Country = 'Country',
  Email = 'Email',
  CompanyBasicInfo = 'CompanyBasicInfo',
  BusinessDescription = 'BusinessDescription',
  BusinessRegulation = 'BusinessRegulation',
  BusinessRevenue = 'BusinessRevenue',
  TradingName = 'TradingName',
  RegistrationAddress = 'RegistrationAddress',
  CompanyOperatingAddress = 'CompanyOperatingAddress',
  Mobile = 'Mobile',
  AboutOurServices = 'AboutOurServices',
  CreatePassword = 'CreatePassword',
  EmailVerify = 'EmailVerify',
  MobileVerify = 'MobileVerify'
}

export const IssuerFlowStepsIndices = enumToIndexRecord(IssuerSignUpFlowSteps);
