import { enumToIndexRecord } from '@app/utils/enum';

export enum ResetPasswordFlowSteps {
  Email = 'Email',
  OtpVerify = 'OtpVerify',
  ChangePassword = 'ChangePassword'
}

export const ResetPasswordFlowStepsIndices = enumToIndexRecord(ResetPasswordFlowSteps);
