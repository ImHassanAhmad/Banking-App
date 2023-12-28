import { Stack, Button } from '@mui/material';
import Heading from '@app/components/Heading';
import { format } from 'date-fns';
import { useState, type FC } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { type SubmitHandler, useForm, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Textfield from '@app/components/Textfield';
import Calendar from '@app/components/Calendar';
import { type WithSignUpStepperContextProps } from '@app/common/types';

interface IForm {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
}

const translationNamespace = RouteNames.PERSONAL_INFORMATION;

const PersonalInformation: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  isLoading,
  userPayload
}) => {
  const { t } = useTranslation();
  const [fieldErrors] = useState<FieldError>();

  const schema = yup
    .object()
    .shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      dateOfBirth: yup.string()
    })
    .required();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm<IForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IForm> = async () => {
    updateActiveStep();
    console.log('data', format(new Date(getValues('dateOfBirth') as string), 'dd/MM/yyyy'));
  };

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack mt={4}>
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
              errorValue={errors?.firstName ?? fieldErrors}
              fullWidth
            />

            <Textfield
              name="lastName"
              label={t(`${translationNamespace}.last_name`)}
              register={register}
              errorValue={errors?.lastName ?? fieldErrors}
              fullWidth
            />

            <Calendar
              name="dateOfBirth"
              control={control}
              label={t(`${translationNamespace}.DOB`)}
              handleChange={(newValue) => {
                setValue('dateOfBirth', newValue);
              }}
              errorValue={errors?.dateOfBirth ?? fieldErrors}
            />
          </Stack>

          <Button
            disabled={!!Object.keys(errors).length}
            sx={{ textTransform: 'uppercase', marginTop: '2rem' }}
            fullWidth
            type="submit">
            {t(`${translationNamespace}.continue`)}
          </Button>
        </form>
      </Stack>
    </Stack>
  );
};

export default PersonalInformation;
