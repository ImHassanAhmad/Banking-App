import { createApi } from '@reduxjs/toolkit/query/react';
import { smeBaseQuery } from '../utils';
import {
  transformErrorResponse,
  type AuthApiError,
  type AssetResponseDto,
  type AssetRequestDto,
  type AssetLegalDocumentsRequestDto
} from '@app/common/types';

export const assetApi = createApi({
  reducerPath: 'asset',
  baseQuery: smeBaseQuery,
  tagTypes: ['createAsset'],
  endpoints: (builder) => ({
    createAsset: builder.mutation<AssetResponseDto, AssetRequestDto>({
      query: (body) => ({
        url: 'v1/sme/asset/create',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    uploadAssetLegalDocuments: builder.mutation<AssetResponseDto, AssetLegalDocumentsRequestDto>({
      query: (body) => ({
        url: 'v1/sme/asset/legal/upload',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    })
  })
});

export const { useCreateAssetMutation } = assetApi;
