/* eslint-disable no-unused-vars */
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';
import Heading from '@app/components/Heading';
import { type WithSignUpStepperContextProps } from '@app/types/types';
import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { BINARY_ANSWER_OPTIONS } from '@app/constants/issuer-onboarding';
const politicalexposed = RouteNames.POLITICAL_EXPOSED;

const PoliticalExposed: React.FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  userPayload
}) => {
  const { t } = useTranslation();

  const handleSave = (): void => {
    updateActiveStep();
  };

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack>
        <Heading
          title={t(`${politicalexposed}.title`)}
          subTitle={t(`${politicalexposed}.subtitle`)}
        />
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

          <Typography variant="body2">{t(`${politicalexposed}.stateserror`)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', width: '100%    ', marginTop: '20px' }}>
          {BINARY_ANSWER_OPTIONS.map((v) => (
            <Button type="submit" onClick={handleSave} sx={{ flexGrow: 1 }} key={v.id}>
              {v.topic}
            </Button>
          ))}
        </Box>
      </Stack>
    </Stack>
  );
};

export default PoliticalExposed;
