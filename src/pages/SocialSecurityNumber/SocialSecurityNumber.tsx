/* eslint-disable no-unused-vars */
import React, { useState, type FC, useEffect } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import { Box, Stack, Typography } from '@mui/material';
import Textfield from '@app/components/Textfield';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  type WithSignUpStepperContextProps,
  type CountrySelectOption,
  type SocialSecurityInformation
} from '@app/common/types';
import CountrySelector from '@app/components/CountrySelector';
import { ALL_COUNTRIES } from '@app/constants/countries';
import SubmitButton from '@app/components/SubmitButton';

const SecurityNumber = RouteNames.SECURITY_NUMBER;

const SocialSecurityTax: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  updateUserPayload,
  isLoading,
  userPayload
}) => {
  const { t } = useTranslation();
  const [currentInput, setCurrentInput] = useState('');
  const [country, setCountry] = useState<CountrySelectOption | undefined>();
  const countrySelectHandler = (value: CountrySelectOption): void => {
    setCountry(value);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentInput(event.target.value);
  };

  useEffect(() => {
    if (!userPayload.isUsResident) return;
    if (userPayload.socialSecurityNumber.some((ssn: SocialSecurityInformation) => ssn.iso === 'US'))
      return;

    setCountry(
      ALL_COUNTRIES ? ALL_COUNTRIES.find((_: CountrySelectOption) => _.iso2 === 'US') : undefined
    );

    // Dependencies array to control the rerun of this effect; only when userPayload.usResident changes.
  }, [userPayload.isUsResident, userPayload.socialSecurityNumber]);

  const handleSubmit = (): void => {
    // if (!currentInput || !country) return updateActiveStep();
    updateUserPayload({
      socialSecurityNumber: [
        ...userPayload.socialSecurityNumber,
        { country: country?.name, taxNumber: currentInput, iso: country?.iso2 }
      ]
    });
    updateActiveStep();
  };

  return (
    <>
      <Stack mt={4} sx={{ width: '100%' }}>
        <Heading title={t(`${SecurityNumber}.title`)} subTitle={''} />
        <Box
          sx={{
            '& .css-111er8s-MuiFormControl-root-MuiTextField-root': {
              background: 'white',
              borderRadius: '12px'
            },
            '& .css-pqyibd-MuiInputBase-root-MuiOutlinedInput-root': {
              background: 'white',
              borderRadius: '12px'
            },
            '& .styles_arrow__rDwFn': {
              position: 'absolute',
              right: '0px',
              left: '30%'
            },
            '& css-124nlmo .styles_arrow__rDwFn': {
              position: 'absolute',
              right: '0px',
              left: '30%'
            },
            '& .styles_search__K1Wxz': {
              position: 'absolute',
              right: '0px',
              left: '30%'
            }
          }}>
          <CountrySelector
            placeholder={country?.name ?? 'Select Country'}
            onChange={countrySelectHandler}
            selectedCountry={country}
          />
        </Box>
        <Typography>{t(`${SecurityNumber}.statesdetail`)} </Typography>

        <Box sx={{ marginTop: '20px' }}>
          <Textfield fullWidth value={currentInput} onChange={handleInputChange} />

          <Box
            sx={{
              display: 'flex',
              gap: '5px',
              background: '#EBEBEB',
              borderRadius: '10px',
              marginTop: '10px',
              alignItems: 'center',
              height: '40px',
              padding: '5px'
            }}>
            <ErrorOutlineIcon />

            <Typography variant="body2">{t(`${SecurityNumber}.stateserror`)}</Typography>
          </Box>
        </Box>

        <SubmitButton
          title={t(`${SecurityNumber}.continue`)}
          disabled={isLoading}
          isLoading={isLoading}
          sx={{ mt: 4 }}
          onClick={handleSubmit}
        />
      </Stack>
    </>
  );
};

export default SocialSecurityTax;
