import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import UploadDocuments from '../UploadDocuments';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { Documents } from '../../types';
import { AllowedFileFormats } from '@app/types/types';
import { useCreateNewAssetStepper } from '@app/context/CreateNewAssetStepperContext';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import WarningAlert from '@app/components/WarningAlert';
import {
  type AssetResponseDto,
  type AssetDocumentsRequestDto,
  type RequestError
} from '@app/types/types';
import { useUploadAssetLegalDocumentsMutation } from '@app/store/api/asset';
import { createFileSchema } from '@app/utils/createFileSchema';

const createNewAssetNamespace = RouteNames.CREATE_NEW_ASSET;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const AssetDocuments: React.FC = () => {
  const { t } = useTranslation();
  const { assetPayload, assetId, updateActiveStep, updateAssetPayload } =
    useCreateNewAssetStepper();
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({});
  const [uploadAssetLegalDocuments, { isLoading }] = useUploadAssetLegalDocumentsMutation();
  const [apiError, setApiError] = useState<RequestError>();

  const fileSchema = createFileSchema(MAX_FILE_SIZE, Object.values(AllowedFileFormats));

  const schema: yup.ObjectSchema<AssetDocumentsRequestDto> = yup
    .object()
    .shape(Object.fromEntries(Object.values(Documents).map((doc) => [doc, fileSchema]))) as any;

  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { isValid, errors }
  } = useForm<AssetDocumentsRequestDto>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: assetPayload as any
  });
  const handleFileChange =
    (value: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const file = event.target.files?.[0];
      if (file) setValue(value as Documents, file);
      void trigger(value as Documents);
      setSelectedFiles((prevFiles) => ({ ...prevFiles, [value]: file ?? null }));
    };

  useEffect(() => {
    if (assetPayload)
      setSelectedFiles((prevFiles) => {
        const state = { ...prevFiles };
        Object.entries(assetPayload).forEach(([key, value]: any) => {
          state[key] = value;
        });
        return state;
      });
  }, []);

  const onSubmit: SubmitHandler<AssetDocumentsRequestDto> = (data: AssetDocumentsRequestDto) => {
    uploadAssetLegalDocuments({ assetId, ...data })
      .unwrap()
      .then((response: AssetResponseDto) => {
        updateAssetPayload(data);
        updateActiveStep();
      })
      .catch((error: RequestError) => {
        console.log('error: ', error);
        setApiError(error);
      });
  };
  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}>
      <Stack gap={1} width={'100%'}>
        {apiError && <WarningAlert message={apiError.message} />}
        <Typography sx={{ fontSize: '2.4rem', fontWeight: 500, mb: 2 }}>
          {t(`${createNewAssetNamespace}.upload_the_asset`)}
        </Typography>
        {Object.values(Documents).map((value: string) => (
          <UploadDocuments
            key={value}
            label={t(`${createNewAssetNamespace}.${value}`)}
            description={t(`${createNewAssetNamespace}.${value}_d`)}
            selectedFile={selectedFiles[value]}
            handleFileChange={handleFileChange(value)}
            documentValue={value as keyof AssetDocumentsRequestDto}
            error={errors[value as keyof AssetDocumentsRequestDto]}
            control={control}
          />
        ))}
        <Stack gap={3} direction={'row'} mt={3} sx={{ width: '70%' }}>
          <Button
            sx={{
              marginTop: '20px',
              width: '100%'
            }}
            type="submit"
            disabled={isLoading || !isValid}>
            {t(`${createNewAssetNamespace}.continue`)} {isLoading ?? <CircularProgress />}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default AssetDocuments;
