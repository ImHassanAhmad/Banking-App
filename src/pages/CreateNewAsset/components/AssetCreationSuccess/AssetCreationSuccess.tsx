import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';
import CustomChecbox from '@app/components/CustomChecbox';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const createNewAssetNamespace = RouteNames.CREATE_NEW_ASSET;

const AssetCreationSuccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Stack>
      <Box display="flex" alignItems="center" gap={2} ml={5}>
        <CustomChecbox />
        <Typography variant="h6">
          {t(`${createNewAssetNamespace}.asset_creation_success`)}
        </Typography>
      </Box>
      <Stack gap={3} direction={'row'} mt={3} sx={{ width: '70%' }}>
        <Button
          sx={{
            marginTop: '20px',
            width: '100%',
            backgroundColor: '#BAFF2A'
          }}
          onClick={() => {
            navigate('/');
          }}>
          {t(`${createNewAssetNamespace}.back_to_home`)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default AssetCreationSuccess;
