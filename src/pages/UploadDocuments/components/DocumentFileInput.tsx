import React from 'react';
import { Button } from '@mui/material';
import { type FileInputProps } from '../types';
import { FileDisplay } from './DocumentFileDisplay';

export const FileInput: React.FC<FileInputProps> = ({
  selectedFile,
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
        Choose File
      </Button>
    </label>
    <FileDisplay selectedFile={selectedFile} />
  </>
);
