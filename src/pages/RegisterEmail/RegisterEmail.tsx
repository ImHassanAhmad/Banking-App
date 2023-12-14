import { Grid, Stack, Button } from '@mui/material';
import Heading from '@app/components/Heading';
import { useState, type FC } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { SignUpFlowSteps } from '@app/layout/SignUpStepper/types';
import { useSignUpStepper } from '@app/context/SignupStepperContext';
import PrivacyTerms from '@app/components/PrivacyTerms';
import { InfoModal } from '@app/components/Modals';
import { type SubmitHandler, useForm, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import BackButton from '@app/components/BackButton';
import EmailField from '@app/components/EmailField/EmailField';
import Loader from '@app/components/Loader';
import { type AuthFetchQueryError } from '@app/common/types';
import { ModalNames } from '@app/constants/modals';

interface IForm {
  email: string;
}

const translationNamespace = RouteNames.REGISTER_EMAIL;
const emailAlreadyRegisteredNamespace = ModalNames.EMAIL_ALREADY_REGISTERED;

const SignUp: FC = () => {
  const { t } = useTranslation();
  const { updateActiveStep, registerUser, isLoading, userPayload } = useSignUpStepper();
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
        updateActiveStep(SignUpFlowSteps.Mobile);
      },
      onError: (error: AuthFetchQueryError) => {
        setFieldErrors({
          type: 'disabled',
          message: error.message
        });
      }
    });
  };

  return (
    <Stack mt={4}>
      <BackButton
        onClick={() => {
          updateActiveStep(SignUpFlowSteps.Country);
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
            <Button
              disabled={isLoading}
              sx={{ textTransform: 'uppercase', marginTop: '20px' }}
              fullWidth
              type="submit">
              {t(`${translationNamespace}.continue`)} {isLoading && <Loader />}
            </Button>
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
      </Grid>
    </Stack>
  );
};

export default SignUp;
