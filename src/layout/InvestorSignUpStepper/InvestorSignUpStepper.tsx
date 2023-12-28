import { Stack, Stepper, Grid } from '@mui/material';
import { type FC, useMemo, type ComponentType } from 'react';
import PersonalInformation from '@app/pages/PersonalInformation';
import RegisterEmail from '@app/pages/RegisterEmail';
import { useNavigate } from 'react-router-dom';
import Password from '@app/pages/Password';
import Address from '@app/pages/Address';
import PhoneNumber from '@app/pages/PhoneNumber';
import IncomeRange from '@app/pages/IncomeRange';
import QuestionsList from '@app/pages/QuestionsList';
import UploadDocument from '@app/pages/UploadDocuments';
import SourceOfIncome from '@app/pages/SourceOfIncome';
import UsPerson from '@app/pages/USPerson/UsPerson';
import { InvestorSignUpFlowSteps, InvestorSignUpFlowStepsIndices } from './types';
import { useInvestorSignUpStepper } from '@app/context/InvestorSignUpStepperContext';
import BackButton from '@app/components/BackButton';
import { type WithSignUpStepperContextProps } from '@app/common/types';

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
    case InvestorSignUpFlowSteps.SourceOfIncome:
      return SourceOfIncome;
    case InvestorSignUpFlowSteps.UsPerson:
      return UsPerson;
    case InvestorSignUpFlowSteps.Questionaire:
      return QuestionsList;
    case InvestorSignUpFlowSteps.UploadDocument:
      return UploadDocument;
    case InvestorSignUpFlowSteps.CreatePassword:
      return Password;
    default:
  }
};

const IssuerSignUpStepper: FC = () => {
  const navigate = useNavigate();
  const props = useInvestorSignUpStepper();
  const { activeStep, goBack } = props;

  const activeStepIndex = useMemo(() => InvestorSignUpFlowStepsIndices[activeStep], [activeStep]);

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
        <Grid item lg={8} md={10} sm={10} xs={12}>
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
