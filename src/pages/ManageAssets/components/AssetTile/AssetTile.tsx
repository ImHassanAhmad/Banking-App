import React from 'react';
import { Card, Stack, Typography } from '@mui/material';
import { type AssetListResponse } from '@app/common/types';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@app/constants/routes';
// import { type AssetsProps } from './types';

const style = {
  top: 2,
  marginRight: 4,
  bgcolor: 'background.paper',
  boxShadow: 8,
  borderRadius: 1.25,
  width: '214px',
  height: '311.5px',
  marginTop: 2,
  cursor: 'pointer'
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
  overflow: 'hidden',
  whiteSpace: 'wrap'
};

const AssetTile: React.FC<AssetListResponse> = ({
  id,
  assetName,
  assetDescription,
  assetWebsite,
  token,
  logo,
  status
}) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        navigate(`/${RouteNames.MANAGE_ASSETS + '/' + RouteNames.ASSET_DETAILS}/${id}`);
        // if (!token) navigate(`/${RouteNames.CREATE_ASSET_TOKEN}/${id}`);
      }}
      sx={style}>
      <Stack
        style={{
          borderRadius: 1.25
        }}
        direction={'row'}>
        <img
          src={
            'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' ||
            logo
          }
          style={styleImgLogo}
        />
      </Stack>
      <Stack direction={'row'} gap={1}>
        <Typography style={styleTypography} m={1}>
          {assetName}
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={1}>
        <Typography sx={styleDescriptionTypography} m={1}>
          {assetDescription}
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={1}>
        <Stack direction={'column'} width={'100%'}>
          <Typography style={{ fontSize: '1.5rem' }} ml={1} mb={2}>
            {status.replace('_', ' ')}
          </Typography>
        </Stack>
        <Stack direction={'column'} width={'100%'}>
          <Typography style={{ fontSize: '1.5rem', textAlign: 'right', paddingRight: '10px' }}>
            {token ? `${token.buyPrice} ${token.currency}` : '---'}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default AssetTile;
