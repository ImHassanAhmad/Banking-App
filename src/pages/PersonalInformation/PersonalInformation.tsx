import { Stack } from '@mui/material';
import Heading from '@app/components/Heading';
import { useState, type FC } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { type SubmitHandler, useForm, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Textfield from '@app/components/Textfield';
import Calendar from '@app/components/Calendar';
import { type AuthFetchQueryError, type WithSignUpStepperContextProps } from '@app/types/types';
import SubmitButton from '@app/components/SubmitButton';

interface IForm {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

const translationNamespace = RouteNames.PERSONAL_INFORMATION;

const PersonalInformation: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  isLoading,
  userPayload: { firstName, lastName, dateOfBirth }
}) => {
  const { t } = useTranslation();
  const [fieldErrors, setFieldErrors] = useState<FieldError>();

  const schema = yup
    .object()
    .shape({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      dateOfBirth: yup.string().required('Date of birth is required')
    })
    .required();

  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<IForm>({
    defaultValues: {
      firstName,
      lastName,
      dateOfBirth
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

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack>
        <Heading title={t(`${translationNamespace}.title`)} subTitle="" />
      </Stack>
      <Stack gap={3} mt={3}>
        <form
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event);
          }}>
          <Stack gap={2}>
            <Textfield
              name="firstName"
              label={t(`${translationNamespace}.first_name`)}
              register={register}
              defaultValue={firstName}
              errorValue={errors?.firstName ?? fieldErrors}
              fullWidth
            />

            <Textfield
              name="lastName"
              label={t(`${translationNamespace}.last_name`)}
              register={register}
              defaultValue={lastName}
              errorValue={errors?.lastName ?? fieldErrors}
              fullWidth
            />

            <Calendar
              name="dateOfBirth"
              control={control}
              label={t(`${translationNamespace}.DOB`)}
              defaultValue={dateOfBirth || getValues('dateOfBirth')}
              errorValue={errors?.dateOfBirth ?? fieldErrors}
            />
          </Stack>

          <SubmitButton
            title={t(`${translationNamespace}.continue`)}
            disabled={!!Object.keys(errors).length || isLoading}
            isLoading={isLoading}
            sx={{ mt: 4 }}
          />
        </form>
      </Stack>
    </Stack>
  );
};

export default PersonalInformation;
