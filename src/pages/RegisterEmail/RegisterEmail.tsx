import { Stack } from '@mui/material';
import Heading from '@app/components/Heading';
import { useState, useMemo, type FC } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import PrivacyTerms from '@app/components/PrivacyTerms';
import { InfoModal } from '@app/components/Modals';
import { type SubmitHandler, useForm, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import EmailField from '@app/components/EmailField/EmailField';
import { type WithSignUpStepperContextProps, type AuthFetchQueryError } from '@app/common/types';
import { ModalNames } from '@app/constants/modals';
import SubmitButton from '@app/components/SubmitButton';

interface IForm {
  email: string;
}

const translationNamespace = RouteNames.REGISTER_EMAIL;
const emailAlreadyRegisteredNamespace = ModalNames.EMAIL_ALREADY_REGISTERED;

const RegisterEmail: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  isLoading,
  userPayload
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError>();

  const schema = yup
    .object()
    .shape({
      email: yup.string().email().required()
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<IForm>({
    defaultValues: {
      email: userPayload.email
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IForm> = async () => {
    registerUser({
      payload: {
        email: getValues('email'),
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

  const isDisabled = useMemo(() => isLoading || errors.email, [isLoading || errors.email]);

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack>
        <Heading
          title={t(`${translationNamespace}.title`)}
          subTitle={t(`${translationNamespace}.subtitle`)}
        />
      </Stack>
      <Stack gap={3} mt={3} maxWidth={'43.6rem'}>
        <form
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event);
          }}>
          <EmailField
            label={t(`${translationNamespace}.email_input_label`)}
            register={register}
            name={'email'}
            fullWidth
            errorValue={errors?.email ?? fieldErrors}
          />

          <SubmitButton
            title={t(`${translationNamespace}.continue`)}
            disabled={isDisabled}
            isLoading={isLoading}
            sx={{ mt: 4 }}
          />
        </form>
        <InfoModal
          open={open}
          buttonText={t(`${emailAlreadyRegisteredNamespace}.login`)}
          title={t(`${emailAlreadyRegisteredNamespace}.title`)}
          subtitle={t(`${emailAlreadyRegisteredNamespace}.subtitle`)}
          handleClose={() => {
            setOpen(false);
          }}
        />

        <PrivacyTerms />
      </Stack>
    </Stack>
  );
};

export default RegisterEmail;
