import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import LegalRepresentatives from './LegalRepresentatives';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { MemoryRouter as Router } from 'react-router-dom'; // Use MemoryRouter or BrowserRouter based on your needs
import type { PropsWithChildren, ReactNode } from 'react';
import { act } from 'react-dom/test-utils';
import { setUser } from '@app/store/slices/userData';
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

describe('LegalRepresentatives Component', () => {
  const mockProps = {
    nextStep: () => {
      store.dispatch(setStep(2));
    },
    previousStep: () => {
      store.dispatch(setStep(0));
    }
  };

  it('renders LegalRepresentatives component without crashing', () => {
    render(<LegalRepresentatives {...mockProps} />, { wrapper });
    expect(screen.getByTestId('legal-representatives')).toBeInTheDocument();
  });

  it('render form', () => {
    render(<LegalRepresentatives {...mockProps} />, { wrapper });
    expect(screen.getByTestId('legal-representatives-form-0')).toBeInTheDocument();
    expect(screen.getByLabelText(en[RouteNames.ISSUER_ONBOARDING].phone)).toBeInTheDocument();
    expect(screen.getByLabelText(en[RouteNames.ISSUER_ONBOARDING].name)).toBeInTheDocument();
    expect(screen.getByLabelText(en[RouteNames.ISSUER_ONBOARDING].email)).toBeInTheDocument();
    expect(screen.getByTestId('legal-representatives-add')).toBeInTheDocument();
    expect(screen.getByTestId('legal-representatives-continue')).toBeInTheDocument();
  });

  async function addForm(): Promise<void> {
    const addButton = screen.getByTestId('legal-representatives-add');
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByTestId('legal-representatives-form-1')).toBeInTheDocument();
    });
  }

  it('add another form on click', async () => {
    render(<LegalRepresentatives {...mockProps} />, { wrapper });
    await addForm();
  });

  it('remove form on click', async () => {
    render(<LegalRepresentatives {...mockProps} />, { wrapper });
    await addForm();
    const removeButton = screen.getByTestId('legal-representatives-remove-1');
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton);
    await waitFor(() => {
      const element = screen.queryByTestId('legal-representatives-form-1');
      expect(element).toBeNull();
    });
  });

  it('submit form', async () => {
    store.dispatch(setUser({ email: 'dummy@example.com' }));

    render(<LegalRepresentatives {...mockProps} />, { wrapper });

    const phoneField = screen.getByTestId('legalRepresentative.0.phone');
    const emailField = screen.getByTestId('legalRepresentative.0.email');
    const nameField = screen.getByTestId('legalRepresentative.0.name');

    expect(phoneField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(nameField).toBeInTheDocument();

    act(() => {
      fireEvent.change(phoneField, {
        target: { value: 'dummy', name: 'legalRepresentative.0.phone' }
      });
      fireEvent.change(emailField, {
        target: { value: 'dummy@gmail.com', name: 'legalRepresentative.0.email' }
      });
      fireEvent.change(nameField, {
        target: { value: 'dummy', name: 'legalRepresentative.0.name' }
      });
    });
    // Check if the input value has been updated
    act(() => {
      expect(phoneField).toHaveValue('dummy');
      expect(emailField).toHaveValue('dummy@gmail.com');
      expect(nameField).toHaveValue('dummy');
    });

    const continueButton = screen.getByTestId('legal-representatives-continue');
    expect(continueButton).toBeInTheDocument();
    fireEvent.click(continueButton);
    await waitFor(() => {
      const step = store.getState().postOnboarding.activeStep;
      expect(step).toEqual(2);
    });
  });
});
