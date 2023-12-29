import {
  type AuthFetchQueryError,
  AuthErrorLevel,
  type WithSignUpStepperContextProps
} from '@app/common/types';
import EmailCodeVerification from '@app/components/EmailCodeVerification/EmailCodeVerification';
import { useAuthError } from '@app/context/AuthErrorContext';
// import { InvestorSignUpFlowSteps } from '@app/layout/InvestorSignUpStepper/types';
import {
  useVerifyEmailMutation,
  useResendEmailConfirmationMutation
} from '@app/store/api/onboarding';
import { type FC, useState } from 'react';
import {
  type VerifyEmailResponseDto,
  type ResendEmailConfirmationResponseDto
} from '@app/pages/LoginEmailCodeVerification/types';

const RegisterEmailCodeVerification: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  userId,
  userPayload,
  activeStep
}) => {
  const [isInvalid, setOtpValidity] = useState<boolean>(false);
  const { updateError } = useAuthError();
  const [codeRequested, setCodeRequested] = useState(true);

  const [verifyEmail] = useVerifyEmailMutation();
  const [resendEmailVerification] = useResendEmailConfirmationMutation();

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
    verifyEmail({
      userId,
      otpCode: code
    })
      .unwrap()
      .then((response: VerifyEmailResponseDto) => {
        updateActiveStep();
      })
      .catch(apiErrorHandler);
  };

  const resendVerification = (): void => {
    resendEmailVerification({ userId })
      .unwrap()
      .then((response: ResendEmailConfirmationResponseDto) => {})
      .catch(apiErrorHandler);
  };

  return (
    <EmailCodeVerification
      email={userPayload.email ?? ''}
      isInvalid={isInvalid}
      codeSent={codeRequested}
      onCodeComplete={(code) => {
        setOtpValidity(false);
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

export default RegisterEmailCodeVerification;
