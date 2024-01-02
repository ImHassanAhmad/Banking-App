/* eslint-disable no-unused-vars */
import React, { useState, type FC, useEffect } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import { Box, Button, Stack, Typography } from '@mui/material';
import Textfield from '@app/components/Textfield';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  type WithSignUpStepperContextProps,
  type CountrySelectOption,
  type SocialSecurityNumber
} from '@app/common/types';
import CountrySelector from '@app/components/CountrySelector';
import { ALL_COUNTRIES } from '@app/constants/countries';

const SecurityNumber = RouteNames.SECURITY_NUMBER;

const SocialSecurityTax: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  updateUserPayload,
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
    if (
      userPayload.isUsResident &&
      !userPayload.socialSecurityNumber.some((ssn: SocialSecurityNumber) => ssn.iso === 'US')
    ) {
      setCountry(
        ALL_COUNTRIES ? ALL_COUNTRIES.find((_: CountrySelectOption) => _.iso2 === 'US') : undefined
      );
    }
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
      <Stack sx={{ width: '552px' }}>
        <Heading title={t(`${SecurityNumber}.title`)} subTitle={''} />
        <Box
          sx={{
            '& .css-111er8s-MuiFormControl-root-MuiTextField-root': {
              background: 'white',
              width: '200px',
              borderRadius: '12px'
            },
            '& .css-pqyibd-MuiInputBase-root-MuiOutlinedInput-root': {
              background: 'white',
              width: '200px',
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
        <Typography sx={{ width: '436px' }}>{t(`${SecurityNumber}.statesdetail`)} </Typography>
        <Box sx={{ marginTop: '20px' }}>
          <Textfield sx={{ width: '400px' }} value={currentInput} onChange={handleInputChange} />

          <Box
            sx={{
              display: 'flex',
              gap: '5px',
              background: '#EBEBEB',
              borderRadius: '10px',
              marginTop: '10px',
              width: '300px',
              alignItems: 'center',
              height: '40px',
              padding: '5px'
            }}>
            <ErrorOutlineIcon />

            <Typography variant="body2">{t(`${SecurityNumber}.stateserror`)}</Typography>
          </Box>
        </Box>
        <Button sx={{ marginTop: '20px', width: '400px' }} type="submit" onClick={handleSubmit}>
          {t(`${SecurityNumber}.continue`)}
        </Button>
      </Stack>
    </>
  );
};

export default SocialSecurityTax;
