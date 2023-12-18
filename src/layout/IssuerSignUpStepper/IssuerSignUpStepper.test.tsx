import { render, screen, waitFor } from '@testing-library/react';
import IssuerStepper from './IssuerSignUpStepper';
import { en } from '@app/i18n/translations';
import transformation from '@app/utils/LanguageTransformation';
import { RouteNames } from '@app/constants/routes';
import { store } from '@app/store';
import { Provider } from 'react-redux';
import { IssuerSignUpStepperProvider } from '@app/context/IssuerSignUpStepperContext';
import { AuthErrorProvider } from '@app/context/AuthErrorContext';
import { type PropsWithChildren, type ReactNode } from 'react';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.COUNTRY);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

jest.mock('react-router', () => ({
  useNavigate: () => jest.fn()
}));

const wrapper = ({ children }: PropsWithChildren): ReactNode => (
  <Provider store={store}>
    <AuthErrorProvider>
      <IssuerSignUpStepperProvider>{children}</IssuerSignUpStepperProvider>
    </AuthErrorProvider>
  </Provider>
);

describe('IssuerStepper Component', () => {
  it('render the signup stepper component', async () => {
    render(<IssuerStepper />, { wrapper });
    await waitFor(() => {
      expect(screen.getByText(en[RouteNames.COUNTRY].title)).toBeInTheDocument();
    });
  });
});
