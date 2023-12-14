import { createApi } from '@reduxjs/toolkit/query/react';
import { smeBaseQuery } from '../utils';
import {
  type VerifyLoginOTPRequestDto,
  type ResendLoginOtpRequestDto,
  type ResendLoginOtpResponseDto,
  type VerifyLoginOTPResponseDto,
  type RefreshSessionDto,
  type LoginRequest
} from 'types';
import { type AuthApiError, transformErrorResponse } from '@app/common/types';

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
    verifyLoginOtp: builder.mutation<RefreshSessionDto, VerifyLoginOTPRequestDto>({
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
