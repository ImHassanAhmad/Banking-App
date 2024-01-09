import {
  type ChangePasswordRequest,
  type InitChangePasswordRequest,
  type ResetPasswordOtpRequest
} from '@app/pages/ResetPassword/types';
import type { UserEntity } from '@app/server/database/entity';
import {
  transformErrorResponse,
  type AuthApiError,
  type ResendLoginOtpRequestDto,
  type ResendLoginOtpResponseDto,
  type VerifyLoginOTPResponseDto
} from '@app/types/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { smeBaseQuery } from '../utils';

export const resetPasswordApi = createApi({
  reducerPath: 'reset-password',
  baseQuery: smeBaseQuery,
  tagTypes: ['reset-password', 'user'],
  endpoints: (builder) => ({
    initPasswordRequest: builder.mutation<VerifyLoginOTPResponseDto, InitChangePasswordRequest>({
      query: (body) => ({
        url: 'v1/sme/onboarding/authentication/reset-password',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    verifyResetPasswordOtp: builder.mutation<UserEntity, ResetPasswordOtpRequest>({
      query: (body) => ({
        url: 'v1/sme/onboarding/authentication/verify-reset-password-otp',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    saveChangePassword: builder.mutation<ChangePasswordRequest, any>({
      query: (body) => ({
        url: 'v1/sme/onboarding/authentication/change-password',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    resendResetPasswordOtp: builder.mutation<ResendLoginOtpResponseDto, ResendLoginOtpRequestDto>({
      query: (body) => ({
        url: 'v1/sme/onboarding/authentication/resend-resend-password-otp',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    })
  })
});

export const {
  useInitPasswordRequestMutation,
  useVerifyResetPasswordOtpMutation,
  useSaveChangePasswordMutation,
  useResendResetPasswordOtpMutation
} = resetPasswordApi;
