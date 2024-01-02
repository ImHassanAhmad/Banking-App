import React from 'react';
import { Box, Typography } from '@mui/material';
import { type FileDisplayProps } from '../types';

const SelectedFileStyle = {
  fontSize: '1.6rem',
  wordWrap: 'break-word',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  px: 2
};

export const FileDisplay: React.FC<FileDisplayProps> = ({ selectedFile }) => (
  <Box flexGrow={1}>
    <Typography sx={SelectedFileStyle}>{selectedFile?.name ?? 'No File Choosen'}</Typography>
  </Box>
);
