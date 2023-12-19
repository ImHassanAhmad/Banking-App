import { Grid, Stack, Button, InputAdornment, Box, Autocomplete, TextField } from '@mui/material';
import Heading from '@app/components/Heading';
import { useState, type FC } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { SignUpFlowSteps } from '@app/layout/SignUpStepper/types';
import { useSignUpStepper } from '@app/context/SignupStepperContext';
import PrivacyTerms from '@app/components/PrivacyTerms';
// import { EmailAlreadyRegisteredModal } from '@app/components/Modals';
import { type SubmitHandler, useForm, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import BackButton from '@app/components/BackButton';
import Textfield from '@app/components/Textfield';
import Loader from '@app/components/Loader';
import { SEARCH_ICON2 } from '@app/assets/images';
import Calendar from '@app/components/Calendar';

interface IForm {
  companyName: string;
  registrationNumber: string;
  dateOfRegister: string;
}

const translationNamespace = RouteNames.COMPANY_INFORMATION;

const CompanyInformation: FC = () => {
  const { t } = useTranslation();
  const { updateActiveStep, registerUser, isLoading, userPayload } = useSignUpStepper();
  // const [open, setOpen] = useState<boolean>(false);
  const [fieldErrors] = useState<FieldError>();

  const schema = yup
    .object()
    .shape({
      companyName: yup.string().required(),
      registrationNumber: yup.string().required(),
      dateOfRegister: yup.string().required()
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<IForm>({
    defaultValues: {
      companyName: userPayload.companyName ?? '',
      registrationNumber: userPayload.registrationNumber,
      dateOfRegister: userPayload.dateOfRegister
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IForm> = async () => {
    registerUser({
      payload: {
        companyName: getValues('companyName'),
        registrationNumber: getValues('registrationNumber'),
        dateOfRegister: getValues('dateOfRegister'),
        dryRun: true
      },
      onSuccess: () => {
        updateActiveStep(SignUpFlowSteps.Mobile);
      }
    });
  };

  return (
    <Stack mt={4}>
      <BackButton />
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
            <Stack gap={2}>
              <Autocomplete
                fullWidth
                disablePortal
                id="company name"
                options={[
                  { label: 'W1tty', value: 'w1tty' },
                  { label: 'Apple', value: 'apple' },
                  { label: 'Microsoft', value: 'microsoft' }
                ]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register('companyName')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box
                            component="img"
                            src={SEARCH_ICON2}
                            alt="search"
                            sx={{
                              position: 'absolute'
                            }}
                          />
                        </InputAdornment>
                      )
                    }}
                    fullWidth
                    label={t(`${translationNamespace}.company_name`)}
                  />
                )}
              />

              <Textfield
                name="registrationNumber"
                label={t(`${translationNamespace}.registration_number`)}
                register={register}
                errorValue={errors?.registrationNumber ?? fieldErrors}
                fullWidth
              />

              <Calendar
                name="dateOfRegister"
                label={t(`${translationNamespace}.date_of_register`)}
                errorValue={errors?.dateOfRegister ?? fieldErrors}
              />
            </Stack>

            <Button
              disabled={isLoading}
              sx={{ textTransform: 'uppercase', marginTop: '20px' }}
              fullWidth
              type="submit">
              {t(`${translationNamespace}.continue`)} {isLoading && <Loader />}
            </Button>
          </form>
          <PrivacyTerms />
        </Stack>
      </Grid>
    </Stack>
  );
};

export default CompanyInformation;
