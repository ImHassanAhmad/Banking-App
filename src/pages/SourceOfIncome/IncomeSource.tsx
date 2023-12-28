/* eslint-disable no-unused-vars */
import React, { useState, type FC } from 'react';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';
import Heading from '@app/components/Heading';
import IncomeSourceItem from './components/IncomeSourceItem';
import { type CheckList } from '../SourceOfFunding/types';
import { INCOME_SOURCES } from './constants';
import { type WithSignUpStepperContextProps } from '@app/common/types';
const sourceOfFundingNamespace = RouteNames.SOURCE_OF_INCOME;

const CHECK_LIST: CheckList = INCOME_SOURCES.reduce<CheckList>((obj, key) => {
  obj[key] = { checked: false };
  return obj;
}, {});

const SourceOfIncome: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  isLoading,
  userPayload
}) => {
  const { t } = useTranslation();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [checkList, setCheckList] = useState<CheckList>(CHECK_LIST);

  const isAtLeastOneChecked = (): boolean =>
    Object.values(checkList).some(({ checked }) => checked);

  const handleCheckboxChange = (key: string): void => {
    setCheckList((prevCheckList) => {
      const isChecked = !prevCheckList[key].checked;

      return {
        ...prevCheckList,
        [key]: {
          ...prevCheckList[key],
          checked: isChecked
        }
      };
    });

    setCheckedItems((prevCheckedItems) => {
      const isChecked = !checkedItems.includes(key);

      if (isChecked) {
        return [...prevCheckedItems, key];
      } else {
        return prevCheckedItems.filter((item) => item !== key);
      }
    });
  };

  const handleSave = (): void => {
    updateActiveStep();
  };

  return (
    <Stack sx={{ width: '552px' }}>
      <Stack mt={4}>
        <Heading
          title={t(`${sourceOfFundingNamespace}.title`)}
          subTitle={t(`${sourceOfFundingNamespace}.subtitle`)}
        />
      </Stack>
      <Stack>
        <Stack mt={5} mb={5} sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: '14px' }}>
          {Object.keys(checkList).map((key) => (
            <>
              <IncomeSourceItem
                key={key}
                checked={checkList[key].checked}
                title={t(`${sourceOfFundingNamespace}.${key}`)}
                onChange={() => {
                  handleCheckboxChange(key);
                }}
              />
            </>
          ))}
        </Stack>
        <Button
          disabled={!isAtLeastOneChecked()}
          sx={{ marginTop: '20px', width: '436px' }}
          type="submit"
          onClick={handleSave}>
          {t(`${sourceOfFundingNamespace}.continue`)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default SourceOfIncome;
