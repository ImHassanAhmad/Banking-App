/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
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

const politicalexposedperson = RouteNames.POLITICAL_EXPOSED_PERSON;

const PoliticalExposedPerson: React.FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  userPayload
}) => {
  console.log(userPayload);
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
            <FormControlLabel
              value={t(`${politicalexposedperson}.myself`)}
              control={<Radio />}
              label={t(`${politicalexposedperson}.myself`)}
              labelPlacement="start"
              style={{ justifyContent: 'space-between' }}
            />
            <FormControlLabel
              value={t(`${politicalexposedperson}.Myfamilymember`)}
              control={<Radio />}
              label={t(`${politicalexposedperson}.Myfamilymember`)}
              labelPlacement="start"
              style={{ justifyContent: 'space-between' }}
            />
            <FormControlLabel
              value={t(`${politicalexposedperson}.Mycloseassociate`)}
              control={<Radio />}
              label={t(`${politicalexposedperson}.Mycloseassociate`)}
              labelPlacement="start"
              style={{ justifyContent: 'space-between' }}
            />
          </RadioGroup>
        </FormControl>
        <Button type="submit" onClick={handleSave} sx={{ flexGrow: 1, marginTop: '20px' }}>
          {t(`${politicalexposedperson}.continue`)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default PoliticalExposedPerson;
