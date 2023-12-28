import React, { useEffect, useState } from 'react';
import EmailCodeVerification from '@app/components/EmailCodeVerification/EmailCodeVerification';
import { useLoginStepper } from '@app/context/LoginStepperContext';
import { useResendLoginOtpMutation, useVerifyLoginOtpMutation } from '@app/store/api/login';
import { useNavigate } from 'react-router-dom';
import { type ResendLoginOtpResponseDto } from 'types';
import { type AuthFetchQueryError, AuthErrorLevel } from '@app/common/types';
import { useAuthError } from '@app/context/AuthErrorContext';
import { LoginFlowSteps } from '@app/layout/LoginStepper/types';
import type { UserEntity } from '@app/server/database/entity';
import { RouteNames } from '@app/constants/routes';
import { useGetIssuerDetailsQuery } from '@app/store/api/onboarding';
import { setEmail, setPostOnboardingCompleted } from '@app/store/slices/userData';
import { useAppDispatch } from '@app/store/hooks';
import {
  setCompanyStructure,
  setLegalRepresentatives,
  setStep
} from '@app/store/slices/postOnboarding';

const LoginEmailCodeVerification: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isInvalid, setOtpValidity] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>();
  const [codeRequested, setCodeRequested] = useState(true);

  const { otpId, email, setOtpId, activeStep, setActiveStep } = useLoginStepper();
  const [verifyLoginOtp] = useVerifyLoginOtpMutation();
  const [resendLoginOtp] = useResendLoginOtpMutation();
  const navigate = useNavigate();
  const { updateError } = useAuthError();

  const { data: issuerDetails, isSuccess: userDetailsSuccess } = useGetIssuerDetailsQuery(
    id as string,
    {
      skip: !id
    }
  );

  useEffect(() => {
    if (userDetailsSuccess) {
      const { completed, companyStructure, legalRepresentatives } = issuerDetails;
      dispatch(setPostOnboardingCompleted(completed));
      if (issuerDetails && completed) {
        navigate(`/${RouteNames.DASHBOARD}`);
      } else {
        if (legalRepresentatives) {
          dispatch(setLegalRepresentatives(legalRepresentatives));
          dispatch(setStep(2));
        } else if (companyStructure) {
          dispatch(setCompanyStructure(companyStructure));
          dispatch(setStep(1));
        } else {
          dispatch(setStep(0));
        }
        navigate(`/${RouteNames.POST_ONBOARDING}`);
      }
    }
  }, [userDetailsSuccess]);

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
      .then((response: UserEntity) => {
        dispatch(setEmail(response.email));
        setId(response.email);
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
