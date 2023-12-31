import React, { useState, useCallback, type FC } from 'react';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckboxItem from '@app/components/CheckboxItem';
import { type CheckListType } from '@app/components/CheckboxItem/types';
import { RouteNames } from '@app/constants/routes';
import {
  AssetConfigKeys,
  type ITokenConfigurationForm,
  type ITokenConfigurationProps
} from '../types';
import { useAppSelector } from '@app/store/hooks';

const assetTokenNamespace = RouteNames.CREATE_ASSET_TOKEN;

const AssetTokenConfigurations: FC<ITokenConfigurationProps> = ({ next, back }) => {
  const { t } = useTranslation();

  const { tokenConfig: tokenConfigState } = useAppSelector((state) => state.createAssetToken); // Redux state
  console.log('here is tokenConfigState', tokenConfigState);

  const CHECK_LIST: Record<
    AssetConfigKeys,
    { checked: boolean; link: string; allowAction?: boolean }
  > = {
    [AssetConfigKeys.TokenConfigPausable]: {
      checked: tokenConfigState?.pausable ?? true,
      link: '#'
    },
    [AssetConfigKeys.TokenConfigMint]: { checked: tokenConfigState?.mintable ?? true, link: '#' },
    [AssetConfigKeys.TokenConfigBurn]: {
      checked: tokenConfigState?.burnable ?? false,
      link: '#',
      allowAction: true
    },
    [AssetConfigKeys.TokenConfigCapped]: {
      checked: tokenConfigState?.capped ?? false,
      link: '#',
      allowAction: true
    }
  };

  const [checkList, setCheckList] = useState<CheckListType>(CHECK_LIST);

  const handleCheckboxChange = useCallback(
    (key: string): void => {
      setCheckList((prevCheckList) => ({
        ...prevCheckList,
        [key]: {
          ...prevCheckList[key],
          checked: !prevCheckList[key].checked
        }
      }));
    },
    [checkList]
  );

  const handleProceed = (): void => {
    const transformedData: ITokenConfigurationForm = {
      pausable: checkList[AssetConfigKeys.TokenConfigPausable].checked,
      mintable: checkList[AssetConfigKeys.TokenConfigMint].checked,
      burnable: checkList[AssetConfigKeys.TokenConfigBurn].checked,
      capped: checkList[AssetConfigKeys.TokenConfigCapped].checked
    };
    next(transformedData);
  };
  return (
    <Stack sx={{ width: '436px' }}>
      <Stack
        mt={1}
        gap={3}
        width="100%"
        height={'80%'}
        sx={{ overflowY: 'scroll', width: '436px' }}>
        <Stack height={'15%'} paddingRight={{ xs: '5%' }}>
          <Stack sx={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            {Object.keys(checkList).map((key) => (
              <CheckboxItem
                key={key}
                checked={checkList[key].checked}
                onChange={() => {
                  handleCheckboxChange(key);
                }}
                link={checkList[key].link}
                linkText={`Ability to ${t(`${assetTokenNamespace}.${key}`)}`}
                optional={checkList[key].optional}
                isDisabled={!checkList[key].allowAction}
              />
            ))}
            <Button onClick={handleProceed}>{t(`${assetTokenNamespace}.continue`)}</Button>{' '}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AssetTokenConfigurations;
