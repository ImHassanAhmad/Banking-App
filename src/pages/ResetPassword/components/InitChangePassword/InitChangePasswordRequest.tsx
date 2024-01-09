import BackButton from '@app/components/BackButton';
import Heading from '@app/components/Heading';
import TabTitle from '@app/components/TabTitle';
import Textfield from '@app/components/Textfield';
import WarningAlert from '@app/components/WarningAlert';
import { RouteNames } from '@app/constants/routes';
import { useAuthError } from '@app/context/AuthErrorContext';
import { useResetPasswordStepper } from '@app/context/ResetPasswordContext';
import { ResetPasswordFlowSteps } from '@app/layout/ResetPasswordStepper/types';
import { useInitPasswordRequestMutation } from '@app/store/api/reset-password';
import {
  AuthErrorLevel,
  type AuthFetchQueryError,
  type VerifyLoginOTPResponseDto
} from '@app/types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Grid, Stack } from '@mui/material';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

interface ILoginForm {
  email: string;
}

const translationNamespace = RouteNames.RESET_PASSWORD;

const schema = yup
  .object()
  .shape({
    email: yup.string().email('Email is invalid.').required('Email is required.')
  })
  .required();

const Login: FC = () => {
  const { t } = useTranslation();
  const {
    setActiveStep,
    setOtpId,
    setEmail,
    activeStep,
    activeStepError: error
  } = useResetPasswordStepper();
  const { updateError } = useAuthError();
  const navigate = useNavigate();
  const [initResetPassword, { isLoading }] = useInitPasswordRequestMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    shouldUseNativeValidation: true
  });

  const onSubmit = async (loginPayload: ILoginForm): Promise<void> => {
    initResetPassword({ ...loginPayload })
      .unwrap()
      .then((data: VerifyLoginOTPResponseDto) => {
        setOtpId(data.otpId);
        setEmail(loginPayload.email);
        setActiveStep(ResetPasswordFlowSteps.OtpVerify);
      })
      .catch(({ message, errorLevel }: AuthFetchQueryError) => {
        updateError(activeStep, { title: message, message, errorLevel });
      });
  };

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <TabTitle title="Reset Password" />
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
      />
      <Stack mt={5}>
        <Heading
          title={t(`${translationNamespace}.title`)}
          subTitle={t(`${translationNamespace}.subtitle`)}
        />
      </Stack>
      <Grid item xs={12} sm={10} md={10} lg={6}>
        <form
          role={'form-id'}
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event);
          }}>
          <Stack gap={3} mt={3}>
            <Textfield
              inputProps={{
                'data-testid': 'email-test-id'
              }}
              name="email"
              label={t(`${translationNamespace}.email_input_label`)}
              register={register}
              errorValue={errors.email}
              fullWidth
            />

            {error?.message && error.errorLevel !== AuthErrorLevel.System && (
              <WarningAlert message={error.message} />
            )}
            <Stack width={'100%'} height={'5.4rem'} alignItems={'center'} justifyContent={'center'}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  type="submit"
                  sx={{ textTransform: 'uppercase', width: '100%' }}
                  data-testid="login-submit">
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

export default Login;
