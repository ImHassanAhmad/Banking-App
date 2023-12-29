import { IssuerSignUpFlowSteps } from '@app/layout/IssuerSignUpStepper/types';
import { useRegisterUserMutation } from '@app/store/api/onboarding';
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
  type IssuerUserRequestDto
} from '@app/common/types';
import { useAuthError } from './AuthErrorContext';
import { type IErrorMessage } from 'types';
import AuthErrorWrapper from '@app/layout/AuthErrorWrapper';
import { enumToIndexRecord, indexToEnumKeyRecord } from '@app/utils/enum';

export interface RegisterUserCallBackParams {
  payload: IssuerUserRequestDto;
  onSuccess: (response: RegisterUserResponseDto) => void;
  onError?: (error: AuthFetchQueryError) => void;
}

export interface IssuerSignUpStepperContextProps {
  activeStep: IssuerSignUpFlowSteps;
  userId: string;
  isLoading: boolean;
  userPayload: IssuerUserRequestDto;
  activeStepError?: IErrorMessage;
  onBoardType: onBoardType;
  registerUser: (params: RegisterUserCallBackParams) => void;
  setUserId: Dispatch<SetStateAction<string>>;
  updateActiveStep: () => void;
  goBack: (backStep: number) => void;
  updateUserPayload: (data: Partial<IssuerUserRequestDto>) => void;
}

const IssuerSignUpStepperContext = createContext<IssuerSignUpStepperContextProps>({
  activeStep: IssuerSignUpFlowSteps.BusinessType,
  userId: '',
  error: {},
  isLoading: false,
  userPayload: { dryRun: true }
} as any);

const { Provider } = IssuerSignUpStepperContext;

export const IssuerSignUpStepperProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(IssuerSignUpFlowSteps.CreatePassword);
  const [userId, setUserId] = useState('');
  const { updateError, findError } = useAuthError();
  const [registerUserPayload, setRegisterUserPayload] = useState<IssuerUserRequestDto>({
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
    if (activeStep === IssuerSignUpFlowSteps.MobileVerify) {
      setRegisterUserPayload({ dryRun: true });
    }

    const nextActiveStep: IssuerSignUpFlowSteps =
      (indexToEnumKeyRecord(IssuerSignUpFlowSteps)[
        enumToIndexRecord(IssuerSignUpFlowSteps)[activeStep] + 1
      ] as IssuerSignUpFlowSteps) || IssuerSignUpFlowSteps.Country;

    updateError(nextActiveStep, undefined);
    setActiveStep(nextActiveStep);
  };

  const goBack = (backStep: number): void => {
    updateError(backStep, undefined);
    setActiveStep(indexToEnumKeyRecord(IssuerSignUpFlowSteps)[backStep] as IssuerSignUpFlowSteps);
  };

  const registerUser = ({
    payload,
    onSuccess,
    onError = () => {}
  }: RegisterUserCallBackParams): void => {
    const registerFormData = { ...registerUserPayload, ...payload };
    let apiPayload: IssuerUserRequestDto = { dryRun: true };
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
      default:
    }

    setRegisterUserPayload({ ...registerUserPayload, ...payload });

    register({ ...apiPayload })
      .unwrap()
      .then((response: RegisterUserResponseDto) => {
        onSuccess(response);
        if (activeStep === IssuerSignUpFlowSteps.CreatePassword)
          setRegisterUserPayload({ dryRun: true });
      })
      .catch((error: AuthFetchQueryError) => {
        handleError(error, onSuccess, onError);
      });
  };

  const activeStepError = findError(activeStep);

  const updateUserPayload = (data: Partial<IssuerUserRequestDto>): void => {
    setRegisterUserPayload({ ...registerUserPayload, ...data });
    console.log(registerUserPayload, data);
  };

  const value = {
    activeStep,
    userId,
    isLoading,
    userPayload: registerUserPayload,
    activeStepError: findError(activeStep),
    onBoardType: onBoardType.Issuer,
    updateUserPayload,
    updateActiveStep,
    setUserId,
    registerUser,
    goBack
  };

  // const dispatch = useAppDispatch();
  // const { data } = useOnBoardingDictionaryApiQuery();

  // useEffect(() => {
  //   if (!data) return;
  //   dispatch(setSupportedCountries(data));
  // }, [data]);

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
