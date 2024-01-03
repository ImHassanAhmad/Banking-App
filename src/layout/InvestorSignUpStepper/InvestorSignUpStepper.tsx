import { Stack, Stepper, Grid } from '@mui/material';
import { type FC, type ComponentType } from 'react';
import PersonalInformation from '@app/pages/PersonalInformation';
import RegisterEmail from '@app/pages/RegisterEmail';
import { useNavigate } from 'react-router-dom';
import Password from '@app/pages/Password';
import Address from '@app/pages/Address';
import PhoneNumber from '@app/pages/PhoneNumber';
import IncomeRange from '@app/pages/IncomeRange';
import VerifyIdentity from '@app/pages/VerifyIdentity';
import QuestionsList from '@app/pages/QuestionsList';
import SourceOfIncome from '@app/pages/SourceOfIncome';
import UsPerson from '@app/pages/USPerson';
import SocialSecurityNumber from '@app/pages/SocialSecurityNumber';
import CountryTaxes from '@app/pages/CountryTaxes';
import { InvestorSignUpFlowSteps } from './types';
import { useInvestorSignUpStepper } from '@app/context/InvestorSignUpStepperContext';
import BackButton from '@app/components/BackButton';
import { type WithSignUpStepperContextProps } from '@app/common/types';

import MobileCodeVerification from '@app/pages/MobileCodeVerification';
import RegisterEmailCodeVerification from '@app/pages/RegisterEmailCodeVerification';
import InvesterOccupation from '@app/pages/InvesterOccupation/InvesterOccupation';
import PoliticalExposed from '@app/pages/PoliticalExposed';
import TaxReporter from '@app/pages/TaxReporter';
import PoliticalExposedPerson from '@app/pages/PliticallyExposedPerson/PliticallyExposedPerson';

const investorFlowComponent = (
  activeStep: InvestorSignUpFlowSteps
): ComponentType<WithSignUpStepperContextProps> | undefined => {
  switch (activeStep) {
    case InvestorSignUpFlowSteps.NameAndDateOfBirth:
      return PersonalInformation;
    case InvestorSignUpFlowSteps.Address:
      return Address;
    case InvestorSignUpFlowSteps.Email:
      return RegisterEmail;
    case InvestorSignUpFlowSteps.Mobile:
      return PhoneNumber;
    case InvestorSignUpFlowSteps.IncomeRange:
      return IncomeRange;
    case InvestorSignUpFlowSteps.VerifyIdentity:
      return VerifyIdentity;
    case InvestorSignUpFlowSteps.UsPerson:
      return UsPerson;
    case InvestorSignUpFlowSteps.SecurityNumber:
      return SocialSecurityNumber;
    case InvestorSignUpFlowSteps.CountryTaxes:
      return CountryTaxes;
    case InvestorSignUpFlowSteps.SourceOfIncome:
      return SourceOfIncome;
    case InvestorSignUpFlowSteps.InvesterOccupation:
      return InvesterOccupation;
    case InvestorSignUpFlowSteps.TaxReporter:
      return TaxReporter;
    case InvestorSignUpFlowSteps.PoliticalExposed:
      return PoliticalExposed;
    case InvestorSignUpFlowSteps.PoliticalExposedPerson:
      return PoliticalExposedPerson;
    case InvestorSignUpFlowSteps.Questionaire:
      return QuestionsList;
    case InvestorSignUpFlowSteps.CreatePassword:
      return Password;
    case InvestorSignUpFlowSteps.EmailVerify:
      return RegisterEmailCodeVerification;
    case InvestorSignUpFlowSteps.MobileVerify:
      return MobileCodeVerification;
    default:
  }
};

const IssuerSignUpStepper: FC = () => {
  const navigate = useNavigate();
  const props = useInvestorSignUpStepper();
  const { activeStep, goBack, activeStepIndex } = props;

  const InvestorFlowComponent = investorFlowComponent(activeStep);
  return (
    <Stack>
      <BackButton
        onClick={() => {
          activeStepIndex ? goBack(activeStepIndex - 1) : navigate(-1);
        }}
      />
      <Stepper
        activeStep={activeStepIndex}
        sx={{
          alignItems: 'flex-start',
          '&.MuiStepper-root': {
            alignItems: 'flex-start'
          }
        }}>
        <Grid item lg={7} md={10} sm={10} xs={12}>
          {InvestorFlowComponent ? (
            <InvestorFlowComponent {...props}></InvestorFlowComponent>
          ) : (
            <></>
          )}
        </Grid>
      </Stepper>
    </Stack>
  );
};

export default IssuerSignUpStepper;
