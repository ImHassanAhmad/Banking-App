import { type HttpHandler, HttpResponse, http, type PathParams, type StrictResponse } from 'msw';
import constants from '../constants';
import {
  type VerifyLoginOTPRequestDto,
  type LoginRequest,
  type ResendLoginOtpRequestDto,
  type VerifyLoginOTPResponseDto,
  type RefreshSessionDto,
  type ResendLoginOtpResponseDto
} from 'types';
import {
  type MockVerifyLoginOtpResponse,
  type MockLoginResponse,
  type MockResendOtpCodeResponse
} from '../constants/login.const';
import { ApiError } from '@app/server/middleware/withErrorHandler';
import * as yup from 'yup';
import withErrorHandler from '../middleware/withErrorHandler';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';

let INCORRECT_LOGINS_COUNT: number = 0;

const loginScheme: yup.ObjectSchema<LoginRequest> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(13).required(),
  captchaToken: yup.string().required()
});

const otpIdScheme: yup.ObjectSchema<ResendLoginOtpRequestDto> = yup.object().shape({
  otpId: yup.string().required()
});

const otpCodeSceheme: yup.ObjectSchema<VerifyLoginOTPRequestDto> = yup.object().shape({
  otpId: yup.string().required(),
  otpCode: yup
    .string()
    .required()
    .matches(/444444/g)
});

const loginHandler: HttpHandler = http.post<PathParams, LoginRequest, MockLoginResponse>(
  '*/v1/sme/onboarding/authentication/login',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<HttpRequestResolverExtras<PathParams>, LoginRequest>): Promise<
      StrictResponse<MockLoginResponse>
    > => {
      const loginRequestPayload: LoginRequest = (request.body ??
        (await request.json())) as LoginRequest;

      loginScheme.validateSync(loginRequestPayload);
      const { email, password, captchaToken } = loginRequestPayload;

      if (
        email === constants.loginConstants.MOCK_LOGIN_EMAIL &&
        password === constants.loginConstants.MOCK_LOGIN_PASSWORD &&
        captchaToken
      )
        return HttpResponse.json<VerifyLoginOTPResponseDto>(
          constants.loginConstants.LOGIN_RESPONSE,
          {
            status: 200
          }
        );

      INCORRECT_LOGINS_COUNT += 1;

      if (INCORRECT_LOGINS_COUNT > 5 && INCORRECT_LOGINS_COUNT < 10)
        throw new ApiError(constants.loginConstants.TOO_MANY_INVALID_LOGIN_ATTEMPTS);

      if (INCORRECT_LOGINS_COUNT > 10)
        throw new ApiError(constants.commonConstants.SOMETHING_WENT_WRONG, 500);

      throw new ApiError(constants.loginConstants.INCORRECT_LOGIN_DATA);
    }
  )
);

const verifyLoginHandler: HttpHandler = http.post<
  PathParams,
  VerifyLoginOTPRequestDto,
  MockVerifyLoginOtpResponse
>(
  '*/v1/sme/onboarding/authentication/verify-login-otp',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      VerifyLoginOTPRequestDto
    >): Promise<StrictResponse<MockVerifyLoginOtpResponse>> => {
      const verifyLoginOtpPayload: VerifyLoginOTPRequestDto =
        request.body ?? ((await request.json()) as any);
      otpCodeSceheme.validateSync(verifyLoginOtpPayload);
      return HttpResponse.json<RefreshSessionDto>(constants.loginConstants.VERIFY_LOGIN_RESPONSE);
    }
  )
);

const resendLoginHandler: HttpHandler = http.post<
  PathParams,
  ResendLoginOtpRequestDto,
  MockResendOtpCodeResponse
>(
  '*/v1/sme/onboarding/authentication/resend-login-otp',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      ResendLoginOtpRequestDto
    >): Promise<StrictResponse<MockResendOtpCodeResponse>> => {
      const resendOtpRequestPayload: ResendLoginOtpRequestDto =
        request.body ?? ((await request.json()) as any);
      otpIdScheme.validateSync(resendOtpRequestPayload);
      return HttpResponse.json<ResendLoginOtpResponseDto>(
        constants.loginConstants.NEW_OTP_ID_RESPONSE
      );
    }
  )
);

export const handlers = [loginHandler, verifyLoginHandler, resendLoginHandler];
