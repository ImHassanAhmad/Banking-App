import React, { type FC } from 'react';

import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import { Button, Stack, Typography, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CountryCard from '@app/components/CountryCard/CountryCard';
import { type WithSignUpStepperContextProps } from '@app/common/types';
import { getCountryFlag } from '@app/assets/flags';

const taxescountry = RouteNames.PAY_COUNTRY_TAXES;
const CountryTaxes: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  goBack,
  activeStepIndex,
  userPayload
}) => {
  const { t } = useTranslation();
  const addCountry = (): void => {
    goBack(activeStepIndex - 1);
  };
  return (
    <>
      <Stack sx={{ width: '436px' }}>
        <Heading title={t(`${taxescountry}.title`)} subTitle={t(`${taxescountry}.countrydetail`)} />

        <CountryCard
          imageSrc={getCountryFlag('PK')}
          text={`${t(`${taxescountry}.poland`)}`}
          code="98765AB"
          customStyle={{}}
        />
        <CountryCard
          imageSrc={getCountryFlag('US')}
          text={`${t(`${taxescountry}.states`)}`}
          code={userPayload.companyName}
          customStyle={{}}
        />

        <Box
          onClick={addCountry}
          sx={{
            display: 'flex',
            gap: '10px',
            background: '#EBEBEB',
            width: '380px',
            borderRadius: '10px',
            paddingLeft: '15px',
            alignItems: 'center',
            height: '5.2rem',
            marginTop: '8px',
            cursor: 'pointer',
            alignItem: 'center'
          }}>
          <AddCircleOutlineIcon />
          <Typography>{t(`${taxescountry}.addcountry`)}</Typography>
        </Box>
        <Button
          sx={{ marginTop: '20px', width: '400px' }}
          type="submit"
          onClick={() => updateActiveStep()}>
          {t(`${taxescountry}.continue`)}
        </Button>
      </Stack>
    </>
  );
};

export default CountryTaxes;
