import { Stepper } from '@mui/material';
import { type FC, type ReactNode } from 'react';

import CountrySelect from '@app/pages/IssuerSignUp/CountrySelect';
import SignUp from '@app/pages/IssuerSignUp/RegisterEmail';
import Password from '@app/pages/IssuerSignUp/Password';
import PhoneNumber from '@app/pages/IssuerSignUp/PhoneNumber';
import MobileCodeVerification from '@app/pages/IssuerSignUp/MobileCodeVerification';
import { IssuerSignUpFlowSteps, IssuerFlowStepsIndices } from './types';
import AboutServices from '@app/pages/IssuerSignUp/AboutServices';
import RegisterEmailCodeVerification from '@app/pages/IssuerSignUp/RegisterEmailCodeVerification';
import BusinessCategory from '@app/pages/IssuerSignUp/BusinessCategory';
import BusinessDescription from '@app/pages/IssuerSignUp/BusinessDescription';
import BusinessRegulation from '@app/pages/IssuerSignUp/BusinessRegulation';
import BusinessRevenue from '@app/pages/IssuerSignUp/BusinessRevenue';
import CompanyInformation from '@app/pages/IssuerSignUp/CompanyInformation';
import { useIssuerSignUpStepper } from '@app/context/IssuerSignUpStepperContext';

const issuerFlowComponent = (activeStep: IssuerSignUpFlowSteps): ReactNode => {
  switch (activeStep) {
    case IssuerSignUpFlowSteps.BusinessCategory:
      return <BusinessCategory />;
    case IssuerSignUpFlowSteps.Country:
      return <CountrySelect />;
    case IssuerSignUpFlowSteps.Email:
      return <SignUp />;
    case IssuerSignUpFlowSteps.CompanyBasicInfo:
      return <CompanyInformation />;
    case IssuerSignUpFlowSteps.Mobile:
      return <PhoneNumber />;
    case IssuerSignUpFlowSteps.AboutOurServices:
      return <AboutServices />;
    case IssuerSignUpFlowSteps.CreatePassword:
      return <Password />;
    case IssuerSignUpFlowSteps.EmailVerify:
      return <RegisterEmailCodeVerification />;
    case IssuerSignUpFlowSteps.MobileVerify:
      return <MobileCodeVerification />;
    case IssuerSignUpFlowSteps.BusinessDescription:
      return <BusinessDescription />;
    case IssuerSignUpFlowSteps.BusinessRegulation:
      return <BusinessRegulation />;
    case IssuerSignUpFlowSteps.BusinessRevenue:
      return <BusinessRevenue />;

    default:
      return <></>;
  }
};

const IssuerSignUpStepper: FC = () => {
  const { activeStep } = useIssuerSignUpStepper();

  return (
    <Stepper
      activeStep={IssuerFlowStepsIndices[activeStep]}
      sx={{
        alignItems: 'flex-start',
        '&.MuiStepper-root': {
          alignItems: 'flex-start'
        }
      }}>
      {issuerFlowComponent(activeStep)}
    </Stepper>
  );
};

export default IssuerSignUpStepper;
