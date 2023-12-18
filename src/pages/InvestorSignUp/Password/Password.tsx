import { Grid, Stack, Button, Box } from '@mui/material';
import Heading from '@app/components/Heading';
import React, { useState, type FC } from 'react';
import PasswordField from '@app/components/PasswordField';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Subtract from '@app/assets/images/Subtract.svg';
import { useInvestorSignUpStepper } from '@app/context/InvestorSignUpStepperContext';
import { InvestorSignUpFlowSteps } from '@app/layout/InvestorSignUpStepper/types';
import { type FieldError } from 'react-hook-form';
import {
  type RegisterUserResponseDto,
  type RegisterUserRequestDto,
  type AuthFetchQueryError,
  AuthErrorLevel
} from '@app/common/types';
import BackButton from '@app/components/BackButton';
import Loader from '@app/components/Loader';
import ReCAPTCHA from 'react-google-recaptcha';
import WarningAlert from '@app/components/WarningAlert';

const translationNamespace = RouteNames.CREATE_PASSWORD;

const Password: FC = () => {
  const { t } = useTranslation();
  const {
    updateActiveStep,
    registerUser,
    setUserId,
    isLoading,
    activeStepError: error
  } = useInvestorSignUpStepper();
  const [regUserPayload, setRegUserPayload] = useState<RegisterUserRequestDto>({ dryRun: true });
  const [errors, setFieldErrors] = useState<FieldError>();

  const reRef = React.createRef<ReCAPTCHA>();
  const SiteKey = process.env.REACT_APP_GOOGLE_RECAPTHA_SITEKEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegUserPayload({
      password: e.target.value,
      dryRun: false
    });
  };

  const submit = async (): Promise<void> => {
    // TODO make recaptcha token validation functional
    const captchaRef = reRef.current;
    const captchaToken = await captchaRef?.executeAsync();

    // Reset the reCAPTCHA response to allow it to be executed again
    captchaRef?.reset();

    registerUser({
      payload: { ...regUserPayload, captchaToken },
      onSuccess: ({ userId }: RegisterUserResponseDto) => {
        setUserId(userId);
        updateActiveStep(InvestorSignUpFlowSteps.EmailVerify);
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
    <Stack mt={4}>
      <BackButton
        onClick={() => {
          updateActiveStep(InvestorSignUpFlowSteps.AboutOurServices);
        }}
      />
      <Stack mt={4}>
        <Heading
          title={t(`${translationNamespace}.title`)}
          subTitle={t(`${translationNamespace}.subtitle`)}
        />
      </Stack>
      <Grid item xs={12} sm={10} md={8} lg={8}>
        <Stack gap={3} mt={3}>
          <PasswordField
            label={t(`${translationNamespace}.password_input_label`)}
            errorValue={errors}
            onChange={handleChange}
          />
          {error?.errorLevel === AuthErrorLevel.Account && (
            <WarningAlert message={error?.message ?? ''} />
          )}
          <ReCAPTCHA sitekey={SiteKey ?? ''} size="invisible" ref={reRef} />
          <Button
            startIcon={<Box component="img" src={Subtract} alt="auth" />}
            sx={{ textTransform: 'uppercase' }}
            disabled={isLoading}
            onClick={() => {
              submit().catch((e) => {
                // TODO handle error cases
              });
            }}>
            {t(`${translationNamespace}.create_account`)} {isLoading && <Loader />}
          </Button>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default Password;
