import { type AssetResponseDto, type OnboardingError } from '@app/common/types';

export const ASSET_CREATE_RESPONSE: AssetResponseDto = {
  assetId: '1ee45ddf-957a-4011-a90c-8cad4b415f98'
};

export type MockAssetCreationResponse = AssetResponseDto | OnboardingError;
