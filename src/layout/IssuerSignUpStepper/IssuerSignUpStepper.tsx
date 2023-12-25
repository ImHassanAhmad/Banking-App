import { Stepper, Stack, Grid } from '@mui/material';
import { type FC, type ReactNode, useMemo } from 'react';
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
import {
  type IssuerSignUpStepperContextProps,
  useIssuerSignUpStepper
} from '@app/context/IssuerSignUpStepperContext';

const issuerFlowComponent = (
  activeStep: IssuerSignUpFlowSteps,
  props: IssuerSignUpStepperContextProps
): ReactNode => {
  switch (activeStep) {
    case IssuerSignUpFlowSteps.BusinessCategory:
      return <BusinessCategory {...props} />;
    case IssuerSignUpFlowSteps.Country:
      return <CountrySelect {...props} />;
    case IssuerSignUpFlowSteps.Email:
      return <RegisterEmail {...props} />;
    case IssuerSignUpFlowSteps.CompanyBasicInfo:
      return <CompanyInformation {...props} />;
    case IssuerSignUpFlowSteps.Mobile:
      return <PhoneNumber {...props} />;
    case IssuerSignUpFlowSteps.AboutOurServices:
      return <AboutServices {...props} />;
    case IssuerSignUpFlowSteps.CreatePassword:
      return <Password {...props} />;
    case IssuerSignUpFlowSteps.EmailVerify:
      return <RegisterEmailCodeVerification {...props} />;
    case IssuerSignUpFlowSteps.MobileVerify:
      return <MobileCodeVerification {...props} />;
    case IssuerSignUpFlowSteps.BusinessDescription:
      return <BusinessDescription {...props} />;
    case IssuerSignUpFlowSteps.BusinessRegulation:
      return <BusinessRegulation {...props} />;
    case IssuerSignUpFlowSteps.BusinessRevenue:
      return <BusinessRevenue {...props} />;

    default:
      return <></>;
  }
};

const IssuerSignUpStepper: FC = () => {
  const navigate = useNavigate();
  const props = useIssuerSignUpStepper();
  const { activeStep, goBack } = props;

  const activeStepIndex = useMemo(() => IssuerFlowStepsIndices[activeStep], [activeStep]);
  console.log('POLA', activeStep, activeStepIndex);
  return (
    <Stack>
      <BackButton
        onClick={() => {
          activeStepIndex ? goBack(activeStepIndex - 1) : navigate(-1);
        }}
      />
      <Stepper
        activeStep={IssuerFlowStepsIndices[activeStep]}
        sx={{
          alignItems: 'flex-start',
          '&.MuiStepper-root': {
            alignItems: 'flex-start'
          }
        }}>
        <Grid item lg={8} md={10} sm={10} xs={12}>
          {issuerFlowComponent(activeStep, props)}
        </Grid>
      </Stepper>
    </Stack>
  );
};

export default IssuerSignUpStepper;
