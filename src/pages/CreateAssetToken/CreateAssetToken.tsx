import { Box, Button, Grid, Stack, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react';
import AssetSmartContract from './components/TokenBasicInformation';
import Heading from '@app/components/Heading';
import BackButton from '@app/components/BackButton';
import { steps } from './types';
import { AssetTokenPrice } from './components/AssetTokenPrice';
import AssetTokenConfigurations from './components/AssetTokenConfiguration';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';

const assetTokenNamespace = RouteNames.CREATE_ASSET_TOKEN;

const CreateAssetToken: React.FC = () => {
  const { t } = useTranslation();

  const [step, setStep] = useState(0);
  const getStepContent = (step: number): any => {
    switch (step) {
      case 0:
        return <AssetSmartContract />;
      case 1:
        return (
          <AssetTokenConfigurations
            defaultSelectedKeys={['token_config_pausable', 'token_config_mint']}
          />
        );
      case 2:
        return <AssetTokenPrice />;
      default:
        return <></>;
    }
  };
  return (
    <Box>
      <Stack mb={3}>
        <Heading title={t(`${assetTokenNamespace}.create_new_asset`)} subTitle={''} />
      </Stack>
      <BackButton
        onClick={() => {
          if (step === 0) return;
          setStep((prevStep) => prevStep - 1);
        }}
      />
      <Box mt="46px">
        <Stepper activeStep={step} sx={{ mb: 8 }}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Grid item xs={12} sm={10} md={8} lg={8}>
        {getStepContent(step)}
        <Stack gap={3} direction={'row'} mt={3}>
          <Button
            sx={{ marginTop: '20px', width: '100%' }}
            type="submit"
            onClick={() => {
              setStep((prevStep) => prevStep + 1);
            }}>
            {t(`${assetTokenNamespace}.continue`)}
          </Button>
        </Stack>
      </Grid>
    </Box>
  );
};
export default CreateAssetToken;
