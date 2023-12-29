import React, { useState } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useForm, type SubmitHandler, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { SocialMediaLinks } from '../../types';
import Textfield from '@app/components/Textfield';
import { useCreateNewAssetStepper } from '@app/context/CreateNewAssetStepperContext';

const createNewAssetNamespace = RouteNames.CREATE_NEW_ASSET;

interface IForm {
  Reddit: string;
  Twitter: string;
  Telegram: string;
  Whitepaper: string;
  Discord: string;
}

const schema = yup.object().shape({
  Reddit: yup.string().url('Must be a valid URL').required(),
  Twitter: yup.string().url('Must be a valid URL').required(),
  Telegram: yup.string().url('Must be a valid URL').required(),
  Whitepaper: yup.string().url('Must be a valid URL').required(),
  Discord: yup.string().url('Must be a valid URL').required()
});

const AssetMultiMediaLinks: React.FC = () => {
  const { t } = useTranslation();
  const [fieldErrors] = useState<FieldError>();
  const { assetPayload, updateAssetPayload, updateActiveStep } = useCreateNewAssetStepper();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: assetPayload
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    updateAssetPayload(data);
    updateActiveStep();
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}>
      <Stack>
        <Stack gap={2} sx={{ width: '70%' }}>
          <Typography sx={{ fontSize: '2.4rem', fontWeight: 500, mb: 2 }}>
            {t(`${createNewAssetNamespace}.fill_asset_multi`)}
          </Typography>
          {Object.values(SocialMediaLinks).map((link, index) => (
            <Textfield
              key={index}
              name={link}
              register={register}
              errorValue={errors[link] ?? fieldErrors}
              label={t(`${createNewAssetNamespace}.${link}`)}
              variant="outlined"
            />
          ))}
        </Stack>
        <Stack gap={3} direction={'row'} mt={3} sx={{ width: '70%' }}>
          <Button
            sx={{
              marginTop: '20px',
              width: '100%'
            }}
            type="submit"
            disabled={!isValid}>
            {t(`${createNewAssetNamespace}.continue`)}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default AssetMultiMediaLinks;
