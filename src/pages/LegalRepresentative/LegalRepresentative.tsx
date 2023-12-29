import { type WithSignUpStepperContextProps } from '@app/common/types';
import { InfoModal } from '@app/components/Modals';
import OnboardingList from '@app/components/OnboardingList';
import { BINARY_ANSWER_OPTIONS } from '@app/constants/issuer-onboarding';
import { ModalNames } from '@app/constants/modals';
import { RouteNames } from '@app/constants/routes';
import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const transactionResource = RouteNames.LEGAL_REPRESENTATIVE;
const legalCheckModalNamespace = ModalNames.LEGAL_CHECK;

const LegalRepresentative: FC<WithSignUpStepperContextProps> = ({
  updateUserPayload,
  updateActiveStep,
  resetStepper
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <OnboardingList
        title={t(`${transactionResource}.title`)}
        subtitle=""
        itemList={BINARY_ANSWER_OPTIONS}
        onItemClick={(selected) => {
          console.log('selected', selected);
          if (selected === 'Yes') {
            updateUserPayload({ isLegalRepresentative: true });
            updateActiveStep();
          } else {
            setOpen(true);
          }
        }}
      />
      <InfoModal
        open={open}
        buttonText={t(`${legalCheckModalNamespace}.OK`)}
        title={t(`${legalCheckModalNamespace}.title`)}
        subtitle={t(`${legalCheckModalNamespace}.subtitle`)}
        handleClose={() => {
          setOpen(false);
          resetStepper();
          navigate('/');
        }}
      />
    </>
  );
};

export default LegalRepresentative;
