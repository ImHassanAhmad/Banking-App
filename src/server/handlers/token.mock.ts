import { type HttpHandler, HttpResponse, type PathParams, type StrictResponse, http } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { type AssetTokenCreationEntity } from '../database/entity';
import withErrorHandler from '../middleware/withErrorHandler';
import { type ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { type HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { tokensService } from '../database/service';
import { type AssetTokenRequest } from '../database/type';
const assetTokenCreationSchema = yup.object().shape({
  tokenName: yup.string().required('Name is required'),
  tokenSymbol: yup.string().required('Symbol is required'),
  totalSupply: yup.number().nullable().positive().required('Supply is required'),
  numberOfDecimal: yup.number().nullable().integer().min(0).required('Decimal number required'),
  pausable: yup.boolean().required(),
  mintable: yup.boolean().required(),
  burnable: yup.boolean().required(),
  capped: yup.boolean().required(),
  currency: yup.string().required('Amount is required'),
  buyPrice: yup.number().nullable().positive().required('Buy Price is required'),
  uploadLogo: yup.mixed().nullable() // Assuming the uploadLogo field can be of any type and is nullable
});
const createAssetTokenHandler: HttpHandler = http.post<
  PathParams,
  AssetTokenCreationEntity,
  AssetTokenCreationEntity
>(
  '*/v1/sme/asset-token/create',
  withErrorHandler(
    async ({
      request
    }: ResponseResolverInfo<HttpRequestResolverExtras<PathParams>, AssetTokenRequest>): Promise<
      StrictResponse<AssetTokenRequest>
    > => {
      const requestData: AssetTokenCreationEntity = await request.json();
      // Validate against the schema
      assetTokenCreationSchema.validateSync(requestData);

      let tokenWithId: AssetTokenCreationEntity;

      // Check if ID is provided in the requestData
      if (requestData.id) {
        // If ID is provided, update the existing asset token
        const updatedAssetToken = await tokensService.update(requestData.id, requestData);
        tokenWithId = updatedAssetToken; // Assuming the updatedAssetToken has the ID
      } else {
        // Generate an ID for the asset token using uuid
        const id: string = uuidv4();
        // Create a new asset token with the generated ID and modified values
        tokenWithId = { ...requestData, id };
        // Add the new asset token to the database
        const newAssetToken = await tokensService.add(tokenWithId);
        tokenWithId = newAssetToken; // Assuming the newAssetToken has the ID
      }
      return HttpResponse.json<AssetTokenCreationEntity>(tokenWithId);
    }
  )
);
const getAssetTokenDetailsHandler: HttpHandler = http.get<
  PathParams,
  null,
  AssetTokenCreationEntity
>('*/v1/sme/asset-token/details/:id', async ({ params }) => {
  const { id } = params;
  // Validate if the ID is provided in the request parameters
  if (!id) {
    throw new yup.ValidationError('ID is required', null, 'id');
  } else {
    // Fetch the asset token details from the database using the service
    const tokenDetails = await tokensService.getById(id as string);
    // If the token with the given ID is not found, you can handle it accordingly
    if (!tokenDetails) {
      throw new yup.ValidationError('Asset token not found', null, 'id');
    }
    // Return the fetched asset token details as a response
    return HttpResponse.json<AssetTokenCreationEntity>(tokenDetails);
  }
});
export const handlers = [createAssetTokenHandler, getAssetTokenDetailsHandler];
