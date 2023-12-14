import BackButton from '@app/components/BackButton';
import Heading from '@app/components/Heading';
// import TextFieldComp from '@app/components/Textfield/Textfield';
import { RouteNames } from '@app/constants/routes';
import { useSignUpStepper } from '@app/context/SignupStepperContext';
import { SignUpFlowSteps } from '@app/layout/SignUpStepper/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, TextField } from '@mui/material';
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
    description: yup.string().min(180).required()
  })
  .required();

const BusinessDescription: FC = () => {
  const { t } = useTranslation();
  const { updateActiveStep } = useSignUpStepper();

  const { handleSubmit } = useForm<IForm>({
    defaultValues: {
      description: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  return (
    <Stack>
      <BackButton
        onClick={() => {
          updateActiveStep(SignUpFlowSteps.BusinessCategory);
        }}
      />
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
        <TextField
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
