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
import { type IErrorMessage } from '@app/types/types';
import AuthErrorWrapper from '@app/layout/AuthErrorWrapper';
import { ResetPasswordFlowSteps } from '@app/layout/ResetPasswordStepper/types';

interface ResetPasswordContextProps {
  email: string;
  activeStep: ResetPasswordFlowSteps;
  otpId: string;
  setActiveStep: Dispatch<SetStateAction<ResetPasswordFlowSteps>>;
  setOtpId: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  activeStepError?: IErrorMessage;
}

const ResetPasswordContext = createContext<ResetPasswordContextProps>({
  email: '',
  activeStep: ResetPasswordFlowSteps.Email,
  otpId: ''
} as any);

const { Provider } = ResetPasswordContext;

export const ResetPasswordContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [activeStep, setActiveStep] = useState(ResetPasswordFlowSteps.Email);
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

export const useResetPasswordStepper = (): ResetPasswordContextProps =>
  useContext(ResetPasswordContext);
