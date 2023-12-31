/* eslint-disable no-unused-vars */
import React, { useCallback, useState, type FC } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import { Box, Button, Stack, Typography } from '@mui/material';
import Textfield from '@app/components/Textfield';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { type WithSignUpStepperContextProps, type CountrySelectOption } from '@app/common/types';
import CountrySelector from '@app/components/CountrySelector';
import { ALL_COUNTRIES } from '@app/constants/countries';

const SecurityNumber = RouteNames.SECURITY_NUMBER;

const SocialSecurityNumber: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  isLoading,
  userPayload
}) => {
  const { t } = useTranslation();
  const [currentInput, setCurrentInput] = useState('');
  const [textInputArray, setTextInputArray] = useState<string[]>([]);
  const [country, setCountry] = useState<CountrySelectOption | undefined>(
    ALL_COUNTRIES
      ? ALL_COUNTRIES[
          ALL_COUNTRIES.findIndex(
            (_: CountrySelectOption) => _.iso2 === userPayload.countryOfIncorporation
          )
        ]
      : undefined
  );
  const countrySelectHandler = (value: CountrySelectOption): void => {
    setCountry(value);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentInput(event.target.value);
  };
  const handleButtonClick = useCallback(() => {
    if (!currentInput) return;
    registerUser({
      payload: {
        countryOfIncorporation: country?.iso2,
        SocialSecurityNumber: [...textInputArray, currentInput],
        dryRun: true
      },

      onSuccess: () => {
        console.log('onSuccess called');
        setTextInputArray((prevArray) => {
          const updatedArray = [...prevArray, currentInput];
          return updatedArray;
        });
        setCurrentInput('');

        updateActiveStep();
      }
    });
  }, [currentInput, userPayload, updateActiveStep, textInputArray]);

  return (
    <>
      <Stack sx={{ width: '552px' }}>
        <Heading title={t(`${SecurityNumber}.title`)} subTitle={''} />
        <Box>
          <CountrySelector
            placeholder={
              ALL_COUNTRIES && ALL_COUNTRIES.length > 0 ? `${ALL_COUNTRIES[0].name}` : ''
            }
            // placeholder='selecting'
            onChange={countrySelectHandler}
            selectedCountry={country}
            readOnly={true}
          />
        </Box>
        <Typography sx={{ marginTop: '15px', width: '436px' }}>
          {t(`${SecurityNumber}.statesdetail`)}{' '}
        </Typography>
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
        <Button
          sx={{ marginTop: '20px', width: '400px' }}
          disabled={!currentInput}
          type="submit"
          onClick={handleButtonClick}>
          {t(`${SecurityNumber}.continue`)}
        </Button>
      </Stack>
    </>
  );
};

export default SocialSecurityNumber;
