import React, { createContext, useState, useContext } from 'react';
import { CreateNewAssetSteps } from '../pages/CreateNewAsset/types';
import { enumToIndexRecord, indexToEnumKeyRecord } from '@app/utils/enum';
import { useNavigate } from 'react-router-dom';
import { type AssetRequestDto } from '@app/common/types';

export interface CreateNewAssetContextProps {
  activeStep: CreateNewAssetSteps;
  updateActiveStep: () => void;
  goBack: (backStep: number) => void;
  assetPayload: AssetRequestDto;
  updateAssetPayload: (newState: AssetRequestDto) => void;
}

const CreateNewAssetStepperContext = createContext<CreateNewAssetContextProps>({
  activeStep: CreateNewAssetSteps.AssetInformation,
  updateActiveStep: () => {},
  goBack: () => {},
  assetPayload: {}, // Add a default value
  updateAssetPayload: () => {} // Add a default function
});

const { Provider } = CreateNewAssetStepperContext;

const CreateNewAssetStepsIndices = enumToIndexRecord(CreateNewAssetSteps);
const IndexToCreateNewAssetSteps = indexToEnumKeyRecord(CreateNewAssetSteps);

export const CreateNewAssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(CreateNewAssetSteps.AssetInformation);
  const [assetPayload, setAssetPayload] = useState<AssetRequestDto>({}); // Replace with your form state type
  const navigate = useNavigate();

  const updateAssetPayload = (newState: AssetRequestDto): void => {
    setAssetPayload((prevState: AssetRequestDto) => ({ ...prevState, ...newState }));
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
    updateActiveStep,
    goBack,
    assetPayload,
    updateAssetPayload
  };

  return <Provider value={value}>{children}</Provider>;
};

export const useCreateNewAssetStepper = (): CreateNewAssetContextProps =>
  useContext(CreateNewAssetStepperContext);
