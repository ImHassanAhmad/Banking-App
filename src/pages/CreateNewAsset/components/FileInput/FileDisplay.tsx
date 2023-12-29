// CreateNewAsset/components/FileDisplay.tsx
import React from 'react';
import { Box } from '@mui/material';
import { truncateFilename } from '@app/utils/truncateFilename';

interface FileDisplayProps {
  selectedFile: File | null;
}

const SelectedFileStyle: React.CSSProperties = {
  fontSize: '16px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

const FileDisplay: React.FC<FileDisplayProps> = ({ selectedFile }) => (
  <Box ml={2} flexGrow={1}>
    <span style={SelectedFileStyle}>
      {selectedFile ? truncateFilename(selectedFile.name, 30) : 'No file chosen'}
    </span>
  </Box>
);

export default FileDisplay;
