import React, { type FC } from 'react';

import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import { Stack, Typography, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CountryCard from '@app/components/CountryCard/CountryCard';
import {
  type SocialSecurityInformation,
  type WithSignUpStepperContextProps
} from '@app/types/types';
import { getCountryFlag } from '@app/assets/flags';
import SubmitButton from '@app/components/SubmitButton';

const taxescountry = RouteNames.PAY_COUNTRY_TAXES;
const CountryTaxes: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  goBack,
  activeStepIndex,
  userPayload,
  isLoading,
  updateUserPayload
}) => {
  const { t } = useTranslation();
  const addCountry = (): void => {
    goBack(activeStepIndex - 1);
  };
  const updateCountryTax = (code: string): void => {
    updateUserPayload({
      socialSecurityNumber: userPayload.socialSecurityNumber.filter(
        (v: SocialSecurityInformation) => v.taxNumber !== code
      )
    });
  };
  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Heading title={t(`${taxescountry}.title`)} subTitle={t(`${taxescountry}.countrydetail`)} />
      {userPayload.socialSecurityNumber?.length > 0 &&
        userPayload.socialSecurityNumber.map((v: SocialSecurityInformation, i: number) => (
          <CountryCard
            key={i}
            imageSrc={getCountryFlag(v.iso)}
            text={v.country}
            code={v.taxNumber}
            isRemoveDisabled={v?.isDefault}
            onClick={(code) => {
              updateCountryTax(code);
            }}
            customStyle={{}}
          />
        ))}

      <Box
        onClick={addCountry}
        sx={{
          display: 'flex',
          gap: '10px',
          background: '#EBEBEB',
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

      <SubmitButton
        title={t(`${taxescountry}.continue`)}
        disabled={isLoading}
        isLoading={isLoading}
        sx={{ mt: 4 }}
        onClick={() => updateActiveStep()}
      />
    </Stack>
  );
};

export default CountryTaxes;
