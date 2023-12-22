import { http, HttpResponse } from 'msw';
import constants from '../constants';
import { type LoginRequest } from 'types';

let INCORRECT_LOGINS_COUNT: number = 0;

export const handlers = [
  http.get('*/v1/sme/onboarding/dictionary', (req: any) => {
    return HttpResponse.json(
      constants.onBoardingConstants.DICTIONARY_COUNTRY_OF_INCORPORATION_RESPONSE,
      {
        status: 200
      }
    );
  }),
  http.get('/v1/sme/onboarding/register-user', () => {
    return HttpResponse.json(
      constants.onBoardingConstants.DICTIONARY_COUNTRY_OF_INCORPORATION_RESPONSE
    );
  }),
  http.post('*/v1/sme/onboarding/authentication/login', ({ request }: any): HttpResponse => {
    const { email, password, captchaToken }: LoginRequest = request.body;

    if (
      email === constants.onBoardingConstants.MOCK_LOGIN_EMAIL &&
      password === constants.onBoardingConstants.MOCK_LOGIN_PASSWORD &&
      captchaToken === constants.onBoardingConstants.MOCK_CAPTCHA_VALUE
    )
      return HttpResponse.json(constants.onBoardingConstants.LOGIN_RESPONSE, {
        status: 200
      });

    INCORRECT_LOGINS_COUNT += 1;

    if (INCORRECT_LOGINS_COUNT > 5 && INCORRECT_LOGINS_COUNT < 10)
      return HttpResponse.json(
        constants.onBoardingConstants.TOO_MANY_INVALID_LOGIN_ATTEMPTS_RESPONSE,
        {
          status: 500
        }
      );

    if (INCORRECT_LOGINS_COUNT > 10)
      return HttpResponse.json(constants.onBoardingConstants.SYSTEM_ERROR_RESPONSE, {
        status: 400
      });

    return HttpResponse.json(constants.onBoardingConstants.INCORRECT_LOGIN_DATA_RESPONSE, {
      status: 400
    });
  })
];
