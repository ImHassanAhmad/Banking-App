import { Grid, Stack, Button, Typography, CircularProgress } from '@mui/material';
import Heading from '@app/components/Heading';
import React, { type FC } from 'react';
import PasswordField from '@app/components/PasswordField';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { type VerifyLoginOTPResponseDto, type ILoginForm } from '@app/types/types';
import Textfield from '@app/components/Textfield';
import { getQueryParam } from '@app/utils/queryParams';
import { useLocation } from 'react-router-dom';
import BackButton from '@app/components/BackButton';
import { useLoginUserMutation } from '@app/store/api/login';
import { useLoginStepper } from '@app/context/LoginStepperContext';
import { LoginFlowSteps } from '@app/layout/LoginStepper/types';
import WarningAlert from '@app/components/WarningAlert';
import { AuthErrorLevel, type AuthFetchQueryError } from '@app/common/types';
import { useAuthError } from '@app/context/AuthErrorContext';
import ReCAPTCHA from 'react-google-recaptcha';

const translationNamespace = RouteNames.LOGIN;

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required()
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

  const reRef = React.createRef<ReCAPTCHA>();
  const SiteKey = process.env.REACT_APP_GOOGLE_RECAPTHA_SITEKEY;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    shouldUseNativeValidation: true
  });

  const onSubmit = async (loginPayload: ILoginForm): Promise<void> => {
    const captchaRef = reRef.current;

    // Ensure the reCAPTCHA instance is available
    if (captchaRef) {
      const captchaToken = await captchaRef.executeAsync();

      // Reset the reCAPTCHA response to allow it to be executed again
      captchaRef.reset();

      login({ ...loginPayload, captchaToken })
        .unwrap()
        .then((data: VerifyLoginOTPResponseDto) => {
          setOtpId(data.otpId);
          setEmail(loginPayload.email);
          setActiveStep(LoginFlowSteps.LoginOtpVerify);
        })
        .catch(({ message, errorLevel }: AuthFetchQueryError) => {
          updateError(activeStep, { title: message, message, errorLevel });
        });
    }
  };

  return (
    <Stack mt={4}>
      <BackButton
        onClick={() => {
          navigate(-1);
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
              navigate(`/${RouteNames.SIGNUP}`);
            }}
          />
        )}
      </Stack>
      <Grid item xs={12} sm={10} md={8} lg={8}>
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
            <ReCAPTCHA sitekey={SiteKey ?? ''} size="invisible" ref={reRef} />
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
            }}>
            {t(`${translationNamespace}.forgot_password`)}
          </Typography>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default Login;
