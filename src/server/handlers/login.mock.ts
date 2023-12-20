import { type HttpHandler, HttpResponse, http, type PathParams, type StrictResponse } from 'msw';
import constants from '../constants';
import {
  type VerifyLoginOTPRequestDto,
  type LoginRequest,
  type ResendLoginOtpRequestDto
} from 'types';
import { DatabaseService, Entity } from '../../utils/DatabaseService';

import {
  type RegisterUserRequestBody,
  type ErrorMessage,
  type AccountError
} from '@app/common/types';
import { type FieldErrorsDto } from '@app/pages/MobileCodeVerification/types';
import {
  type MockLoginResponse,
  type ResendOtpResponse
} from '@app/store/api/mock/constants/login.const';
let INCORRECT_LOGINS_COUNT: number = 0;

const dbhandler = new DatabaseService<Entity, LoginRequest>(Entity.Issuer);

const loginHandler: HttpHandler = http.post<
  PathParams,
  LoginRequest,
  MockLoginResponse | ErrorMessage | AccountError
>(
  '*/v1/sme/onboarding/authentication/login',
  async ({ request }): Promise<StrictResponse<MockLoginResponse | ErrorMessage | AccountError>> => {
    const requestData = await request.json();
    const { email, password, captchaToken }: LoginRequest = requestData;
    if (email && password && captchaToken) {
      const user = (await dbhandler.getAll({ email, password })) as RegisterUserRequestBody[];
      if (user && user.length > 0) {
        return HttpResponse.json(
          { otpId: user[0].otpId ?? '' },
          {
            status: 200
          }
        );
      }
      INCORRECT_LOGINS_COUNT += 1;

      if (INCORRECT_LOGINS_COUNT > 5 && INCORRECT_LOGINS_COUNT < 10)
        return HttpResponse.json(
          constants.onBoardingConstants.TOO_MANY_INVALID_LOGIN_ATTEMPTS_RESPONSE,
          {
            status: 500
          }
        );

      if (INCORRECT_LOGINS_COUNT > 10)
        return HttpResponse.json<AccountError>(
          constants.onBoardingConstants.SYSTEM_ERROR_RESPONSE,
          {
            status: 400
          }
        );

      return HttpResponse.json(constants.onBoardingConstants.INCORRECT_LOGIN_DATA_RESPONSE, {
        status: 400
      });
    } else {
      return HttpResponse.json(constants.onBoardingConstants.INCORRECT_LOGIN_DATA_RESPONSE, {
        status: 400
      });
    }
  }
);

const verifyLoginHandler: HttpHandler = http.post<
  PathParams,
  VerifyLoginOTPRequestDto,
  RegisterUserRequestBody | FieldErrorsDto
>(
  '*/v1/sme/onboarding/authentication/verify-login-otp',
  async ({ request }): Promise<StrictResponse<RegisterUserRequestBody | FieldErrorsDto>> => {
    const requstData: VerifyLoginOTPRequestDto = await request.json();
    const { otpCode } = requstData;

    const user: any = await dbhandler.getAll({ verficationToken: otpCode });

    if (user.length > 0) {
      return HttpResponse.json(user[0], {
        status: 200
      });
    } else {
      return HttpResponse.json(constants.loginConstants.VERIFY_LOGIN_ERROR_RESPONSE, {
        status: 400
      });
    }
  }
);

const resendLoginHandler: HttpHandler = http.post<
  PathParams,
  ResendLoginOtpRequestDto,
  ResendOtpResponse
>(
  '*/v1/sme/onboarding/authentication/resend-login-otp',
  async ({ request }): Promise<StrictResponse<ResendOtpResponse>> => {
    const { otpId }: ResendLoginOtpRequestDto = await request.json();
    if (otpId) return HttpResponse.json(constants.loginConstants.NEW_OTP_ID_RESPONSE);

    return HttpResponse.json(constants.loginConstants.RESEND_OTP_ERROR_RESPONSE, { status: 400 });
  }
);

export const handlers = [loginHandler, verifyLoginHandler, resendLoginHandler];
