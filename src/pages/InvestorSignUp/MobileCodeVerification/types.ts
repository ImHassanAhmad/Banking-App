import { type RegisterUserResponseDto as IUserId } from '@app/common/types';

export enum OtpCommunicationChannelType {
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
  VOICE = 'VOICE'
}

export interface FieldErrorDto {
  fieldName: string;
  errorMessage: string;
}

export interface FieldErrorsDto {
  errors: FieldErrorDto[];
}

export interface VerifyPhoneRequestDto extends IUserId {
  otpCode: string;
}

export interface VerifyPhoneResponseDto extends IUserId, FieldErrorsDto {
  userRegistered: string;
}

export interface ResendPhoneConfirmationRequestDto extends IUserId {
  phoneOtpCommunicationChannel: OtpCommunicationChannelType;
}

export type ResendPhoneConfirmationResponseDto = FieldErrorsDto;
