import { Grid, Stack, Button, CircularProgress } from '@mui/material';
import Heading from '@app/components/Heading';
import React, { type FC } from 'react';
import PasswordField from '@app/components/PasswordField';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthError } from '@app/context/AuthErrorContext';
import { type ChangePasswordRequest } from '../../types';
import { useSaveChangePasswordMutation } from '@app/store/api/reset-password';
import { type AuthFetchQueryError } from '@app/common/types';
import { useResetPasswordStepper } from '@app/context/ResetPasswordContext';

const translationNamespace = RouteNames.RESET_PASSWORD;

const schema = yup
  .object()
  .shape({
    password: yup.string().required('Password is required'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm Password is required')
  })
  .required();

const ChangePasswordForm: FC = () => {
  const { t } = useTranslation();
  const { otpId, activeStep } = useResetPasswordStepper();
  const { updateError } = useAuthError();
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useSaveChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Omit<ChangePasswordRequest, 'email'>>({
    resolver: yupResolver(schema),
    shouldUseNativeValidation: true
  });

  const onSubmit = async (loginPayload: Omit<ChangePasswordRequest, 'email'>): Promise<void> => {
    changePassword({ ...loginPayload, email: otpId })
      .unwrap()
      .then((data: any) => {
        navigate(`/${RouteNames.LOGIN}`, { replace: true });
      })
      .catch(({ message, errorLevel }: AuthFetchQueryError) => {
        updateError(activeStep, { title: message, message, errorLevel });
      });
  };

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack mt={5}>
        <Heading title={t(`${translationNamespace}.title`)} subTitle={''} />
      </Stack>
      <Grid item xs={12} sm={10} md={10} lg={6}>
        <form
          role={'reset-password'}
          onSubmit={(event) => {
            console.log('asdsad');
            void handleSubmit(onSubmit)(event);
          }}>
          <Stack gap={3} mt={3}>
            <PasswordField
              inputProps={{
                'data-testid': 'password-test-id'
              }}
              name="password"
              register={register}
              errorValue={errors.password}
              label={t(`${translationNamespace}.password_input_label`)}
            />

            <PasswordField
              inputProps={{
                'data-testid': 'repeat-password-test-id'
              }}
              name="repeatPassword"
              register={register}
              errorValue={errors.repeatPassword}
              label={t(`${translationNamespace}.repeat_password_input_label`)}
              noPopper
            />

            <Stack width={'100%'} height={'5.4rem'} alignItems={'center'} justifyContent={'center'}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  type="submit"
                  sx={{ textTransform: 'uppercase', width: '100%' }}
                  data-testid="save-submit"
                  // TODO: remove the below commented line as it is not require
                  // onClick={() => {
                  //   navigate(`/${RouteNames.ACCOUNTS}`);
                  // }}
                >
                  {t(`${translationNamespace}.continue`)}
                </Button>
              )}
            </Stack>
          </Stack>
        </form>
      </Grid>
    </Stack>
  );
};

export default ChangePasswordForm;
