import React, { type FC, useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Stack, Box, Button, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import FileInput from '@app/components/FileInput';
import { type WithSignUpStepperContextProps } from '@app/common/types';

const verifyIdentityNamespace = RouteNames.VERIFY_IDENTITY;

const VerifyIdentity: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  isLoading,
  userPayload
}) => {
  const { t } = useTranslation();
  const webcamRef = useRef<Webcam>(null);

  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleCamera = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageURL(imageSrc);
      // To convert imageSrc to file object
      const byteCharacters = atob(imageSrc?.split(',')[1]);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }
      const file = new File([new Blob([byteArray])], 'captured-photo.jpg', { type: 'image/jpeg' });
      console.log('File object:', file);
    }
  }, []);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? null);
  };

  const handleUpload = (): void => {
    console.log('Uploading file:', selectedFile);
  };

  return (
    <Stack sx={{ width: '100%' }}>
      <Stack mt={4} gap={4}>
        <Stack>
          <Heading title={t(`${verifyIdentityNamespace}.title`)} subTitle="" />
        </Stack>

        {imageURL ? (
          <Box component="img" src={imageURL} />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            mirrored
            screenshotFormat="image/jpeg"
            style={{ width: '100%', height: 'auto' }}
            videoConstraints={{
              facingMode: 'user'
            }}
          />
        )}

        {imageURL ? (
          <Button
            endIcon={<DeleteIcon />}
            onClick={() => {
              setImageURL(null);
            }}>
            {t(`${verifyIdentityNamespace}.delete_selfie`)}
          </Button>
        ) : (
          <Button endIcon={<PhotoCameraIcon />} onClick={handleCamera}>
            {t(`${verifyIdentityNamespace}.take_selfie`)}
          </Button>
        )}

        <Stack gap={1}>
          <Typography>{t(`${verifyIdentityNamespace}.upload_id_card`)}</Typography>
          <FileInput
            selectedFile={selectedFile}
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            required={true}
            error="It is required"
          />
        </Stack>

        <Stack gap={1}>
          <Typography>{t(`${verifyIdentityNamespace}.upload_address_proof`)}</Typography>
          <FileInput
            selectedFile={selectedFile}
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            required={true}
          />
        </Stack>

        <Button
          disabled={isLoading}
          sx={{ textTransform: 'uppercase', marginTop: '2rem' }}
          onClick={() => {
            updateActiveStep();
          }}
          fullWidth>
          {t(`${verifyIdentityNamespace}.continue`)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default VerifyIdentity;
