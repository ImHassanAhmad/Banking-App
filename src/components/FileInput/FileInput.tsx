import React from 'react';
import { Button } from '@mui/material';
import { type FileInputProps } from './types';
import { FileDisplay } from './component/FileDisplay';

const FileInput: React.FC<FileInputProps> = ({
  selectedFile,
  label,
  handleFileChange,
  handleUpload
}) => (
  <>
    <input
      type="file"
      accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
      onChange={handleFileChange}
      style={{ display: 'none' }}
      id="file-input"
    />
    <label htmlFor="file-input">
      <Button variant="contained" component="span" onClick={handleUpload}>
        {label ?? 'Choose File'}
      </Button>
    </label>
    <FileDisplay selectedFile={selectedFile} />
  </>
);

export default FileInput;
