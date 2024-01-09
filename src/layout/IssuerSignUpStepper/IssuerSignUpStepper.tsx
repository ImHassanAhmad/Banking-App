import { Stepper, Stack, Grid } from '@mui/material';
import React, { type FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@app/components/BackButton';
import CountrySelect from '@app/pages/CountrySelect';
import RegisterEmail from '@app/pages/RegisterEmail';
import Password from '@app/pages/Password';
import PhoneNumber from '@app/pages/PhoneNumber';
import MobileCodeVerification from '@app/pages/MobileCodeVerification';
import { IssuerSignUpFlowSteps, IssuerFlowStepsIndices } from './types';
import AboutServices from '@app/pages/AboutServices';
import RegisterEmailCodeVerification from '@app/pages/RegisterEmailCodeVerification';
import BusinessCategory from '@app/pages/BusinessCategory';
import BusinessDescription from '@app/pages/BusinessDescription';
import BusinessRegulation from '@app/pages/BusinessRegulation';
import BusinessRevenue from '@app/pages/BusinessRevenue';
import CompanyInformation from '@app/pages/CompanyInformation';
import { useIssuerSignUpStepper } from '@app/context/IssuerSignUpStepperContext';
import LegalRepresentative from '@app/pages/LegalRepresentative/LegalRepresentative';
import { type WithSignUpStepperContextProps } from '@app/types/types';
import BusinessType from '@app/pages/BusinessType/BusinessType';
import SourceOfFunding from '@app/pages/SourceOfFunding';
import TabTitle from '@app/components/TabTitle';

const issuerFlowComponent = (
  activeStep: IssuerSignUpFlowSteps
): React.ComponentType<WithSignUpStepperContextProps> | undefined => {
  switch (activeStep) {
    case IssuerSignUpFlowSteps.BusinessCategory:
      return BusinessCategory;
    case IssuerSignUpFlowSteps.Country:
      return CountrySelect;
    case IssuerSignUpFlowSteps.Email:
      return RegisterEmail;
    case IssuerSignUpFlowSteps.CompanyBasicInfo:
      return CompanyInformation;
    case IssuerSignUpFlowSteps.Mobile:
      return PhoneNumber;
    case IssuerSignUpFlowSteps.AboutOurServices:
      return AboutServices;
    case IssuerSignUpFlowSteps.CreatePassword:
      return Password;
    case IssuerSignUpFlowSteps.EmailVerify:
      return RegisterEmailCodeVerification;
    case IssuerSignUpFlowSteps.MobileVerify:
      return MobileCodeVerification;
    case IssuerSignUpFlowSteps.BusinessDescription:
      return BusinessDescription;
    case IssuerSignUpFlowSteps.BusinessRegulation:
      return BusinessRegulation;
    case IssuerSignUpFlowSteps.BusinessRevenue:
      return BusinessRevenue;
    case IssuerSignUpFlowSteps.LegalRepresentative:
      return LegalRepresentative;
    case IssuerSignUpFlowSteps.BusinessType:
      return BusinessType;
    case IssuerSignUpFlowSteps.FundingSource:
      return SourceOfFunding;
    default:
      return undefined;
  }
};

const IssuerSignUpStepper: FC = () => {
  const navigate = useNavigate();
  const props = useIssuerSignUpStepper();
  const { activeStep, goBack } = props;

  const activeStepIndex = useMemo(() => IssuerFlowStepsIndices[activeStep], [activeStep]);

  const IssuerFlowComponent = issuerFlowComponent(activeStep);

  const hideBackButton = [
    IssuerSignUpFlowSteps.MobileVerify,
    IssuerSignUpFlowSteps.EmailVerify
  ].includes(activeStep);
  return (
    <Stack pt={5}>
      <TabTitle title="Issuer Onboarding" />
      {hideBackButton ? (
        <></>
      ) : (
        <BackButton
          onClick={() => {
            activeStepIndex ? goBack(activeStepIndex - 1) : navigate(-1);
          }}
        />
      )}
      <Stepper
        activeStep={IssuerFlowStepsIndices[activeStep]}
        sx={{
          alignItems: 'flex-start',
          '&.MuiStepper-root': {
            alignItems: 'flex-start'
          }
        }}>
        <Grid item lg={8} md={10} sm={10} xs={12}>
          {IssuerFlowComponent ? <IssuerFlowComponent {...props} /> : <></>}
        </Grid>
      </Stepper>
    </Stack>
  );
};

export default IssuerSignUpStepper;
