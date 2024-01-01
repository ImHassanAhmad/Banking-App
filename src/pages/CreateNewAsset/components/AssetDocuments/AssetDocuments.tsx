import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import UploadButton from '../UploadButton';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { Documents } from '../../types';
import { useCreateNewAssetStepper } from '@app/context/CreateNewAssetStepperContext';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { type AssetDocumentsRequestDto } from '@app/common/types';
import { useUploadAssetLegalDocumentsMutation } from '@app/store/api/asset';

const createNewAssetNamespace = RouteNames.CREATE_NEW_ASSET;

const AssetDocuments: React.FC = () => {
  const { t } = useTranslation();
  const { assetPayload, updateActiveStep, updateAssetPayload } = useCreateNewAssetStepper();
  const [uploadAssetLegalDocuments, { isLoading }] = useUploadAssetLegalDocumentsMutation();
  const schema: yup.ObjectSchema<AssetDocumentsRequestDto> = yup.object().shape({
    prospectus: yup.mixed().required('File is required'),
    businessModel: yup.mixed().required('File is required'),
    financialModel: yup.mixed().required('File is required'),
    businessPlan: yup.mixed().required('File is required'),
    valuationReport: yup.mixed().required('File is required')
  }) as any;

  const { handleSubmit, setValue, getValues } = useForm<AssetDocumentsRequestDto>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: assetPayload as any
  });
  const handleFileChange =
    (value: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const file = event.target.files?.[0];
      if (file) setValue(value as Documents, file);
    };

  const onSubmit: SubmitHandler<AssetDocumentsRequestDto> = (data: AssetDocumentsRequestDto) => {
    console.log('tester submit ', data);
    console.log(uploadAssetLegalDocuments);
    updateAssetPayload(data);
    updateActiveStep();
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}>
      <Stack gap={1}>
        <Typography sx={{ fontSize: '2.4rem', fontWeight: 500, mb: 2 }}>
          {t(`${createNewAssetNamespace}.upload_the_asset`)}
        </Typography>
        {Object.values(Documents).map((value: string) => (
          <UploadButton
            key={value}
            label={t(`${createNewAssetNamespace}.${value}`)}
            description={t(`${createNewAssetNamespace}.${value}_d`)}
            selectedFile={getValues(value as Documents)}
            handleFileChange={handleFileChange(value)}
          />
        ))}
        <Stack gap={3} direction={'row'} mt={3} sx={{ width: '70%' }}>
          <Button
            sx={{
              marginTop: '20px',
              width: '100%'
            }}
            type="submit"
            disabled={isLoading}>
            {t(`${createNewAssetNamespace}.continue`)}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default AssetDocuments;
