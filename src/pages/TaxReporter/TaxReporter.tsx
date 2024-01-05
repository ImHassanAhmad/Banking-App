/* eslint-disable no-unused-vars */
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';
import Heading from '@app/components/Heading';
import { type WithSignUpStepperContextProps } from '@app/common/types';
import React, { useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Textfield from '@app/components/Textfield';
import SubmitButton from '@app/components/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { type SubmitHandler, useForm, type FieldError } from 'react-hook-form';

const taxreporter = RouteNames.TAX_REPORTER;
interface IForm {
  peselNumber: string;
}

const TaxReporter: React.FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  userPayload: { peselNumber }
}) => {
  const { t } = useTranslation();
  const [fieldErrors] = useState<FieldError>();
  const schema = yup
    .object()
    .shape({
      peselNumber: yup.string().required()
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IForm> = async (userPayload: IForm) => {
    registerUser({
      payload: {
        ...userPayload,
        dryRun: true
      },
      onSuccess: () => {
        updateActiveStep();
      }
    });
  };
  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack>
        <Heading title={t(`${taxreporter}.title`)} subTitle={t(`${taxreporter}.subtitle`)} />
      </Stack>
      <Stack></Stack>
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}>
        <Stack mt={3}>
          {' '}
          <Textfield
            name="peselNumber"
            label={t(`${taxreporter}.number_name`)}
            register={register}
            defaultValue={peselNumber}
            errorValue={errors?.peselNumber ?? fieldErrors}
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
          <SubmitButton
            title={t(`${taxreporter}.continue`)}
            sx={{ mt: 4 }}
            disabled={!!Object.keys(errors).length}
          />
        </Stack>
      </form>
    </Stack>
  );
};

export default TaxReporter;
