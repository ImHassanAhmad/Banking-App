// CreateNewAsset/components/UploadButton.tsx
import React from 'react';
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { type UploadDocumentsProps } from '../../types';
import FileInput from '@app/components/FileInput';
import { Controller } from 'react-hook-form';

const UploadDocuments: React.FC<UploadDocumentsProps> = ({
  label,
  description,
  selectedFile,
  handleFileChange,
  documentValue,
  control,
  error
}) => (
  <Box
    borderRadius={1}
    display="flex"
    flexDirection="column"
    p={2}
    // sx={{
    //   '&:hover': {
    //     backgroundColor: '#EBEBEB'
    //   }
    // }}
  >
    <Box display="flex" alignItems="center">
      <Box width={195} display="flex" alignItems="center">
        <Typography sx={{ mb: 1 }}>{label}</Typography>
        <Tooltip title={description} arrow>
          <IconButton
            sx={{
              mb: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                cursor: 'help'
              }
            }}
            size="small">
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box display="flex" alignItems="center" flexGrow={1} overflow="hidden">
        <Controller
          name={documentValue}
          control={control}
          // defaultValue={idCardImage}
          render={({ field }) => (
            <Box width="100%">
              <FileInput
                selectedFile={selectedFile}
                handleFileChange={handleFileChange}
                required={true}
                error={error?.message}
                testId={documentValue}
              />
            </Box>
          )}
        />
      </Box>
    </Box>
  </Box>
);

export default UploadDocuments;
