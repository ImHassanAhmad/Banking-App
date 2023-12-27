import OnboardingList from '@app/components/OnboardingList';
import { RouteNames } from '@app/constants/routes';
import { useState, type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RevenueRange } from '@app/constants/revenue-range';
import { Stack } from '@mui/material';
import {
  type AuthFetchQueryError,
  type WithSignUpStepperContextProps,
  type InvestorUserRequestDto
} from '@app/common/types';

const transactionResource = RouteNames.INCOME_RANGE;

const BusinessTurnover: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  userPayload: { incomeRange }
}) => {
  const { t } = useTranslation();
  const [regUserPayload, setRegUserPayload] = useState<InvestorUserRequestDto>({ dryRun: true });

  useEffect(() => {
    if (regUserPayload.incomeRange) submit();
  }, [regUserPayload.incomeRange]);

  const submit = (): void => {
    registerUser({
      payload: regUserPayload,
      onSuccess: () => {
        updateActiveStep();
      },
      onError: ({ message }: AuthFetchQueryError) => {}
    });
  };
  return (
    <Stack>
      <OnboardingList
        title={t(`${transactionResource}.title`)}
        subtitle=""
        itemList={RevenueRange}
        defaultValue={incomeRange}
        onItemClick={(topic: string) => {
          setRegUserPayload({ ...regUserPayload, incomeRange: topic });
        }}
      />
    </Stack>
  );
};

export default BusinessTurnover;
