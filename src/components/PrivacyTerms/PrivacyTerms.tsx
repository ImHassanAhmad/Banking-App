import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { PrivacyPolicyModal } from '../Modals';

const lightTextStyle = {
  fontSize: '1.4rem',
  fontWeight: 450,
  lineHeight: '1.8rem',
  opacity: '72%'
};

const darkTextStyle = {
  fontSize: '1.4rem',
  fontWeight: 530,
  textDecorationLine: 'underline',
  cursor: 'pointer'
};

const namespace = RouteNames.COUNTRY;

const PrivacyTerms: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <Stack>
      <Box>
        <Typography display="inline" sx={lightTextStyle}>
          {t(`${namespace}.by_registering`)}
        </Typography>
        <Typography display="inline" sx={darkTextStyle}>
          {t(`${namespace}.terms_of_use`)}
        </Typography>
        <Typography display="inline" sx={lightTextStyle}>
          {t(`${namespace}.and`)}
        </Typography>
        <Typography
          display="inline"
          data-testid="privacy-terms"
          sx={darkTextStyle}
          onClick={() => {
            setOpen(true);
          }}>
          {t(`${namespace}.privacy_policy`)}
        </Typography>
      </Box>
      <PrivacyPolicyModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </Stack>
  );
};

export default PrivacyTerms;
