import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CALL_ICON, WHATSAPP_ICON } from '@app/assets/images';
import { RouteNames } from '@app/constants/routes';
import CodeVerification from '@app/components/CodeVerification';
import { useNavigate } from 'react-router-dom';
import { OtpCommunicationChannelType, type VerifyPhoneResponseDto } from './types';
import {
  useResendPhoneConfirmationMutation,
  useVerifyPhoneMutation
} from '@app/store/api/onboarding';
import {
  AuthErrorLevel,
  type WithSignUpStepperContextProps,
  type AuthFetchQueryError
} from '@app/common/types';
import WarningAlert from '@app/components/WarningAlert';
import { useAuthError } from '@app/context/AuthErrorContext';

const mobileVerifyNamespace = RouteNames.VERIFY_MOBILE;

const MobileCodeVerification: React.FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  userId,
  userPayload,
  activeStep,
  activeStepError: error
}) => {
  const { t } = useTranslation();
  const { updateError } = useAuthError();
  const { codeBy, disclaimer, codeByContainer } = useStyles;
  const [codeNotRecieved, setCodeNotRecieved] = useState(false);
  const [isInvalid, setOtpValidity] = useState<boolean>(false);
  const [verifyPhoneNumber] = useVerifyPhoneMutation();
  const [resendVerificationCode] = useResendPhoneConfirmationMutation();

  const navigate = useNavigate();

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

  const submitVerifyPhoneNumber = (code: string): void => {
    verifyPhoneNumber?.({
      userId,
      otpCode: code
    })
      .unwrap()
      .then((response: VerifyPhoneResponseDto) => {
        navigate(`/${RouteNames.LOGIN}?recentlyRegistered`);
        updateActiveStep();
      })
      .catch(apiErrorHandler);
  };

  const resendVerification = (
    phoneOtpCommunicationChannel: OtpCommunicationChannelType = OtpCommunicationChannelType.SMS
  ): void => {
    resendVerificationCode({
      phoneOtpCommunicationChannel,
      userId
    })
      .unwrap()
      .then(() => {
        navigate(`${RouteNames.LOGIN}?recentlyRegistered`);
      })
      .catch(apiErrorHandler);
  };

  return (
    <CodeVerification
      title={t(`${mobileVerifyNamespace}.title`)}
      isError={isInvalid}
      subtitle={t(`${mobileVerifyNamespace}.subtitle`, {
        phone: `${userPayload?.phoneNumberCountryCode} ${userPayload?.shortenPhoneNumber}`
      })}
      onCodeComplete={(code) => {
        setOtpValidity(false);
        submitVerifyPhoneNumber(code);
        // navigate(${RouteNames.LOGIN}?recentlyRegistered`);
      }}>
      {codeNotRecieved ? (
        <>
          <Box gap={'0.75rem'} display={'flex'} flexDirection={'column'}>
            <Box
              onClick={() => {
                resendVerification(OtpCommunicationChannelType.WHATSAPP);
              }}
              sx={codeByContainer}>
              <img src={WHATSAPP_ICON} alt="whatsapp_icon" />
              <Typography sx={codeBy}>{t(`${mobileVerifyNamespace}.code_by_whatsapp`)}</Typography>
            </Box>
            <Box
              onClick={() => {
                resendVerification(OtpCommunicationChannelType.VOICE);
              }}
              sx={codeByContainer}>
              <img src={CALL_ICON} alt="phone_icon" />
              <Typography sx={codeBy}>{t(`${mobileVerifyNamespace}.code_by_phone`)}</Typography>
            </Box>
          </Box>
          <Box>
            <Typography sx={disclaimer}>{t(`${mobileVerifyNamespace}.disclaimer`)}</Typography>
          </Box>
        </>
      ) : (
        <Typography
          sx={codeBy}
          onClick={() => {
            setCodeNotRecieved(true);
            resendVerification();
          }}>
          {t(`${mobileVerifyNamespace}.code_not_received`)}
        </Typography>
      )}
      {error?.errorLevel === AuthErrorLevel.Account && (
        <Stack direction={'row'} mt={2}>
          <WarningAlert message={error?.message ?? ''} />
        </Stack>
      )}
    </CodeVerification>
  );
};

const useStyles = {
  codeByContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer'
  },
  codeBy: {
    fontSize: '1rem',
    fontStyle: 'normal',
    fontWeight: '530',
    lineHeight: '1.5rem',
    letterSpacing: '0.02rem',
    textDecorationLine: 'underline',
    cursor: 'pointer'
  },
  disclaimer: {
    width: '24rem',
    fontSize: '0.875rem',
    fontStyle: 'normal',
    fontWeight: '450',
    letterSpacing: '0.035rem',
    lineHeight: '1.125rem',
    fontFeatureSettings: "'clig' off, 'liga' off"
  }
} as const;

export default MobileCodeVerification;
