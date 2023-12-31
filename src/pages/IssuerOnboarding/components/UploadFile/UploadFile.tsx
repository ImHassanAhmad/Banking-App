import { useRef, type FC, type ChangeEvent } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';
import type { IUploadFileProps } from '../../types';

const translationNamespace = RouteNames.ISSUER_ONBOARDING;

const UploadField: FC<IUploadFileProps> = ({ name, state, setter, error }) => {
  const { t } = useTranslation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setter(name, files[0]);
    }
  };

  const handleClickUpload = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box display="flex" alignItems="center" gap="20px" width="100%" justifyContent="space-between">
      <input
        id="file-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        accept="image/*"
        ref={fileInputRef}
      />
      <Typography color="#414141">{t(`${translationNamespace}.${name}`)}</Typography>
      <Box
        width="330px"
        bgcolor="#EBEBEB"
        height="52px"
        borderRadius="10px"
        display="flex"
        alignItems="center"
        sx={{
          border: error ? '1px solid #F28274' : ''
        }}>
        <Box
          ml="15px"
          display="flex"
          alignItems="center"
          height="100%"
          sx={{ cursor: 'pointer' }}
          onClick={handleClickUpload}>
          <Typography color="#414141" whiteSpace="nowrap">
            {t(`${translationNamespace}.choose_file`)}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ margin: '0 10px' }} />
        <Typography
          color="#414141"
          sx={{
            fontSize: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'inline-block',
            padding: '0 10px'
          }}>
          {state?.name ?? ''}
        </Typography>
      </Box>
    </Box>
  );
};

export default UploadField;
