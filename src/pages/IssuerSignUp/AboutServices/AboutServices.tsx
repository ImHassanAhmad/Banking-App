// AboutServices.tsx
import React, { useState, useCallback } from 'react';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useIssuerSignUpStepper } from '@app/context/IssuerSignUpStepperContext';
import { IssuerSignUpFlowSteps } from '@app/layout/IssuerSignUpStepper/types';
import BackButton from '@app/components/BackButton';
import Heading from '@app/components/Heading';
import { RouteNames } from '@app/constants/routes';
import TermItem from './components/TermItem';
import { type TermCheckListType } from './types';

const aboutOurServicesNamespace = RouteNames.ABOUT_OUR_SERVICES;

const CHECK_LIST: TermCheckListType = {
  news_promotions: { checked: false, optional: true },
  terms_conditions: { checked: false, link: '#' },
  privacy_policy: { checked: false, link: '#' },
  visa_card_policy: { checked: false, link: '#' },
  prices_limits: { checked: false, link: '#' }
};

const AboutServices: React.FC = () => {
  const { t } = useTranslation();
  const { updateActiveStep } = useIssuerSignUpStepper();

  const [checkList, setCheckList] = useState<TermCheckListType>(CHECK_LIST);

  const isAllChecked = Object.values(checkList).every(({ checked }) => checked);

  const isAllNonOptionalChecked = Object.values(checkList).every(({ optional, checked }) => {
    if (!optional) return checked;

    return true;
  });

  const handleCheckboxChange = useCallback((key: string): void => {
    setCheckList((prevCheckList) => ({
      ...prevCheckList,
      [key]: {
        ...prevCheckList[key],
        checked: !prevCheckList[key].checked
      }
    }));
  }, []);

  const handleSelectAllChange = useCallback((): void => {
    setCheckList((prevCheckList) => {
      const isAllChecked = Object.values(prevCheckList).every((item) => item.checked);
      const updatedCheckList: TermCheckListType = {};

      Object.keys(prevCheckList).forEach((key) => {
        updatedCheckList[key] = {
          ...prevCheckList[key],
          checked: !isAllChecked
        };
      });

      return updatedCheckList;
    });
  }, []);

  return (
    <Stack sx={{ width: '436px' }}>
      <BackButton
        onClick={() => {
          updateActiveStep(IssuerSignUpFlowSteps.Mobile);
        }}
      />
      <Stack mt={4}>
        <Heading
          title={t(`${aboutOurServicesNamespace}.title`)}
          subTitle={t(`${aboutOurServicesNamespace}.subtitle`)}
        />
      </Stack>

      <Stack
        mt={1}
        gap={3}
        width="100%"
        height={'80%'}
        sx={{ overflowY: 'scroll', width: '436px' }}>
        <Stack height={'15%'} paddingRight={{ xs: '5%' }}>
          <Stack sx={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            {Object.keys(checkList).map((key) => (
              <TermItem
                key={key}
                checked={checkList[key].checked}
                onChange={() => {
                  handleCheckboxChange(key);
                }}
                link={checkList[key].link}
                linkText={t(`${aboutOurServicesNamespace}.${key}`)}
                optional={checkList[key].optional}
              />
            ))}
            <TermItem
              checked={isAllChecked}
              onChange={handleSelectAllChange}
              linkText={t(`${aboutOurServicesNamespace}.select_all`)}
            />
            <Button
              disabled={!isAllNonOptionalChecked}
              sx={{ textTransform: 'uppercase', marginTop: '20px' }}
              fullWidth
              type="submit"
              onClick={() => {
                updateActiveStep(IssuerSignUpFlowSteps.CreatePassword);
              }}>
              {t(`${aboutOurServicesNamespace}.confirm`)}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AboutServices;
