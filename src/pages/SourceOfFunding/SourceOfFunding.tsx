import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FundingSourceItem from './components/FundingSourceItem';
import { RouteNames } from '@app/constants/routes';
import Heading from '@app/components/Heading';
import { type CheckList } from './types';
import { FUNDING_SOURCES } from '@app/constants/funding-source';
import { type WithSignUpStepperContextProps } from '@app/types/types';

const sourceOfFundingNamespace = RouteNames.SOURCE_OF_FUNDING;

const CHECK_LIST: CheckList = FUNDING_SOURCES.reduce<CheckList>((obj, key) => {
  obj[key] = { checked: false };
  return obj;
}, {});

const SourceOfFunding: React.FC<WithSignUpStepperContextProps> = ({
  updateUserPayload,
  updateActiveStep
}) => {
  const { t } = useTranslation();
  const [checkList, setCheckList] = useState<CheckList>(CHECK_LIST);

  const isAtLeastOneChecked = (): boolean =>
    Object.values(checkList).some(({ checked }) => checked);

  const handleCheckboxChange = (key: string) => () => {
    setCheckList((prevCheckList) => ({
      ...prevCheckList,
      [key]: {
        ...prevCheckList[key],
        checked: !prevCheckList[key].checked
      }
    }));
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
        <Stack mt={5} mb={5}>
          {Object.keys(checkList).map((key) => (
            <FundingSourceItem
              key={key}
              checked={checkList[key].checked}
              title={t(`${sourceOfFundingNamespace}.${key}`)}
              onChange={handleCheckboxChange(key)}
            />
          ))}
        </Stack>
        <Button
          disabled={!isAtLeastOneChecked()}
          sx={{ marginTop: '20px', width: '436px' }}
          type="submit"
          onClick={() => {
            updateUserPayload({
              fundingSources: Object.keys(checkList).filter((key) => checkList[key].checked)
            });
            updateActiveStep();
          }}>
          {t(`${sourceOfFundingNamespace}.continue`)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default SourceOfFunding;
