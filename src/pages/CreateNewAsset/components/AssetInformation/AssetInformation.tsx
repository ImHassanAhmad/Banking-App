import React, { useEffect, useState } from 'react';
import { Stack, Typography, Box, Avatar, Button, CircularProgress } from '@mui/material';
import FilterIcon from '@mui/icons-material/Filter';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { useForm, type SubmitHandler, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Textfield from '@app/components/Textfield';
import { useCreateNewAssetStepper } from '@app/context/CreateNewAssetStepperContext';
import WarningAlert from '@app/components/WarningAlert';
import {
  type AssetResponseDto,
  type AssetInformationRequestDto,
  type RequestError
} from '@app/common/types';
import { useCreateAssetMutation } from '@app/store/api/asset';

const createNewAssetNamespace = RouteNames.CREATE_NEW_ASSET;

const AssetInformation: React.FC = () => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);
  const [fieldErrors] = useState<FieldError>();
  const { assetPayload, updateAssetPayload, updateActiveStep } = useCreateNewAssetStepper();
  const [createAsset, { isLoading }] = useCreateAssetMutation();
  const [apiError, setApiError] = useState<RequestError>();

  const schema: yup.ObjectSchema<AssetInformationRequestDto> = yup.object().shape({
    assetName: yup.string().required('name is required'),
    assetDescription: yup.string().required('Description is required'),
    assetWebsite: yup.string().url('Website must be a valid URL').required('Website is required'),
    logo: yup
      .mixed()
      .test((file) => file instanceof File && file != null)
      .required('Logo is required')
  }) as any;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger
  } = useForm<AssetInformationRequestDto>({
    mode: 'onBlur',
    resolver: yupResolver<AssetInformationRequestDto>(schema),
    defaultValues: assetPayload as any
  });

  useEffect(() => {
    const { logo } = assetPayload as any;
    if (logo) setImagePreview(logo);
  }, []);

  const onSubmit: SubmitHandler<AssetInformationRequestDto> = (data: any) => {
    createAsset(data)
      .unwrap()
      .then(({ assetId }: AssetResponseDto) => {
        updateAssetPayload(data, assetId);
        updateActiveStep();
      })
      .catch((error: RequestError) => {
        console.log('error: ', error);
        setApiError(error);
      });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    // Create a preview URL
    if (file) {
      setValue('logo', file);
      setImagePreview(file);
      void trigger('logo');
    }
  };

  const setImagePreview = (file: File): void => {
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}>
      <Stack gap={2}>
        {apiError && <WarningAlert message={apiError.message} />}
        <Typography sx={{ fontSize: '2.4rem', fontWeight: 500, mb: 2 }}>
          {t(`${createNewAssetNamespace}.fill_asset_information`)}
        </Typography>
        <Box display="flex" flexDirection="row" gap={3} sx={{ width: '100%' }}>
          <Stack sx={{ flexBasis: '70%' }} gap={2}>
            <Textfield
              name="assetName"
              register={register}
              errorValue={errors?.assetName ?? fieldErrors}
              label={t(`${createNewAssetNamespace}.asset_name`)}
              variant="outlined"
            />
            <Textfield
              name="assetDescription"
              register={register}
              errorValue={errors?.assetDescription ?? fieldErrors}
              multiline
              rows={3}
              variant="outlined"
              label={t(`${createNewAssetNamespace}.asset_description`)}
              sx={{
                '& textarea': {
                  paddingTop: 'inherit'
                },
                '& .css-14hd1mb-MuiInputBase-root-MuiOutlinedInput-root': {
                  boxSizing: 'content-box'
                }
              }}
            />
            <Textfield
              name="assetWebsite"
              register={register}
              errorValue={errors?.assetWebsite ?? fieldErrors}
              label={t(`${createNewAssetNamespace}.asset_website`)}
              variant="outlined"
            />
          </Stack>
          <Stack
            borderRadius={1}
            display="flex"
            flexDirection="column"
            p={2}
            sx={{ flexBasis: '30%' }}>
            <Box>
              <label htmlFor="logo-upload">
                <Avatar
                  src={preview ?? undefined}
                  variant="square"
                  sx={{
                    width: 150,
                    height: 150,
                    marginRight: 2,
                    marginBottom: 2,
                    borderRadius: 1,
                    backgroundColor: '#EBEBEB'
                  }}>
                  <FilterIcon sx={{ color: '#000000', width: 75, height: 75 }} />
                </Avatar>
              </label>
              <input
                {...register('logo')}
                id="logo-upload"
                name="logo"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <span style={{ fontSize: '16px' }}>{t(`${createNewAssetNamespace}.asset_logo`)}</span>
            </Box>
          </Stack>
        </Box>
        <Stack gap={3} direction={'row'} mt={3} sx={{ width: '70%' }}>
          <Button
            sx={{
              marginTop: '20px',
              width: '100%'
            }}
            type="submit"
            disabled={!isValid || !preview || isLoading}>
            {t(`${createNewAssetNamespace}.continue`)} {isLoading ?? <CircularProgress />}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default AssetInformation;
