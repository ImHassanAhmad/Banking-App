import { type FC } from 'react';
import { Box, Button } from '@mui/material';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import Textfield from '@app/components/Textfield';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UploadField from '../UploadFile/UploadFile';
import type { IKycForm, IKycProps } from '../../types';
import BackButton from '@app/components/BackButton';
import { useAppSelector } from '@app/store/hooks';
import { useIssuerDetailsMutation } from '@app/store/api/onboarding';
import type { IssuerDetailsEntity } from '@app/server/database/entity';

const translationNamespace = RouteNames.POST_ONBOARDING;

const Kyc: FC<IKycProps> = ({ submit, back, uploadedFiles, setter }) => {
  const { email } = useAppSelector((state) => state.userData);
  const { kyc: kycState } = useAppSelector((state) => state.postOnboarding);

  const { t } = useTranslation();
  const [postDetails] = useIssuerDetailsMutation();

  const defaultValue: IKycForm = { name: '', email: '', phone: '', role: '' };

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    role: yup.string().required('Role is required')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<IKycForm>({
    defaultValues: kycState ?? defaultValue,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IKycForm> = (data) => {
    postDetails({ id: email, kyc: { form: data, uploadedFiles } })
      .unwrap()
      .then((response: IssuerDetailsEntity) => {
        submit(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box mt="40px">
      <Heading title={t(`${translationNamespace}.kyc`)} subTitle="" />
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}>
        <Box display="flex" flexDirection="column" justifyContent="center" gap="20px" m="30px 0">
          <Textfield
            register={register}
            name="name"
            label={t(`${translationNamespace}.name`)}
            errorValue={errors?.name}
          />
          <Textfield
            register={register}
            name="email"
            label={t(`${translationNamespace}.email`)}
            errorValue={errors?.email}
          />
          <Textfield
            register={register}
            name="phone"
            label={t(`${translationNamespace}.phone`)}
            errorValue={errors?.phone}
          />
          <Textfield
            register={register}
            name="role"
            label={t(`${translationNamespace}.role`)}
            errorValue={errors?.role}
          />
          {[
            { name: 'passport', state: uploadedFiles.passport },
            { name: 'national_id', state: uploadedFiles.national_id },
            {
              name: 'residence_proof',
              state: uploadedFiles.residence_proof
            },
            { name: 'profile_picture', state: uploadedFiles.profile_picture }
          ].map(({ name, state }) => (
            <UploadField name={name} key={name} state={state} setter={setter} />
          ))}
        </Box>
        <Box m="20px 0" display="flex" justifyContent="flex-end" alignItems="center">
          <BackButton
            onClick={() => {
              back(getValues());
            }}
          />
        </Box>
        <Button type="submit" fullWidth>
          {t(`${translationNamespace}.submit`)}
        </Button>
      </form>
    </Box>
  );
};

export default Kyc;
