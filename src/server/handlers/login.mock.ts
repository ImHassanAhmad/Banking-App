import { type HttpHandler, HttpResponse, http } from 'msw';
import constants from '../constants';
import {
  type VerifyLoginOTPRequestDto,
  type LoginRequest,
  type ResendLoginOtpRequestDto
} from 'types';
import dbhandler from '../../utils/dbHandler';
let INCORRECT_LOGINS_COUNT: number = 0;

const loginHandler: HttpHandler = http.post(
  '*/v1/sme/onboarding/authentication/login',
  async ({ request }): Promise<HttpResponse> => {
    const requestData: any = await request.json();
    console.log(requestData);
    const { email, password, captchaToken }: LoginRequest = requestData;
    if (email && password && captchaToken) {
      const user: any = await dbhandler.getAll('users', `?email${email}&password=${password}`);
      if (user.length > 0) {
        return HttpResponse.json(user[0].otpId, {
          status: 200
        });
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
        return HttpResponse.json(constants.onBoardingConstants.SYSTEM_ERROR_RESPONSE, {
          status: 400
        });

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

const verifyLoginHandler: HttpHandler = http.post(
  '*/v1/sme/onboarding/authentication/verify-login-otp',
  async ({ request }): Promise<HttpResponse> => {
    const requstData: VerifyLoginOTPRequestDto = (await request.json()) as VerifyLoginOTPRequestDto;
    const { otpCode } = requstData;

    const user: any = await dbhandler.getAll('users', `?verficationToken=${otpCode}`);
    console.log(user);
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

const resendLoginHandler: HttpHandler = http.post(
  '*/v1/sme/onboarding/authentication/resend-login-otp',
  async ({ request }): Promise<HttpResponse> => {
    const { otpId }: ResendLoginOtpRequestDto = (await request.json()) as ResendLoginOtpRequestDto;
    if (otpId) return HttpResponse.json(constants.loginConstants.NEW_OTP_ID_RESPONSE);

    return HttpResponse.json(constants.loginConstants.RESEND_OTP_ERROR_RESPONSE, { status: 400 });
  }
);

export const handlers = [loginHandler, verifyLoginHandler, resendLoginHandler];
