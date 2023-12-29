import OnboardingList from '@app/components/OnboardingList';
import { RouteNames } from '@app/constants/routes';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RevenueRange } from '@app/constants/revenue-range';
import { Stack } from '@mui/material';
import { type WithSignUpStepperContextProps } from '@app/common/types';

const transactionResource = RouteNames.INCOME_RANGE;

const IncomeRange: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  userPayload: { incomeRange },
  updateUserPayload
}) => {
  const { t } = useTranslation();

  return (
    <Stack>
      <OnboardingList
        title={t(`${transactionResource}.title`)}
        subtitle=""
        itemList={RevenueRange}
        defaultValue={incomeRange}
        onItemClick={(topic: string) => {
          updateUserPayload({ incomeRange: topic });
          updateActiveStep();
        }}
      />
    </Stack>
  );
};

export default IncomeRange;
