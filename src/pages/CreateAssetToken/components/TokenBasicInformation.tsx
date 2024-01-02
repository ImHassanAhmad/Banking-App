import React, { type FC, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import FileInput from '@app/components/FileInput';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { type ITokenBasicInfoForm, type ITokenBasicInfoProps } from '../types';
import { useAppSelector } from '@app/store/hooks';
import * as yup from 'yup';
import { type Resolver, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const assetTokenNamespace = RouteNames.CREATE_ASSET_TOKEN;

const errorTextStyles = {
  color: '#ED725D',
  paddingLeft: '0.5rem',
  marginTop: '0.5rem',
  fontSize: '14px'
};

const TokenBasicInformation: FC<ITokenBasicInfoProps> = ({ next }) => {
  const { tokenBasicInfo: tokenBasicInfoState } = useAppSelector((state) => state.createAssetToken);

  const [selectedFile, setSelectedFile] = useState<File | undefined>(
    tokenBasicInfoState?.tokenLogo
  );

  const defaultValue: ITokenBasicInfoForm = {
    tokenName: '',
    tokenSymbol: '',
    totalSupply: 0,
    numberOfDecimal: 0,
    tokenLogo: undefined
  };

  const schema = yup.object().shape({
    tokenName: yup.string().required('Name is required'),
    tokenSymbol: yup.string().required('Symbol is required'),
    totalSupply: yup
      .number()
      .required('Total supply is required')
      .min(1, 'Number of Decimal places must be greater than 0'),
    numberOfDecimal: yup
      .number()
      .required('No. of Decimal is required')
      .min(1, 'Number of Decimal places must be greater than 0'),
    tokenLogo: yup.mixed().required('Token Logo is required')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ITokenBasicInfoForm>({
    defaultValues: tokenBasicInfoState ?? defaultValue,

    mode: 'onBlur',
    resolver: yupResolver(schema) as unknown as Resolver<ITokenBasicInfoForm>
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    register('tokenLogo', { value: file });

    setSelectedFile(file);
  };
  const onSubmit: SubmitHandler<ITokenBasicInfoForm> = (data: ITokenBasicInfoForm): void => {
    if (!selectedFile) {
      console.error('File not selected');
      return;
    }
    next(data);
  };

  const handleUpload = (): void => {
    console.log('Uploading file:', selectedFile);
  };

  const { t } = useTranslation();
  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}>
      <Stack spacing={2}>
        <TextField
          {...register('tokenName')}
          label={t(`${assetTokenNamespace}.token_name`)}
          variant="outlined"
          error={Boolean(errors.tokenName)}
          fullWidth
          helperText={errors.tokenName?.message}
        />
        <TextField
          {...register('tokenSymbol')}
          label={t(`${assetTokenNamespace}.token_symbol`)}
          variant="outlined"
          fullWidth
          error={Boolean(errors.tokenSymbol)}
          helperText={errors.tokenSymbol?.message}
        />
        <TextField
          {...register('totalSupply', {
            setValueAs: (value) => (value === '' ? null : Number(value))
          })}
          label={t(`${assetTokenNamespace}.total_supply`)}
          variant="outlined"
          type="number"
          error={Boolean(errors.totalSupply)}
          fullWidth
          helperText={errors.totalSupply?.message}
        />
        <TextField
          {...register('numberOfDecimal', {
            setValueAs: (value) => (value === '' ? null : Number(value))
          })}
          label={t(`${assetTokenNamespace}.decimal_number`)}
          variant="outlined"
          type="number"
          error={Boolean(errors.numberOfDecimal)}
          fullWidth
          helperText={errors.numberOfDecimal?.message}
        />

        <Stack>
          <Box
            border={1}
            borderColor="grey.300"
            borderRadius={1}
            display="flex"
            alignItems="center">
            <FileInput
              selectedFile={selectedFile}
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
              label={t(`${assetTokenNamespace}.upload_logo`)}
            />
          </Box>
          {errors.tokenLogo?.message && !selectedFile && (
            <Typography sx={errorTextStyles}>{errors.tokenLogo?.message}</Typography>
          )}
        </Stack>
        <Button type="submit" fullWidth sx={{ marginTop: '2rem' }}>
          {t(`${assetTokenNamespace}.continue`)}
        </Button>
      </Stack>
    </form>
  );
};
export default TokenBasicInformation;
