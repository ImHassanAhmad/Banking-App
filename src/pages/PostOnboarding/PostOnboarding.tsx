import React, { type FC, useState } from 'react';
import { Stepper, Step, StepLabel, Box, Typography, Button } from '@mui/material';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import CompanyStructure from './components/CompanyStructure';
import LegalRepresentatives from './components/LegalRepresentatives';
import Kyc from './components/Kyc';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import {
  setCompanyStructure,
  setKyc,
  setLegalRepresentatives,
  setStep
} from '@app/store/slices/postOnboarding';
import type { DataType, IUploadedFiles } from './types';
import { setPostOnboardingCompleted } from '@app/store/slices/userData';
import DoneIcon from '@mui/icons-material/Done';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const translationNamespace = RouteNames.POST_ONBOARDING;

const PostOnboarding: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const { postOnboardingCompleted } = useAppSelector((state) => state.userData);
  const { activeStep } = useAppSelector((state) => state.postOnboarding);

  const [uploadedFiles, setUploadedFiles] = useState<IUploadedFiles>({
    passport: null,
    national_id: null,
    residence_proof: null,
    profile_picture: null
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

  const next = (data: DataType): void => {
    retainState(data);
    setActiveStep(+1);
  };

  const back = (data: DataType): void => {
    retainState(data);
    setActiveStep(-1);
  };

  const retainState = (data: DataType): void => {
    switch (activeStep) {
      case 0:
        dispatch(setCompanyStructure(data));
        break;
      case 1:
        dispatch(setLegalRepresentatives(data));
        break;
      case 2:
        dispatch(setKyc(data));
        break;

      default:
        break;
    }
  };

  const submit = (data: DataType): void => {
    retainState(data);
    dispatch(setPostOnboardingCompleted(true));
  };

  const getStepContent = (step: number): any => {
    switch (step) {
      case 0:
        return <CompanyStructure next={next} />;
      case 1:
        return <LegalRepresentatives next={next} back={back} />;
      case 2:
        return <Kyc submit={submit} back={back} uploadedFiles={uploadedFiles} setter={setter} />;
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
            <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
              {steps.map((label) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};

                return (
                  <Step key={label} {...stepProps}>
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

export default PostOnboarding;
