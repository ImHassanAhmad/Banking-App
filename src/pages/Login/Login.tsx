import BackButton from '@app/components/BackButton';
import Heading from '@app/components/Heading';
import PasswordField from '@app/components/PasswordField';
import TabTitle from '@app/components/TabTitle';
import Textfield from '@app/components/Textfield';
import WarningAlert from '@app/components/WarningAlert';
import { RouteNames } from '@app/constants/routes';
import { useAuthError } from '@app/context/AuthErrorContext';
import { useLoginStepper } from '@app/context/LoginStepperContext';
import { LoginFlowSteps } from '@app/layout/LoginStepper/types';
import { useLoginUserMutation } from '@app/store/api/login';
import {
  AuthErrorLevel,
  type AuthFetchQueryError,
  type ILoginForm,
  type VerifyLoginOTPResponseDto
} from '@app/types/types';
import { getQueryParam } from '@app/utils/queryParams';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';

const translationNamespace = RouteNames.LOGIN;

const schema = yup
  .object()
  .shape({
    email: yup.string().email('Email is invalid.').required('Email is required.'),
    password: yup.string().required('Password is required')
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
  } = useLoginStepper();
  const { updateError } = useAuthError();
  const location = useLocation();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginUserMutation();
  const recentlyRegistered = getQueryParam('recentlyRegistered', location);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    shouldUseNativeValidation: true
  });

  const onSubmit = async (loginPayload: ILoginForm): Promise<void> => {
    login({ ...loginPayload, captchaToken: 'captcha' })
      .unwrap()
      .then((data: VerifyLoginOTPResponseDto) => {
        setOtpId(data.otpId);
        setEmail(loginPayload.email);
        setActiveStep(LoginFlowSteps.LoginOtpVerify);
      })
      .catch(({ message, errorLevel }: AuthFetchQueryError) => {
        updateError(activeStep, { title: message, message, errorLevel });
      });
  };

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <TabTitle title="Login Page" />
      <BackButton
        onClick={() => {
          recentlyRegistered ? navigate('/') : navigate(-1);
        }}
      />
      <Stack mt={5}>
        {recentlyRegistered ? (
          <Heading
            title={t(`${translationNamespace}.created_title`)}
            subTitle={t(`${translationNamespace}.created_subtitle`)}
          />
        ) : (
          <Heading
            title={t(`${translationNamespace}.title`)}
            subTitle={t(`${translationNamespace}.subtitle`)}
            subTitleAnchor={t(`${translationNamespace}.signup`)}
            subTitleAnchorClick={() => {
              navigate(`/${RouteNames.INVESTOR_SIGNUP}`);
            }}
          />
        )}
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
            <PasswordField
              inputProps={{
                'data-testid': 'password-test-id'
              }}
              name="password"
              register={register}
              errorValue={errors.password}
              label={t(`${translationNamespace}.password_input_label`)}
              noPopper
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
                  data-testid="login-submit"
                  // TODO: remove the below commented line as it is not require
                  // onClick={() => {
                  //   navigate(`/${RouteNames.ACCOUNTS}`);
                  // }}
                >
                  {t(`${translationNamespace}.login`)}
                </Button>
              )}
            </Stack>
          </Stack>
        </form>

        <Stack gap={3} mt={3}>
          <Typography
            sx={{
              cursor: 'pointer',
              textDecorationLine: 'underline',
              letterSpacing: '0.02rem'
            }}
            onClick={() => {
              navigate(`/${RouteNames.RESET_PASSWORD}`);
            }}>
            {t(`${translationNamespace}.forgot_password`)}
          </Typography>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default Login;
