import Heading from '@app/components/Heading';
import SubmitButton from '@app/components/SubmitButton';
import { RouteNames } from '@app/constants/routes';
import { IncomeSources, type WithSignUpStepperContextProps } from '@app/types/types';
import { Stack } from '@mui/material';
import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { type CheckList } from '../SourceOfFunding/types';
import IncomeSourceItem from './components/IncomeSourceItem';

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
      <Stack>
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
        <SubmitButton
          title={t(`${sourceOfFundingNamespace}.continue`)}
          disabled={!isAtLeastOneChecked()}
          sx={{ mt: 4 }}
          onClick={handleSave}
        />
      </Stack>
    </Stack>
  );
};

export default SourceOfIncome;
