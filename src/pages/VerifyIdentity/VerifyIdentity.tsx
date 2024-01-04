import { type FC, useEffect, useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InfoModal } from '@app/components/Modals';
import { Stack, Box, Button, Typography, FormHelperText } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import FileInput from '@app/components/FileInput';
import { type WithSignUpStepperContextProps, type AuthFetchQueryError } from '@app/common/types';
import { imageSrcToFile } from '@app/utils/imageSrcToFile';
import { fileToImageSrc } from '@app/utils/fileToImageSrc';
import { AllowedFileFormats } from '@app/common/types';
import { createFileSchema } from '@app/utils/createFileSchema';

interface IForm {
  idCardImage: File;
  addressProofImage: File;
  selfieImage: File;
}

const verifyIdentityNamespace = RouteNames.VERIFY_IDENTITY;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const VerifyIdentity: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  isLoading,
  userPayload: { idCardImage, addressProofImage, selfieImage }
}) => {
  const { t } = useTranslation();
  const webcamRef = useRef<Webcam>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const schema = yup
    .object()
    .shape({
      idCardImage: createFileSchema(MAX_FILE_SIZE, Object.values(AllowedFileFormats)),
      addressProofImage: createFileSchema(MAX_FILE_SIZE, Object.values(AllowedFileFormats)),
      selfieImage: createFileSchema(MAX_FILE_SIZE, Object.values(AllowedFileFormats))
    })
    .required();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    const fetchSelfieImageURL = async (): Promise<void> => {
      if (selfieImage) {
        const url = await fileToImageSrc(selfieImage);
        setValue('selfieImage', selfieImage);
        setImageURL(url);
      }
    };
    void fetchSelfieImageURL();
  }, [selfieImage]);

  const onSubmit: SubmitHandler<IForm> = async (data: IForm) => {
    registerUser({
      payload: {
        ...data,
        dryRun: true
      },
      onSuccess: () => {
        updateActiveStep();
      },
      onError: (error: AuthFetchQueryError) => {
        console.error(error);
      }
    });
  };

  const requestCameraPermission = async (): Promise<void> => {
    try {
      const permissions = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (permissions.state === 'denied') {
        setOpenModal(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleCamera = useCallback(async () => {
    await requestCameraPermission();
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageURL(imageSrc);
      const file = imageSrcToFile(imageSrc);
      if (file) setValue('selfieImage', file);
    }
  }, []);

  return (
    <Stack sx={{ width: '100%' }}>
      <InfoModal
        open={openModal}
        buttonText={t(`${verifyIdentityNamespace}.modal_btn_title`)}
        title={t(`${verifyIdentityNamespace}.modal_title`)}
        subtitle={t(`${verifyIdentityNamespace}.modal_subtitle`)}
        handleClose={() => {
          setOpenModal(false);
        }}
      />
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}>
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
              <Button
                endIcon={<PhotoCameraIcon />}
                onClick={() => {
                  void handleCamera();
                }}>
                {t(`${verifyIdentityNamespace}.take_selfie`)}
              </Button>
              {errors.selfieImage && (
                <FormHelperText error={true}>Selfie is required</FormHelperText>
              )}
            </Stack>
          )}

          <Stack gap={1}>
            <Typography>{t(`${verifyIdentityNamespace}.upload_id_card`)}</Typography>
            <Controller
              name="idCardImage"
              control={control}
              defaultValue={idCardImage}
              render={({ field }) => (
                <FileInput
                  selectedFile={field.value ?? idCardImage}
                  handleFileChange={(ev) => {
                    setValue('idCardImage', ev.target.files?.[0]);
                  }}
                  required={true}
                  error={errors.idCardImage ? 'ID Card is required' : ''}
                />
              )}
            />
          </Stack>

          <Stack gap={1}>
            <Typography>{t(`${verifyIdentityNamespace}.upload_address_proof`)}</Typography>
            <Controller
              name="addressProofImage"
              control={control}
              defaultValue={addressProofImage}
              render={({ field }) => (
                <FileInput
                  selectedFile={field.value ?? addressProofImage}
                  handleFileChange={(ev) => {
                    setValue('addressProofImage', ev.target.files?.[0]);
                  }}
                  required={true}
                  error={errors.addressProofImage ? 'Proof of address is required' : ''}
                />
              )}
            />
          </Stack>

          <Button
            type="submit"
            disabled={isLoading}
            sx={{ textTransform: 'uppercase', marginTop: '2rem' }}
            fullWidth>
            {t(`${verifyIdentityNamespace}.continue`)}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default VerifyIdentity;
