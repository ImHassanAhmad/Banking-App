import React from 'react';
import OnboardingList from '@app/components/OnboardingList';
import { BUSINESS_TYPES } from '@app/constants/issuer-onboarding';
import { type WithSignUpStepperContextProps } from '@app/types/types';

const BusinessType: React.FC<WithSignUpStepperContextProps> = ({
  updateUserPayload,
  updateActiveStep
}) => {
  return (
    <OnboardingList
      title="Choose the type of business"
      subtitle=""
      itemList={BUSINESS_TYPES}
      onItemClick={(selected: string) => {
        updateUserPayload({ BusinessType: selected });
        updateActiveStep();
      }}
    />
  );
};

export default BusinessType;
