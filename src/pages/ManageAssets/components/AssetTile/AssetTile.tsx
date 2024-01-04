import React from 'react';
import { Card, Stack, Typography } from '@mui/material';
import { type AssetsProps } from './types';

const style = {
  top: 2,
  marginRight: 2,
  bgcolor: 'background.paper',
  boxShadow: 8,
  borderRadius: 1.25,
  width: '214px',
  height: '311.5px'
};

const styleImgLogo = {
  width: '100%',
  height: '120px'
};

const styleTypography = {
  fontSize: '1.6rem',
  fontWeight: '560px'
};

const styleDescriptionTypography = {
  fontSize: '1.3rem',
  fontWeight: '560px',
  height: '100px',
  overflow: 'auto'
};

const AssetTile: React.FC<AssetsProps> = ({
  assetName,
  assetDescription,
  assetWebsite,
  price,
  logo,
  status
}) => {
  return (
    <Card sx={style}>
      <Stack
        style={{
          borderRadius: 1.25
        }}
        direction={'row'}>
        <img src={logo} style={styleImgLogo} />
      </Stack>
      <Stack direction={'row'} gap={1}>
        <Typography style={styleTypography} m={1}>
          {assetName}
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={1}>
        <Typography style={styleDescriptionTypography} m={1}>
          {assetDescription}
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={1}>
        <Stack direction={'column'} width={'100%'}>
          <Typography style={{ fontSize: '1.5rem' }} ml={1} mb={2}>
            {status}
          </Typography>
        </Stack>
        <Stack direction={'column'} width={'100%'}>
          <Typography style={{ fontSize: '1.5rem' }}>{price} USD</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default AssetTile;
