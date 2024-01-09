import type { UserEntity } from '@app/server/database/entity';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  transformErrorResponse,
  type AuthApiError,
  type LoginRequest,
  type RefreshSessionDto,
  type ResendLoginOtpRequestDto,
  type ResendLoginOtpResponseDto,
  type VerifyLoginOTPRequestDto,
  type VerifyLoginOTPResponseDto
} from '@app/types/types';
import { smeBaseQuery } from '../utils';

export const loginApi = createApi({
  reducerPath: 'login',
  baseQuery: smeBaseQuery,
  tagTypes: ['login', 'user'],
  endpoints: (builder) => ({
    loginUser: builder.mutation<VerifyLoginOTPResponseDto, LoginRequest>({
      query: (body) => ({
        url: 'v1/sme/onboarding/authentication/login',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    verifyLoginOtp: builder.mutation<UserEntity, VerifyLoginOTPRequestDto>({
      query: (body) => ({
        url: 'v1/sme/onboarding/authentication/verify-login-otp',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    refreshToken: builder.mutation<RefreshSessionDto, RefreshSessionDto>({
      query: (body) => ({
        url: 'v1/sme/onboarding/authentication/refresh-session',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    resendLoginOtp: builder.mutation<ResendLoginOtpResponseDto, ResendLoginOtpRequestDto>({
      query: (body) => ({
        url: 'v1/sme/onboarding/authentication/resend-login-otp',
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
  useLoginUserMutation,
  useVerifyLoginOtpMutation,
  useRefreshTokenMutation,
  useResendLoginOtpMutation
} = loginApi;
