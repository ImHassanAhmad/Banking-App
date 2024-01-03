import { type FC, useState, useRef, useCallback, useMemo, type ChangeEvent } from 'react';
import Webcam from 'react-webcam';
import { toast } from 'react-toastify';
import { Stack, Box, Button, Typography, FormHelperText } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import FileInput from '@app/components/FileInput';
import { type WithSignUpStepperContextProps, type AuthFetchQueryError } from '@app/common/types';
import { checkFileSize } from '@app/utils/fileSize';
import { imageSrcToFile } from '@app/utils/imageSrcToFile';

const verifyIdentityNamespace = RouteNames.VERIFY_IDENTITY;

const VerifyIdentity: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  isLoading,
  userPayload
}) => {
  const { t } = useTranslation();
  console.log('USER', userPayload);
  const webcamRef = useRef<Webcam>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [idCardImage, setIdCardImage] = useState<File | null>(null);
  const [addressProofImage, setAddressProofImage] = useState<File | null>(null);
  const [selfieImage, setSelfieImage] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleCamera = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageURL(imageSrc);
      const file = imageSrcToFile(imageSrc);
      setSelfieImage(file ?? null);
    }
  }, []);

  const handleIdCardImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const result = checkFileSize(file, 5);
      if (!result) toast.error('File size exceeds 5 MB limit');
      else setIdCardImage(file);
    }
  };

  const handleAddressProofImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const result = checkFileSize(file, 5);
      if (!result) toast.error('File size exceeds 5 MB limit');
      else setAddressProofImage(file);
    }
  };

  const hasErrors = useMemo(
    () => !idCardImage || !addressProofImage || !selfieImage,
    [idCardImage, addressProofImage, selfieImage]
  );

  const handleSubmit = (): void => {
    if (hasErrors) {
      setSubmitted(true);
    } else {
      registerUser({
        payload: {
          ...{
            idCardImage,
            addressProofImage,
            selfieImage
          },
          dryRun: true
        },
        onSuccess: () => {
          updateActiveStep();
        },
        onError: (error: AuthFetchQueryError) => {
          console.error(error);
        }
      });
    }
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
          <Stack>
            <Button endIcon={<PhotoCameraIcon />} onClick={handleCamera}>
              {t(`${verifyIdentityNamespace}.take_selfie`)}
            </Button>
            {!selfieImage && <FormHelperText error={true}>Selfie is required</FormHelperText>}
          </Stack>
        )}

        <Stack gap={1} key="pogo">
          <Typography>{t(`${verifyIdentityNamespace}.upload_id_card`)}</Typography>
          <FileInput
            selectedFile={idCardImage}
            handleFileChange={handleIdCardImage}
            required={true}
            error={submitted && !idCardImage ? 'ID Card is required' : ''}
          />
        </Stack>

        <Stack gap={1} key="gogo">
          <Typography>{t(`${verifyIdentityNamespace}.upload_address_proof`)}</Typography>
          <FileInput
            selectedFile={addressProofImage}
            handleFileChange={handleAddressProofImage}
            required={true}
            error={submitted && !addressProofImage ? 'Proof of address is required' : ''}
          />
        </Stack>

        <Button
          disabled={isLoading}
          sx={{ textTransform: 'uppercase', marginTop: '2rem' }}
          onClick={handleSubmit}
          fullWidth>
          {t(`${verifyIdentityNamespace}.continue`)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default VerifyIdentity;
