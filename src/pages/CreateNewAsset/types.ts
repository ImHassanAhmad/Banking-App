import type React from 'react';
import { enumToIndexRecord } from '@app/utils/enum';

export interface UploadButtonProps {
  label: string;
  description: string;
  selectedFile: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
}
export enum SocialMediaLinks {
  Reddit = 'Reddit',
  Twitter = 'Twitter',
  Telegram = 'Telegram',
  Whitepaper = 'Whitepaper',
  Discord = 'Discord'
}

export enum Documents {
  UploadProspectus = 'upload_prospectus',
  BusinessModel = 'business_model',
  FinancialModel = 'financial_model',
  BusinessPlan = 'business_plan',
  ValuationReport = 'valuation_report'
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
