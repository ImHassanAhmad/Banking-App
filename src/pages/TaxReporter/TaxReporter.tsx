/* eslint-disable no-unused-vars */
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';
import Heading from '@app/components/Heading';
import { type WithSignUpStepperContextProps } from '@app/common/types';
import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Textfield from '@app/components/Textfield';
import SubmitButton from '@app/components/SubmitButton';

const taxreporter = RouteNames.TAX_REPORTER;

const TaxReporter: React.FC<WithSignUpStepperContextProps> = ({ updateActiveStep }) => {
  const { t } = useTranslation();

  const handleSave = (): void => {
    updateActiveStep();
  };

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack>
        <Heading title={t(`${taxreporter}.title`)} subTitle={t(`${taxreporter}.subtitle`)} />
      </Stack>
      <Stack></Stack>
      <Stack mt={3}>
        <Textfield name="[Number Name]" label={t(`${taxreporter}.number_name`)} />
      </Stack>
      <Stack mt={2}>
        <Box
          sx={{
            display: 'flex',
            gap: '5px',
            background: '#EBEBEB',
            borderRadius: '10px',
            alignItems: 'center',
            padding: '10px',
            minHeight: 'max-content'
          }}>
          <ErrorOutlineIcon />
          <Typography variant="body2">{t(`${taxreporter}.stateserror`)}</Typography>
        </Box>

        <SubmitButton title={t(`${taxreporter}.continue`)} sx={{ mt: 4 }} onClick={handleSave} />
      </Stack>
    </Stack>
  );
};

export default TaxReporter;
