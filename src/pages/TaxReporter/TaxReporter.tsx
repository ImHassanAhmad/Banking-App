/* eslint-disable no-unused-vars */
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';
import Heading from '@app/components/Heading';
import { type AuthFetchQueryError, type WithSignUpStepperContextProps } from '@app/common/types';
import { type SubmitHandler, useForm, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useMemo, useState } from 'react';
import { getCountryData } from 'countries-list';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Textfield from '@app/components/Textfield';
import SubmitButton from '@app/components/SubmitButton';

const taxreporter = RouteNames.TAX_REPORTER;

interface IForm {
  NICNumber: string;
}

const TaxReporter: React.FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  userPayload: { country, NICNumber }
}) => {
  const { t } = useTranslation();
  const [fieldErrors, setFieldErrors] = useState<FieldError>();

  const schema = yup
    .object()
    .shape({
      NICNumber: yup.string().required('Number is required')
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IForm>({
    defaultValues: {
      NICNumber
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IForm> = async (data: IForm) => {
    registerUser({
      payload: {
        ...data,
        dryRun: true
      },
      onSuccess: () => {
        updateActiveStep();
      },
      onError: (error: AuthFetchQueryError) => {
        setFieldErrors({
          type: 'disabled',
          message: error.message
        });
      }
    });
  };

  const countryData = useMemo(() => getCountryData(country), [country]);

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack>
        <Heading
          title={t(`${taxreporter}.title`)}
          subTitle={`${t(`${taxreporter}.subtitle`)} ${countryData?.name}.`}
        />
      </Stack>
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}>
        <Stack mt={3}>
          <Textfield
            name="NICNumber"
            label={t(`${taxreporter}.number_name`)}
            register={register}
            defaultValue={NICNumber}
            errorValue={errors?.NICNumber ?? fieldErrors}
            fullWidth
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
            <Typography variant="body2">{t(`${taxreporter}.stateserror`)}</Typography>
          </Box>

          <SubmitButton title={t(`${taxreporter}.continue`)} sx={{ mt: 4 }} />
        </Stack>
      </form>
    </Stack>
  );
};

export default TaxReporter;
