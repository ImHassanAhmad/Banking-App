import React from 'react';
import { Box } from '@mui/material';
import { type FileDisplayProps } from '../types';

const SelectedFileStyle = {
  fontSize: '16px'
};

export const FileDisplay: React.FC<FileDisplayProps> = ({ selectedFile }) => (
  <Box ml={2} flexGrow={1}>
    <span style={SelectedFileStyle}>{selectedFile?.name ?? 'No File Choosen'}</span>
  </Box>
);
