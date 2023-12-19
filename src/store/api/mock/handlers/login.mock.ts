import { type HttpHandler, HttpResponse, http, type PathParams, type StrictResponse } from 'msw';
import constants from '../constants';
import {
  type VerifyLoginOTPRequestDto,
  type LoginRequest,
  type ResendLoginOtpRequestDto,
  type VerifyLoginOTPResponseDto
} from 'types';
import { type AccountError, type ErrorMessage } from '@app/common/types';
import { type MockLoginResponse } from '../constants/login.const';

let INCORRECT_LOGINS_COUNT: number = 0;

const loginHandler: HttpHandler = http.post<PathParams, LoginRequest, MockLoginResponse>(
  '*/v1/sme/onboarding/authentication/login',
  async ({ request }): Promise<StrictResponse<MockLoginResponse>> => {
    const { email, password, captchaToken }: LoginRequest = (request.body ??
      (await request.json())) as LoginRequest;

    if (
      email === constants.loginConstants.MOCK_LOGIN_EMAIL &&
      password === constants.loginConstants.MOCK_LOGIN_PASSWORD &&
      captchaToken
    )
      return HttpResponse.json<VerifyLoginOTPResponseDto>(constants.loginConstants.LOGIN_RESPONSE, {
        status: 200
      });

    INCORRECT_LOGINS_COUNT += 1;

    if (INCORRECT_LOGINS_COUNT > 5 && INCORRECT_LOGINS_COUNT < 10)
      return HttpResponse.json<ErrorMessage>(
        constants.onBoardingConstants.TOO_MANY_INVALID_LOGIN_ATTEMPTS_RESPONSE,
        {
          status: 500
        }
      );

    if (INCORRECT_LOGINS_COUNT > 10)
      return HttpResponse.json<AccountError>(constants.onBoardingConstants.SYSTEM_ERROR_RESPONSE, {
        status: 400
      });

    return HttpResponse.json<ErrorMessage>(
      constants.onBoardingConstants.INCORRECT_LOGIN_DATA_RESPONSE,
      {
        status: 400
      }
    );
  }
);

const verifyLoginHandler: HttpHandler = http.post(
  '*/v1/sme/onboarding/authentication/verify-login-otp',
  async ({ request }): Promise<HttpResponse> => {
    const { otpCode }: VerifyLoginOTPRequestDto =
      (await request.json()) as VerifyLoginOTPRequestDto;
    if (otpCode === '444444')
      return HttpResponse.json(constants.loginConstants.VERIFY_LOGIN_RESPONSE);

    return HttpResponse.json(constants.loginConstants.VERIFY_LOGIN_ERROR_RESPONSE, {
      status: 400
    });
  }
);

const resendLoginHandler: HttpHandler = http.post(
  '*/v1/sme/onboarding/authentication/resend-login-otp',
  async ({ request }): Promise<HttpResponse> => {
    const { otpId }: ResendLoginOtpRequestDto = (await request.json()) as ResendLoginOtpRequestDto;
    if (otpId) return HttpResponse.json(constants.loginConstants.NEW_OTP_ID_RESPONSE);

    return HttpResponse.json(constants.loginConstants.RESEND_OTP_ERROR_RESPONSE, { status: 400 });
  }
);

export const handlers = [loginHandler, verifyLoginHandler, resendLoginHandler];
