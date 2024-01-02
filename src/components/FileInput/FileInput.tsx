import React from 'react';
import { Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type FileInputProps } from './types';
import { FileDisplay } from './component/FileDisplay';

const FileInput: React.FC<FileInputProps> = ({
  selectedFile,
  label,
  handleFileChange,
  handleUpload,
  required,
  error
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: 1,
        borderRadius: 1.5,
        borderColor: theme.palette.grey[300]
      }}
      border={1}
      borderRadius={1.5}
      display="flex"
      alignItems="center">
      <input
        type="file"
        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-input"
        required={required} // Set required attribute based on the prop
      />
      <label htmlFor="file-input">
        <Button
          variant="contained"
          component="span"
          onClick={handleUpload}
          sx={{ width: 'max-content' }}>
          {label ?? 'Choose File'}
        </Button>
      </label>
      <FileDisplay selectedFile={selectedFile} />
    </Box>
  );
};

export default FileInput;
