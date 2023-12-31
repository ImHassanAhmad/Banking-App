// src/pages/CreateNewAsset/CreateNewAsset.tsx
import React, { useMemo } from 'react';
import { Box, Stepper, Step, StepLabel, Stack, Grid } from '@mui/material';
import AssetInformation from './components/AssetInformation';
import AssetDocuments from './components/AssetDocuments';
import AssetMultiMediaLinks from './components/AssetMultiMediaLinks';
import Heading from '@app/components/Heading';
import BackButton from '@app/components/BackButton';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CreateNewAssetSteps, stepsExcludingSuccess, CreateNewAssetStepsIndices } from './types';
import AssetCreationSuccess from './components/AssetCreationSuccess';
import { useCreateNewAssetStepper } from '@app/context/CreateNewAssetStepperContext';

const createNewAssetNamespace = RouteNames.CREATE_NEW_ASSET;

const getStepComponent = (step: CreateNewAssetSteps): React.ComponentType | null => {
  switch (step) {
    case CreateNewAssetSteps.AssetInformation:
      return AssetInformation;
    case CreateNewAssetSteps.AssetDocuments:
      return AssetDocuments;
    case CreateNewAssetSteps.AssetMultiMediaLinks:
      return AssetMultiMediaLinks;
    case CreateNewAssetSteps.AssetCreationSuccess:
      return AssetCreationSuccess;
    default:
      return null;
  }
};

const CreateNewAsset: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeStep, goBack } = useCreateNewAssetStepper();
  const ActiveStepComponent = getStepComponent(activeStep);

  const activeStepIndex = useMemo(() => CreateNewAssetStepsIndices[activeStep], [activeStep]);

  return (
    <Stack sx={{ width: '100%' }}>
      <Stack mb={3}>
        <Heading title={t(`${createNewAssetNamespace}.create_new_asset`)} subTitle={''} />
      </Stack>

      <BackButton
        onClick={() => {
          activeStepIndex ? goBack(activeStepIndex - 1) : navigate(-1);
        }}
      />
      <Box mt="46px">
        <Stepper
          activeStep={
            activeStep !== CreateNewAssetSteps.AssetCreationSuccess
              ? stepsExcludingSuccess.indexOf(activeStep)
              : stepsExcludingSuccess.length
          }
          sx={{ mb: 8 }}>
          {stepsExcludingSuccess.map((label, index) => (
            <Step key={index}>
              <StepLabel>{t(`${createNewAssetNamespace}.${label}`)}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Grid item sx={{ width: '100%' }}>
        {ActiveStepComponent && <ActiveStepComponent />}
      </Grid>
    </Stack>
  );
};

export default CreateNewAsset;
