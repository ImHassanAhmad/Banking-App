import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import React, { type FC } from 'react';
import { type ITokenPriceForm, type ITokenPriceProps, currencies } from '../types';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@app/store/hooks';
import * as yup from 'yup';
import { type Resolver, type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const assetTokenNamespace = RouteNames.CREATE_ASSET_TOKEN;

export const AssetTokenPrice: FC<ITokenPriceProps> = ({ back, submit }) => {
  const { t } = useTranslation();
  const { tokenConfig: tokenConfigState } = useAppSelector((state) => state.createAssetToken); // Redux state

  const defaultValue: ITokenPriceForm = {
    currency: '',
    buyPrice: 0
  };

  const schema = yup.object().shape({
    currency: yup.string().required('currency is required'),
    buyPrice: yup.number().required('Price is required')
  });

  const { tokenPrice: tokenPriceState } = useAppSelector((state) => state.createAssetToken);

  const onSubmit: SubmitHandler<ITokenPriceForm> = (data: ITokenPriceForm): void => {
    submit();
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ITokenPriceForm>({
    defaultValues: tokenPriceState ?? defaultValue,
    mode: 'onBlur',
    resolver: yupResolver(schema) as Resolver<ITokenPriceForm>
  });
  console.log('here is token config', tokenConfigState);
  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}>
      <Stack gap={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Autocomplete
            id="currency"
            options={currencies}
            renderInput={(params: any) => (
              <TextField
                {...params}
                label={t(`${assetTokenNamespace}.currency`)}
                {...register('currency')}
                error={Boolean(errors.currency)}
                helperText={errors.currency?.message}
              />
            )}
            fullWidth
          />
        </Stack>
        <TextField
          {...register('buyPrice')}
          error={Boolean(errors.buyPrice)}
          helperText={errors.buyPrice?.message}
          label={t(`${assetTokenNamespace}.buy_token`)}
          variant="outlined"
          type="number"
          fullWidth
        />
      </Stack>

      <Button type="submit" fullWidth sx={{ marginTop: '2rem' }}>
        {t(`${assetTokenNamespace}.continue`)}
      </Button>
    </form>
  );
};
