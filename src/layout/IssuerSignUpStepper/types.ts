import { enumToIndexRecord } from '@app/utils/enum';

export enum IssuerSignUpFlowSteps {
  Country = 'Country',
  Email = 'Email',
  Mobile = 'Mobile',
  CompanyBasicInfo = 'CompanyBasicInfo',
  LegalRepresentative = 'LegalRepresentative',
  BusinessType = 'BusinessType',
  BusinessCategory = 'BusinessCategory',
  BusinessDescription = 'BusinessDescription',
  BusinessRegulation = 'BusinessRegulation',
  BusinessRevenue = 'BusinessRevenue',
  FundingSource = 'FundingSource',
  AboutOurServices = 'AboutOurServices',
  CreatePassword = 'CreatePassword',
  EmailVerify = 'EmailVerify',
  MobileVerify = 'MobileVerify'
}

export const IssuerFlowStepsIndices = enumToIndexRecord(IssuerSignUpFlowSteps);
