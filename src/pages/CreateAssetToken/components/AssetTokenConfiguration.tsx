import React, { useState, useCallback } from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckboxItem from '@app/components/CheckboxItem';
import { type CheckListType } from '@app/components/CheckboxItem/types';
import { RouteNames } from '@app/constants/routes';
import { type InspiredQuestionsListProps } from '../types';

const assetTokenNamespace = RouteNames.CREATE_ASSET_TOKEN;

const AssetTokenConfigurations: React.FC<InspiredQuestionsListProps> = ({
  defaultSelectedKeys
}) => {
  const { t } = useTranslation();

  const CHECK_LIST: CheckListType = {
    token_config_pausable: { checked: true, link: '#' },
    token_config_mint: { checked: true, link: '#' },
    token_config_burn: { checked: false, link: '#' },
    token_config_capped: { checked: false, link: '#' }
  };

  defaultSelectedKeys.forEach((key) => {
    if (key in CHECK_LIST) {
      CHECK_LIST[key].checked = true;
    } else {
      console.error(`Invalid defaultSelectedKey: ${key}`);
    }
  });

  const [checkList, setCheckList] = useState<CheckListType>(CHECK_LIST);

  const handleCheckboxChange = useCallback(
    (key: string): void => {
      // Check if the clicked key is NOT in the defaultSelectedKeys array
      if (!defaultSelectedKeys.includes(key)) {
        // Toggle the checked status of the checkbox for the given key
        setCheckList((prevCheckList) => ({
          ...prevCheckList,
          [key]: {
            ...prevCheckList[key],
            checked: !prevCheckList[key].checked
          }
        }));
      }
    },
    [defaultSelectedKeys] // Now depends on the array of default selected keys
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
                isDisabled={defaultSelectedKeys.includes(key)} // Set disabled to true if key is in defaultSelectedKeys
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AssetTokenConfigurations;
