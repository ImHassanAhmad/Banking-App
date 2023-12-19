import OnboardingList from '@app/components/OnboardingList';
import { RouteNames } from '@app/constants/routes';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RevenueRange } from '@app/constants/revenue-range';
import { Stack } from '@mui/material';
import BackButton from '@app/components/BackButton';

const transactionResource = RouteNames.INCOME_RANGE;

const BusinessTurnover: FC = () => {
  const { t } = useTranslation();
  return (
    <Stack>
      <BackButton />
      <OnboardingList
        title={t(`${transactionResource}.title`)}
        subtitle=""
        itemList={RevenueRange}
        onItemClick={() => {}}
      />
    </Stack>
  );
};

export default BusinessTurnover;
