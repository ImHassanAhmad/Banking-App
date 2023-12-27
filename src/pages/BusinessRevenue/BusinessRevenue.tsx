import { type WithSignUpStepperContextProps } from '@app/common/types';
import OnboardingList from '@app/components/OnboardingList';
import { RevenueRange } from '@app/constants/revenue-range';
import { RouteNames } from '@app/constants/routes';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

const transactionResource = RouteNames.BUSINESS_REVENUE;

const BusinessRevenue: FC<WithSignUpStepperContextProps> = ({
  updateUserPayload,
  updateActiveStep
}) => {
  const { t } = useTranslation();
  return (
    <OnboardingList
      title={t(`${transactionResource}.title`)}
      subtitle=""
      itemList={RevenueRange}
      onItemClick={(selected) => {
        updateUserPayload({ businessRevenue: selected });
        updateActiveStep();
      }}
    />
  );
};

export default BusinessRevenue;
