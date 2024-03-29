import { Stack, Box } from '@mui/material';
import Heading from '@app/components/Heading';
import React, { useState, type FC } from 'react';
import PasswordField from '@app/components/PasswordField';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Subtract from '@app/assets/images/Subtract.svg';
import { type FieldError } from 'react-hook-form';
import {
  type RegisterUserResponseDto,
  type AuthFetchQueryError,
  AuthErrorLevel,
  type WithSignUpStepperContextProps,
  type UserRequestDto
} from '@app/types/types';
import WarningAlert from '@app/components/WarningAlert';
import SubmitButton from '@app/components/SubmitButton';

const translationNamespace = RouteNames.CREATE_PASSWORD;

const Password: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  setUserId,
  isLoading,
  activeStepError: error
}) => {
  const { t } = useTranslation();
  const [regUserPayload, setRegUserPayload] = useState<UserRequestDto>({ dryRun: true });
  const [errors, setFieldErrors] = useState<FieldError>();
  // const reRef = React.createRef<ReCAPTCHA>();
  // const SiteKey = process.env.REACT_APP_GOOGLE_RECAPTHA_SITEKEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegUserPayload({
      password: e.target.value,
      dryRun: false
    });
  };

  const submit = async (): Promise<void> => {
    // // TODO make recaptcha token validation functional
    // const captchaRef = reRef.current;
    // const captchaToken = await captchaRef?.executeAsync();

    // Reset the reCAPTCHA response to allow it to be executed again
    // captchaRef?.reset();

    registerUser({
      payload: { ...regUserPayload },
      onSuccess: ({ userId }: RegisterUserResponseDto) => {
        setUserId(userId);
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
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack>
        <Heading
          title={t(`${translationNamespace}.title`)}
          subTitle={t(`${translationNamespace}.subtitle`)}
        />
      </Stack>
      <Stack gap={3} mt={3} sx={{ maxWidth: '43.6rem' }}>
        <PasswordField
          label={t(`${translationNamespace}.password_input_label`)}
          errorValue={errors}
          onChange={handleChange}
        />
        {error?.errorLevel === AuthErrorLevel.Account && (
          <WarningAlert message={error?.message ?? ''} />
        )}

        <SubmitButton
          startIcon={<Box component="img" src={Subtract} alt="auth" />}
          title={t(`${translationNamespace}.create_account`)}
          disabled={isLoading}
          isLoading={isLoading}
          onClick={() => {
            submit().catch((e) => {
              // TODO handle error cases
            });
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Password;
