import React, { type FC, useState } from 'react';
import { Stepper, Step, StepLabel, Box, Typography, Button } from '@mui/material';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import CompanyStructure from './components/CompanyStructure';
import LegalRepresentatives from './components/LegalRepresentatives';
import Kyc from './components/IssuerKyc';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import {
  setCompanyStructure,
  setKyc,
  setLegalRepresentatives,
  setStep
} from '@app/store/slices/issuerOnboarding';
import { PostOnboardingFlowSteps, type DataType, type IUploadedFiles } from './types';
import DoneIcon from '@mui/icons-material/Done';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const translationNamespace = RouteNames.ISSUER_ONBOARDING;

const IssuerOnboarding: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const { postOnboardingCompleted } = useAppSelector((state) => state.userData);
  const { activeStep } = useAppSelector((state) => state.postOnboarding);

  const [uploadedFiles, setUploadedFiles] = useState<IUploadedFiles>({
    passport: undefined,
    national_id: undefined,
    residence_proof: undefined,
    profile_picture: undefined
  });

  const steps = [
    t(`${translationNamespace}.company_structure`),
    t(`${translationNamespace}.legal_representative`),
    t(`${translationNamespace}.kyc`)
  ];

  const setActiveStep = (payload: number): void => {
    dispatch(setStep(payload));
  };

  const setter = (name: string, file: File): void => {
    setUploadedFiles((prev: any) => {
      const newRes: any = { ...prev };
      newRes[name] = file;
      return newRes;
    });
  };

  const nextStep = (data: DataType): void => {
    retainState(data);
    setActiveStep(+1);
  };

  const previousStep = (data: DataType): void => {
    retainState(data);
    setActiveStep(-1);
  };

  const retainState = (data: DataType): void => {
    switch (activeStep) {
      case PostOnboardingFlowSteps.CompanyStructure:
        dispatch(setCompanyStructure(data));
        break;
      case PostOnboardingFlowSteps.LegalRespresentative:
        dispatch(setLegalRepresentatives(data));
        break;
      case PostOnboardingFlowSteps.Kyc:
        dispatch(setKyc(data));
        break;

      default:
        break;
    }
  };

  const getStepContent = (step: PostOnboardingFlowSteps): any => {
    switch (step) {
      case PostOnboardingFlowSteps.CompanyStructure:
        return <CompanyStructure nextStep={nextStep} />;
      case PostOnboardingFlowSteps.LegalRespresentative:
        return <LegalRepresentatives nextStep={nextStep} previousStep={previousStep} />;
      case PostOnboardingFlowSteps.Kyc:
        return <Kyc previousStep={previousStep} uploadedFiles={uploadedFiles} setter={setter} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box mt="40px">
      <Box width="80%" mt="46px" gap="20px">
        {postOnboardingCompleted ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            flexDirection="column"
            m="200px"
            gap="40px">
            <Box
              bgcolor={theme.palette.primary.main}
              minHeight="100px"
              minWidth="100px"
              borderRadius="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white">
              <DoneIcon sx={{ width: '50px', height: '50px' }} />
            </Box>
            <Typography textAlign="center">
              {t(`${translationNamespace}.success_message`)}
            </Typography>
            <Button
              onClick={() => {
                navigate(`/${RouteNames.DASHBOARD}`);
              }}>
              {t(`${translationNamespace}.dashboard_button`)}
            </Button>
          </Box>
        ) : (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 5 }} data-testid="issuer-onboarding-stepper">
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};

                return (
                  <Step key={index} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {getStepContent(activeStep)}
          </>
        )}
      </Box>
    </Box>
  );
};

export default IssuerOnboarding;
