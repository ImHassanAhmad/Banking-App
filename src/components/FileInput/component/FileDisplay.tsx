import React from 'react';
import { Box, Typography } from '@mui/material';
import { truncateFilename } from '@app/utils/truncateFilename';
import { type FileDisplayProps } from '../types';

const SelectedFileStyle = {
  fontSize: '1.6rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  px: 2
};

export const FileDisplay: React.FC<FileDisplayProps> = ({ selectedFile }) => (
  <Box flexGrow={1}>
    <Typography sx={SelectedFileStyle}>
      {selectedFile ? truncateFilename(selectedFile.name, 25) : 'No file chosen'}
    </Typography>
  </Box>
);
