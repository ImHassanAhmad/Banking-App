import { type AuthPageSteps } from '@app/context/AuthErrorContext';
import { type IErrorMessage } from 'types';

export interface AuthErrorWrapperProps {
  error?: IErrorMessage;
  activeStep: AuthPageSteps;
}
