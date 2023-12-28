import { http, type HttpHandler, HttpResponse, type PathParams, type StrictResponse } from 'msw';
import constants from '../constants';
import {
  type AssetLegalDocumentsRequestDto,
  type AssetRequestDto,
  type AssetResponseDto
} from '@app/common/types';
import withErrorHandler from '../middleware/withErrorHandler';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { ValidationError } from 'yup';
import { type MockAssetCreationResponse } from '../constants/common.const';

const createAssetHandler: HttpHandler = http.post<
  PathParams,
  AssetRequestDto,
  MockAssetCreationResponse
>(
  '*/v1/sme/asset/create',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<HttpRequestResolverExtras<PathParams>, AssetRequestDto>): Promise<
      StrictResponse<MockAssetCreationResponse>
    > => {
      const assetRequestPayload: AssetRequestDto = await request.json();

      Object.entries(assetRequestPayload).forEach(([key, value]) => {
        if (!value)
          throw new ValidationError(constants.commonConstants.FIELD_REQUIRED(key), null, key);
      });

      return HttpResponse.json<AssetResponseDto>(
        { assetId: '' },
        {
          status: 200
        }
      );
    }
  )
);

const uploadAssetLegalDocumentHandler: HttpHandler = http.post<
  PathParams,
  AssetLegalDocumentsRequestDto,
  MockAssetCreationResponse
>(
  '*/v1/sme/asset/legal/upload',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      AssetLegalDocumentsRequestDto
    >): Promise<StrictResponse<MockAssetCreationResponse>> => {
      const assLegalDocumentsPayload: AssetLegalDocumentsRequestDto = await request.json();

      Object.entries(assLegalDocumentsPayload).forEach(([key, value]) => {
        if (!value)
          throw new ValidationError(constants.commonConstants.FIELD_REQUIRED(key), null, key);
      });

      return HttpResponse.json<AssetResponseDto>({ assetId: '' });
    }
  )
);

export const handlers = [createAssetHandler, uploadAssetLegalDocumentHandler];
