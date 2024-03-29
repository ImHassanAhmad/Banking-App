import {
  type OnboardingError,
  type RefreshSessionDto,
  type ResendLoginOtpResponseDto,
  type VerifyLoginOTPResponseDto
} from '@app/types/types';
import { type ValidationError } from 'yup';

export const MOCK_LOGIN_EMAIL = 'test@witty.tech';
export const MOCK_LOGIN_PASSWORD = 'Pass123456789@';
export const MOCK_CAPTCHA_VALUE = 'mock-captcha';

export const LOGIN_RESPONSE: VerifyLoginOTPResponseDto = {
  otpId: '1ee45ddf-957a-4011-a90c-8cad4b415f98'
};

export const VERIFY_LOGIN_RESPONSE: RefreshSessionDto = {
  refreshToken: '',
  accessToken: ''
};

export const FIELD_ERROR_RESPONSE = ({ message, path }: ValidationError): OnboardingError => ({
  errors: [{ fieldName: path ?? 'unknown field', errorMessage: message }]
});

export const NEW_OTP_ID_RESPONSE: ResendLoginOtpResponseDto = {
  newOtpId: '1ee45ddf-957a-4011-a90c-8cad4b415f98'
};

export const TOO_MANY_INVALID_LOGIN_ATTEMPTS: string =
  'Too many invalid login attempts, try again after five minutes.';

export const INCORRECT_LOGIN_RESPONSE: string = 'Incorrect login data.';

export type MockLoginResponse = VerifyLoginOTPResponseDto | OnboardingError;
export type MockVerifyLoginOtpResponse = RefreshSessionDto | OnboardingError;
export type MockResendOtpCodeResponse = ResendLoginOtpResponseDto | OnboardingError;
