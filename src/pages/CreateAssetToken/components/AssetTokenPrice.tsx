import { Autocomplete, Stack, TextField } from '@mui/material';
import React from 'react';
import { currencies } from '../types';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';

const assetTokenNamespace = RouteNames.CREATE_ASSET_TOKEN;

export const AssetTokenPrice: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack gap={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Autocomplete
          id="currency"
          options={currencies}
          renderInput={(params: any) => (
            <TextField {...params} label={t(`${assetTokenNamespace}.currency`)} />
          )}
          fullWidth
        />
      </Stack>
      <TextField
        label={t(`${assetTokenNamespace}.buy_token`)}
        variant="outlined"
        type="number"
        fullWidth
      />
    </Stack>
  );
};
