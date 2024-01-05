import { createApi } from '@reduxjs/toolkit/query/react';
import { smeBaseQuery } from '../utils';
import {
  transformErrorResponse,
  type AuthApiError,
  type AssetResponseDto,
  type AssetInformationRequestDto,
  type AssetDocumentsRequestDto,
  type AssetSocialMediaRequestDto,
  type AssetListResponse
} from '@app/common/types';
import { Documents } from '@app/pages/CreateNewAsset/types';

export const assetApi = createApi({
  reducerPath: 'asset',
  baseQuery: smeBaseQuery,
  tagTypes: ['createAsset'],
  endpoints: (builder) => ({
    createAsset: builder.mutation<AssetResponseDto, AssetInformationRequestDto>({
      query: (body) => {
        const { assetName, assetDescription, assetWebsite, logo } = body;
        const formData: FormData = new FormData();
        formData.append('logo', logo);
        formData.append('data', JSON.stringify({ assetName, assetDescription, assetWebsite }));
        return {
          url: 'v1/sme/asset/create',
          method: 'POST',
          body: formData
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    uploadAssetLegalDocuments: builder.mutation<AssetResponseDto, AssetDocumentsRequestDto>({
      query: (body) => {
        const {
          assetId,
          businessModel,
          businessPlan,
          financialModel,
          prospectus,
          valuationReport
        } = body;
        const formData: FormData = new FormData();
        if (assetId) formData.append('assetId', assetId);
        formData.append(Documents.BusinessModel, businessModel);
        formData.append(Documents.BusinessPlan, businessPlan);
        formData.append(Documents.FinancialModel, financialModel);
        formData.append(Documents.Prospectus, prospectus);
        formData.append(Documents.ValuationReport, valuationReport);
        return {
          url: `v1/sme/asset/upload/documents`,
          method: 'POST',
          body: formData
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    addSocialMediaLinks: builder.mutation<AssetResponseDto, AssetSocialMediaRequestDto>({
      query: (body) => ({
        url: 'v1/sme/asset/social/links',
        method: 'POST',
        body
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    }),
    listAssets: builder.query<AssetListResponse[], void>({
      query: () => ({
        url: 'v1/sme/asset/list',
        method: 'GET'
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return transformErrorResponse(baseQueryReturnValue as AuthApiError, meta, arg);
      }
    })
  })
});

export const {
  useCreateAssetMutation,
  useUploadAssetLegalDocumentsMutation,
  useAddSocialMediaLinksMutation,
  useListAssetsQuery
} = assetApi;
