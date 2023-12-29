import { createApi } from '@reduxjs/toolkit/query/react';
import { smeBaseQuery } from '../utils';
import {
  type RegisterUserRequestDto,
  type RegisterUserResponseDto,
  type SupportedCountriesIncorporation,
  type SupportedCountriesPhone,
  transformErrorResponse,
  type AuthApiError
} from '@app/common/types';
import {
  type ResendEmailConfirmationRequestDto,
  type ResendEmailConfirmationResponseDto,
  type VerifyEmailRequestDto,
  type VerifyEmailResponseDto
} from '@app/pages/LoginEmailCodeVerification/types';
import {
  type ResendPhoneConfirmationResponseDto,
  type VerifyPhoneRequestDto,
  type VerifyPhoneResponseDto,
  type ResendPhoneConfirmationRequestDto
} from '@app/pages/MobileCodeVerification/types';

export type AuthingDictionaryResponseType = SupportedCountriesPhone &
  SupportedCountriesIncorporation;

export const onBoardingApi = createApi({
  reducerPath: 'onBoarding',
  baseQuery: smeBaseQuery,
  tagTypes: ['AuthingDictionary', 'registerIssuer'],
  endpoints: (builder) => ({
    onBoardingDictionaryApi: builder.query<AuthingDictionaryResponseType, void>({
      query: () => ({
        url: 'v1/sme/onboarding/dictionary',
        method: 'GET'
      }),
      providesTags: ['AuthingDictionary'],
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    registerUser: builder.mutation<RegisterUserResponseDto, RegisterUserRequestDto>({
      query: (body) => ({
        url: '/v1/sme/onboarding/register-issuer',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    registerInvestor: builder.mutation<RegisterUserResponseDto, RegisterUserRequestDto>({
      query: (body) => ({
        url: '/v1/sme/onboarding/register-investor',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    verifyEmail: builder.mutation<VerifyEmailResponseDto, VerifyEmailRequestDto>({
      query: (body) => ({
        url: '/v1/sme/onboarding/verify-email',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    resendEmailConfirmation: builder.mutation<
      ResendEmailConfirmationResponseDto,
      ResendEmailConfirmationRequestDto
    >({
      query: (body) => ({
        url: '/v1/sme/onboarding/resend-email-confirmation',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    verifyPhone: builder.mutation<VerifyPhoneResponseDto, VerifyPhoneRequestDto>({
      query: (body) => ({
        url: '/v1/sme/onboarding/verify-phone',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    resendPhoneConfirmation: builder.mutation<
      ResendPhoneConfirmationResponseDto,
      ResendPhoneConfirmationRequestDto
    >({
      query: (body) => ({
        url: '/v1/sme/onboarding/resend-email-confirmation',
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
  useOnBoardingDictionaryApiQuery,
  useRegisterUserMutation,
  useRegisterInvestorMutation,
  useVerifyEmailMutation,
  useVerifyPhoneMutation,
  useResendEmailConfirmationMutation,
  useResendPhoneConfirmationMutation
} = onBoardingApi;
