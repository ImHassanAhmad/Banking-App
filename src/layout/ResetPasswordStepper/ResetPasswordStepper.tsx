import { Stepper } from '@mui/material';
import { type FC, type ReactNode } from 'react';
import { ResetPasswordFlowSteps, ResetPasswordFlowStepsIndices } from './types';
import InitChangePasswordRequest from '@app/pages/ResetPassword/components/InitChangePassword/InitChangePasswordRequest';
import { useResetPasswordStepper } from '@app/context/ResetPasswordContext';
import ResetPasswordCodeVerification from '@app/pages/ResetPassword/components/ResetPasswordOtp/ResetPasswordOtp';
import ChangePasswordForm from '@app/pages/ResetPassword/components/ChangePasswordForm/ChangePasswordForm';

const loginFlowComponent = (activeStep: ResetPasswordFlowSteps): ReactNode => {
  switch (activeStep) {
    case ResetPasswordFlowSteps.OtpVerify:
      return <ResetPasswordCodeVerification />;

    case ResetPasswordFlowSteps.ChangePassword:
      return <ChangePasswordForm />;

    case ResetPasswordFlowSteps.Email:
    default:
      return <InitChangePasswordRequest />;
  }
};

const ResetPasswordStepper: FC = () => {
  const { activeStep } = useResetPasswordStepper();

  return (
    <Stepper
      activeStep={ResetPasswordFlowStepsIndices[activeStep]}
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

export default ResetPasswordStepper;
