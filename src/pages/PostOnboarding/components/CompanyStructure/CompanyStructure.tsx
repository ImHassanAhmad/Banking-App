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
import type { ICompanyStructureForm, ICompanyStructureProps, IUbo } from '../../types';
import { useAppSelector } from '@app/store/hooks';
import { useIssuerDetailsMutation } from '@app/store/api/onboarding';
import type { IssuerDetailsEntity } from '@app/server/database/entity';

const translationNamespace = RouteNames.POST_ONBOARDING;

const CompanyStructure: FC<ICompanyStructureProps> = ({ next }) => {
  const { email } = useAppSelector((state) => state.userData);

  const [postDetails] = useIssuerDetailsMutation();

  const { companyStructure: companyStructureState } = useAppSelector(
    (state) => state.postOnboarding
  );
  const { t } = useTranslation();
  const theme = useTheme();

  const defaultValue: IUbo = { type: '', name: '', email: '' };

  const schema = yup.object().shape({
    ubos: yup.array().of(
      yup.object().shape({
        type: yup.string().required('Type is required'),
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email format').required('Email is required')
      })
    )
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ICompanyStructureForm>({
    defaultValues: companyStructureState ?? {
      ubos: [defaultValue]
    },
    mode: 'onBlur',
    resolver: yupResolver(schema) as Resolver<ICompanyStructureForm>
  });

  const { fields, append, remove } = useFieldArray({ name: 'ubos', control });

  const onSubmit: SubmitHandler<ICompanyStructureForm> = (data) => {
    postDetails({ id: email, companyStructure: data })
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
      <Heading
        title={t(`${translationNamespace}.company_structure_title`)}
        subTitle={t(`${translationNamespace}.company_structure_subtitle`)}
      />
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
                name={`ubos.${index}.type`}
                label={t(`${translationNamespace}.type`)}
                errorValue={errors?.ubos?.[index]?.type as FieldError}
              />
              <Textfield
                register={register}
                name={`ubos.${index}.name`}
                label={t(`${translationNamespace}.name`)}
                errorValue={errors?.ubos?.[index]?.name as FieldError}
              />
              <Textfield
                register={register}
                name={`ubos.${index}.email`}
                label={t(`${translationNamespace}.email`)}
                errorValue={errors?.ubos?.[index]?.email as FieldError}
              />
            </Box>
          );
        })}
        <Button
          sx={{ marginBottom: '20px' }}
          onClick={() => {
            append(defaultValue);
          }}>
          {t(`${translationNamespace}.add_ubo`)}
        </Button>
        <Button type="submit" fullWidth>
          {t(`${translationNamespace}.continue`)}
        </Button>
      </form>
    </Box>
  );
};

export default CompanyStructure;
