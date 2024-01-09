import { type FC, useEffect } from 'react';
import OnboardingList from '@app/components/OnboardingList';
import { BINARY_ANSWER_OPTIONS } from '@app/constants/issuer-onboarding';
import { RouteNames } from '@app/constants/routes';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type WithSignUpStepperContextProps } from '@app/types/types';

const transactionResource = RouteNames.US_Person;

const UsPerson: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  userPayload: { isUsResident, country, NICNumber },
  updateUserPayload,
  registerUser
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    updateUserPayload({
      socialSecurityNumber: [
        {
          country,
          taxNumber: NICNumber,
          iso: country,
          isDefault: true
        }
      ]
    });
  }, [country, NICNumber]);

  const handleSubmit = (value: string): void => {
    const usResident = !!value.includes('Yes');
    registerUser({
      payload: { dryRun: true, isUsResident: usResident },
      onSuccess: () => {
        updateActiveStep(usResident ? 'SecurityNumber' : 'CountryTaxes');
      }
    });
  };
  return (
    <Box sx={{ width: '100%' }}>
      <OnboardingList
        title={t(`${transactionResource}.title`)}
        subtitle={t(`${transactionResource}.subtitle`)}
        itemList={BINARY_ANSWER_OPTIONS}
        onItemClick={(e) => {
          handleSubmit(e);
        }}
        defaultValue={isUsResident ? 'Yes' : 'No'}
      />
    </Box>
  );
};

export default UsPerson;
