import React, { useState } from 'react';
import EmailCodeVerification from '@app/components/EmailCodeVerification/EmailCodeVerification';
import { useLoginStepper } from '@app/context/LoginStepperContext';
import { useResendLoginOtpMutation, useVerifyLoginOtpMutation } from '@app/store/api/login';
import { useNavigate } from 'react-router-dom';
import { type ResendLoginOtpResponseDto } from 'types';
import { type AuthFetchQueryError, AuthErrorLevel } from '@app/common/types';
import { useAuthError } from '@app/context/AuthErrorContext';
import { LoginFlowSteps } from '@app/layout/LoginStepper/types';
import type { IssuerDetailsEntity, UserEntity } from '@app/server/database/entity';
import { RouteNames } from '@app/constants/routes';
import { useLazyGetIssuerDetailsQuery } from '@app/store/api/onboarding';
import { setEmail, setPostOnboardingCompleted } from '@app/store/slices/userData';
import { useAppDispatch } from '@app/store/hooks';
import {
  setCompanyStructure,
  setLegalRepresentatives,
  setStep
} from '@app/store/slices/issuerOnboarding';
import { PostOnboardingFlowSteps } from '../IssuerOnboarding/types';

const LoginEmailCodeVerification: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isInvalid, setOtpValidity] = useState<boolean>(false);
  const [codeRequested, setCodeRequested] = useState(true);

  const { otpId, email, setOtpId, activeStep, setActiveStep } = useLoginStepper();
  const [verifyLoginOtp] = useVerifyLoginOtpMutation();
  const [resendLoginOtp] = useResendLoginOtpMutation();
  const navigate = useNavigate();
  const { updateError } = useAuthError();

  const [getIssuerDetails] = useLazyGetIssuerDetailsQuery();

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
        getIssuerDetails(response.email as string)
          .unwrap()
          .then((response: IssuerDetailsEntity) => {
            const { completed, companyStructure, legalRepresentatives } = response;
            dispatch(setPostOnboardingCompleted(completed));
            if (response && completed) {
              navigate(`/${RouteNames.DASHBOARD}`);
            } else {
              if (legalRepresentatives) {
                dispatch(setLegalRepresentatives(legalRepresentatives));
                dispatch(setStep(PostOnboardingFlowSteps.Kyc));
              } else if (companyStructure) {
                dispatch(setCompanyStructure(companyStructure));
                dispatch(setStep(PostOnboardingFlowSteps.LegalRespresentative));
              } else {
                dispatch(setStep(PostOnboardingFlowSteps.CompanyStructure));
              }
              navigate(`/${RouteNames.ISSUER_ONBOARDING}`);
            }
          })
          .catch((error) => {
            apiErrorHandler(error);
            navigate(`/${RouteNames.ISSUER_ONBOARDING}`);
          });
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
