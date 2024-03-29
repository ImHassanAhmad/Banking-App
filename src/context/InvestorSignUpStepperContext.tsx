import {
  InvestorSignUpFlowSteps,
  InvestorSignUpFlowStepsIndices
} from '@app/layout/InvestorSignUpStepper/types';
import { useRegisterInvestorMutation } from '@app/store/api/onboarding';
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  useContext,
  type FC,
  type PropsWithChildren,
  useMemo
} from 'react';
import {
  type RegisterUserResponseDto,
  type AuthFetchQueryError,
  AuthErrorLevel,
  onBoardType,
  type InvestorUserRequestDto,
  type IErrorMessage
} from '@app/types/types';
import { useAuthError } from './AuthErrorContext';

import AuthErrorWrapper from '@app/layout/AuthErrorWrapper';
import { enumToIndexRecord, indexToEnumKeyRecord } from '@app/utils/enum';

export interface RegisterUserCallBackParams {
  payload: InvestorUserRequestDto;
  onSuccess: (response: RegisterUserResponseDto) => void;
  onError?: (error: AuthFetchQueryError) => void;
}

export interface InvestorSignUpStepperContextProps {
  activeStep: InvestorSignUpFlowSteps;
  userId: string;
  isLoading: boolean;
  userPayload: InvestorUserRequestDto;
  activeStepError?: IErrorMessage;
  onBoardType: onBoardType;
  registerUser: (params: RegisterUserCallBackParams) => void;
  setUserId: Dispatch<SetStateAction<string>>;
  updateActiveStep: () => void;
  goBack: (backStep: number) => void;
  activeStepIndex: number;
  updateUserPayload: (data: Partial<InvestorUserRequestDto>) => void;
}

const InvestorSignUpStepperContext = createContext<InvestorSignUpStepperContextProps>({
  activeStep: InvestorSignUpFlowSteps.Email,
  userId: '',
  error: {},
  isLoading: false,
  userPayload: { dryRun: true }
} as any);

const { Provider } = InvestorSignUpStepperContext;

