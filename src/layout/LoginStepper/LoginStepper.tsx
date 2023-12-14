import { Stepper } from '@mui/material';
import { type FC, type ReactNode } from 'react';

import Login from '@app/pages/Login';
import { useLoginStepper } from '@app/context/LoginStepperContext';
import { LoginFlowSteps, LoginFlowStepsIndices } from './types';
import LoginEmailCodeVerification from '@app/pages/LoginEmailCodeVerification';

const loginFlowComponent = (activeStep: LoginFlowSteps): ReactNode => {
  switch (activeStep) {
    case LoginFlowSteps.Login:
      return <Login />;
    case LoginFlowSteps.LoginOtpVerify:
      return <LoginEmailCodeVerification />;

    default:
      return <Login />;
  }
};

const LoginStepper: FC = () => {
  const { activeStep } = useLoginStepper();

  return (
    <Stepper
      activeStep={LoginFlowStepsIndices[activeStep]}
      sx={{
        alignItems: 'flex-start',
        '&.MuiStepper-root': {
          alignItems: 'flex-start'
        }
      }}>
      {loginFlowComponent(activeStep)}
    </Stepper>
  );
};

export default LoginStepper;
