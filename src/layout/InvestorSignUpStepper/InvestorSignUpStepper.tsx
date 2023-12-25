import { Stack, Stepper, Grid } from '@mui/material';
import { type FC, type ReactNode, useMemo } from 'react';
import PersonalInformation from '@app/pages/PersonalInformation';
import RegisterEmail from '@app/pages/RegisterEmail';
import { useNavigate } from 'react-router-dom';
import Password from '@app/pages/Password';
import Address from '@app/pages/Address';
import PhoneNumber from '@app/pages/PhoneNumber';
import IncomeRange from '@app/pages/IncomeRange';
import QuestionsList from '@app/pages/QuestionsList';
import UploadDocument from '@app/pages/UploadDocuments';
import { InvestorSignUpFlowSteps, InvestorSignUpFlowStepsIndices } from './types';
import {
  type InvestorSignUpStepperContextProps,
  useInvestorSignUpStepper
} from '@app/context/InvestorSignUpStepperContext';
import BackButton from '@app/components/BackButton';

const investorFlowComponent = (
  activeStep: InvestorSignUpFlowSteps,
  props: InvestorSignUpStepperContextProps
): ReactNode => {
  switch (activeStep) {
    case InvestorSignUpFlowSteps.NameAndDateOfBirth:
      return <PersonalInformation {...props} />;
    case InvestorSignUpFlowSteps.Address:
      return <Address {...props} />;
    case InvestorSignUpFlowSteps.Email:
      return <RegisterEmail {...props} />;
    case InvestorSignUpFlowSteps.Mobile:
      return <PhoneNumber {...props} />;
    case InvestorSignUpFlowSteps.IncomeRange:
      return <IncomeRange {...props} />;
    case InvestorSignUpFlowSteps.Questionaire:
      return <QuestionsList {...props} />;
    case InvestorSignUpFlowSteps.UploadDocument:
      return <UploadDocument {...props} />;
    case InvestorSignUpFlowSteps.CreatePassword:
      return <Password {...props} />;
    default:
      return <></>;
  }
};

const IssuerSignUpStepper: FC = () => {
  const navigate = useNavigate();
  const props = useInvestorSignUpStepper();
  const { activeStep, goBack } = props;

  const activeStepIndex = useMemo(() => InvestorSignUpFlowStepsIndices[activeStep], [activeStep]);

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
        <Grid item lg={8} md={10} sm={10} xs={12}>
          {investorFlowComponent(activeStep, props)}
        </Grid>
      </Stepper>
    </Stack>
  );
};

export default IssuerSignUpStepper;
