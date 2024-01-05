/* eslint-disable no-unused-vars */
import React, { useState, type FC } from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';
import Heading from '@app/components/Heading';
import { type CheckList } from '../InvesterOccupation/types';
import { type WithSignUpStepperContextProps } from '@app/common/types';
import { InvesterOccupation } from '@app/common/types';
import IncomeSourceItem from '../SourceOfIncome/components/IncomeSourceItem';
import SubmitButton from '@app/components/SubmitButton';

const investeroccupations = RouteNames.INVESTER_OCCUPATION;
const occupationSourcesArray: string[] = Object.values(InvesterOccupation);

const InvesterOccupations: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  userPayload: { investerOccupation = [] },
  updateUserPayload
}) => {
  const { t } = useTranslation();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const CHECK_LIST: CheckList = occupationSourcesArray.reduce<CheckList>((obj, key) => {
    obj[key] = { checked: investerOccupation.findIndex((value: string) => value === key) > -1 };
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
    const investerOccupation: string[] = Object.keys(checkList).filter(
      (key: string) => checkList[key].checked
    );
    updateUserPayload({ investerOccupation });
    updateActiveStep();
  };

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack>
        <Heading
          title={t(`${investeroccupations}.title`)}
          subTitle={t(`${investeroccupations}.subtitle`)}
        />
      </Stack>
      <Stack>
        <Stack mt={5} mb={5} sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: '14px' }}>
          {Object.keys(checkList).map((key) => (
            <>
              <IncomeSourceItem
                key={key}
                checked={checkList[key].checked}
                title={t(`${investeroccupations}.${key}`)}
                onChange={() => {
                  handleCheckboxChange(key);
                }}
              />
            </>
          ))}
        </Stack>

        <SubmitButton
          title={t(`${investeroccupations}.continue`)}
          disabled={!isAtLeastOneChecked()}
          sx={{ mt: 4 }}
          onClick={handleSave}
        />
      </Stack>
    </Stack>
  );
};

export default InvesterOccupations;
