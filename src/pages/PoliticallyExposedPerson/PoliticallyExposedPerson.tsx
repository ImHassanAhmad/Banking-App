/* eslint-disable no-unused-vars */
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';
import Heading from '@app/components/Heading';
import { type WithSignUpStepperContextProps } from '@app/common/types';
import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { EXPOSED_PERSON } from '@app/constants/investor-onboarding';
import SubmitButton from '@app/components/SubmitButton';
const politicalexposedperson = RouteNames.POLITICAL_EXPOSED_PERSON;

const PoliticalExposedPerson: React.FC<WithSignUpStepperContextProps> = ({ updateActiveStep }) => {
  const { t } = useTranslation();

  const handleSave = (): void => {
    updateActiveStep();
  };

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack>
        <Heading
          title={t(`${politicalexposedperson}.title`)}
          subTitle={t(`${politicalexposedperson}.subtitle`)}
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

          <Typography variant="body2">{t(`${politicalexposedperson}.stateserror`)}</Typography>
        </Box>
        <FormControl sx={{ width: '98%' }}>
          <RadioGroup>
            {EXPOSED_PERSON.map((v) => (
              <FormControlLabel
                key={v.value}
                value={v.value}
                control={<Radio />}
                label={v.label}
                labelPlacement="start"
                style={{ justifyContent: 'space-between' }}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <SubmitButton
          title={t(`${politicalexposedperson}.continue`)}
          sx={{ mt: 4 }}
          onClick={handleSave}
        />
      </Stack>
    </Stack>
  );
};

export default PoliticalExposedPerson;
