import React, { useState, useCallback } from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckboxItem from '@app/components/CheckboxItem';
import { type CheckListType } from '@app/components/CheckboxItem/types';
import { RouteNames } from '@app/constants/routes';

const assetTokenNamespace = RouteNames.CREATE_ASSET_TOKEN;

const AssetTokenConfigurations: React.FC = () => {
  const { t } = useTranslation();

  const CHECK_LIST: CheckListType = {
    token_config_pausable: { checked: true, link: '#' },
    token_config_mint: { checked: true, link: '#' },
    token_config_burn: { checked: false, link: '#', allowAction: true },
    token_config_capped: { checked: false, link: '#', allowAction: true }
  };

  const [checkList, setCheckList] = useState<CheckListType>(CHECK_LIST);

  const handleCheckboxChange = useCallback(
    (key: string): void => {
      if (checkList[key].allowAction) {
        setCheckList((prevCheckList) => ({
          ...prevCheckList,
          [key]: {
            ...prevCheckList[key],
            checked: !prevCheckList[key].checked
          }
        }));
      }
    },
    [checkList]
  );

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
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AssetTokenConfigurations;
