import { type FieldErrorsDto } from '@app/pages/MobileCodeVerification/types';
import {
  type ResendLoginOtpResponseDto,
  type RefreshSessionDto,
  type VerifyLoginOTPResponseDto
} from 'types';

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

export const VERIFY_LOGIN_ERROR_RESPONSE: FieldErrorsDto = {
  errors: [{ fieldName: 'otpCode', errorMessage: 'Invalid otp provided.' }]
};

export const NEW_OTP_ID_RESPONSE: ResendLoginOtpResponseDto = {
  newOtpId: '1ee45ddf-957a-4011-a90c-8cad4b415f98'
};

export const RESEND_OTP_ERROR_RESPONSE: FieldErrorsDto = {
  errors: [{ fieldName: 'otpCode', errorMessage: 'Invalid otpId provided.' }]
};
