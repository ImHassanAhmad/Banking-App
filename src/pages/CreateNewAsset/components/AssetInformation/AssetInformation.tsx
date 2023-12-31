import React, { useState } from 'react';
import { Stack, Typography, Box, Avatar, Button } from '@mui/material';
import FilterIcon from '@mui/icons-material/Filter';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { useForm, type SubmitHandler, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Textfield from '@app/components/Textfield';
import { useCreateNewAssetStepper } from '@app/context/CreateNewAssetStepperContext';

interface IForm {
  AssetName: string;
  AssetDescription: string;
  AssetWebsite: string;
  Logo: any;
}

const createNewAssetNamespace = RouteNames.CREATE_NEW_ASSET;

const AssetInformation: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fieldErrors] = useState<FieldError>();
  const { assetPayload, updateAssetPayload, updateActiveStep } = useCreateNewAssetStepper();

  const schema = yup.object().shape({
    AssetName: yup.string().required('name is required'),
    AssetDescription: yup.string().required('Description is required'),
    AssetWebsite: yup.string().url('Website must be a valid URL').required('Website is required'),
    Logo: yup.mixed().required('Logo is required')
  });

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
    if (selectedFile) {
      // Add the file name to the form data
      const dataWithFileName = { ...data, logo: selectedFile.name };
      updateAssetPayload(dataWithFileName);
    } else {
      updateAssetPayload(data);
    }
    updateActiveStep();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? null);
    // Create a preview URL
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}>
      <Stack gap={2}>
        <Typography sx={{ fontSize: '2.4rem', fontWeight: 500, mb: 2 }}>
          {t(`${createNewAssetNamespace}.fill_asset_information`)}
        </Typography>
        <Box display="flex" flexDirection="row" gap={3} sx={{ width: '100%' }}>
          <Stack sx={{ flexBasis: '70%' }} gap={2}>
            <Textfield
              name="AssetName"
              register={register}
              errorValue={errors?.AssetName ?? fieldErrors}
              label={t(`${createNewAssetNamespace}.asset_name`)}
              variant="outlined"
            />
            <Textfield
              name="AssetDescription"
              register={register}
              errorValue={errors?.AssetDescription ?? fieldErrors}
              multiline
              rows={3}
              variant="outlined"
              label={t(`${createNewAssetNamespace}.asset_description`)}
              sx={{
                '& .css-14hd1mb-MuiInputBase-root-MuiOutlinedInput-root': {
                  boxSizing: 'content-box'
                }
              }}
            />
            <Textfield
              name="AssetWebsite"
              register={register}
              errorValue={errors?.AssetWebsite ?? fieldErrors}
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
                {...register('Logo')} // Add this line
                id="logo-upload"
                name="Logo"
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
              // backgroundColor:
              //   activeStep === CreateNewAssetSteps.AssetCreationSuccess ? '#EBEBEB' : '#BAFF2A'
            }}
            type="submit"
            disabled={!isValid || !selectedFile}>
            {t(`${createNewAssetNamespace}.continue`)}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default AssetInformation;
