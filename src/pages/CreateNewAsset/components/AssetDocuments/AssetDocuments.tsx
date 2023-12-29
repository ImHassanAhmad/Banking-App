import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import UploadButton from '../UploadButton';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { Documents } from '../../types';
import { useCreateNewAssetStepper } from '@app/context/CreateNewAssetStepperContext';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const createNewAssetNamespace = RouteNames.CREATE_NEW_ASSET;
interface IForm {
  uploadProspectus: string;
  businessModel: string;
  financialModel: string;
  businessPlan: string;
  valuationReport: string;
}
const AssetDocuments: React.FC = () => {
  const { t } = useTranslation();
  const { updateActiveStep, updateAssetPayload, assetPayload } = useCreateNewAssetStepper();
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({});
  const schema = yup.object().shape({
    uploadProspectus: yup.string().required('File is required'),
    businessModel: yup.string().required('File is required'),
    financialModel: yup.string().required('File is required'),
    businessPlan: yup.string().required('File is required'),
    valuationReport: yup.string().required('File is required')
  });
  const { handleSubmit } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      uploadProspectus: assetPayload.uploadProspectus,
      businessModel: assetPayload.businessModel,
      financialModel: assetPayload.financialModel,
      businessPlan: assetPayload.businessPlan,
      valuationReport: assetPayload.valuationReport
    }
  });
  const handleFileChange =
    (label: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const file = event.target.files?.[0];
      setSelectedFiles((prevFiles) => ({ ...prevFiles, [label]: file ?? null }));
    };

  const onSubmit: SubmitHandler<IForm> = (data) => {
    updateAssetPayload(data);
    updateActiveStep();
  };
  const handleUpload = (label: string) => (): void => {
    console.log('Uploading file:', selectedFiles[label]);
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
        {Object.values(Documents).map((label) => (
          <UploadButton
            key={label}
            label={t(`${createNewAssetNamespace}.${label}`)}
            description={t(`${createNewAssetNamespace}.${label}_d`)}
            selectedFile={selectedFiles[label]}
            handleFileChange={handleFileChange(label)}
            handleUpload={handleUpload(label)}
          />
        ))}
        <Stack gap={3} direction={'row'} mt={3} sx={{ width: '70%' }}>
          <Button
            sx={{
              marginTop: '20px',
              width: '100%'
            }}
            type="submit"
            onClick={updateActiveStep}>
            {t(`${createNewAssetNamespace}.continue`)}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default AssetDocuments;
