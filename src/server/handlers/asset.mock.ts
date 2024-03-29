import { http, type HttpHandler, HttpResponse, type PathParams, type StrictResponse } from 'msw';
import {
  type AssetSocialMediaRequestDto,
  type AssetDocumentsRequestDto,
  type AssetInformationRequestDto,
  type AssetResponseDto,
  type AssetListResponse,
  AssetStatus
} from '@app/types/types';
import withErrorHandler from '../middleware/withErrorHandler';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { type MockAssetListResponse, type MockAssetResponse } from '../constants/common.const';
import { assetService, tokensService } from '../database/service';
import * as yup from 'yup';
import { type AssetEntity, type AssetInformation } from '../database/entity';
import { Documents } from '@app/pages/CreateNewAsset/types';

const assetSchema = yup.object<AssetInformationRequestDto>().shape({
  assetName: yup.string().required(),
  assetDescription: yup.string().required(),
  assetWebsite: yup.string().required(),
  logo: yup.mixed().required()
});

const assetDocumentsSchema = yup.object<AssetDocumentsRequestDto>().shape({
  assetId: yup.string().required(),
  prospectus: yup.mixed().required(),
  businessModel: yup.mixed().required(),
  financialModel: yup.mixed().required(),
  businessPlan: yup.mixed().required(),
  valuationReport: yup.mixed().required()
});

const assetValidSocialLinksSchema = yup.object<AssetSocialMediaRequestDto>().shape({
  assetId: yup.string().required(),
  reddit: yup.string().url(),
  twitter: yup.string().url(),
  telegram: yup.string().url(),
  whitepaper: yup.string().url(),
  discord: yup.string().url()
});

const createAssetHandler: HttpHandler = http.post<PathParams, any, MockAssetResponse>(
  '*/v1/sme/asset/create',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      AssetInformationRequestDto
    >): Promise<StrictResponse<MockAssetResponse>> => {
      const formData: FormData = await request.formData();
      const assetRequestPayload: AssetInformationRequestDto = {
        ...JSON.parse(formData.get('data') as string),
        logo: formData.get('logo') as File
      };

      assetSchema.validateSync(assetRequestPayload);

      const id: string = Math.random().toString().split('.')[1];

      (await assetService.add({
        ...assetRequestPayload,
        logo: assetRequestPayload.logo.name,
        status: AssetStatus.Created,
        id
      })) as AssetInformation;

      return HttpResponse.json<AssetResponseDto>(
        { assetId: id },
        {
          status: 200
        }
      );
    }
  )
);

const uploadAssetLegalDocumentHandler: HttpHandler = http.post<
  PathParams,
  AssetDocumentsRequestDto,
  MockAssetResponse
>(
  '*/v1/sme/asset/upload/documents',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      AssetDocumentsRequestDto
    >): Promise<StrictResponse<MockAssetResponse>> => {
      const formData: FormData = await request.formData();

      const assetDocumentsPayload: AssetDocumentsRequestDto = {
        assetId: formData.get('assetId') as string,
        businessModel: formData.get(Documents.BusinessModel) as File,
        businessPlan: formData.get(Documents.BusinessPlan) as File,
        financialModel: formData.get(Documents.FinancialModel) as File,
        prospectus: formData.get(Documents.Prospectus) as File,
        valuationReport: formData.get(Documents.ValuationReport) as File
      };

      assetDocumentsSchema.validateSync(assetDocumentsPayload);

      const {
        assetId,
        businessModel,
        businessPlan,
        financialModel,
        prospectus,
        valuationReport
      }: AssetDocumentsRequestDto = assetDocumentsPayload;

      await assetService.update(
        assetId as string,
        {
          id: assetId as string,
          businessModel: businessModel.name,
          businessPlan: businessPlan.name,
          financialModel: financialModel.name,
          prospectus: prospectus.name,
          valuationReport: valuationReport.name
        } as any
      );

      return HttpResponse.json<AssetResponseDto>({ assetId });
    }
  )
);

const addSocialMediaLinksHandler: HttpHandler = http.post<
  PathParams,
  AssetSocialMediaRequestDto,
  MockAssetResponse
>(
  '*/v1/sme/asset/social/links',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<
      HttpRequestResolverExtras<PathParams>,
      AssetSocialMediaRequestDto
    >): Promise<StrictResponse<MockAssetResponse>> => {
      const assetSocialMediaRequest: AssetSocialMediaRequestDto = await request.json();

      assetValidSocialLinksSchema.validateSync(assetSocialMediaRequest);

      const { assetId }: AssetSocialMediaRequestDto = assetSocialMediaRequest;

      await assetService.update(assetId as string, {
        ...assetSocialMediaRequest,
        id: assetId as string
      });

      return HttpResponse.json<AssetResponseDto>({ assetId });
    }
  )
);

const listAssetHandler: HttpHandler = http.get<PathParams, any, MockAssetListResponse>(
  '*/v1/sme/asset/list',
  withErrorHandler(async (): Promise<StrictResponse<MockAssetListResponse>> => {
    const assetList: AssetListResponse[] = (await assetService.getAll()) as AssetListResponse[];
    const tokensList = await tokensService.getAll();
    const assets = await Promise.all(
      assetList.map((asset) => {
        const index: number = tokensList.findIndex((_) => _.assetId === asset.id);
        if (index > -1) asset = { ...asset, token: tokensList[index] } as any;
        return asset;
      })
    );
    return HttpResponse.json<AssetListResponse[]>(assets);
  })
);

const getAssetDetailsHandler: HttpHandler = http.get<PathParams, null, AssetEntity>(
  '*/v1/sme/asset/details/:id',
  async ({ params }) => {
    const { id } = params;
    // Validate if the ID is provided in the request parameters
    if (!id) {
      throw new yup.ValidationError('ID is required', null, 'id');
    } else {
      // Fetch the asset token details from the database using the service
      const assetDetails = await assetService.getById(id as string);
      // If the token with the given ID is not found, you can handle it accordingly
      if (!assetDetails) {
        throw new yup.ValidationError('Asset not found', null, 'id');
      }
      // Return the fetched asset token details as a response
      return HttpResponse.json<AssetEntity>(assetDetails);
    }
  }
);

export const handlers = [
  createAssetHandler,
  uploadAssetLegalDocumentHandler,
  addSocialMediaLinksHandler,
  listAssetHandler,
  getAssetDetailsHandler
];
