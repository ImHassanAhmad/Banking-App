import React from 'react';
import { Button } from '@mui/material';
import FileDisplay from './FileDisplay';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { type FileInputProps } from '../../types';

const createNewAssetNamespace = RouteNames.CREATE_NEW_ASSET;

const FileInput: React.FC<FileInputProps> = ({
  label,
  selectedFile,
  handleFileChange,
  handleUpload,
  register,
  documentValue
}) => {
  const { t } = useTranslation();
  // const fileId = `file-input-${label}`;

  return (
    <>
      <input
        {...register(documentValue)}
        type="file"
        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id={documentValue}
      />
      <label htmlFor={documentValue}>
        <Button variant="contained" component="span" onClick={handleUpload}>
          {t(`${createNewAssetNamespace}.choose_file`)}
        </Button>
      </label>
      <FileDisplay selectedFile={selectedFile} />
    </>
  );
};

export default FileInput;
