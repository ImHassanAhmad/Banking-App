import { http, type HttpHandler, HttpResponse, type PathParams, type StrictResponse } from 'msw';
import { type VerifyLoginOTPRequestDto } from 'types';
import * as yup from 'yup';
import { type RegisterUserRequestDto } from '@app/common/types';
import { type MockRegisterUserResponse } from '../constants/common.const';
import withErrorHandler from '../middleware/withErrorHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';

// const dbhandler = new DatabaseService<UserEntity>(database.users);

const userRegistrationSchema: yup.ObjectSchema<RegisterUserRequestDto> = yup.object().shape({
  countryOfIncorporation: yup.mixed(),
  email: yup.string().email().required(),
  password: yup.string().min(13).required(),
  shortenPhoneNumber: yup.string().min(5).required(),
  phoneNumberCountryCode: yup.string().min(2).required(),
  visaTncAgreed: yup.boolean(),
  wittyTncAgreed: yup.boolean(),
  companyName: yup.string().required(),
  registrationNumber: yup.string().required(),
  dateOfRegister: yup.string().required(),
  tradingName: yup.string().required(),
  isLegalRepresentative: yup.boolean().required(),
  captchaToken: yup.string(),
  businessType: yup.mixed(),
  businessCategory: yup.mixed(),
  dryRun: yup.boolean().required()
});

const otpCodeSceheme: yup.ObjectSchema<VerifyLoginOTPRequestDto> = yup.object().shape({
  otpId: yup.string().required(),
  otpCode: yup.string().required()
});

const registerUIssuerHandler: HttpHandler = http.post<
  PathParams,
  RegisterUserRequestDto,
  MockRegisterUserResponse
>(
  '*/v1/sme/onboarding/register-issuer',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      RegisterUserRequestDto
    >): Promise<StrictResponse<MockRegisterUserResponse>> => {
      const requestData: RegisterUserRequestDto = await request.json();
      userRegistrationSchema.validateSync(requestData);

      // if (requestData.password) {
      //   const user = await dbhandler.add({
      //     ...requestData,
      //     verficationToken: '444444',
      //     otpId: '1ee45ddf-957a-4011-a90c-8cad4b415f98'
      //   });

      //   return HttpResponse.json(user, {
      //     status: 200
      //   });
      // } else {
      return HttpResponse.json<MockRegisterUserResponse>(
        { userId: '' },
        {
          status: 200
        }
      );
    }
  )
  // }
);

const verifyEmailHandler: HttpHandler = http.post<
  PathParams,
  VerifyLoginOTPRequestDto,
  MockRegisterUserResponse
>(
  '*/v1/sme/onboarding/verify-email',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      VerifyLoginOTPRequestDto
    >): Promise<StrictResponse<MockRegisterUserResponse>> => {
      const requestData: VerifyLoginOTPRequestDto = await request.json();

      otpCodeSceheme.validateSync(requestData);
      // const user: RegisterUserRequestBody[] | null = await dbhandler.getAll({
      //   verficationToken: otpCode
      // });

      // if (user && user.length > 0) {
      //   return HttpResponse.json(user[0], {
      //     status: 200
      //   });
      // } else {
      return HttpResponse.json<MockRegisterUserResponse>(
        { userId: '' },
        {
          status: 400
        }
      );
      // }
    }
  )
);

const verifyPhoneHandler: HttpHandler = http.post<
  PathParams,
  VerifyLoginOTPRequestDto,
  MockRegisterUserResponse
>(
  '*/v1/sme/onboarding/verify-phone',
  async ({
    request
  }: ResponseResolverInfo<
    HttpRequestResolverExtras<PathParams>,
    VerifyLoginOTPRequestDto
  >): Promise<StrictResponse<MockRegisterUserResponse>> => {
    const requestData: VerifyLoginOTPRequestDto = await request.json();

    otpCodeSceheme.validateSync(requestData);
    // const { otpCode } = requestData;

    // const user = await dbhandler.getAll({ verficationToken: otpCode });

    // if (user && user.length > 0) {
    //   return HttpResponse.json<RegisterUserRequestBody>(user[0], {
    //     status: 200
    //   });
    // } else {
    return HttpResponse.json<MockRegisterUserResponse>(
      { userId: '' },
      {
        status: 400
      }
    );
    // }
  }
);

export const handlers = [registerUIssuerHandler, verifyEmailHandler, verifyPhoneHandler];
