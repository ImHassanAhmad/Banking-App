import { type AuthPageSteps } from '@app/context/AuthErrorContext';
import { type IErrorMessage } from '@app/types/types';

export interface AuthErrorWrapperProps {
  error?: IErrorMessage;
  activeStep: AuthPageSteps;
}
