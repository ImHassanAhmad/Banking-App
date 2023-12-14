import { enumToIndexRecord } from '@app/utils/enum';

export enum LoginFlowSteps {
  Login = 'Login',
  LoginOtpVerify = 'LoginOtpVerify'
}

export const LoginFlowStepsIndices = enumToIndexRecord(LoginFlowSteps);
