import React, { useState } from 'react';
import EmailCodeVerification from '@app/components/EmailCodeVerification/EmailCodeVerification';
import { useLoginStepper } from '@app/context/LoginStepperContext';
import { useResendLoginOtpMutation, useVerifyLoginOtpMutation } from '@app/store/api/login';
import { useNavigate } from 'react-router-dom';
import { type RefreshSessionDto, type ResendLoginOtpResponseDto } from 'types';
import { type AuthFetchQueryError, AuthErrorLevel } from '@app/common/types';
import { useAuthError } from '@app/context/AuthErrorContext';
import { LoginFlowSteps } from '@app/layout/LoginStepper/types';

const LoginEmailCodeVerification: React.FC = () => {
  const [isInvalid, setOtpValidity] = useState<boolean>(false);
  const [codeRequested, setCodeRequested] = useState(true);

  const { otpId, email, setOtpId, activeStep, setActiveStep } = useLoginStepper();
  const [verifyLoginOtp] = useVerifyLoginOtpMutation();
  const [resendLoginOtp] = useResendLoginOtpMutation();
  const navigate = useNavigate();
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
    verifyLoginOtp({ otpCode: code, otpId })
      .unwrap()
      .then((response: RefreshSessionDto) => {
        navigate(`/`);
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
        setActiveStep(LoginFlowSteps.Login);
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

export default LoginEmailCodeVerification;
