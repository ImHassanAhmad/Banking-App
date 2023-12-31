import { type AuthFetchQueryError, type WithSignUpStepperContextProps } from '@app/common/types';
import Heading from '@app/components/Heading';
import { RouteNames } from '@app/constants/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import Textfield from '@app/components/Textfield';
import { useState, type FC } from 'react';
import { type SubmitHandler, useForm, type FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const businessDescriptionNamespace = RouteNames.BUSINESS_DESCRIPTION;

interface IForm {
  description: string;
}

const schema = yup
  .object()
  .shape({
    description: yup.string().min(100).required()
  })
  .required();

const BusinessDescription: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser
}) => {
  const { t } = useTranslation();
  const [fieldErrors, setFieldErrors] = useState<FieldError>();

  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors }
  } = useForm<IForm>({
    defaultValues: {
      description: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IForm> = async (): Promise<void> => {
    registerUser({
      payload: {
        description: getValues('description')
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
    <Stack sx={{ width: '100%' }}>
      <Stack mt={4}>
        <Heading
          title={t(`${businessDescriptionNamespace}.title`)}
          subTitle={t(`${businessDescriptionNamespace}.subtitle`)}
        />
      </Stack>
      <Stack gap={3} mt={3} sx={{ maxWidth: '43.6rem' }}>
        <form
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event);
          }}>
          <Textfield
            register={register}
            multiline
            rows={5}
            name="description"
            label={t(`${businessDescriptionNamespace}.placeholder`)}
            fullWidth
            InputProps={{
              style: {
                minHeight: '14.8rem',
                fontSize: '1.5rem'
              }
            }}
            errorValue={errors?.description ?? fieldErrors}
            sx={{
              fontStyle: 'normal',
              fontWeight: 450
            }}
          />
          <Stack mt={4}>
            <Button type="submit" sx={{ textTransform: 'uppercase', width: '100%' }}>
              {t(`${businessDescriptionNamespace}.continue`)}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default BusinessDescription;
