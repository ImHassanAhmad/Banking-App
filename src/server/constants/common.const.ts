import {
  type RegisterUserResponseDto,
  type AccountError,
  type OnboardingError,
  type AssetResponseDto
} from '@app/common/types';
import { type ApiError } from '../middleware/withErrorHandler';

export const SOMETHING_WENT_WRONG: string = 'Something went wrong.';
export const INVALID_OTP_CODE: string = 'otpCode is invalid';
export const INVALID_OTP_ID: string = 'otpId is invalid';
export const FIELD_REQUIRED = (fieldName: string): string => `${fieldName} is invalid`;
export const SYSTEM_ERROR_RESPONSE = (error: Error): AccountError => ({
  code: '500',
  detail: 'Something went wrong.',
  error: error.message,
  message: error.message,
  path: 'Something went wrong.',
  status: 500,
  timestamp: new Date().toString(),
  traceId: Date.now().toString()
});
export const ERROR_MESSAGE_RESPONSE = ({ message }: ApiError): OnboardingError => ({
  error: { errorMessage: message }
});
export type MockRegisterUserResponse =
  | RegisterUserResponseDto
  | OnboardingError
  | Record<string, any>;
export type MockVerifySignUpOtpResponse = null | OnboardingError;
export type MockAssetCreationResponse = AssetResponseDto | OnboardingError;
