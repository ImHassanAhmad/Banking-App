import React, { type FC } from 'react';

import OnboardingList from '@app/components/OnboardingList';
import { BINARY_ANSWER_OPTIONS } from '@app/constants/issuer-onboarding';
import { RouteNames } from '@app/constants/routes';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type WithSignUpStepperContextProps } from '@app/common/types';

const transactionResource = RouteNames.US_Person;

const UsPerson: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  userPayload: { isUsResident },
  updateUserPayload
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: '100%' }}>
      <OnboardingList
        title={t(`${transactionResource}.title`)}
        subtitle={t(`${transactionResource}.subtitle`)}
        itemList={BINARY_ANSWER_OPTIONS}
        defaultValue={isUsResident ? 'Yes' : 'No'}
        onItemClick={(option) => {
          updateUserPayload({ isUsResident: option === 'Yes' });
          updateActiveStep();
        }}
      />
    </Box>
  );
};

export default UsPerson;
