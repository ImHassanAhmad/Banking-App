import { type HttpHandler, HttpResponse, http, type PathParams, type StrictResponse } from 'msw';
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
import {
  type ChangePasswordRequest,
  type InitChangePasswordRequest,
  type ResetPasswordOtpRequest
} from '@app/pages/ResetPassword/types';
import { type ResendLoginOtpRequestDto } from 'types';

const initRequestSchema: yup.ObjectSchema<InitChangePasswordRequest> = yup.object().shape({
  email: yup.string().email().required()
});

const otpCodeSceheme: yup.ObjectSchema<ResetPasswordOtpRequest> = yup
  .object()
  .shape({
    otpCode: yup.string().required()
  })
  .concat(initRequestSchema);

const repeatPasswordSchema: yup.ObjectSchema<ChangePasswordRequest> = yup
  .object()
  .shape({
    password: yup.string().required(),
    repeatPassword: yup.string().required()
  })
  .concat(initRequestSchema);

const initPasswordResetRequestHandler: HttpHandler = http.post<
  PathParams,
  InitChangePasswordRequest,
  MockLoginResponse
>(
  '*/v1/sme/onboarding/authentication/reset-password',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      InitChangePasswordRequest
    >): Promise<StrictResponse<MockLoginResponse>> => {
      const loginRequestPayload: InitChangePasswordRequest = await request.json();
      const { email } = initRequestSchema.validateSync(loginRequestPayload);

      const user = await userService.getById(email);
      if (!user) {
        throw new ApiError('Invalid Credentials', 400);
      }

      return HttpResponse.json({ otpId: email });
    }
  )
);

const changePasswordResetHandler: HttpHandler = http.post<
  PathParams,
  ResetPasswordOtpRequest,
  MockVerifyLoginOtpResponse
>(
  '*/v1/sme/onboarding/authentication/verify-reset-password-otp',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      ResetPasswordOtpRequest
    >): Promise<StrictResponse<any>> => {
      const verifyLoginRequestPayload: ResetPasswordOtpRequest = await request.json();
      otpCodeSceheme.validateSync(verifyLoginRequestPayload);

      const { otpCode } = verifyLoginRequestPayload;

      if (otpCode === '444444') {
        return HttpResponse.json({});
      }

      throw new yup.ValidationError(INVALID_OTP_CODE, null, 'otpCode');
    }
  )
);

const saveChangePasswordHandler: HttpHandler = http.post<
  PathParams,
  ChangePasswordRequest,
  MockResendOtpCodeResponse
>(
  '*/v1/sme/onboarding/authentication/change-password',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<HttpRequestResolverExtras<PathParams>, ChangePasswordRequest>): Promise<
      StrictResponse<any>
    > => {
      const data: ChangePasswordRequest = await request.json();
      repeatPasswordSchema.validateSync(data);
      const { password, repeatPassword, email } = data;
      if (password !== repeatPassword)
        throw new yup.ValidationError('Password does not match', null, 'password');
      const user = await userService.getById(email);
      await userService.update(email, { id: email, ...user, password });
      return HttpResponse.json({});
    }
  )
);

const resendResendHandler: HttpHandler = http.post<
  PathParams,
  ResendLoginOtpRequestDto,
  MockResendOtpCodeResponse
>(
  '*/v1/sme/onboarding/authentication/resend-resend-password-otp',
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

export const handlers = [
  initPasswordResetRequestHandler,
  changePasswordResetHandler,
  saveChangePasswordHandler,
  resendResendHandler
];
