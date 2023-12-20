import { http, type HttpHandler, HttpResponse, type PathParams, type StrictResponse } from 'msw';
import constants from '../constants';
import { type VerifyLoginOTPRequestDto } from 'types';
import { DatabaseService, Entity } from '../../utils/DatabaseService';
import * as yup from 'yup';
import {
  type FieldErrors,
  type ErrorMessage,
  type RegisterUserRequestBody
} from '@app/common/types';

const dbhandler = new DatabaseService<Entity, RegisterUserRequestBody>(Entity.Issuer);

const userRegistrationSchema = yup.object().shape({
  captchaToken: yup.string(),
  email: yup.string().email('must be a valid email'),
  password: yup.string().min(13, 'Password should be at least 13 chracters'),
  countryOfIncorporation: yup.string(),
  phoneNumberCountryCode: yup.string(),
  registrationNumber: yup.string(),
  shortenPhoneNumber: yup.string()
});

const onBoardDictionaryHandler: HttpHandler = http.get('*/v1/sme/onboarding/dictionary', () => {
  return HttpResponse.json(
    constants.onBoardingConstants.DICTIONARY_COUNTRY_OF_INCORPORATION_RESPONSE,
    {
      status: 200
    }
  );
});

const registerUserHandler: HttpHandler = http.post<
  PathParams,
  RegisterUserRequestBody,
  RegisterUserRequestBody | ErrorMessage
>(
  '*/v1/sme/onboarding/register-user',
  async ({ request }): Promise<StrictResponse<RegisterUserRequestBody | ErrorMessage>> => {
    const requestData = await request.json();

    if (!requestData) {
      // Handle the case where the JSON parsing failed or the body is empty
      return HttpResponse.json<ErrorMessage>(
        { error: { errorMessage: 'Invalid request body' } },
        {
          status: 500
        }
      );
    }
    await userRegistrationSchema.validate(requestData, { abortEarly: false });

    if (requestData.password) {
      const user = await dbhandler.add({
        ...requestData,
        verficationToken: '444444',
        otpId: '1ee45ddf-957a-4011-a90c-8cad4b415f98'
      });

      return HttpResponse.json(user, {
        status: 200
      });
    } else {
      return HttpResponse.json<ErrorMessage>(
        { error: { errorMessage: 'Invalid request body' } },
        {
          status: 200
        }
      );
    }
  }
);

const verifyEmailHandler: HttpHandler = http.post<
  PathParams,
  VerifyLoginOTPRequestDto,
  RegisterUserRequestBody | FieldErrors
>(
  '*/v1/sme/onboarding/verify-email',
  async ({ request }): Promise<StrictResponse<RegisterUserRequestBody | FieldErrors>> => {
    const requestData = await request.json();
    const { otpCode } = requestData;

    const user: RegisterUserRequestBody[] | null = await dbhandler.getAll({
      verficationToken: otpCode
    });

    if (user && user.length > 0) {
      return HttpResponse.json(user[0], {
        status: 200
      });
    } else {
      return HttpResponse.json<FieldErrors>(constants.loginConstants.VERIFY_LOGIN_ERROR_RESPONSE, {
        status: 400
      });
    }
  }
);

const verifyPhoneHandler: HttpHandler = http.post<
  PathParams,
  VerifyLoginOTPRequestDto,
  RegisterUserRequestBody | FieldErrors
>(
  '*/v1/sme/onboarding/verify-phone',
  async ({ request }): Promise<StrictResponse<RegisterUserRequestBody | FieldErrors>> => {
    const requestData = await request.json();
    const { otpCode } = requestData;

    const user = await dbhandler.getAll({ verficationToken: otpCode });

    if (user && user.length > 0) {
      return HttpResponse.json<RegisterUserRequestBody>(user[0], {
        status: 200
      });
    } else {
      return HttpResponse.json<FieldErrors>(constants.loginConstants.VERIFY_LOGIN_ERROR_RESPONSE, {
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
