import { createApi } from '@reduxjs/toolkit/query/react';
import { smeBaseQuery } from '../utils';
import {
  type VerifyLoginOTPResponseDto,
  type ResendLoginOtpResponseDto,
  type ResendLoginOtpRequestDto
} from 'types';
import { type AuthApiError, transformErrorResponse } from '@app/common/types';
import type { UserEntity } from '@app/server/database/entity';
import {
  type ResetPasswordOtpRequest,
  type InitChangePasswordRequest,
  type ChangePasswordRequest
} from '@app/pages/ResetPassword/types';

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
