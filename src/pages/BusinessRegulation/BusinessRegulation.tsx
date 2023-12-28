import { type WithSignUpStepperContextProps } from '@app/common/types';
import OnboardingList from '@app/components/OnboardingList';
import { BINARY_ANSWER_OPTIONS } from '@app/constants/issuer-onboarding';
import { RouteNames } from '@app/constants/routes';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

const transactionResource = RouteNames.BUSINESS_REGULATION;

const BusinessRegulation: FC<WithSignUpStepperContextProps> = ({
  updateUserPayload,
  updateActiveStep
}) => {
  const { t } = useTranslation();
  return (
    <OnboardingList
      title={t(`${transactionResource}.title`)}
      subtitle=""
      itemList={BINARY_ANSWER_OPTIONS}
      onItemClick={(selected) => {
        updateUserPayload({ isBusinessRegulated: selected === 'Yes' });
        updateActiveStep();
      }}
    />
  );
};

export default BusinessRegulation;
