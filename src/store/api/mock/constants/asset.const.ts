import { type ErrorMessage, type AssetResponseDto } from '@app/common/types';

export const ASSET_CREATE_RESPONSE: AssetResponseDto = {
  assetId: '1ee45ddf-957a-4011-a90c-8cad4b415f98'
};

export const REQUIRED_FIELD_ERROR_RESPONSE = (field: string): ErrorMessage => {
  field = field.replace(/([A-Z])/g, ' $1');
  field = field.charAt(0).toUpperCase() + field.slice(1);
  return {
    error: { errorMessage: `${field} is a required field` }
  };
};

export type AssetResponse = AssetResponseDto | ErrorMessage;
