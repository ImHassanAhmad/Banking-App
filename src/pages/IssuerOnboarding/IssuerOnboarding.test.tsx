import { render, screen, waitFor } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import IssuerOnboarding from './IssuerOnboarding';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { MemoryRouter as Router } from 'react-router-dom'; // Use MemoryRouter or BrowserRouter based on your needs
import type { PropsWithChildren, ReactNode } from 'react';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.PERSONAL_INFORMATION);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

const mockNavigate = jest.fn(); // Mock the navigate function

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const wrapper = ({ children }: PropsWithChildren): ReactNode => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
);

describe('IssuerOnboarding Component', () => {
  it('renders IssuerOnboarding component without crashing', () => {
    render(<IssuerOnboarding />, { wrapper });
    const stepperElement = screen.getByTestId('issuer-onboarding-stepper');
    expect(stepperElement).toBeInTheDocument();
  });

  it('renders first step', async () => {
    render(<IssuerOnboarding />, { wrapper });
    await waitFor(() => {
      expect(screen.getByTestId('company-structure')).toBeInTheDocument();
    });
  });
});
