import { type FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import Textfield from '@app/components/Textfield';
import {
  type SubmitHandler,
  useForm,
  useFieldArray,
  type Resolver,
  type FieldError
} from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import { CROSS_ICON2 } from '@app/assets/images';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type {
  ILegalRepresentative,
  ILegalRepresentativeForm,
  ILegalRepresentatives
} from '../../types';
import { useAppSelector } from '@app/store/hooks';
import BackButton from '@app/components/BackButton';
import { useIssuerDetailsMutation } from '@app/store/api/onboarding';
import type { IssuerDetailsEntity } from '@app/server/database/entity';

const translationNamespace = RouteNames.POST_ONBOARDING;

const LegalRepresentatives: FC<ILegalRepresentatives> = ({ next, back }) => {
  const { email } = useAppSelector((state) => state.userData);
  const { legalRepresentatives: legalRepresentativesState } = useAppSelector(
    (state) => state.postOnboarding
  );

  const [postDetails] = useIssuerDetailsMutation();
  const { t } = useTranslation();
  const theme = useTheme();

  const defaultValue: ILegalRepresentative = { name: '', email: '', phone: '' };

  const schema = yup.object().shape({
    legalRepresentative: yup.array().of(
      yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        phone: yup.string().required('Phone number is required')
      })
    )
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues
  } = useForm<ILegalRepresentativeForm>({
    defaultValues: legalRepresentativesState ?? {
      legalRepresentative: [defaultValue]
    },
    mode: 'onBlur',
    resolver: yupResolver(schema) as Resolver<ILegalRepresentativeForm>
  });

  const { fields, append, remove } = useFieldArray({ name: 'legalRepresentative', control });

  const onSubmit: SubmitHandler<ILegalRepresentativeForm> = (data) => {
    postDetails({ id: email, legalRepresentatives: data })
      .unwrap()
      .then((response: IssuerDetailsEntity) => {
        next(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box mt="40px">
      <Heading title={t(`${translationNamespace}.legal_representative_title`)} subTitle="" />
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}>
        {fields.map((field, index) => {
          return (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="20px"
              m="30px 0"
              key={field.id}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>{index + 1}.</Typography>
                {index > 0 && (
                  <Box
                    sx={{ cursor: 'pointer' }}
                    width="25px"
                    height="25px"
                    bgcolor={theme.palette.grey[200]}
                    borderRadius="11px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => {
                      remove(index);
                    }}>
                    <Box
                      component={'img'}
                      src={CROSS_ICON2}
                      alt="info icon"
                      sx={{ width: '16px', height: '16px' }}
                    />
                  </Box>
                )}
              </Box>
              <Textfield
                register={register}
                name={`legalRepresentative.${index}.name`}
                label={t(`${translationNamespace}.name`)}
                errorValue={errors?.legalRepresentative?.[index]?.name as FieldError}
              />
              <Textfield
                register={register}
                name={`legalRepresentative.${index}.email`}
                label={t(`${translationNamespace}.email`)}
                errorValue={errors?.legalRepresentative?.[index]?.email as FieldError}
              />
              <Textfield
                register={register}
                name={`legalRepresentative.${index}.phone`}
                label={t(`${translationNamespace}.phone`)}
                errorValue={errors?.legalRepresentative?.[index]?.phone as FieldError}
              />
            </Box>
          );
        })}
        <Box m="20px 0" display="flex" justifyContent="space-between" alignItems="center">
          <Button
            onClick={() => {
              append(defaultValue);
            }}>
            {t(`${translationNamespace}.add_legal_representative`)}
          </Button>
          <BackButton
            onClick={() => {
              back(getValues());
            }}
          />
        </Box>

        <Button type="submit" fullWidth>
          {t(`${translationNamespace}.continue`)}
        </Button>
      </form>
    </Box>
  );
};

export default LegalRepresentatives;
