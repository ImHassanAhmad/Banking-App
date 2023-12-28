import { type WithSignUpStepperContextProps } from '@app/common/types';
import Heading from '@app/components/Heading';
import { RouteNames } from '@app/constants/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import Textfield from '@app/components/Textfield';
import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
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

  const { handleSubmit, getValues, register } = useForm<IForm>({
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
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}>
        <Textfield
          register={register}
          multiline
          minRows={4}
          maxRows={15}
          name="description"
          label={t(`${businessDescriptionNamespace}.placeholder`)}
          fullWidth
          sx={{
            minHeight: '10rem',
            fontSize: '1rem',
            fontStyle: 'normal',
            fontWeight: 450,
            lineHeight: '1.25rem',
            letterSpacing: '0.02rem'
          }}
        />

        <Stack mt={4}>
          <Button type="submit" sx={{ textTransform: 'uppercase', width: '100%' }}>
            {t(`${businessDescriptionNamespace}.continue`)}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default BusinessDescription;
