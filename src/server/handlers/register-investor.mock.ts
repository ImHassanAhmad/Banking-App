import { http, type HttpHandler, HttpResponse, type PathParams, type StrictResponse } from 'msw';
import * as yup from 'yup';
import { type MockRegisterUserResponse } from '../constants/common.const';
import withErrorHandler from '../middleware/withErrorHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { userService } from '../database/service';
import { type RegisterIssuerRequest } from '../database/type';
import { type Investor } from '../database/entity';
import { type InvestorUserRequestDto } from '@app/common/types';

const userRegistrationSchema = yup.object<InvestorUserRequestDto>().shape({
  email: yup.string().email().required(),
  password: yup.string().min(13).required(),
  shortenPhoneNumber: yup.string().required(),
  phoneNumberCountryCode: yup.string().required(),
  visaTncAgreed: yup.boolean().required(),
  wittyTncAgreed: yup.boolean().required(),
  dryRun: yup.boolean().required()
});

const registerUInvestorHandler: HttpHandler = http.post<
  PathParams,
  RegisterIssuerRequest,
  MockRegisterUserResponse
>(
  '*/v1/sme/onboarding/register-investor',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      InvestorUserRequestDto
    >): Promise<StrictResponse<MockRegisterUserResponse>> => {
      const requestData: InvestorUserRequestDto = await request.json();
      const userData = userRegistrationSchema.validateSync(requestData) as InvestorUserRequestDto;

      const { dryRun, ...rest } = userData;
      const investor = rest as Investor;

      if (rest.email) {
        const doesExist = await userService.getById(rest.email);

        if (doesExist) {
          throw new yup.ValidationError('Email is already in-use', null, 'email');
        }
      }

      if (!dryRun) {
        const user = (await userService.add({
          ...investor,
          id: rest.email ?? 'email does not exist'
        })) as Investor;

        return HttpResponse.json<MockRegisterUserResponse>({ userId: user.email });
      }

      return HttpResponse.json(requestData);
    }
  )
);

export const handlers = [registerUInvestorHandler];
