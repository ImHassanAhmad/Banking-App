import { http, type HttpHandler, HttpResponse, type PathParams, type StrictResponse } from 'msw';
import constants from '../constants';
import { type VerifyLoginOTPRequestDto } from 'types';
import { userService } from '../database/service';
import * as yup from 'yup';
import { type RegisterUserResponseDto, type RegisterUserRequestDto } from '@app/common/types';
import { type AuthingDictionaryResponseType } from '@app/store/api/onboarding';
import {
  type MockVerifySignUpOtpResponse,
  type MockRegisterUserResponse
} from '../constants/onboarding.const';
import withErrorHandler from '../middleware/withErrorHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';

const registerUserScheme: yup.ObjectSchema<RegisterUserRequestDto> = yup.object().shape({
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

const onBoardDictionaryHandler: HttpHandler = http.get<
  PathParams,
  null,
  AuthingDictionaryResponseType
>('*/v1/sme/onboarding/dictionary', (): StrictResponse<AuthingDictionaryResponseType> => {
  return HttpResponse.json<AuthingDictionaryResponseType>(
    constants.onBoardingConstants.DICTIONARY_COUNTRY_OF_INCORPORATION_RESPONSE,
    {
      status: 200
    }
  );
});

const registerUserHandler: HttpHandler = http.post<
  PathParams,
  RegisterUserRequestDto,
  MockRegisterUserResponse
>(
  '*/v1/sme/onboarding/register-user',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      MockRegisterUserResponse
    >): Promise<StrictResponse<MockRegisterUserResponse>> => {
      const registerUserPayload: any = await request.json();
      registerUserScheme.validateSync(registerUserPayload);
      // const {
      //   captchaToken,
      //   email,
      //   countryOfIncorporation,
      //   password,
      //   phoneNumberCountryCode,
      //   registrationNumber,
      //   shortenPhoneNumber
      // } = registerUserPayload;

      // const user: RegisterUserResponseDto = await userService.add({
      //   userId: Date.now().toString(),
      //   captchaToken,
      //   email,
      //   password,
      //   countryOfIncorporation,
      //   phoneNumberCountryCode,
      //   registrationNumber,
      //   shortenPhoneNumber,
      //   verficationToken: '444444',
      //   otpId: '1ee45ddf-957a-4011-a90c-8cad4b415f98'
      // });
      // if (user)
      return HttpResponse.json<RegisterUserResponseDto>({} as any, {
        status: 200
      });
    }
  )
);

const verifyEmailHandler: HttpHandler = http.post<
  PathParams,
  VerifyLoginOTPRequestDto,
  MockVerifySignUpOtpResponse
>(
  '*/v1/sme/onboarding/verify-email',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      VerifyLoginOTPRequestDto
    >): Promise<StrictResponse<MockVerifySignUpOtpResponse>> => {
      const verifyLoginPayload: VerifyLoginOTPRequestDto = await request.json();
      otpCodeSceheme.validateSync(verifyLoginPayload);
      const { otpCode } = verifyLoginPayload;

      const user = await userService.getById(otpCode);
      if (user) {
        return HttpResponse.json(null, {
          status: 200
        });
      }
      throw new yup.ValidationError(constants.commonConstants.INVALID_OTP_CODE, null, 'otpCode');
    }
  )
);

const verifyPhoneHandler: HttpHandler = http.post<
  PathParams,
  VerifyLoginOTPRequestDto,
  MockVerifySignUpOtpResponse
>(
  '*/v1/sme/onboarding/verify-phone',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      VerifyLoginOTPRequestDto
    >): Promise<StrictResponse<MockVerifySignUpOtpResponse>> => {
      const verifyLoginPayload: VerifyLoginOTPRequestDto = await request.json();
      otpCodeSceheme.validateSync(verifyLoginPayload);
      const { otpId } = verifyLoginPayload;

      const user: any = await userService.getById(otpId);
      if (user?.length) {
        return HttpResponse.json(user[0], {
          status: 200
        });
      }

      throw new yup.ValidationError(constants.commonConstants.INVALID_OTP_CODE, null, 'otpCode');
    }
  )
);

export const handlers = [
  onBoardDictionaryHandler,
  registerUserHandler,
  verifyEmailHandler,
  verifyPhoneHandler
];
