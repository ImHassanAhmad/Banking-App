import React, { useState } from 'react';
import { Box, Grid, Stack, Step, StepLabel, Stepper } from '@mui/material';
import AssetTokenBasicInformation from './components/TokenBasicInformation';
import Heading from '@app/components/Heading';
import BackButton from '@app/components/BackButton';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import AssetTokenConfigurations from './components/AssetTokenConfiguration';
import { AssetTokenPrice } from './components/AssetTokenPrice';
import {
  CreateAssetFlows,
  CreateAssetTokenFlowSteps,
  type ITokenPriceForm,
  type CreateAssetTokenType
} from './types';
import { indexToEnumKeyRecord } from '@app/utils/enum';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import {
  setTokenBasicInfo,
  setTokenConfig,
  setTokenPrice
} from '@app/store/slices/CreateAssetToken';
import { useCreateAssetTokenMutation } from '@app/store/api/tokens';
import { type AssetTokenCreationRequestDTO } from '@app/common/types';
import { useParams } from 'react-router-dom';
const assetTokenNamespace = RouteNames.CREATE_ASSET_TOKEN;
const steps = Object.values(CreateAssetTokenFlowSteps);
const CreateAssetToken: React.FC = () => {
  const { t } = useTranslation();
  const { assetId } = useParams();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const { tokenBasicInfo: tokenBasicInfoState } = useAppSelector((state) => state.createAssetToken);
  const { tokenConfig: tokenConfigState } = useAppSelector((state) => state.createAssetToken); // Redux state
  const [createAssetToken] = useCreateAssetTokenMutation();

  const dispatch = useAppDispatch();
  const next = (data: CreateAssetTokenType): void => {
    console.log('here is data', data);
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex((prevStep) => prevStep + 1);
    }
    retainState(data);
  };

  const back = (data: CreateAssetTokenType): void => {
    retainState(data);
    setActiveStepIndex((prevStep) => prevStep - 1);
  };
  const submit = (data: ITokenPriceForm): void => {
    retainState(data);
    const apiPayload = {
      assetId,
      tokenName: tokenBasicInfoState.tokenName,
      tokenSymbol: tokenBasicInfoState.tokenSymbol,
      totalSupply: tokenBasicInfoState.totalSupply,
      numberOfDecimal: tokenBasicInfoState.numberOfDecimal,
      tokenLogo: tokenBasicInfoState.tokenLogo.name,
      pausable: tokenConfigState.pausable,
      mintable: tokenConfigState.mintable,
      burnable: tokenConfigState.burnable,
      capped: tokenConfigState.capped,
      currency: data?.currency,
      buyPrice: data?.buyPrice
    };
    createAssetToken(apiPayload as AssetTokenCreationRequestDTO)
      .unwrap()
      .then((res) => {
        console.log('here is our response', res);
      })
      .catch((err: any) => {
        console.log('here is our error', err);
      });
    // Code that might throw an error
  };
  const retainState = (data: CreateAssetTokenType): void => {
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
        <Heading title={t(`${assetTokenNamespace}.create_new_token`)} subTitle={''} />
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
