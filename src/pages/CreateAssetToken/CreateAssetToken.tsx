import React, { useState } from 'react';
import { Box, Button, Grid, Stack, Step, StepLabel, Stepper } from '@mui/material';
import AssetSmartContract from './components/TokenBasicInformation';
import Heading from '@app/components/Heading';
import BackButton from '@app/components/BackButton';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import AssetTokenConfigurations from './components/AssetTokenConfiguration';
import { AssetTokenPrice } from './components/AssetTokenPrice';
import { CreateAssetTokenFlowSteps } from './types';
import { indexToEnumKeyRecord } from '@app/utils/enum';

const assetTokenNamespace = RouteNames.CREATE_ASSET_TOKEN;

const steps = Object.values(CreateAssetTokenFlowSteps);

// Util function to map enum to index

const CreateAssetToken: React.FC = () => {
  const { t } = useTranslation();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const getStepContent = (step: string): any => {
    switch (step) {
      case CreateAssetTokenFlowSteps.tokenBasicInformation:
        return <AssetSmartContract />;
      case CreateAssetTokenFlowSteps.tokenConfigutration:
        return <AssetTokenConfigurations />;
      case CreateAssetTokenFlowSteps.tokenPrice:
        return <AssetTokenPrice />;
      default:
        return <></>;
    }
  };

  const enumToIndexRecordValue = indexToEnumKeyRecord(CreateAssetTokenFlowSteps);
  const currentStep = enumToIndexRecordValue[activeStepIndex];

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
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Grid item xs={12} sm={10} md={8} lg={8}>
        {getStepContent(currentStep)}
        <Stack gap={3} direction={'row'} mt={3}>
          <Button
            sx={{ marginTop: '20px', width: '100%' }}
            type="submit"
            onClick={() => {
              if (activeStepIndex < steps.length - 1) {
                setActiveStepIndex((prevStep) => prevStep + 1);
              }
            }}>
            {t(`${assetTokenNamespace}.continue`)}
          </Button>
        </Stack>
      </Grid>
    </Box>
  );
};

export default CreateAssetToken;
