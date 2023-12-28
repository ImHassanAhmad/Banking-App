import { type RegisterUserResponseDto as IUserId, type AuthApiError } from '@app/common/types';
import {
  type VerifyPhoneResponseDto,
  type VerifyPhoneRequestDto,
  type FieldErrorsDto
} from '../MobileCodeVerification/types';
import type {
  ICompanyStructureForm,
  IKycForm,
  ILegalRepresentativeForm,
  IUploadedFiles
} from '../PostOnboarding/types';

export type VerifyEmailRequestDto = VerifyPhoneRequestDto;
export type VerifyEmailResponseDto = VerifyPhoneResponseDto;
export type ResendEmailConfirmationRequestDto = IUserId;
export type ResendEmailConfirmationResponseDto = FieldErrorsDto;

export interface IssuerDetailsRequestDto {
  id: string;
  companyStructure?: ICompanyStructureForm;
  legalRepresentatives?: ILegalRepresentativeForm;
  kyc?: {
    form: IKycForm;
    uploadedFiles: IUploadedFiles;
  };
}

export interface VerifyEmailRequest {
  data: VerifyEmailRequestDto;
}

export interface FieldErrors {
  data: FieldErrorsDto;
}

export type FieldErrorsResponse = FieldErrors | AuthApiError;
