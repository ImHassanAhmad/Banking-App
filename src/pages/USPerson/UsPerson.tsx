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
  registerUser,
  isLoading,
  userPayload,
  updateUserPayload
}) => {
  const { t } = useTranslation();

  const handleSubmit = (value: string): void => {
    const usResident = !!value.includes('Yes');
    registerUser({
      payload: { dryRun: true, isUsResident: usResident },
      onSuccess: () => {
        updateActiveStep(usResident ? 'SecurityNumber' : 'CountryTaxes');
      }
    });
  };
  return (
    <Box sx={{ width: '70%' }}>
      <OnboardingList
        title={t(`${transactionResource}.title`)}
        subtitle={t(`${transactionResource}.subtitle`)}
        itemList={BINARY_ANSWER_OPTIONS}
        onItemClick={(e) => {
          handleSubmit(e);
        }}
      />
    </Box>
  );
};

export default UsPerson;
