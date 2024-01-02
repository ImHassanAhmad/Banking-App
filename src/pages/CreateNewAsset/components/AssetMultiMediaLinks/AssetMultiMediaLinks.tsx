import React, { useState } from 'react';
import { Stack, Typography, Button, CircularProgress } from '@mui/material';
import { useForm, type SubmitHandler, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { SocialMediaLinks } from '../../types';
import Textfield from '@app/components/Textfield';
import { useCreateNewAssetStepper } from '@app/context/CreateNewAssetStepperContext';
import {
  type AssetResponseDto,
  type RequestError,
  type AssetSocialMediaRequestDto
} from '@app/common/types';
import { useAddSocialMediaLinksMutation } from '@app/store/api/asset';

const createNewAssetNamespace = RouteNames.CREATE_NEW_ASSET;

const schema: yup.ObjectSchema<AssetSocialMediaRequestDto> = yup.object().shape({
  reddit: yup.string().url('Must be a valid URL').required(),
  twitter: yup.string().url('Must be a valid URL').required(),
  telegram: yup.string().url('Must be a valid URL').required(),
  whitepaper: yup.string().url('Must be a valid URL').required(),
  discord: yup.string().url('Must be a valid URL').required()
}) as yup.ObjectSchema<AssetSocialMediaRequestDto>;

const AssetMultiMediaLinks: React.FC = () => {
  const { t } = useTranslation();
  const [fieldErrors] = useState<FieldError>();
  const { assetId, assetPayload, updateAssetPayload, updateActiveStep } =
    useCreateNewAssetStepper();
  const [addSocialMediaLinks, { isLoading }] = useAddSocialMediaLinksMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AssetSocialMediaRequestDto>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: assetPayload as AssetSocialMediaRequestDto
  });

  const onSubmit: SubmitHandler<AssetSocialMediaRequestDto> = (
    data: AssetSocialMediaRequestDto
  ) => {
    addSocialMediaLinks({ ...data, assetId })
      .unwrap()
      .then((response: AssetResponseDto) => {
        updateAssetPayload(data);
        updateActiveStep();
      })
      .catch(({ message, errorLevel }: RequestError) => {
        console.log('error: {message: ', message, ', errorLevel: ', errorLevel, ' }');
      });
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
            disabled={!isValid || isLoading}>
            {t(`${createNewAssetNamespace}.continue`)} {isLoading ?? <CircularProgress />}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default AssetMultiMediaLinks;
