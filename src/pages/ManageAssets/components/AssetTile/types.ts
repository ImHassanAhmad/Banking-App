import { type AssetStatus } from '@app/common/types';

export interface AssetsProps {
  assetName: string;
  assetDescription: string;
  assetWebsite: string;
  price: number;
  logo: string;
  status: AssetStatus;
}
