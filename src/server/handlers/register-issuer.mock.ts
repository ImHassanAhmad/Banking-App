import { http, type HttpHandler, HttpResponse, type PathParams, type StrictResponse } from 'msw';
import * as yup from 'yup';
import { INVALID_OTP_CODE, type MockRegisterUserResponse } from '../constants/common.const';
import withErrorHandler from '../middleware/withErrorHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { userService } from '../database/service';
import { type RegisterIssuerRequest } from '../database/type';
import { type Issuer } from '../database/entity';
import { type VerifyPhoneRequestDto } from '@app/pages/MobileCodeVerification/types';
import { type VerifyEmailRequestDto } from '@app/pages/LoginEmailCodeVerification/types';

const userRegistrationSchema = yup.object().shape({
  id: yup.string(),
  countryOfIncorporation: yup.string(),
  email: yup.string().email().required(),
  password: yup.string().min(13),
  shortenPhoneNumber: yup.string(),
  phoneNumberCountryCode: yup.string(),
  visaTncAgreed: yup.boolean(),
  wittyTncAgreed: yup.boolean(),
  companyName: yup.string(),
  registrationNumber: yup.string(),
  dateOfRegister: yup.string(),
  tradingName: yup.string(),
  isLegalRepresentative: yup.boolean(),
  isBusinessRegulated: yup.boolean(),
  businessType: yup.mixed(),
  businessCategory: yup.mixed(),
  dryRun: yup.boolean()
});

const otpCodeSceheme: yup.ObjectSchema<VerifyEmailRequestDto | VerifyPhoneRequestDto> = yup
  .object()
  .shape({
    userId: yup.string().required(),
    otpCode: yup
      .string()
      .required()
      .matches(/444444/g, INVALID_OTP_CODE)
  });

const registerUIssuerHandler: HttpHandler = http.post<
  PathParams,
  RegisterIssuerRequest,
  MockRegisterUserResponse
>(
  '*/v1/sme/onboarding/register-issuer',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<HttpRequestResolverExtras<PathParams>, RegisterIssuerRequest>): Promise<
      StrictResponse<MockRegisterUserResponse>
    > => {
      const requestData: RegisterIssuerRequest = await request.json();
      const userData = userRegistrationSchema.validateSync(requestData) as RegisterIssuerRequest;

      const { dryRun, ...rest } = userData;
      const issuer = rest as Issuer;

      if (rest.email) {
        const doesExist = await userService.getById(rest.email);

        if (doesExist) {
          throw new yup.ValidationError('Email is already in-use', null, 'email');
        }
      }

      if (!dryRun) {
        const user = (await userService.add({
          ...issuer,
          id: rest.email ?? 'email does not exist'
        })) as Issuer;

        return HttpResponse.json<MockRegisterUserResponse>({ userId: user.email });
      }

      return HttpResponse.json({});
    }
  )
);

const otpHandler = withErrorHandler(
  async ({
    request
  }: ResponseResolverInfo<HttpRequestResolverExtras<PathParams>, VerifyPhoneRequestDto>): Promise<
    StrictResponse<MockRegisterUserResponse>
  > => {
    const requestData: VerifyPhoneRequestDto = await request.json();

    otpCodeSceheme.validateSync(requestData);
    return HttpResponse.json({});
  }
);

const verifyEmailHandler: HttpHandler = http.post<
  PathParams,
  VerifyEmailRequestDto,
  MockRegisterUserResponse
>('*/v1/sme/onboarding/verify-email', otpHandler);

const verifyPhoneHandler: HttpHandler = http.post<
  PathParams,
  VerifyPhoneRequestDto,
  MockRegisterUserResponse
>('*/v1/sme/onboarding/verify-phone', otpHandler);

export const handlers = [registerUIssuerHandler, verifyEmailHandler, verifyPhoneHandler];
