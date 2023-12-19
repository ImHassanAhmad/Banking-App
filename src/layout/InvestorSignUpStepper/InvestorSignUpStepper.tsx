import { Stepper } from '@mui/material';
import { type FC, type ReactNode } from 'react';

import CountrySelect from '@app/pages/CountrySelect';
import SignUp from '@app/pages/RegisterEmail';
import Password from '@app/pages/Password';
import PhoneNumber from '@app/pages/PhoneNumber';
import MobileCodeVerification from '@app/pages/MobileCodeVerification';
import { InvestorSignUpFlowSteps, InvestorSignUpFlowStepsIndices } from './types';
import AboutServices from '@app/pages/AboutServices';
import RegisterEmailCodeVerification from '@app/pages/RegisterEmailCodeVerification';
import {
  type InvestorSignUpStepperContextProps,
  useInvestorSignUpStepper
} from '@app/context/InvestorSignUpStepperContext';

const investorFlowComponent = (
  activeStep: InvestorSignUpFlowSteps,
  props: InvestorSignUpStepperContextProps
): ReactNode => {
  switch (activeStep) {
    case InvestorSignUpFlowSteps.Country:
      return <CountrySelect {...props} />;
    case InvestorSignUpFlowSteps.Email:
      return <SignUp {...props} />;
    case InvestorSignUpFlowSteps.Mobile:
      return <PhoneNumber {...props} />;
    case InvestorSignUpFlowSteps.AboutOurServices:
      return <AboutServices {...props} />;
    case InvestorSignUpFlowSteps.CreatePassword:
      return <Password {...props} />;
    case InvestorSignUpFlowSteps.EmailVerify:
      return <RegisterEmailCodeVerification {...props} />;
    case InvestorSignUpFlowSteps.MobileVerify:
      return <MobileCodeVerification {...props} />;

    default:
      return <></>;
  }
};

const IssuerSignUpStepper: FC = () => {
  const props = useInvestorSignUpStepper();
  const { activeStep } = props;

  return (
    <Stepper
      activeStep={InvestorSignUpFlowStepsIndices[activeStep]}
      sx={{
        alignItems: 'flex-start',
        '&.MuiStepper-root': {
          alignItems: 'flex-start'
        }
      }}>
      {investorFlowComponent(activeStep, props)}
    </Stepper>
  );
};

export default IssuerSignUpStepper;
