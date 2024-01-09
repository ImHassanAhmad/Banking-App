import EmailCodeVerification from '@app/components/EmailCodeVerification/EmailCodeVerification';
import { useAuthError } from '@app/context/AuthErrorContext';
import { useResetPasswordStepper } from '@app/context/ResetPasswordContext';
import { ResetPasswordFlowSteps } from '@app/layout/ResetPasswordStepper/types';
import type { UserEntity } from '@app/server/database/entity';
import {
  useResendResetPasswordOtpMutation,
  useVerifyResetPasswordOtpMutation
} from '@app/store/api/reset-password';
import {
  AuthErrorLevel,
  type AuthFetchQueryError,
  type ResendLoginOtpResponseDto
} from '@app/types/types';
import React, { useState } from 'react';

const ResetPasswordCodeVerification: React.FC = () => {
  const [isInvalid, setOtpValidity] = useState<boolean>(false);
  const [codeRequested, setCodeRequested] = useState(true);

  const { otpId, email, setOtpId, activeStep, setActiveStep } = useResetPasswordStepper();
  console.log(otpId, email);
  const [verifyLoginOtp] = useVerifyResetPasswordOtpMutation();
  const [resendLoginOtp] = useResendResetPasswordOtpMutation();
  const { updateError } = useAuthError();

  const apiErrorHandler = ({ message, errorLevel }: AuthFetchQueryError): void => {
    switch (errorLevel) {
      case AuthErrorLevel.Field:
        setOtpValidity(Boolean(message));
        break;
      default:
        updateError(activeStep, { title: message, message, errorLevel });
        break;
    }
  };

  const verifyOtp = (code: string): void => {
    verifyLoginOtp({ otpCode: code, email })
      .unwrap()
      .then((response: UserEntity) => {
        setActiveStep(ResetPasswordFlowSteps.ChangePassword);
      })
      .catch(apiErrorHandler);
  };

  const resendVerification = (): void => {
    resendLoginOtp({ otpId })
      .unwrap()
      .then((response: ResendLoginOtpResponseDto) => {
        setOtpId(response.newOtpId);
      })
      .catch(apiErrorHandler);
  };

  return (
    <EmailCodeVerification
      onBackButtonClick={() => {
        setActiveStep(ResetPasswordFlowSteps.Email);
      }}
      email={email}
      isInvalid={isInvalid}
      codeSent={codeRequested}
      onCodeComplete={(code) => {
        verifyOtp(code);
      }}
      onResendVerification={() => {
        resendVerification();
      }}
      onCountDownComplete={() => {
        setCodeRequested(false);
      }}
    />
  );
};

export default ResetPasswordCodeVerification;
