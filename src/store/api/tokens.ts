import { createApi } from '@reduxjs/toolkit/query/react';
import { smeBaseQuery } from '../utils';
import { type AssetTokenCreationEntity } from '@app/server/database/entity';
import {
  transformErrorResponse,
  type AuthApiError,
  type AssetTokenCreationRequestDTO,
  type AssetTokenCreationResponseDTO
} from '@app/types/types';
export const assetTokenApi = createApi({
  reducerPath: 'assetToken',
  baseQuery: smeBaseQuery,
  tagTypes: ['createAssetToken', 'getAssetToken'],
  endpoints: (builder) => ({
    createAssetToken: builder.mutation<AssetTokenCreationResponseDTO, AssetTokenCreationRequestDTO>(
      {
        query: (body) => ({
          url: '/v1/sme/asset-token/create',
          method: 'POST',
          body
        }),
        transformErrorResponse(baseQueryReturnValue, meta, arg) {
          return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
        }
      }
    ),
    getAssetToken: builder.query<AssetTokenCreationEntity, string>({
      query: (id) => ({
        url: 'v1/sme/asset-token/details/' + id,
        method: 'GET'
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    })
  })
});
export const { useCreateAssetTokenMutation, useGetAssetTokenQuery } = assetTokenApi;
