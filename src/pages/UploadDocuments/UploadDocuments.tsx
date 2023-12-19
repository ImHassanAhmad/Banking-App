// UploadDocument.tsx

import React, { useState } from 'react';
import { Stack, Typography, Autocomplete, Box, Button } from '@mui/material';
import Heading from '@app/components/Heading';
import Textfield from '@app/components/Textfield';
import { FileInput } from './components/DocumentFileInput';
import { UploadDocumentsTypes } from './utils/constant';
import BackButton from '@app/components/BackButton';

const UploadDocument: React.FC = () => {
  const APP_DOCUMENT_TYPES = UploadDocumentsTypes;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? null);
  };

  const handleUpload = (): void => {
    console.log('Uploading file:', selectedFile);
  };

  return (
    <Stack sx={{ maxWidth: '490px' }}>
      <BackButton />

      <Stack mt={4} gap={4}>
        <Stack>
          <Heading title={'Upload Documents'} subTitle="" />
        </Stack>
        <Stack>
          <Typography>Select Your Document Type ?</Typography>
          <Autocomplete
            id="document-select"
            options={APP_DOCUMENT_TYPES}
            getOptionLabel={(option) => option.displayName}
            renderOption={(props, option) => (
              <Box
                key={option.id}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}>
                <Stack direction="row" gap={1} alignItems="center">
                  <img src={option.icon} />
                  <Typography>{option.displayName}</Typography>
                </Stack>
              </Box>
            )}
            renderInput={(params) => (
              <Textfield
                {...params}
                label="Document Type"
                sx={{
                  height: '5.7rem',
                  margin: '3rem 0 2rem 0',
                  borderRadius: '1rem',
                  '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' }
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                  'data-testid': 'selector-content-input'
                }}
              />
            )}
          />
        </Stack>
        <Box border={1} borderColor="grey.300" borderRadius={1} display="flex" alignItems="center">
          <FileInput
            selectedFile={selectedFile}
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
          />
        </Box>

        <Button sx={{ fontWeight: '600' }}>Continue</Button>
      </Stack>
    </Stack>
  );
};

export default UploadDocument;
