import { type RegisterUserResponseDto as IUserId, type AuthApiError } from '@app/common/types';
import {
  type VerifyPhoneResponseDto,
  type VerifyPhoneRequestDto,
  type FieldErrorsDto
} from '../MobileCodeVerification/types';

export type VerifyEmailRequestDto = VerifyPhoneRequestDto;
export type VerifyEmailResponseDto = VerifyPhoneResponseDto;
export type ResendEmailConfirmationRequestDto = IUserId;
export type ResendEmailConfirmationResponseDto = FieldErrorsDto;

export interface VerifyEmailRequest {
  data: VerifyEmailRequestDto;
}

export interface FieldErrors {
  data: FieldErrorsDto;
}

export type FieldErrorsResponse = FieldErrors | AuthApiError;
