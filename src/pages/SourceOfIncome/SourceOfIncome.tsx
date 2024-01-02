/* eslint-disable no-unused-vars */
import React, { useState, type FC } from 'react';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';
import Heading from '@app/components/Heading';
import IncomeSourceItem from './components/IncomeSourceItem';
import { type CheckList } from '../SourceOfFunding/types';
import { type WithSignUpStepperContextProps } from '@app/common/types';
import { IncomeSources } from '@app/common/types';

const sourceOfFundingNamespace = RouteNames.SOURCE_OF_INCOME;
const incomeSourcesArray: string[] = Object.values(IncomeSources);

const SourceOfIncome: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  userPayload: { sourceOfIncome = [] },
  updateUserPayload
}) => {
  const { t } = useTranslation();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const CHECK_LIST: CheckList = incomeSourcesArray.reduce<CheckList>((obj, key) => {
    obj[key] = { checked: sourceOfIncome.findIndex((value: string) => value === key) > -1 };
    return obj;
  }, {});

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
    const sourceOfIncome: string[] = Object.keys(checkList).filter(
      (key: string) => checkList[key].checked
    );
    updateUserPayload({ sourceOfIncome });
    updateActiveStep();
  };

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
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
          sx={{ marginTop: '2rem', width: '100%' }}
          type="submit"
          onClick={handleSave}>
          {t(`${sourceOfFundingNamespace}.continue`)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default SourceOfIncome;
