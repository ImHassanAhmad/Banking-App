import { type OnboardingError, type AccountError } from '@app/common/types';
import { HttpResponse, type PathParams } from 'msw';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { FIELD_ERROR_RESPONSE } from '../constants/login.const';
import { ValidationError } from 'yup';
import { ERROR_MESSAGE_RESPONSE, SYSTEM_ERROR_RESPONSE } from '../constants/common.const';
import { delay } from '../utils';

export class ApiError extends ValidationError {
  status: number;
  name: string;
  constructor(message: string, status: number = 400) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

const parseErrorType = (error: ApiError): OnboardingError => {
  if (/ValidationError/g.test(error.name)) {
    return FIELD_ERROR_RESPONSE(error);
  } else if (error.status === 400) {
    return ERROR_MESSAGE_RESPONSE(error);
  }
  return SYSTEM_ERROR_RESPONSE(error);
};

const withErrorHandler = (resolver: any): any => {
  return async (input: ResponseResolverInfo<HttpRequestResolverExtras<PathParams>>) => {
    await delay(500);
    return resolver(input).catch((error: ApiError) => {
      const errorBody: OnboardingError = parseErrorType(error);
      return HttpResponse.json<OnboardingError>(errorBody, {
        status: (errorBody as AccountError).detail ? 500 : 400
      });
    });
  };
};

export default withErrorHandler;
