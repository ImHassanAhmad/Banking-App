import React, { useState } from 'react';
import { Box, Stack, TextField } from '@mui/material';
import FileInput from '@app/components/FileInput';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';

const assetTokenNamespace = RouteNames.CREATE_ASSET_TOKEN;

const TokenBasicInformation: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? null);
  };

  const handleUpload = (): void => {
    console.log('Uploading file:', selectedFile);
  };

  const { t } = useTranslation();

  return (
    <Stack gap={2}>
      <TextField label={t(`${assetTokenNamespace}.token_name`)} variant="outlined" />
      <TextField label={t(`${assetTokenNamespace}.token_symbol`)} variant="outlined" />

      <TextField label={t(`${assetTokenNamespace}.total_supply`)} variant="outlined" />
      <TextField label={t(`${assetTokenNamespace}.decimal_number`)} variant="outlined" />
      <Stack>
        <Box border={1} borderColor="grey.300" borderRadius={1} display="flex" alignItems="center">
          <FileInput
            selectedFile={selectedFile}
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            label={t(`${assetTokenNamespace}.upload_logo`)}
          />
        </Box>
      </Stack>
    </Stack>
  );
};
export default TokenBasicInformation;
