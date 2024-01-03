import { fireEvent, render, screen } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import IssuerKyc from './IssuerKyc';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { MemoryRouter as Router } from 'react-router-dom'; // Use MemoryRouter or BrowserRouter based on your needs
import type { PropsWithChildren, ReactNode } from 'react';
import { act } from 'react-dom/test-utils';
import { setEmail, setPostOnboardingCompleted } from '@app/store/slices/userData';
import { setStep } from '@app/store/slices/issuerOnboarding';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.ISSUER_ONBOARDING);

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
    <Router initialEntries={['/issuer-onboarding']} initialIndex={0}>
      {children}
    </Router>
  </Provider>
);

describe('IssuerKyc Component', () => {
  const mockProps = {
    previousStep: () => {
      store.dispatch(setStep(1));
    },
    submit: () => {
      store.dispatch(setPostOnboardingCompleted(true));
    },
    setter: jest.fn(),
    uploadedFiles: {
      passport: undefined,
      national_id: undefined,
      residence_proof: undefined,
      profile_picture: undefined
    }
  };

  it('renders IssuerKyc component without crashing', () => {
    render(<IssuerKyc {...mockProps} />, { wrapper });
    expect(screen.getByTestId('issuer-kyc')).toBeInTheDocument();
  });

  it('render form', () => {
    render(<IssuerKyc {...mockProps} />, { wrapper });
    expect(screen.getByLabelText(en[RouteNames.ISSUER_ONBOARDING].name)).toBeInTheDocument();
    expect(screen.getByLabelText(en[RouteNames.ISSUER_ONBOARDING].role)).toBeInTheDocument();
    expect(screen.getByLabelText(en[RouteNames.ISSUER_ONBOARDING].name)).toBeInTheDocument();
    expect(screen.getByLabelText(en[RouteNames.ISSUER_ONBOARDING].email)).toBeInTheDocument();
    expect(screen.getByTestId('issuer-kyc-submit')).toBeInTheDocument();
  });

  it('submit form', async () => {
    store.dispatch(setEmail('dummy@example.com'));

    render(<IssuerKyc {...mockProps} />, { wrapper });

    const phoneField = screen.getByTestId('phone');
    const roleField = screen.getByTestId('role');
    const emailField = screen.getByTestId('email');
    const nameField = screen.getByTestId('name');

    expect(phoneField).toBeInTheDocument();
    expect(roleField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(nameField).toBeInTheDocument();

    act(() => {
      fireEvent.change(phoneField, {
        target: { value: '676767676767676', name: 'phone' }
      });
      fireEvent.change(roleField, {
        target: { value: 'dummy', name: 'role' }
      });
      fireEvent.change(emailField, { target: { value: 'dummy@gmail.com', name: 'email' } });
      fireEvent.change(nameField, { target: { value: 'dummy', name: 'name' } });
    });

    act(() => {
      expect(phoneField).toHaveValue('676767676767676');
      expect(roleField).toHaveValue('dummy');
      expect(emailField).toHaveValue('dummy@gmail.com');
      expect(nameField).toHaveValue('dummy');
    });
  });
});
