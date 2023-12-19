import React, { useState, useCallback } from 'react';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BackButton from '@app/components/BackButton';
import Heading from '@app/components/Heading';
import { RouteNames } from '@app/constants/routes';
import CheckboxItem from '@app/components/CheckboxItem';
import { type CheckListType } from '@app/components/CheckboxItem/types';

const aboutOurServicesNamespace = RouteNames.QUESTIONS_LIST;

const CHECK_LIST: CheckListType = {
  news_promotions: { checked: false, optional: true },
  terms_conditions: { checked: false, link: '#' },
  privacy_policy: { checked: false, link: '#' },
  visa_card_policy: { checked: false, link: '#' },
  prices_limits: { checked: false, link: '#' }
};

const QuestionsList: React.FC = () => {
  const { t } = useTranslation();
  const [checkList, setCheckList] = useState<CheckListType>(CHECK_LIST);

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

  return (
    <Stack sx={{ width: '436px' }}>
      <BackButton onClick={() => {}} />
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
              <CheckboxItem
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

            <Button
              disabled={!isAllNonOptionalChecked}
              sx={{ textTransform: 'uppercase', marginTop: '2rem' }}
              fullWidth
              type="submit">
              {t(`${aboutOurServicesNamespace}.confirm`)}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default QuestionsList;
