/* eslint-disable no-constant-condition */
import { getCountryFlag } from '@app/assets/flags';
import {
  type WithSignUpStepperContextProps,
  type AuthFetchQueryError,
  type RegisterUserRequestDto
} from '@app/common/types';
import Heading from '@app/components/Heading';
import { NotSupportedModal } from '@app/components/Modals';
import { NOT_SUPPORTED_MODES } from '@app/constants';
import { RouteNames } from '@app/constants/routes';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  type SelectChangeEvent,
  Typography
} from '@mui/material';
import Textfield from '@app/components/Textfield';
import {
  type TCountryCode,
  getCountryData,
  getCountryDataList,
  type ICountryData
} from 'countries-list';
import PhoneNumber, { type CountryCode } from 'libphonenumber-js';
import React, { useState, type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-phone-number-input/style.css';
import { type FieldError } from 'react-hook-form';
import { ALL_COUNTRIES } from '@app/constants/countries';
import Loader from '@app/components/Loader';

const mobileVerifyNamespace = RouteNames.MOBILE;
const translationNamespace = RouteNames.INVESTOR_SIGNUP;

const getCountryDataByPhone = (phoneCode: string): ICountryData => {
  const index: number = getCountryDataList().findIndex(
    (country: ICountryData) => country.phone[0].toString() === phoneCode
  );
  return getCountryDataList()[index];
};

const PhoneNumberField: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  userPayload: { phoneNumberCountryCode, shortenPhoneNumber, countryOfIncorporation },
  isLoading
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>(
    phoneNumberCountryCode
      ? getCountryDataByPhone(phoneNumberCountryCode).iso2
      : countryOfIncorporation ?? 'AT'
  );
  const [isValid, setIsValid] = useState<boolean>();
  const [regUserPayload, setRegUserPayload] = useState<RegisterUserRequestDto>({ dryRun: true });
  const [errors, setFieldErrors] = useState<FieldError>();
  const [open, setOpen] = useState<boolean>(false);

  const { formcontrol, selectText, textField, setIcon } = useStyles;

  const handleChangecountry = (event: SelectChangeEvent): void => {
    setValue(event.target.value);
  };

  const handleChange = (e: any): void => {
    const countrydata = PhoneNumber(e.target.value, { defaultCountry: value as CountryCode });
    setIsValid(countrydata?.isValid());
    setRegUserPayload({
      phoneNumberCountryCode: countrydata?.countryCallingCode,
      shortenPhoneNumber: countrydata?.nationalNumber,
      dryRun: true
    });
  };

  useEffect(() => {
    if (shortenPhoneNumber) {
      const countrydata = PhoneNumber(shortenPhoneNumber, { defaultCountry: value as CountryCode });
      setIsValid(countrydata?.isValid());
    }
  }, [shortenPhoneNumber]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const isValidNumber = /^\d+$/.test(keyValue);
    if (!isValidNumber) {
      e.preventDefault();
    }
  };

  const submit = (): void => {
    registerUser({
      payload: regUserPayload,
      onSuccess: () => {
        updateActiveStep();
      },
      onError: ({ message }: AuthFetchQueryError) => {
        setFieldErrors({
          type: 'disabled',
          message
        });
      }
    });
  };

  return (
    <Stack mt={5} className="phoneSelector">
      <Stack>
        <Heading
          title={t(`${mobileVerifyNamespace}.title`)}
          subTitle={t(`${mobileVerifyNamespace}.subtitle`)}
        />
      </Stack>
      <Stack gap={3} mt={3} maxWidth={'43.6rem'}>
        <FormControl fullWidth sx={formcontrol}>
          <Select
            sx={selectText}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            data-testid="phone-country-selector"
            value={value}
            onChange={handleChangecountry}
            IconComponent={() => <></>}
            renderValue={(value) => {
              const country = getCountryData(value as TCountryCode);
              return (
                <Stack direction={'row'} gap={1}>
                  <img src={getCountryFlag(country.iso2)} style={setIcon} />
                  <Typography>+{country.phone[0]}</Typography>
                </Stack>
              );
            }}
            MenuProps={{
              sx: {
                marginTop: '8px',
                marginLeft: '25px'
              }
            }}>
            {ALL_COUNTRIES.map(({ iso2: countryCode, name }) => (
              <MenuItem key={countryCode} value={countryCode} sx={{ minWidth: '250px' }}>
                <Stack direction={'row'} gap={1}>
                  <img src={getCountryFlag(countryCode)} style={setIcon} />
                  <Typography>{name}</Typography>
                </Stack>
              </MenuItem>
            ))}
          </Select>
          <Textfield
            type="text"
            placeholder=""
            data-testid="phone-input"
            inputProps={{
              onKeyPress: handleKeyPress
            }}
            autoFocus
            defaultValue={shortenPhoneNumber}
            onChange={handleChange}
            sx={textField}
            errorValue={errors}
          />
        </FormControl>
        <Button
          sx={{ textTransform: 'uppercase', height: '5.2rem' }}
          disabled={!isValid || isLoading}
          onClick={submit}>
          {' '}
          {t(`${translationNamespace}.continue`)} {isLoading && <Loader />}
        </Button>
        <NotSupportedModal
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
          country={ALL_COUNTRIES.find(({ iso2 }) => iso2 === value)}
          mode={NOT_SUPPORTED_MODES.phoneNumber}
        />
      </Stack>
    </Stack>
  );
};

export default PhoneNumberField;

const useStyles = {
  formcontrol: {
    display: 'flex',
    flexDirection: 'row',
    gap: '9px',
    height: '5.2rem'
  },
  selectText: {
    width: '10rem',
    height: '5.2rem',
    borderRadius: '8px',
    background: 'rgb(225,225,225)'
  },
  textField: {
    width: '33rem',
    height: '5.2rem',
    background: 'rgb(225,225,225)',
    borderRadius: '12px'
  },
  setIcon: {
    width: '24px',
    height: '24px',
    objectFit: 'cover'
  }
} as const;
