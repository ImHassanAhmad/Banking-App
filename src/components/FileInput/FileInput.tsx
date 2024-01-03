import React from 'react';
import { Button, Box, Stack, FormHelperText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type FileInputProps } from './types';
import { FileDisplay } from './component/FileDisplay';

const FileInput: React.FC<FileInputProps> = ({ selectedFile, label, handleFileChange, error }) => {
  const theme = useTheme();
  return (
    <Stack>
      <Box
        sx={{
          border: 1,
          borderRadius: 1.5,
          borderColor: theme.palette.grey[300],
          display: 'flex',
          alignItems: 'center'
        }}>
        <Button variant="contained" component="label" sx={{ minWidth: '30%' }}>
          {label ?? 'Choose File'}
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <FileDisplay selectedFile={selectedFile} />
      </Box>
      {error && <FormHelperText error={true}>{error}</FormHelperText>}
    </Stack>
  );
};

export default FileInput;
