import React, { createContext, useState, useContext } from 'react';
import { CreateNewAssetSteps } from '../pages/CreateNewAsset/types';
import { enumToIndexRecord, indexToEnumKeyRecord } from '@app/utils/enum';
import { useNavigate } from 'react-router-dom';
import {
  type AssetSocialMediaRequestDto,
  type AssetDocumentsRequestDto,
  type AssetInformationRequestDto,
  type AssetRequestDto
} from '@app/common/types';

export interface AssetPayload {
  [CreateNewAssetSteps.AssetInformation]: AssetInformationRequestDto;
  [CreateNewAssetSteps.AssetDocuments]?: AssetDocumentsRequestDto;
  [CreateNewAssetSteps.AssetMultiMediaLinks]?: AssetSocialMediaRequestDto;
  [CreateNewAssetSteps.AssetCreationSuccess]?: AssetInformationRequestDto;
}

export interface CreateNewAssetContextProps {
  activeStep: CreateNewAssetSteps;
  assetPayload: AssetPayload;
  assetId: string;
  updateActiveStep: () => void;
  goBack: (backStep: number) => void;
  updateAssetPayload: (newState: AssetRequestDto, assetId?: string) => void;
}

const CreateNewAssetStepperContext = createContext<CreateNewAssetContextProps>({
  activeStep: CreateNewAssetSteps.AssetInformation,
  assetPayload: { [CreateNewAssetSteps.AssetInformation]: {} },
  assetId: ''
} as any);

const { Provider } = CreateNewAssetStepperContext;

const CreateNewAssetStepsIndices = enumToIndexRecord(CreateNewAssetSteps);
const IndexToCreateNewAssetSteps = indexToEnumKeyRecord(CreateNewAssetSteps);

export const CreateNewAssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(CreateNewAssetSteps.AssetInformation);
  const [assetPayload, setAssetPayload] = useState<AssetPayload>({
    [CreateNewAssetSteps.AssetInformation]: {} as any
  }); // Replace with your form state type
  const [assetId, setAssetId] = useState('');
  const navigate = useNavigate();

  const updateAssetPayload = (newState: AssetRequestDto, assetId?: string): void => {
    setAssetPayload((prevState: AssetPayload) => ({ ...prevState, [activeStep]: newState }));
    if (assetId) setAssetId(assetId);
  };

  const updateActiveStep = (): void => {
    if (activeStep === CreateNewAssetSteps.AssetCreationSuccess) {
      navigate('/');
    } else {
      const nextActiveStep: CreateNewAssetSteps = IndexToCreateNewAssetSteps[
        CreateNewAssetStepsIndices[activeStep] + 1
      ] as CreateNewAssetSteps;

      if (nextActiveStep) {
        setActiveStep(nextActiveStep);
      }
    }
  };

  const goBack = (backStep: number): void => {
    const previousStep = IndexToCreateNewAssetSteps[backStep] as CreateNewAssetSteps;
    if (previousStep) {
      setActiveStep(previousStep);
    }
  };

  const value = {
    activeStep,
    assetPayload: assetPayload[activeStep] as AssetPayload,
    assetId,
    updateActiveStep,
    goBack,
    updateAssetPayload
  };

  return <Provider value={value}>{children}</Provider>;
};

export const useCreateNewAssetStepper = (): CreateNewAssetContextProps =>
  useContext(CreateNewAssetStepperContext);
