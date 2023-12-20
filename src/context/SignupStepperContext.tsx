import { SignUpFlowSteps } from '@app/layout/SignUpStepper/types';
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
  AuthErrorLevel
} from '@app/common/types';
import { useAuthError } from './AuthErrorContext';
import { type IErrorMessage } from 'types';
import AuthErrorWrapper from '@app/layout/AuthErrorWrapper';

export interface RegisterUserCallBackParams {
  payload: RegisterUserRequestDto;
  onSuccess: (response: RegisterUserResponseDto) => void;
  onError?: (error: AuthFetchQueryError) => void;
}

interface SignUpStepperContextProps {
  activeStep: SignUpFlowSteps;
  userId: string;
  isLoading: boolean;
  userPayload: RegisterUserRequestDto;
  activeStepError?: IErrorMessage;
  registerUser: (params: RegisterUserCallBackParams) => void;
  setUserId: Dispatch<SetStateAction<string>>;
  updateActiveStep: (step: SignUpFlowSteps) => void;
}

const SignUpStepperContext = createContext<SignUpStepperContextProps>({
  activeStep: SignUpFlowSteps.BusinessDescription,
  userId: '',
  error: {},
  isLoading: false,
  userPayload: { dryRun: true }
} as any);

const { Provider } = SignUpStepperContext;

export const SignUpStepperProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(SignUpFlowSteps.Country);
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

  const updateActiveStep = (activeStep: SignUpFlowSteps): void => {
    updateError(activeStep, undefined);

    setActiveStep(activeStep);
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
      case SignUpFlowSteps.Country:
        apiPayload.countryOfIncorporation = registerFormData.countryOfIncorporation;
        break;
      case SignUpFlowSteps.Email:
        apiPayload.email = registerFormData.email;
        break;
      case SignUpFlowSteps.Mobile:
        apiPayload.phoneNumberCountryCode = registerFormData.phoneNumberCountryCode;
        apiPayload.shortenPhoneNumber = registerFormData.shortenPhoneNumber;
        break;
      case SignUpFlowSteps.AboutOurServices:
        apiPayload.visaTncAgreed = registerFormData.visaTncAgreed;
        apiPayload.wittyTncAgreed = registerFormData.wittyTncAgreed;
        break;
      case SignUpFlowSteps.CreatePassword:
        apiPayload = { ...registerFormData, dryRun: false };
        break;
      case SignUpFlowSteps.EmailVerify:
      case SignUpFlowSteps.MobileVerify:
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
    updateActiveStep,
    setUserId,
    registerUser
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

export const useSignUpStepper = (): SignUpStepperContextProps => useContext(SignUpStepperContext);
