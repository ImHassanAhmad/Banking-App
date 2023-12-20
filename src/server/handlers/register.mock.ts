import { http, type HttpHandler, HttpResponse } from 'msw';
import constants from '../constants';
import { type VerifyLoginOTPRequestDto } from 'types';
import dbhandler from '../../utils/dbHandler';
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

const registerUserHandler: HttpHandler = http.post(
  '*/v1/sme/onboarding/register-user',
  async ({ request }) => {
    const requestData: any = await request.json();
    const {
      captchaToken,
      email,
      countryOfIncorporation,
      password,
      phoneNumberCountryCode,
      registrationNumber,
      shortenPhoneNumber
    } = requestData;
    if (
      captchaToken &&
      email &&
      password &&
      countryOfIncorporation &&
      phoneNumberCountryCode &&
      registrationNumber &&
      shortenPhoneNumber
    ) {
      const user: any = await dbhandler.add('users', {
        captchaToken,
        email,
        password,
        countryOfIncorporation,
        phoneNumberCountryCode,
        registrationNumber,
        shortenPhoneNumber,
        verficationToken: '444444',
        otpId: '1ee45ddf-957a-4011-a90c-8cad4b415f98'
      });
      return HttpResponse.json(user, {
        status: 200
      });
    } else {
      return HttpResponse.json(
        constants.onBoardingConstants.DICTIONARY_COUNTRY_OF_INCORPORATION_RESPONSE,
        {
          status: 400
        }
      );
    }
  }
);

const verifyEmailHandler: HttpHandler = http.post(
  '*/v1/sme/onboarding/verify-email',
  async ({ request }): Promise<HttpResponse> => {
    const requstData: VerifyLoginOTPRequestDto = (await request.json()) as VerifyLoginOTPRequestDto;
    const { otpCode } = requstData;

    const user: any = await dbhandler.getAll('users', `?verficationToken=${otpCode}`);
    console.log(user);
    if (user.length > 0) {
      return HttpResponse.json(user[0], {
        status: 200
      });
    } else {
      return HttpResponse.json(constants.loginConstants.VERIFY_LOGIN_ERROR_RESPONSE, {
        status: 400
      });
    }
  }
);

const verifyPhoneHandler: HttpHandler = http.post(
  '*/v1/sme/onboarding/verify-phone',
  async ({ request }): Promise<HttpResponse> => {
    const requstData: VerifyLoginOTPRequestDto = (await request.json()) as VerifyLoginOTPRequestDto;
    const { otpCode } = requstData;

    const user: any = await dbhandler.getAll('users', `?verficationToken=${otpCode}`);
    console.log(user);
    if (user.length > 0) {
      return HttpResponse.json(user[0], {
        status: 200
      });
    } else {
      return HttpResponse.json(constants.loginConstants.VERIFY_LOGIN_ERROR_RESPONSE, {
        status: 400
      });
    }
  }
);

export const handlers = [
  onBoardDictionaryHandler,
  registerUserHandler,
  verifyEmailHandler,
  verifyPhoneHandler
];
