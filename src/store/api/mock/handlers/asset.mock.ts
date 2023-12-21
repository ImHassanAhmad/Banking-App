import { http, type HttpHandler, HttpResponse, type PathParams, type StrictResponse } from 'msw';
import constants from '../constants';
import {
  type ErrorMessage,
  type AssetLegalDocumentsRequestDto,
  type AssetRequestDto,
  type AssetResponseDto
} from '@app/common/types';
import { type AssetResponse } from '../constants/asset.const';

const createAssetHandler: HttpHandler = http.post<PathParams, AssetRequestDto, AssetResponse>(
  '*/v1/sme/asset/create',
  async ({ request }): Promise<StrictResponse<AssetResponse>> => {
    const assetRequestPayload: AssetRequestDto = request.body ?? ((await request.json()) as any);

    Object.entries(assetRequestPayload).forEach(([key, value]) => {
      if (!value)
        return HttpResponse.json<ErrorMessage>(
          constants.assetConstants.REQUIRED_FIELD_ERROR_RESPONSE(key),
          {
            status: 400
          }
        );
    });

    return HttpResponse.json<AssetResponseDto>(constants.assetConstants.ASSET_CREATE_RESPONSE, {
      status: 200
    });
  }
);

const uploadAssetLegalDocumentHandler: HttpHandler = http.post<
  PathParams,
  AssetLegalDocumentsRequestDto,
  AssetResponse
>('*/v1/sme/asset/legal/upload', async ({ request }): Promise<StrictResponse<AssetResponse>> => {
  const assLegalDocumentsPayload: AssetLegalDocumentsRequestDto =
    request.body ?? ((await request.json()) as any);

  Object.entries(assLegalDocumentsPayload).forEach(([key, value]) => {
    if (!value)
      return HttpResponse.json<ErrorMessage>(
        constants.assetConstants.REQUIRED_FIELD_ERROR_RESPONSE(key),
        {
          status: 400
        }
      );
  });

  return HttpResponse.json<AssetResponseDto>(constants.assetConstants.ASSET_CREATE_RESPONSE);
});

export const handlers = [createAssetHandler, uploadAssetLegalDocumentHandler];
