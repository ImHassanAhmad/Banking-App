import EmailCodeVerification from '@app/components/EmailCodeVerification/EmailCodeVerification';
import { Stack } from '@mui/material';
import { RouteNames } from '@app/constants/routes';
import { useAuthError } from '@app/context/AuthErrorContext';
import { useLoginStepper } from '@app/context/LoginStepperContext';
import { LoginFlowSteps } from '@app/layout/LoginStepper/types';
import type { IssuerDetailsEntity, UserEntity } from '@app/server/database/entity';
import { useResendLoginOtpMutation, useVerifyLoginOtpMutation } from '@app/store/api/login';
import { useLazyGetIssuerDetailsQuery } from '@app/store/api/onboarding';
import { useAppDispatch } from '@app/store/hooks';
import {
  setCompanyStructure,
  setLegalRepresentatives,
  setStep
} from '@app/store/slices/issuerOnboarding';
import { setPostOnboardingCompleted, setUser } from '@app/store/slices/userData';
import {
  AuthErrorLevel,
  isIssuer,
  onBoardType,
  type AuthFetchQueryError,
  type ResendLoginOtpResponseDto
} from '@app/types/types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostOnboardingFlowSteps } from '../IssuerOnboarding/types';
import TabTitle from '@app/components/TabTitle';

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

  const fetchLoggedInUserDetail = (user: UserEntity): void => {
    if (isIssuer(user)) {
      const { email } = user;
      dispatch(setUser({ email, userType: onBoardType.Issuer }));

      getIssuerDetails(user.email as string)
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
    } else {
      dispatch(setUser({ email, userType: onBoardType.Investor }));
      navigate(`/${RouteNames.DASHBOARD}`);
    }
  };

  const verifyOtp = (code: string): void => {
    verifyLoginOtp({ otpCode: code, otpId })
      .unwrap()
      .then((userEntity: UserEntity) => {
        fetchLoggedInUserDetail(userEntity);
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
    <Stack>
      <TabTitle title="Email Verification" />

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
    </Stack>
  );
};

export default LoginEmailCodeVerification;
