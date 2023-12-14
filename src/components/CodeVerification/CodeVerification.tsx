import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { type PropsWithChildren, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BackButton from '../BackButton';
import Heading from '../Heading';
import VerificationCodeInput from '../VerificationCodeInput';
import CountDownTime from './components/CountDownTime';
import { RouteNames } from '@app/constants/routes';
import { type CodeVerificationProps } from './types';

const mobileVerifyNamespace = RouteNames.VERIFY_MOBILE;

const CodeVerification: React.FC<PropsWithChildren<CodeVerificationProps>> = ({
  title,
  subtitle,
  children,
  codeSent,
  disabled,
  isError,
  onCodeComplete,
  onCountDownComplete,
  onBackButtonClick
}) => {
  const [isCountDownComplete, setCountDownComplete] = useState(codeSent);
  const [isCodeWrong, setIsCodeWrong] = useState(isError);
  const { t } = useTranslation();

  useEffect(() => {
    setIsCodeWrong(isError);
  }, [isError]);

  const handleCodeComplete = (code: string): undefined => {
    if (code.length === 6) {
      onCodeComplete(code);
    }
  };
  return (
    <Box mt={4}>
      {onBackButtonClick ? <BackButton onClick={onBackButtonClick} /> : <></>}
      <Stack mt={4}>
        <Heading title={title} subTitle={subtitle} />
      </Stack>
      <Grid item xs={12} sm={10} md={8} lg={8}>
        <Stack gap={3} mt={3}>
          <VerificationCodeInput
            onCodeComplete={handleCodeComplete}
            disabled={disabled}
            isError={isCodeWrong}
            onInputChange={() => {
              setIsCodeWrong(false);
            }}
          />
          {/* {isError && (
            <Typography color={'yellow'} fontStyle={'italic'}>
              {t(`${emailVerifyNamespace}.code_error`)}
            </Typography>
          )} */}
          {isCountDownComplete ? (
            <Box>
              <Typography display="inline" fontSize={'14px'}>
                {t(`${mobileVerifyNamespace}.resend_code`)}
              </Typography>
              <CountDownTime
                countDownComplete={() => {
                  setCountDownComplete(false);
                  onCountDownComplete?.();
                }}
              />
            </Box>
          ) : (
            <div
              onClick={() => {
                setCountDownComplete(true);
              }}>
              {children}
            </div>
          )}
        </Stack>
      </Grid>
    </Box>
  );
};

export default CodeVerification;
