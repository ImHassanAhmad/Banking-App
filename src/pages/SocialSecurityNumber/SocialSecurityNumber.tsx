/* eslint-disable no-unused-vars */
import React, { useState, type FC, useEffect } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import { Box, Stack, Typography } from '@mui/material';
import Textfield from '@app/components/Textfield';
import { type SubmitHandler, useForm, type FieldError, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  type WithSignUpStepperContextProps,
  type CountrySelectOption,
  type SocialSecurityInformation
} from '@app/common/types';
import CountrySelector from '@app/components/CountrySelector';
import { ALL_COUNTRIES } from '@app/constants/countries';
import SubmitButton from '@app/components/SubmitButton';

interface IForm {
  securityNumber: string;
  country: string;
}

const translationNamespace = RouteNames.SECURITY_NUMBER;

const SocialSecurityTax: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  updateUserPayload,
  isLoading,
  userPayload: { socialSecurityNumber, isUsResident }
}) => {
  const { t } = useTranslation();

  const [fieldErrors] = useState<FieldError>();

  const schema = yup
    .object()
    .shape({
      securityNumber: yup.string().required('Security number is required'),
      country: yup.string().required('Country is required')
    })
    .required();

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    control,
    formState: { errors }
  } = useForm<IForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const [country, setCountry] = useState<CountrySelectOption | undefined>();
  const countrySelectHandler = (value: CountrySelectOption): void => {
    setCountry(value);
    setValue('country', value?.name);
    void trigger('country');
  };

  useEffect(() => {
    if (!isUsResident) return;
    if (socialSecurityNumber.some((ssn: SocialSecurityInformation) => ssn.iso === 'US')) return;

    const USCountryData = ALL_COUNTRIES
      ? ALL_COUNTRIES.find((_: CountrySelectOption) => _.iso2 === 'US')
      : undefined;

    if (USCountryData) {
      setCountry(USCountryData);
      setValue('country', USCountryData?.name);
    }

    // Dependencies array to control the rerun of this effect; only when userPayload.usResident changes.
  }, [isUsResident, socialSecurityNumber]);

  const onSubmit: SubmitHandler<IForm> = async (data: IForm) => {
    updateUserPayload({
      socialSecurityNumber: [
        ...socialSecurityNumber,
        { country: data?.country, taxNumber: data?.securityNumber, iso: country?.iso2 }
      ]
    });
    updateActiveStep();
  };

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}>
        <Heading title={t(`${translationNamespace}.title`)} subTitle={''} />
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
          <Controller
            name="country"
            control={control}
            render={() => (
              <CountrySelector
                placeholder={country?.name ?? 'Select Country'}
                onChange={countrySelectHandler}
                selectedCountry={country}
                error={errors?.country?.message}
                isDisabled={isUsResident}
              />
            )}
          />
        </Box>
        <Typography>{t(`${translationNamespace}.states_detail`)} </Typography>

        <Box sx={{ marginTop: '2rem' }}>
          <Textfield
            name="securityNumber"
            label={t(`${translationNamespace}.input_label`)}
            fullWidth
            register={register}
            errorValue={errors?.securityNumber ?? fieldErrors}
          />
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
            <Typography variant="body2">{t(`${translationNamespace}.states_error`)}</Typography>
          </Box>
        </Box>
        <SubmitButton
          title={t(`${translationNamespace}.continue`)}
          disabled={isLoading}
          isLoading={isLoading}
          sx={{ mt: 4 }}
        />
      </form>
    </Stack>
  );
};

export default SocialSecurityTax;
