import { http, type HttpHandler, HttpResponse, type PathParams, type StrictResponse } from 'msw';
import * as yup from 'yup';
import withErrorHandler from '../middleware/withErrorHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { issuerDetailsService } from '../database/service';
import type { PostOnboardingRequest } from '../database/type';
import type { IssuerDetailsEntity } from '../database/entity';

const postOnboardingSchema = yup.object().shape({
  companyStructure: yup.lazy((value) => {
    if (value != null && typeof value === 'object') {
      return yup.object().shape({
        ubos: yup.array().of(
          yup.object().shape({
            type: yup.string().required('Type is required'),
            name: yup.string().required('Name is required'),
            email: yup.string().email('Invalid email format').required('Email is required')
          })
        )
      });
    }
    return yup.mixed();
  }),
  legalRepresentatives: yup.lazy((value) => {
    if (value != null && typeof value === 'object') {
      return yup.object().shape({
        legalRepresentative: yup.array().of(
          yup.object().shape({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Invalid email format').required('Email is required'),
            phone: yup.string().required('Phone number is required')
          })
        )
      });
    }
    return yup.mixed();
  }),
  kyc: yup.lazy((value) => {
    if (value != null && typeof value === 'object') {
      return yup.object().shape({
        form: yup.object().shape({
          name: yup.string().required('Name is required'),
          email: yup.string().email('Invalid email format').required('Email is required'),
          phone: yup.string().required('Phone number is required'),
          role: yup.string().required('Role is required')
        })
      });
    }
    return yup.mixed();
  })
});

const postOnboardingHandler: HttpHandler = http.post<
  PathParams,
  PostOnboardingRequest,
  IssuerDetailsEntity
>(
  '*/v1/sme/onboarding/issuer-details',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<HttpRequestResolverExtras<PathParams>, PostOnboardingRequest>): Promise<
      StrictResponse<IssuerDetailsEntity>
    > => {
      const requestData: PostOnboardingRequest = await request.json();
      const issuerDetails = postOnboardingSchema.validateSync(requestData) as PostOnboardingRequest;

      const { companyStructure, legalRepresentatives, kyc, id } = issuerDetails;

      let response;

      if (companyStructure) {
        const doExist = await issuerDetailsService.getById(id);
        if (doExist) response = await issuerDetailsService.update(id, { id, companyStructure });
        else response = await issuerDetailsService.add({ id, companyStructure, completed: false });
      }

      if (legalRepresentatives) {
        response = await issuerDetailsService.update(id, {
          id,
          legalRepresentatives
        });
      }

      if (kyc) {
        response = await issuerDetailsService.update(id, {
          id,
          kyc,
          completed: true
        });
      }

      return HttpResponse.json<IssuerDetailsEntity>(response);
    }
  )
);

const getPostOnboardingDetailsHandler: HttpHandler = http.get<
  PathParams,
  null,
  IssuerDetailsEntity
>('*/v1/sme/onboarding/issuer-details/:id', async ({ params }) => {
  const { id } = params;

  if (!id) {
    throw new yup.ValidationError('Id is required', null, 'id');
  } else {
    const response = await issuerDetailsService.getById(id as string);
    return HttpResponse.json<IssuerDetailsEntity>(response);
  }
});

export const handlers = [postOnboardingHandler, getPostOnboardingDetailsHandler];
