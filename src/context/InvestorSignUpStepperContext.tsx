import { InvestorSignUpFlowSteps } from '@app/layout/InvestorSignUpStepper/types';
import { useRegisterInvestorMutation } from '@app/store/api/onboarding';
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  useContext,
  type FC,
  type PropsWithChildren
} from 'react';
import {
  type RegisterUserResponseDto,
  type AuthFetchQueryError,
  AuthErrorLevel,
  onBoardType,
  type InvestorUserRequestDto
} from '@app/common/types';
import { useAuthError } from './AuthErrorContext';
import { type IErrorMessage } from 'types';
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
  updateUserPayload: (data: Partial<InvestorUserRequestDto>) => void;
}

const InvestorSignUpStepperContext = createContext<InvestorSignUpStepperContextProps>({
  activeStep: InvestorSignUpFlowSteps.NameAndDateOfBirth,
  userId: '',
  error: {},
  isLoading: false,
  userPayload: { dryRun: true }
} as any);

const { Provider } = InvestorSignUpStepperContext;

export const InvestorSignUpStepperProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(InvestorSignUpFlowSteps.NameAndDateOfBirth);
  const [userId, setUserId] = useState('');
  const { updateError, findError } = useAuthError();
  const [registerUserPayload, setRegisterUserPayload] = useState<InvestorUserRequestDto>({
    dryRun: true
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

  const updateActiveStep = (): void => {
    if (activeStep === InvestorSignUpFlowSteps.MobileVerify) {
      setRegisterUserPayload({ dryRun: true });
    }

    const nextActiveStep: InvestorSignUpFlowSteps =
      (indexToEnumKeyRecord(InvestorSignUpFlowSteps)[
        enumToIndexRecord(InvestorSignUpFlowSteps)[activeStep] + 1
      ] as InvestorSignUpFlowSteps) || InvestorSignUpFlowSteps.NameAndDateOfBirth;

    updateError(nextActiveStep, undefined);
    setActiveStep(nextActiveStep);
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
        apiPayload.postalCode = registerFormData.postalCode;
        apiPayload.city = registerFormData.city;
        apiPayload.street = registerFormData.street;
        apiPayload.houseNo = registerFormData.houseNo;
        break;
      case InvestorSignUpFlowSteps.Email:
        apiPayload.email = registerFormData.email;
        break;
      case InvestorSignUpFlowSteps.IncomeRange:
        apiPayload.incomeRange = registerFormData.incomeRange;
        break;
      case InvestorSignUpFlowSteps.Mobile:
        apiPayload.phoneNumberCountryCode = registerFormData.phoneNumberCountryCode;
        apiPayload.shortenPhoneNumber = registerFormData.shortenPhoneNumber;
        break;
      case InvestorSignUpFlowSteps.Questionaire:
        apiPayload.wittyNews = registerFormData.wittyNews;
        break;
      case InvestorSignUpFlowSteps.CreatePassword:
        // sourceOfIncome temporarily added to prevent an error during the account creation for the investor.
        apiPayload = { ...registerFormData, sourceOfIncome: 'revenue', dryRun: false };
        break;
      default:
    }
    setRegisterUserPayload({ ...registerUserPayload, ...payload });
    const userPayload = {
      vis: true,
      visaTncAgreed: true,
      wittyTncAgreed: true,
      privacyPolicy: true
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
