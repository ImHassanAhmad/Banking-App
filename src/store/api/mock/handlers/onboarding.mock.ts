import { http, type HttpHandler, HttpResponse } from 'msw';
import constants from '../constants';

const onBoardDictionaryHandler: HttpHandler = http.get(
  '*/v1/sme/onboarding/dictionary',
  (req: any) => {
    return HttpResponse.json(
      constants.onBoardingConstants.DICTIONARY_COUNTRY_OF_INCORPORATION_RESPONSE,
      {
        status: 200
      }
    );
  }
);

const registerUserHandler: HttpHandler = http.get('/v1/sme/onboarding/register-user', () => {
  return HttpResponse.json(
    constants.onBoardingConstants.DICTIONARY_COUNTRY_OF_INCORPORATION_RESPONSE
  );
});

export const handlers = [onBoardDictionaryHandler, registerUserHandler];
