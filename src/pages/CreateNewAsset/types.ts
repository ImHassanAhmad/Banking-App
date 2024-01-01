import type React from 'react';
import { enumToIndexRecord } from '@app/utils/enum';

export interface UploadButtonProps {
  label: string;
  description: string;
  selectedFile: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // handleUpload: () => void;
}
export enum SocialMediaLinks {
  Reddit = 'reddit',
  Twitter = 'twitter',
  Telegram = 'telegram',
  Whitepaper = 'whitepaper',
  Discord = 'discord'
}

export enum Documents {
  Prospectus = 'prospectus',
  BusinessModel = 'businessModel',
  FinancialModel = 'financialModel',
  BusinessPlan = 'businessPlan',
  ValuationReport = 'valuationReport'
}
export enum CreateNewAssetSteps {
  AssetInformation = 'AssetInformation',
  AssetDocuments = 'AssetDocuments',
  AssetMultiMediaLinks = 'AssetMultiMediaLinks',
  AssetCreationSuccess = 'AssetCreationSuccess'
}

type CreateNewAssetStepsExcludingSuccess = Exclude<
  CreateNewAssetSteps,
  CreateNewAssetSteps.AssetCreationSuccess
>;

export const stepsExcludingSuccess: CreateNewAssetStepsExcludingSuccess[] = [
  CreateNewAssetSteps.AssetInformation,
  CreateNewAssetSteps.AssetDocuments,
  CreateNewAssetSteps.AssetMultiMediaLinks
];
export const CreateNewAssetStepsIndices = enumToIndexRecord(CreateNewAssetSteps);
