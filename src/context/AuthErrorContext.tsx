import { type LoginFlowSteps } from '@app/layout/LoginStepper/types';
import { type SignUpFlowSteps } from '@app/layout/SignUpStepper/types';
import { createContext, useState, useContext, type FC, type PropsWithChildren } from 'react';
import { type IErrorMessage } from 'types';

export type AuthPageSteps = SignUpFlowSteps | LoginFlowSteps;

interface AuthErrorContextProps {
  findError: (step: AuthPageSteps) => IErrorMessage | undefined;
  updateError: (step: AuthPageSteps, error?: IErrorMessage) => void;
}

type AuthErrorDataType = Partial<Record<AuthPageSteps, IErrorMessage | undefined>>;

const AuthErrorContext = createContext<AuthErrorContextProps>({
  error: {}
} as any);

const { Provider } = AuthErrorContext;

export const AuthErrorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authError, setAuthError] = useState<AuthErrorDataType>({});

  const updateError = (step: AuthPageSteps, error?: IErrorMessage): void => {
    setAuthError({ ...authError, [step]: error });
  };

  const findError = (step: AuthPageSteps): IErrorMessage | undefined => authError[step];

  const value = {
    findError,
    updateError
  };

  return <Provider value={value}>{children}</Provider>;
};

export const useAuthError = (): AuthErrorContextProps => useContext(AuthErrorContext);
