import { createApi } from '@reduxjs/toolkit/query/react';
import { smeBaseQuery } from '../utils';
import {
  transformErrorResponse,
  type AuthApiError,
  type AssetResponseDto,
  type AssetInformationRequestDto,
  type AssetDocumentsRequestDto,
  type AssetSocialMediaRequestDto
} from '@app/common/types';

export const assetApi = createApi({
  reducerPath: 'asset',
  baseQuery: smeBaseQuery,
  tagTypes: ['createAsset'],
  endpoints: (builder) => ({
    createAsset: builder.mutation<AssetResponseDto, AssetInformationRequestDto>({
      query: (body) => {
        const { logo } = body;
        const formData: FormData = new FormData();
        if (logo) formData.append('logo', logo);
        formData.append('data', JSON.stringify(body));
        return {
          url: 'v1/sme/asset/create',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data;'
          },
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
        formData.append('business_model', businessModel);
        formData.append('business_plan', businessPlan);
        formData.append('financial_model', financialModel);
        formData.append('prospectus', prospectus);
        formData.append('valuation_report', valuationReport);
        return {
          url: `v1/sme/asset/upload/documents`,
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data;'
          },
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
    })
  })
});

export const {
  useCreateAssetMutation,
  useUploadAssetLegalDocumentsMutation,
  useAddSocialMediaLinksMutation
} = assetApi;
