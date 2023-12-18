import { IssuerSignUpFlowSteps } from '@app/layout/IssuerSignUpStepper/types';
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

interface IssuerSignUpStepperContextProps {
  activeStep: IssuerSignUpFlowSteps;
  userId: string;
  isLoading: boolean;
  userPayload: RegisterUserRequestDto;
  activeStepError?: IErrorMessage;
  registerUser: (params: RegisterUserCallBackParams) => void;
  setUserId: Dispatch<SetStateAction<string>>;
  updateActiveStep: (step: IssuerSignUpFlowSteps) => void;
}

const IssuerSignUpStepperContext = createContext<IssuerSignUpStepperContextProps>({
  activeStep: IssuerSignUpFlowSteps.BusinessDescription,
  userId: '',
  error: {},
  isLoading: false,
  userPayload: { dryRun: true }
} as any);

const { Provider } = IssuerSignUpStepperContext;

export const IssuerSignUpStepperProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(IssuerSignUpFlowSteps.Country);
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

  const updateActiveStep = (activeStep: IssuerSignUpFlowSteps): void => {
    updateError(activeStep, undefined);

    setActiveStep(activeStep);
  };

  const registerUser = ({
    payload,
    onSuccess,
    onError = () => {}
  }: RegisterUserCallBackParams): void => {
    const registerFormData = { ...registerUserPayload, ...payload };
    let apiPayload: RegisterUserRequestDto = { dryRun: true };
    switch (activeStep) {
      case IssuerSignUpFlowSteps.Country:
        apiPayload.countryOfIncorporation = registerFormData.countryOfIncorporation;
        break;
      case IssuerSignUpFlowSteps.Email:
        apiPayload.email = registerFormData.email;
        break;
      case IssuerSignUpFlowSteps.Mobile:
        apiPayload.phoneNumberCountryCode = registerFormData.phoneNumberCountryCode;
        apiPayload.shortenPhoneNumber = registerFormData.shortenPhoneNumber;
        break;
      case IssuerSignUpFlowSteps.AboutOurServices:
        apiPayload.visaTncAgreed = registerFormData.visaTncAgreed;
        apiPayload.wittyTncAgreed = registerFormData.wittyTncAgreed;
        break;
      case IssuerSignUpFlowSteps.CreatePassword:
        apiPayload = { ...registerFormData, dryRun: false };
        break;
      case IssuerSignUpFlowSteps.EmailVerify:
      case IssuerSignUpFlowSteps.MobileVerify:
      default:
    }

    setRegisterUserPayload({ ...registerUserPayload, ...payload });
    const userPayload = {
      vis: true,
      visaTncAgreed: true,
      wittyTncAgreed: true,
      companyName: 'Temoral Company Name',
      registrationNumber: Date.now().toString().slice(0, 10)
    };
    register({ ...apiPayload, ...userPayload })
      .unwrap()
      .then((response: RegisterUserResponseDto) => {
        onSuccess(response);
        setRegisterUserPayload({ dryRun: true, ...userPayload });
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

export const useIssuerSignUpStepper = (): IssuerSignUpStepperContextProps =>
  useContext(IssuerSignUpStepperContext);
