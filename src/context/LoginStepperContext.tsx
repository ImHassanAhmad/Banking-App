import { LoginFlowSteps } from '@app/layout/LoginStepper/types';
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
import { useAuthError } from './AuthErrorContext';
import { type IErrorMessage } from 'types';
import AuthErrorWrapper from '@app/layout/AuthErrorWrapper';

interface LoginStepperContextProps {
  email: string;
  activeStep: LoginFlowSteps;
  otpId: string;
  setActiveStep: Dispatch<SetStateAction<LoginFlowSteps>>;
  setOtpId: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  activeStepError?: IErrorMessage;
}

const LoginStepperContext = createContext<LoginStepperContextProps>({
  email: '',
  activeStep: LoginFlowSteps.Login,
  otpId: ''
} as any);

const { Provider } = LoginStepperContext;

export const LoginStepperProvider: FC<PropsWithChildren> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [activeStep, setActiveStep] = useState(LoginFlowSteps.Login);
  const { updateError } = useAuthError();
  const [otpId, setOtpId] = useState('');
  const { findError } = useAuthError();

  useEffect(() => {
    updateError(activeStep, undefined);
  }, [activeStep]);

  const activeStepError = findError(activeStep);

  const value = {
    activeStep,
    otpId,
    email,
    activeStepError,
    setActiveStep,
    setOtpId,
    setEmail
  };

  return (
    <Provider value={value}>
      <AuthErrorWrapper activeStep={activeStep} error={activeStepError}>
        {children}
      </AuthErrorWrapper>
    </Provider>
  );
};

export const useLoginStepper = (): LoginStepperContextProps => useContext(LoginStepperContext);
