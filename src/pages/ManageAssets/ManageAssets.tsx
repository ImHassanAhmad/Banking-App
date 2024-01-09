import React from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import Heading from '@app/components/Heading';
import ButtonWithIcon from '@app/components/ButtonWithIcon';
import { ADD_ICON } from '@app/assets/images';
import AssetItem from './components/AssetTile/AssetTile';
import { useNavigate } from 'react-router-dom';
import { useListAssetsQuery } from '@app/store/api/asset';
import { type AssetListResponse } from '@app/types/types';

const translationNamespace = RouteNames.MANAGE_ASSETS;

const ManageAssets: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = useListAssetsQuery();

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack mt={4}>
        <Heading
          title={t(`${translationNamespace}.title`)}
          subTitle={t(`${translationNamespace}.subtitle`)}
        />
      </Stack>
      <Stack style={{ display: 'flex', alignItems: 'flex-end' }}>
        <ButtonWithIcon
          sx={{ width: '20%', minWidth: '186px' }}
          title={'Create New Asset'}
          icon={ADD_ICON}
          handleClick={() => {
            navigate(RouteNames.CREATE_NEW_ASSET);
          }}
        />
      </Stack>
      <Stack direction={'row'} mt={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {data?.map((asset: AssetListResponse, i: number) => <AssetItem key={i} {...asset} />)}
      </Stack>
    </Stack>
  );
};

export default ManageAssets;
