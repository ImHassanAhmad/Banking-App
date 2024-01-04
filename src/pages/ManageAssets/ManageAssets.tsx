import React from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import Heading from '@app/components/Heading';
import { type AssetsProps } from './components/AssetTile/types';
import { AssetStatus } from '@app/common/types';
import ButtonWithIcon from '@app/components/ButtonWithIcon';
import { ADD_ICON } from '@app/assets/images';
import AssetItem from './components/AssetTile/AssetTile';
import { useNavigate } from 'react-router-dom';

const translationNamespace = RouteNames.MANAGE_ASSETS;

const assetsArr: AssetsProps[] = [
  {
    assetName: 'Ethereum',
    assetDescription:
      'Ethereum is a decentralized blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Among cryptocurrencies, ether is second only to bitcoin in market capitalization.',
    assetWebsite: 'https://etherscan.io',
    logo: 'https://cryptoast.fr/wp-content/uploads/2019/12/etherscan-avis-review-tuto.jpg',
    price: 0.001,
    status: AssetStatus.Created
  },
  {
    assetName: 'BTC',
    assetDescription:
      'Bitcoin is the first decentralized cryptocurrency. Nodes in the peer-to-peer bitcoin network verify transactions through cryptography and record them in a public distributed ledger, called a blockchain, without central oversight.',
    assetWebsite: 'https://etherscan.io',
    logo: 'https://altcoinsbox.com/wp-content/uploads/2023/01/etherscan-logo.jpg',
    price: 0.011,
    status: AssetStatus.PendingApproval
  },
  {
    assetName: 'BTC',
    assetDescription:
      'Bitcoin is the first decentralized cryptocurrency. Nodes in the peer-to-peer bitcoin network verify transactions through cryptography and record them in a public distributed ledger, called a blockchain, without central oversight.',
    assetWebsite: 'https://etherscan.io',
    logo: 'https://altcoinsbox.com/wp-content/uploads/2023/01/etherscan-logo.jpg',
    price: 0.011,
    status: AssetStatus.PendingApproval
  },
  {
    assetName: 'BTC',
    assetDescription:
      'Bitcoin is the first decentralized cryptocurrency. Nodes in the peer-to-peer bitcoin network verify transactions through cryptography and record them in a public distributed ledger, called a blockchain, without central oversight.',
    assetWebsite: 'https://etherscan.io',
    logo: 'https://altcoinsbox.com/wp-content/uploads/2023/01/etherscan-logo.jpg',
    price: 0.011,
    status: AssetStatus.PendingApproval
  }
];

const ManageAssets: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
            navigate(`/${RouteNames.CREATE_NEW_ASSET}`);
          }}
        />
      </Stack>
      <Stack direction={'row'} mt={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {assetsArr.map((data: AssetsProps, i: number) => (
          <AssetItem key={i} {...data} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ManageAssets;
