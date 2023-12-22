import { type HttpHandler, HttpResponse, http, type PathParams, type StrictResponse } from 'msw';
import {
  type VerifyLoginOTPRequestDto,
  type LoginRequest,
  type ResendLoginOtpRequestDto
} from 'types';

import {
  type RegisterUserRequestDto,
  type ErrorMessage,
  type AccountError
} from '@app/common/types';
import { type FieldErrorsDto } from '@app/pages/MobileCodeVerification/types';

import * as yup from 'yup';
import { userService } from '../database/service';

const loginHandlerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(13).required(),
  captchaToken: yup.string().required()
});

const loginHandler: HttpHandler = http.post<PathParams, LoginRequest, ErrorMessage | AccountError>(
  '*/v1/sme/onboarding/authentication/login',
  async ({ request }): Promise<StrictResponse<any | ErrorMessage | AccountError>> => {
    const requestData = await request.json();
    console.log(requestData);
    const validateData = loginHandlerSchema.validateSync(requestData, { abortEarly: true });

    const { email } = validateData;

    const user = await userService.add({ id: email, email });

    // if (!user) return HttpResponse.json({ error: { errorMessage: 'Invalid Credentials' } });

    return HttpResponse.json({ otpId: user.email });
  }
);

const verifyLoginHandler: HttpHandler = http.post<
  PathParams,
  VerifyLoginOTPRequestDto,
  RegisterUserRequestDto | FieldErrorsDto
>(
  '*/v1/sme/onboarding/authentication/verify-login-otp',
  async ({ request }): Promise<StrictResponse<RegisterUserRequestDto | FieldErrorsDto>> => {
    const requstData: VerifyLoginOTPRequestDto = await request.json();
    const { otpCode, otpId } = requstData;

    if (otpCode !== '444444')
      return HttpResponse.json({} as any, {
        status: 400
      });

    const user: any = await userService.getById(otpId);

    return HttpResponse.json(user);
  }
);

const resendLoginHandler: HttpHandler = http.post<PathParams, ResendLoginOtpRequestDto, any>(
  '*/v1/sme/onboarding/authentication/resend-login-otp',
  async ({ request }): Promise<StrictResponse<any>> => {
    const { otpId }: ResendLoginOtpRequestDto = await request.json();
    if (otpId) return HttpResponse.json({});

    return HttpResponse.json({}, { status: 400 });
  }
);

export const handlers = [loginHandler, verifyLoginHandler, resendLoginHandler];
