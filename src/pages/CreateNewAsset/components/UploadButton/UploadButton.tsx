// CreateNewAsset/components/UploadButton.tsx
import React from 'react';
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FileInput from '../FileInput';
import { type UploadButtonProps } from '../../types';

const UploadButton: React.FC<UploadButtonProps> = ({
  label,
  description,
  selectedFile,
  handleFileChange,
  register,
  documentValue
}) => (
  <Box
    borderRadius={1}
    display="flex"
    flexDirection="column"
    p={2}
    sx={{
      '&:hover': {
        backgroundColor: '#EBEBEB'
      }
    }}>
    <Box display="flex" alignItems="center">
      <Box width={195} display="flex" alignItems="center">
        <Typography sx={{ mb: 1 }}>{label}</Typography>
        <Tooltip title={description} arrow>
          <IconButton sx={{ mb: 1 }} size="small">
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        border={1}
        borderColor="grey.300"
        borderRadius={1}
        display="flex"
        alignItems="center"
        flexGrow={1}
        maxWidth="100%"
        overflow="hidden">
        <FileInput
          label={label}
          selectedFile={selectedFile}
          handleFileChange={handleFileChange}
          handleUpload={() => {}}
          register={register}
          documentValue={documentValue}
        />
      </Box>
    </Box>
  </Box>
);

export default UploadButton;
