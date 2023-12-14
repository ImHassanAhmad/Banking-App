import { Box, Typography } from '@mui/material';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import CodeVerification from '@app/components/CodeVerification';
import { RouteNames } from '@app/constants/routes';
import { type EmailCodeVerificationProps } from './types';

const emailVerifyNamespace = RouteNames.VERIFY_EMAIL;

const EmailCodeVerification: FC<EmailCodeVerificationProps> = ({
  email,
  isInvalid,
  codeSent,
  onCodeComplete,
  onResendVerification,
  onCountDownComplete,
  onBackButtonClick
}) => {
  const { t } = useTranslation();
  const { codeBy } = useStyles;

  return (
    <CodeVerification
      onBackButtonClick={onBackButtonClick}
      title={t(`${emailVerifyNamespace}.title`)}
      subtitle={t(`${emailVerifyNamespace}.subtitle`, {
        email
      })}
      codeSent={codeSent}
      isError={isInvalid}
      onCountDownComplete={onCountDownComplete}
      onCodeComplete={onCodeComplete}>
      <Box onClick={onResendVerification}>
        <Typography sx={codeBy} fontSize={'14px'}>
          {t(`${emailVerifyNamespace}.resend_code`)}
        </Typography>
      </Box>
    </CodeVerification>
  );
};

const useStyles = {
  codeBy: {
    fontSize: '1rem',
    fontStyle: 'normal',
    fontWeight: '530',
    lineHeight: '1.5rem',
    letterSpacing: '0.02rem',
    textDecorationLine: 'underline',
    cursor: 'pointer'
  }
} as const;

export default EmailCodeVerification;
