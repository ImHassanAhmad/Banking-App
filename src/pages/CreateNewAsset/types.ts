import type React from 'react';
import { enumToIndexRecord } from '@app/utils/enum';
import { type AssetDocumentsRequestDto } from '@app/common/types';
import { type Control, type FieldError } from 'react-hook-form';

export interface UploadDocumentsProps {
  label: string;
  description: string;
  selectedFile: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  documentValue: keyof AssetDocumentsRequestDto;
  control: Control<AssetDocumentsRequestDto, any>;
  error: FieldError | undefined;
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
