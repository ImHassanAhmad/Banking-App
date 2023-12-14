import { Stepper } from '@mui/material';
import { type FC, type ReactNode } from 'react';

import CountrySelect from '@app/pages/CountrySelect/CountrySelect';
import SignUp from '@app/pages/RegisterEmail';
import Password from '@app/pages/Password';
import PhoneNumber from '@app/pages/PhoneNumber';
import MobileCodeVerification from '@app/pages/MobileCodeVerification';
import { useSignUpStepper } from '@app/context/SignupStepperContext';
import { SignUpFlowSteps, SignUpFlowStepsIndices } from './types';
import AboutServices from '@app/pages/AboutServices';
import RegisterEmailCodeVerification from '@app/pages/RegisterEmailCodeVerification.tsx/RegisterEmailCodeVerification';
import BusinessCategory from '@app/pages/BusinessCategory';
import BusinessDescription from '@app/pages/BusinessDescription/BusinessDescription';
import BusinessRegulation from '@app/pages/BusinessRegulation';
import BusinessRevenue from '@app/pages/BusinessRevenue/BusinessRevenue';

const signUpFlowComponent = (activeStep: SignUpFlowSteps): ReactNode => {
  switch (activeStep) {
    case SignUpFlowSteps.BusinessCategory:
      return <BusinessCategory />;
    case SignUpFlowSteps.Country:
      return <CountrySelect />;
    case SignUpFlowSteps.Email:
      return <SignUp />;
    case SignUpFlowSteps.Mobile:
      return <PhoneNumber />;
    case SignUpFlowSteps.AboutOurServices:
      return <AboutServices />;
    case SignUpFlowSteps.CreatePassword:
      return <Password />;
    case SignUpFlowSteps.EmailVerify:
      return <RegisterEmailCodeVerification />;
    case SignUpFlowSteps.MobileVerify:
      return <MobileCodeVerification />;
    case SignUpFlowSteps.BusinessDescription:
      return <BusinessDescription />;
    case SignUpFlowSteps.BusinessRegulation:
      return <BusinessRegulation />;
    case SignUpFlowSteps.BusinessRevenue:
      return <BusinessRevenue />;

    default:
      return <></>;
  }
};

const SignUpStepper: FC = () => {
  const { activeStep } = useSignUpStepper();

  return (
    <Stepper
      activeStep={SignUpFlowStepsIndices[activeStep]}
      sx={{
        alignItems: 'flex-start',
        '&.MuiStepper-root': {
          alignItems: 'flex-start'
        }
      }}>
      {signUpFlowComponent(activeStep)}
    </Stepper>
  );
};

export default SignUpStepper;
