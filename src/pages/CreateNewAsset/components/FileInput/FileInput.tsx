import React from 'react';
import { Button } from '@mui/material';
import FileDisplay from './FileDisplay';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';

const createNewAssetNamespace = RouteNames.CREATE_NEW_ASSET;

interface FileInputProps {
  label: string;
  selectedFile: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  selectedFile,
  handleFileChange,
  handleUpload
}) => {
  const { t } = useTranslation();
  const fileId = `file-input-${label}`;

  return (
    <>
      <input
        type="file"
        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id={fileId}
      />
      <label htmlFor={fileId}>
        <Button variant="contained" component="span" onClick={handleUpload}>
          {t(`${createNewAssetNamespace}.choose_file`)}
        </Button>
      </label>
      <FileDisplay selectedFile={selectedFile} />
    </>
  );
};

export default FileInput;
