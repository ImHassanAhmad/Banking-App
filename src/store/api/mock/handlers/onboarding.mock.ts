import { http, type HttpHandler, HttpResponse, type PathParams, type StrictResponse } from 'msw';
import constants from '../constants';
import { type AuthingDictionaryResponseType } from '@app/store/api/onboarding';
import { type RegisterUserRequestDto, type RegisterUserResponseDto } from '@app/common/types';
import * as yup from 'yup';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { type MockRegisterUserResponse } from '../constants/onboarding.const';
import withErrorHandler from '../middleware/withErrorHandler';

const registerUserScheme: yup.ObjectSchema<RegisterUserRequestDto> = yup.object({
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
  captchaToken: yup.string(),
  dryRun: yup.boolean().required()
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
  RegisterUserResponseDto
>(
  '*/v1/sme/onboarding/register-user',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<HttpRequestResolverExtras<PathParams>, MockRegisterUserResponse>) => {
      const registerUserPayload: RegisterUserRequestDto =
        request.body ?? ((await request.json()) as any);
      registerUserScheme.validateSync(registerUserPayload);
      return HttpResponse.json<RegisterUserResponseDto>(
        constants.onBoardingConstants.MOCK_USER_REGISTER_RESPONSE
      );
    }
  )
);

export const handlers = [onBoardDictionaryHandler, registerUserHandler];
