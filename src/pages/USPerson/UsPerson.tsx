import React, { type FC } from 'react';

import OnboardingList from '@app/components/OnboardingList';
import { BINARY_ANSWER_OPTIONS } from '@app/constants/issuer-onboarding';
import { RouteNames } from '@app/constants/routes';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type WithSignUpStepperContextProps } from '@app/common/types';
import { useNavigate } from 'react-router';
const transactionResource = RouteNames.US_Person;

const UsPerson: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  isLoading,
  userPayload
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const submit = (value: string): void => {
    if (value === BINARY_ANSWER_OPTIONS[0].topic) {
      navigate('/security-number');
    } else {
      updateActiveStep();
    }
    // tempoarirlly comment until msw api is not ready
    // registerUser({
    //   payload: { dryRun: true, UsPerson: value },
    //   onSuccess: () => {
    //     updateActiveStep();
    //   }
    // });
  };
  return (
    <Box sx={{ width: '70%' }}>
      <OnboardingList
        title={t(`${transactionResource}.title`)}
        subtitle={t(`${transactionResource}.subtitle`)}
        itemList={BINARY_ANSWER_OPTIONS}
        onItemClick={(e) => {
          submit(e);
        }}
      />
    </Box>
  );
};

export default UsPerson;
