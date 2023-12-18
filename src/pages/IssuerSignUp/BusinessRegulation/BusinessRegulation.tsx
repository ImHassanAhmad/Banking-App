import OnboardingList from '@app/components/OnboardingList';
import { RouteNames } from '@app/constants/routes';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

const transactionResource = RouteNames.BUSINESS_REGULATION;

const BusinessRegulation: FC = () => {
  const { t } = useTranslation();
  return (
    <OnboardingList
      title={t(`${transactionResource}.title`)}
      subtitle=""
      itemList={[{ topic: 'Yes' }, { topic: 'No' }]}
      onItemClick={() => {}}
    />
  );
};

export default BusinessRegulation;
