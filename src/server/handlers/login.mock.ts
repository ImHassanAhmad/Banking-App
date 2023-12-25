import { type HttpHandler, HttpResponse, http, type PathParams, type StrictResponse } from 'msw';
import constants from '../constants';
import {
  type VerifyLoginOTPRequestDto,
  type LoginRequest,
  type ResendLoginOtpRequestDto,
  type ResendLoginOtpResponseDto
} from 'types';
import { DatabaseService, Entity } from '../../utils/DatabaseService';
import * as yup from 'yup';
import withErrorHandler, { ApiError } from '../middleware/withErrorHandler';
import {
  type MockVerifyLoginOtpResponse,
  type MockLoginResponse,
  type MockResendOtpCodeResponse
} from '../constants/login.const';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';

let INCORRECT_LOGINS_COUNT: number = 0;

const dbhandler = new DatabaseService<Entity, LoginRequest>(Entity.Issuer);

const loginScheme: yup.ObjectSchema<LoginRequest> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(13).required(),
  captchaToken: yup.string().required()
});

const otpIdScheme: yup.ObjectSchema<ResendLoginOtpRequestDto> = yup.object({
  otpId: yup.string().required()
});

const otpCodeSceheme: yup.ObjectSchema<VerifyLoginOTPRequestDto> = yup.object({
  otpId: yup.string().required(),
  otpCode: yup.string().required()
});

const loginHandler: HttpHandler = http.post<PathParams, LoginRequest, MockLoginResponse>(
  '*/v1/sme/onboarding/authentication/login',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<HttpRequestResolverExtras<PathParams>, LoginRequest>): Promise<
      StrictResponse<MockLoginResponse>
    > => {
      const loginRequestPayload: LoginRequest = await request.json();
      loginScheme.validateSync(loginRequestPayload);

      const { email, password } = loginRequestPayload;
      const user: any = await dbhandler.getAll({ email, password });

      if (user?.length) {
        const { otpId }: VerifyLoginOTPRequestDto = user[0];
        return HttpResponse.json(
          { otpId },
          {
            status: 200
          }
        );
      }
      INCORRECT_LOGINS_COUNT += 1;

      if (INCORRECT_LOGINS_COUNT > 5 && INCORRECT_LOGINS_COUNT < 10)
        throw new ApiError(constants.loginConstants.TOO_MANY_INVALID_LOGIN_ATTEMPTS);

      if (INCORRECT_LOGINS_COUNT > 10) {
        throw new ApiError(constants.commonConstants.SOMETHING_WENT_WRONG, 500);
      }

      throw new ApiError(constants.loginConstants.INCORRECT_LOGIN_RESPONSE, 400);
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
      const verifyLoginRequestPayload: VerifyLoginOTPRequestDto = await request.json();
      otpCodeSceheme.validateSync(verifyLoginRequestPayload);

      const { otpCode } = verifyLoginRequestPayload;

      const user: any = await dbhandler.getAll({ verficationToken: otpCode });
      if (user?.length) {
        return HttpResponse.json(user[0], {
          status: 200
        });
      }

      throw new yup.ValidationError(constants.commonConstants.INVALID_OTP_CODE, null, 'otpCode');
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
      const resendOtpRequestPayload: ResendLoginOtpRequestDto = await request.json();
      otpIdScheme.validateSync(resendOtpRequestPayload);
      return HttpResponse.json<ResendLoginOtpResponseDto>(
        constants.loginConstants.NEW_OTP_ID_RESPONSE,
        { status: 200 }
      );
    }
  )
);

export const handlers = [loginHandler, verifyLoginHandler, resendLoginHandler];
