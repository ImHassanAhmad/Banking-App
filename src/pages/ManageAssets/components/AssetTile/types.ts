import { type AssetStatus } from '@app/types/types';

export interface AssetsProps {
  assetName: string;
  assetDescription: string;
  assetWebsite: string;
  price: number;
  logo: string;
  status: AssetStatus;
}
