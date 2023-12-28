import React, { useState } from 'react';
import { Box, Grid, Stack, Step, StepLabel, Stepper } from '@mui/material';
import AssetTokenBasicInformation from './components/TokenBasicInformation';
import Heading from '@app/components/Heading';
import BackButton from '@app/components/BackButton';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import AssetTokenConfigurations from './components/AssetTokenConfiguration';
import { AssetTokenPrice } from './components/AssetTokenPrice';
import { CreateAssetFlows, CreateAssetTokenFlowSteps, type DataType } from './types';
import { indexToEnumKeyRecord } from '@app/utils/enum';
import { useAppDispatch } from '@app/store/hooks';
import {
  setTokenBasicInfo,
  setTokenConfig,
  setTokenPrice
} from '@app/store/slices/CreateAssetToken';

const assetTokenNamespace = RouteNames.CREATE_ASSET_TOKEN;

const steps = Object.values(CreateAssetTokenFlowSteps);
const CreateAssetToken: React.FC = () => {
  const { t } = useTranslation();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const dispatch = useAppDispatch();

  const next = (data: DataType): void => {
    console.log('here is data', data);
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex((prevStep) => prevStep + 1);
    }
    retainState(data);
  };

  const back = (data: DataType): void => {
    retainState(data);
    setActiveStepIndex((prevStep) => prevStep - 1);
  };

  const submit = (): void => {};

  const retainState = (data: DataType): void => {
    switch (currentStep) {
      case CreateAssetTokenFlowSteps.tokenBasicInformation:
        dispatch(setTokenBasicInfo({ ...data }));
        break;
      case CreateAssetTokenFlowSteps.tokenConfiguration:
        dispatch(setTokenConfig(data));
        break;
      case CreateAssetTokenFlowSteps.tokenPrice:
        dispatch(setTokenPrice(data));
        break;

      default:
        break;
    }
  };
  const getStepContent = (step: string): any => {
    switch (step) {
      case CreateAssetTokenFlowSteps.tokenBasicInformation:
        return <AssetTokenBasicInformation next={next} />;
      case CreateAssetTokenFlowSteps.tokenConfiguration:
        return <AssetTokenConfigurations next={next} back={back} />;
      case CreateAssetTokenFlowSteps.tokenPrice:
        return <AssetTokenPrice submit={submit} back={back} />;
      default:
        return <></>;
    }
  };

  const indexToEnumRecordValue = indexToEnumKeyRecord(CreateAssetTokenFlowSteps);
  const currentStep = indexToEnumRecordValue[activeStepIndex];

  const AssetTokenSteps = Object.values(CreateAssetFlows).filter(
    (value) => typeof value === 'string'
  );
  return (
    <Box>
      <Stack mb={3}>
        <Heading title={t(`${assetTokenNamespace}.create_new_asset`)} subTitle={''} />
      </Stack>
      <BackButton
        onClick={() => {
          if (activeStepIndex === 0) return;
          setActiveStepIndex((prevStep) => prevStep - 1);
        }}
      />
      <Box mt="46px">
        <Stepper activeStep={activeStepIndex} sx={{ mb: 8 }}>
          {AssetTokenSteps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Grid item xs={12} sm={10} md={8} lg={8}>
        {getStepContent(currentStep)}
      </Grid>
    </Box>
  );
};

export default CreateAssetToken;
