import { http, type HttpHandler, HttpResponse, type PathParams, type StrictResponse } from 'msw';
import * as yup from 'yup';
import withErrorHandler from '../middleware/withErrorHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import type { PostOnboardingRequest } from '@app/server/database/type';
import type { IssuerDetailsEntity } from '@app/server/database/entity';

const issuerOnboardingSchema = yup.object().shape({
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
        }),
        uploadedFiles: yup.object().shape({
          passport: yup.string().required('Passport is required'),
          national_id: yup.string().required('National Id is required'),
          residence_proof: yup.string().required('Residence proof is required'),
          profile_picture: yup.string().required('Profile picture is required')
        })
      });
    }
    return yup.mixed();
  })
});

const issuerOnboardingHandler: HttpHandler = http.post<
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
      const issuerDetails = issuerOnboardingSchema.validateSync(
        requestData
      ) as PostOnboardingRequest;

      const { companyStructure, legalRepresentatives, kyc, id } = issuerDetails;

      let response: IssuerDetailsEntity;

      if (companyStructure) {
        response = { id, companyStructure };
      } else if (legalRepresentatives) {
        response = {
          id,
          legalRepresentatives
        };
      } else if (kyc) {
        response = {
          id,
          kyc: {
            form: kyc.form,
            uploadedFiles: {
              passport: kyc.uploadedFiles.passport ?? 'dummy',
              national_id: kyc.uploadedFiles.national_id ?? 'dummy',
              residence_proof: kyc.uploadedFiles.residence_proof ?? 'dummy',
              profile_picture: kyc.uploadedFiles.profile_picture ?? 'dummy'
            }
          },
          completed: true
        };
      } else {
        throw new yup.ValidationError('Incorrect request body', null);
      }

      return HttpResponse.json<IssuerDetailsEntity>(response);
    }
  )
);

const getIssuerOnboardingDetailsHandler: HttpHandler = http.get<
  PathParams,
  null,
  IssuerDetailsEntity | null
>('*/v1/sme/onboarding/issuer-details/:id', async ({ params }) => {
  const { id } = params;

  if (!id) {
    throw new yup.ValidationError('Id is required', null, 'id');
  } else {
    const response: IssuerDetailsEntity = {
      id: id as string,
      completed: false,
      companyStructure: undefined,
      legalRepresentatives: undefined,
      kyc: {
        form: null,
        uploadedFiles: {
          passport: '',
          national_id: '',
          residence_proof: '',
          profile_picture: ''
        }
      }
    };
    if (response) return HttpResponse.json<IssuerDetailsEntity>(response);
    else return HttpResponse.json(null, { status: 400 });
  }
});

export const handlers = [issuerOnboardingHandler, getIssuerOnboardingDetailsHandler];
