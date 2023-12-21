import { Stack, Button } from '@mui/material';
import Heading from '@app/components/Heading';
import { useState, type FC } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { type SubmitHandler, useForm, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Textfield from '@app/components/Textfield';
import { type SignUpStepperContextProps } from '@app/common/types';

interface IForm {
  postalCode: string;
  city: string;
  street: string;
  houseNo: string;
}

const translationNamespace = RouteNames.ADDRESS;

const Address: FC<SignUpStepperContextProps> = ({
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
      postalCode: yup.string().required(),
      city: yup.string().required(),
      street: yup.string().required(),
      houseNo: yup.string().required()
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<IForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IForm> = async () => {
    console.log('data', getValues());
    updateActiveStep();
  };

  return (
    <Stack mt={4}>
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
              name="postalCode"
              label={t(`${translationNamespace}.postal_code`)}
              register={register}
              errorValue={errors?.postalCode ?? fieldErrors}
              fullWidth
            />

            <Textfield
              name="city"
              label={t(`${translationNamespace}.city`)}
              register={register}
              errorValue={errors?.city ?? fieldErrors}
              fullWidth
            />

            <Textfield
              name="street"
              label={t(`${translationNamespace}.street`)}
              register={register}
              errorValue={errors?.street ?? fieldErrors}
              fullWidth
            />

            <Textfield
              name="houseNo"
              label={t(`${translationNamespace}.houseNo`)}
              register={register}
              errorValue={errors?.houseNo ?? fieldErrors}
              fullWidth
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

export default Address;
