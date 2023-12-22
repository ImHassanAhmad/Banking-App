import { InvestorSignUpFlowSteps } from '@app/layout/InvestorSignUpStepper/types';
import {
  useOnBoardingDictionaryApiQuery,
  useRegisterUserMutation
} from '@app/store/api/onboarding';
import { useAppDispatch } from '@app/store/hooks';
import { setSupportedCountries } from '@app/store/slices/userData';
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  useContext,
  type FC,
  type PropsWithChildren,
  useEffect
} from 'react';
import {
  type RegisterUserResponseDto,
  type RegisterUserRequestDto,
  type AuthFetchQueryError,
  AuthErrorLevel,
  onBoardType
} from '@app/common/types';
import { useAuthError } from './AuthErrorContext';
import { type IErrorMessage } from 'types';
import AuthErrorWrapper from '@app/layout/AuthErrorWrapper';
import { enumToIndexRecord, indexToEnumKeyRecord } from '@app/utils/enum';

export interface RegisterUserCallBackParams {
  payload: RegisterUserRequestDto;
  onSuccess: (response: RegisterUserResponseDto) => void;
  onError?: (error: AuthFetchQueryError) => void;
}

export interface InvestorSignUpStepperContextProps {
  activeStep: InvestorSignUpFlowSteps;
  userId: string;
  isLoading: boolean;
  userPayload: RegisterUserRequestDto;
  activeStepError?: IErrorMessage;
  onBoardType: onBoardType;
  registerUser: (params: RegisterUserCallBackParams) => void;
  setUserId: Dispatch<SetStateAction<string>>;
  updateActiveStep: () => void;
  goBack: (backStep: number) => void;
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
  const [registerUserPayload, setRegisterUserPayload] = useState<RegisterUserRequestDto>({
    dryRun: true
  });
  const [register, { isLoading }] = useRegisterUserMutation();
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
    const nextActiveStep: InvestorSignUpFlowSteps = indexToEnumKeyRecord(InvestorSignUpFlowSteps)[
      enumToIndexRecord(InvestorSignUpFlowSteps)[activeStep] + 1
    ] as InvestorSignUpFlowSteps;

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
    console.log('registeruserpayload', registerUserPayload);
    const registerFormData = { ...registerUserPayload, ...payload };
    let apiPayload: RegisterUserRequestDto = { dryRun: true };
    switch (activeStep) {
      case InvestorSignUpFlowSteps.Email:
        apiPayload.email = registerFormData.email;
        break;
      case InvestorSignUpFlowSteps.Mobile:
        apiPayload.phoneNumberCountryCode = registerFormData.phoneNumberCountryCode;
        apiPayload.shortenPhoneNumber = registerFormData.shortenPhoneNumber;
        break;
      case InvestorSignUpFlowSteps.CreatePassword:
        apiPayload = { ...registerFormData, dryRun: false };
        break;
      default:
    }

    setRegisterUserPayload({ ...registerUserPayload, ...payload, ...apiPayload });
    const userPayload = {
      vis: true,
      visaTncAgreed: true,
      wittyTncAgreed: true,
      companyName: 'Temoral Company Name',
      registrationNumber: Date.now().toString().slice(0, 10)
    };
    register({ ...registerUserPayload, ...userPayload, ...payload })
      .unwrap()
      .then((response: RegisterUserResponseDto) => {
        onSuccess(response);
        // setRegisterUserPayload({ ...registerUserPayload, ...userPayload, ...apiPayload });
      })
      .catch((error: AuthFetchQueryError) => {
        handleError(error, onSuccess, onError);
      });
  };

  const activeStepError = findError(activeStep);

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
    goBack
  };
  const dispatch = useAppDispatch();
  const { data } = useOnBoardingDictionaryApiQuery();

  useEffect(() => {
    if (!data) return;
    dispatch(setSupportedCountries(data));
  }, [data]);

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
