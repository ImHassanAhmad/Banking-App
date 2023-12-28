import { type HttpHandler, HttpResponse, http, type PathParams, type StrictResponse } from 'msw';
import {
  type VerifyLoginOTPRequestDto,
  type LoginRequest,
  type ResendLoginOtpRequestDto
} from 'types';
import { userService } from '../database/service';
import * as yup from 'yup';
import withErrorHandler, { ApiError } from '../middleware/withErrorHandler';
import {
  type MockVerifyLoginOtpResponse,
  type MockLoginResponse,
  type MockResendOtpCodeResponse
} from '../constants/login.const';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { INVALID_OTP_CODE } from '../constants/common.const';
import { type UserEntity } from '../database/entity';

const loginScheme: yup.ObjectSchema<LoginRequest> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(13).required(),
  captchaToken: yup.string().required()
});

const otpCodeSceheme: yup.ObjectSchema<VerifyLoginOTPRequestDto> = yup.object().shape({
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
      const { email, password } = loginScheme.validateSync(loginRequestPayload);

      const user = await userService.getById(email);
      if (!user || user.password !== password) {
        throw new ApiError('Invalid Credentials', 400);
      }

      return HttpResponse.json({ otpId: email });
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
    >): Promise<StrictResponse<UserEntity>> => {
      const verifyLoginRequestPayload: VerifyLoginOTPRequestDto = await request.json();
      otpCodeSceheme.validateSync(verifyLoginRequestPayload);

      const { otpId, otpCode } = verifyLoginRequestPayload;

      console.log(otpId);

      if (otpCode === '444444') {
        const user = await userService.getById(otpId);
        return HttpResponse.json(user);
      }

      throw new yup.ValidationError(INVALID_OTP_CODE, null, 'otpCode');
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
    >): Promise<StrictResponse<any>> => {
      return HttpResponse.json({});
    }
  )
);

export const handlers = [loginHandler, verifyLoginHandler, resendLoginHandler];
