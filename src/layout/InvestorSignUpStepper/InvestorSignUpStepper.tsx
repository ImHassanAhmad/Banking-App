import { Stepper } from '@mui/material';
import { type FC, type ReactNode } from 'react';

import CountrySelect from '@app/pages/InvestorSignUp/CountrySelect';
import SignUp from '@app/pages/InvestorSignUp/RegisterEmail';
import Password from '@app/pages/InvestorSignUp/Password';
import PhoneNumber from '@app/pages/InvestorSignUp/PhoneNumber';
import MobileCodeVerification from '@app/pages/InvestorSignUp/MobileCodeVerification';
import { InvestorSignUpFlowSteps, InvestorSignUpFlowStepsIndices } from './types';
import AboutServices from '@app/pages/InvestorSignUp/AboutServices';
import RegisterEmailCodeVerification from '@app/pages/InvestorSignUp/RegisterEmailCodeVerification';
import { useInvestorSignUpStepper } from '@app/context/InvestorSignUpStepperContext';

const investorFlowComponent = (activeStep: InvestorSignUpFlowSteps): ReactNode => {
  switch (activeStep) {
    case InvestorSignUpFlowSteps.Country:
      return <CountrySelect />;
    case InvestorSignUpFlowSteps.Email:
      return <SignUp />;
    case InvestorSignUpFlowSteps.Mobile:
      return <PhoneNumber />;
    case InvestorSignUpFlowSteps.AboutOurServices:
      return <AboutServices />;
    case InvestorSignUpFlowSteps.CreatePassword:
      return <Password />;
    case InvestorSignUpFlowSteps.EmailVerify:
      return <RegisterEmailCodeVerification />;
    case InvestorSignUpFlowSteps.MobileVerify:
      return <MobileCodeVerification />;

    default:
      return <></>;
  }
};

const IssuerSignUpStepper: FC = () => {
  const { activeStep } = useInvestorSignUpStepper();

  return (
    <Stepper
      activeStep={InvestorSignUpFlowStepsIndices[activeStep]}
      sx={{
        alignItems: 'flex-start',
        '&.MuiStepper-root': {
          alignItems: 'flex-start'
        }
      }}>
      {investorFlowComponent(activeStep)}
    </Stepper>
  );
};

export default IssuerSignUpStepper;
