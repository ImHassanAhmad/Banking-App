import React, { type FC, useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import FileInput from '@app/components/FileInput';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { type ITokenBasicInfoForm, type ITokenBasicInfoProps } from '../types';
import { useAppSelector } from '@app/store/hooks';
import * as yup from 'yup';
import { type Resolver, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const assetTokenNamespace = RouteNames.CREATE_ASSET_TOKEN;

const TokenBasicInformation: FC<ITokenBasicInfoProps> = ({ next }) => {
  const { tokenBasicInfo: tokenBasicInfoState } = useAppSelector((state) => state.createAssetToken);

  const [selectedFile, setSelectedFile] = useState<File | null>(
    tokenBasicInfoState?.uploadLogo ?? null
  );
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? null);
  };

  const defaultValue: ITokenBasicInfoForm = {
    tokenName: '',
    tokenSymbol: '',
    totalSupply: 0,
    numberOfDecimal: 0
  };

  const schema = yup.object().shape({
    tokenName: yup.string().required('name is required'),
    tokenSymbol: yup.string().required('symbol is required'),
    totalSupply: yup
      .number()
      .required('total supply is required')
      .min(1, 'Number of Decimal places must be greater than 0'),
    numberOfDecimal: yup
      .number()
      .required('No. of Decimal is required')
      .min(1, 'Number of Decimal places must be greater than 0')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ITokenBasicInfoForm>({
    defaultValues: tokenBasicInfoState ?? defaultValue,

    mode: 'onBlur',
    resolver: yupResolver(schema) as Resolver<ITokenBasicInfoForm>
  });

  const onSubmit: SubmitHandler<ITokenBasicInfoForm> = (data: ITokenBasicInfoForm): void => {
    const updatedData = { ...data, uploadLogo: selectedFile };
    next(updatedData);
  };
  console.log('here is new data', {
    tokenBasicInfoState,
    logo: tokenBasicInfoState?.uploadLogo,
    selectedFile
  });

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
        </Stack>
        <Button type="submit" fullWidth sx={{ marginTop: '2rem' }}>
          {t(`${assetTokenNamespace}.continue`)}
        </Button>
      </Stack>
    </form>
  );
};
export default TokenBasicInformation;
