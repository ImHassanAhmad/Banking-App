import { http, type HttpHandler, HttpResponse, type PathParams } from 'msw';
import constants from '../constants';
import { type AuthingDictionaryResponseType } from '@app/store/api/onboarding';
import { type RegisterUserRequestDto, type RegisterUserResponseDto } from '@app/common/types';

const onBoardDictionaryHandler: HttpHandler = http.get<
  PathParams,
  null,
  AuthingDictionaryResponseType
>('*/v1/sme/onboarding/dictionary', () => {
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
>('*/v1/sme/onboarding/register-user', () => {
  return HttpResponse.json<RegisterUserResponseDto>(
    constants.onBoardingConstants.REGISTER_USER_RESPONSE
  );
});

export const handlers = [onBoardDictionaryHandler, registerUserHandler];