export const InvestorSignUpStepperProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(InvestorSignUpFlowSteps.Email);
  const [userId, setUserId] = useState('');
  const { updateError, findError } = useAuthError();
  const [registerUserPayload, setRegisterUserPayload] = useState<InvestorUserRequestDto>({
    dryRun: true,
    socialSecurityNumber: []
  });
  const [register, { isLoading }] = useRegisterInvestorMutation();

  const handleError = (
    { message, errorLevel }: AuthFetchQueryError,
    onSuccess: (response: RegisterUserResponseDto) => void,
    onError: (error: AuthFetchQueryError) => void
  ): void => {
    if (!message) {
      onSuccess({ userId: '' });
      return;
    }
    switch (errorLevel) {
      case AuthErrorLevel.Field:
        onError({ message, errorLevel });
        break;
      default:
        updateError(activeStep, { title: message, message, errorLevel });
        break;
    }
  };

  const updateActiveStep = (nextStep?: InvestorSignUpFlowSteps): void => {
    if (activeStep === InvestorSignUpFlowSteps.MobileVerify) {
      setRegisterUserPayload({ dryRun: true });
    }

    const nextActiveStep: InvestorSignUpFlowSteps =
      (indexToEnumKeyRecord(InvestorSignUpFlowSteps)[
        enumToIndexRecord(InvestorSignUpFlowSteps)[activeStep] + 1
      ] as InvestorSignUpFlowSteps) || InvestorSignUpFlowSteps.Email;

    updateError(nextActiveStep, undefined);
    setActiveStep(nextStep ?? nextActiveStep);
  };

  const goBack = (backStep: number): void => {
    updateError(backStep, undefined);
    setActiveStep(
      indexToEnumKeyRecord(InvestorSignUpFlowSteps)[backStep] as InvestorSignUpFlowSteps
    );
  };
  const registerUser = ({
    payload,
    onSuccess,
    onError = () => {}
  }: RegisterUserCallBackParams): void => {
    const registerFormData = { ...registerUserPayload, ...payload };
    let apiPayload: InvestorUserRequestDto = { dryRun: true };
    switch (activeStep) {
      case InvestorSignUpFlowSteps.NameAndDateOfBirth:
        apiPayload.firstName = registerFormData.firstName;
        apiPayload.lastName = registerFormData.lastName;
        apiPayload.dateOfBirth = registerFormData.dateOfBirth;
        break;
      case InvestorSignUpFlowSteps.Address:
        apiPayload.country = registerFormData.country;
        apiPayload.postalCode = registerFormData.postalCode;
        apiPayload.city = registerFormData.city;
        apiPayload.address2 = registerFormData.address2;
        apiPayload.address1 = registerFormData.address1;
        apiPayload.longitude = registerFormData.longitude;
        apiPayload.latitude = registerFormData.latitude;
        break;
      case InvestorSignUpFlowSteps.Email:
        apiPayload.email = registerFormData.email;
        break;
      case InvestorSignUpFlowSteps.IncomeRange:
        apiPayload.incomeRange = registerFormData.incomeRange;
        break;
      case InvestorSignUpFlowSteps.VerifyIdentity:
        apiPayload.idCardImage = registerFormData.idCardImage;
        apiPayload.addressProofImage = registerFormData.addressProofImage;
        apiPayload.selfieImage = registerFormData.selfieImage;
        break;
      case InvestorSignUpFlowSteps.Mobile:
        apiPayload.phoneNumberCountryCode = registerFormData.phoneNumberCountryCode;
        apiPayload.shortenPhoneNumber = registerFormData.shortenPhoneNumber;
        break;
      case InvestorSignUpFlowSteps.AboutOurServices:
        apiPayload.wittyNews = registerFormData.wittyNews;
        break;
      case InvestorSignUpFlowSteps.TaxReporter:
        apiPayload.NICNumber = registerFormData.NICNumber;
        break;
      case InvestorSignUpFlowSteps.UsPerson:
        apiPayload.isUsResident = registerFormData.isUsResident;
        break;
      case InvestorSignUpFlowSteps.SourceOfIncome:
        apiPayload.sourceOfIncome = registerFormData.sourceOfIncome;
        break;
      case InvestorSignUpFlowSteps.InvesterOccupation:
        apiPayload.investerOccupation = registerFormData.investerOccupation;
        break;

      case InvestorSignUpFlowSteps.CreatePassword:
        apiPayload = { ...registerFormData, dryRun: false };
        break;
      default:
    }

    setRegisterUserPayload({ ...registerUserPayload, ...payload });
    const userPayload = {
      vis: true,
      visaTncAgreed: true,
      wittyTncAgreed: true,
      privacyPolicy: true,
      accountType: 'investor'
    };
    register({ ...apiPayload, ...userPayload })
      .unwrap()
      .then((response: RegisterUserResponseDto) => {
        onSuccess(response);
      })
      .catch((error: AuthFetchQueryError) => {
        handleError(error, onSuccess, onError);
      });
  };

  const activeStepError = findError(activeStep);
  const activeStepIndex = useMemo(() => InvestorSignUpFlowStepsIndices[activeStep], [activeStep]);

  const updateUserPayload = (data: Partial<InvestorUserRequestDto>): void => {
    setRegisterUserPayload({ ...registerUserPayload, ...data });
  };

  const value = {
    activeStep,
    userId,
    isLoading,
    userPayload: registerUserPayload,
    activeStepError: findError(activeStep),
    onBoardType: onBoardType.Investor,
    activeStepIndex,
    updateActiveStep,
    setUserId,
    registerUser,
    goBack,
    updateUserPayload
  };

  return (
    <Provider value={value}>
      <AuthErrorWrapper activeStep={activeStep} error={activeStepError}>
        {children}
      </AuthErrorWrapper>
    </Provider>
  );
};

export const useInvestorSignUpStepper = (): InvestorSignUpStepperContextProps =>
  useContext(InvestorSignUpStepperContext);
