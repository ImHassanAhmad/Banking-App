import { type AuthErrorLevel } from '@app/common/types';
import { type UseFormRegister, type FieldError } from 'react-hook-form';

export interface UseFormField {
  register?: UseFormRegister<any>;
}

export interface ITextFieldProps extends UseFormField {
  name?: string;
  errorValue?: FieldError | undefined;
  noPopper?: boolean;
  label?: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface CaptchaTokenRequest {
  captchaToken?: string | null;
}

export interface LoginRequest extends ILoginForm, CaptchaTokenRequest {}

export interface IErrorMessage {
  title?: string;
  message?: string;
  errorLevel?: AuthErrorLevel;
}

export interface VerifyLoginOTPResponseDto {
  otpId: string;
}

export interface VerifyLoginOTPRequestDto {
  otpId: string;
  otpCode: string;
}

export interface ResendLoginOtpRequestDto {
  otpId: string;
}

export interface ResendLoginOtpResponseDto {
  newOtpId: string;
}

export interface RefreshSessionDto {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  data?: VerifyLoginOTPResponseDto;
  // error?: ApiTypeError;
}

export interface Category {
  id: string;
  topic: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  name: string;
}
