import { type WithSignUpStepperContextProps } from '@app/common/types';
import OnboardingList from '@app/components/OnboardingList';
import { BINARY_ANSWER_OPTIONS } from '@app/constants/issuer-onboarding';
import { RouteNames } from '@app/constants/routes';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

const transactionResource = RouteNames.LEGAL_REPRESENTATIVE;

const LegalRepresentative: FC<WithSignUpStepperContextProps> = ({
  activeStep,
  updateActiveStep
}) => {
  const { t } = useTranslation();
  return (
    <OnboardingList
      title={t(`${transactionResource}.title`)}
      subtitle=""
      itemList={BINARY_ANSWER_OPTIONS}
      onItemClick={() => {}}
    />
  );
};

export default LegalRepresentative;
