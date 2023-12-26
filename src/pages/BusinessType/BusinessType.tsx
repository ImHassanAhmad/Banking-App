import React from 'react';
import OnboardingList from '@app/components/OnboardingList';
import { BUSINESS_TYPES } from '@app/constants/issuer-onboarding';
import { type SignUpStepperContextProps } from '@app/common/types';

const BusinessType: React.FC<SignUpStepperContextProps> = ({
  activeStep,
  updateActiveStep,
  userPayload
}) => {
  return (
    <OnboardingList
      title="Choose the type of business"
      subtitle=""
      itemList={BUSINESS_TYPES}
      onItemClick={(selectedSubcategory: string) => {
        console.log(`Selected subcategory: ${selectedSubcategory}`);
      }}
    />
  );
};

export default BusinessType;