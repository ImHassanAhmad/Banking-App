import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import CompanyStructure from './CompanyStructure';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { MemoryRouter as Router } from 'react-router-dom'; // Use MemoryRouter or BrowserRouter based on your needs
import type { PropsWithChildren, ReactNode } from 'react';
import { act } from 'react-dom/test-utils';
import { setEmail } from '@app/store/slices/userData';
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

describe('CompanyStructure Component', () => {
  const mockProps = {
    nextStep: () => {
      store.dispatch(setStep(1));
    }
  };

  it('renders CompanyStructure component without crashing', () => {
    render(<CompanyStructure {...mockProps} />, { wrapper });
    expect(screen.getByTestId('company-structure')).toBeInTheDocument();
  });

  it('render form', () => {
    render(<CompanyStructure {...mockProps} />, { wrapper });
    expect(screen.getByTestId('company-structure-form-0')).toBeInTheDocument();
    expect(screen.getByLabelText(en[RouteNames.ISSUER_ONBOARDING].type)).toBeInTheDocument();
    expect(screen.getByLabelText(en[RouteNames.ISSUER_ONBOARDING].name)).toBeInTheDocument();
    expect(screen.getByLabelText(en[RouteNames.ISSUER_ONBOARDING].email)).toBeInTheDocument();
    expect(screen.getByTestId('company-structure-add')).toBeInTheDocument();
    expect(screen.getByTestId('company-structure-continue')).toBeInTheDocument();
  });

  async function addForm(): Promise<void> {
    const addButton = screen.getByTestId('company-structure-add');
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByTestId('company-structure-form-1')).toBeInTheDocument();
    });
  }

  it('add another form on click', async () => {
    render(<CompanyStructure {...mockProps} />, { wrapper });
    await addForm();
  });

  it('remove form on click', async () => {
    render(<CompanyStructure {...mockProps} />, { wrapper });
    await addForm();
    const removeButton = screen.getByTestId('company-structure-remove-1');
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton);
    await waitFor(() => {
      const element = screen.queryByTestId('company-structure-form-1');
      expect(element).toBeNull();
    });
  });

  it('submit form', async () => {
    store.dispatch(setEmail('dummy@example.com'));

    render(<CompanyStructure {...mockProps} />, { wrapper });

    const typeField = screen.getByTestId('ubos.0.type');
    const emailField = screen.getByTestId('ubos.0.email');
    const nameField = screen.getByTestId('ubos.0.name');

    expect(typeField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(nameField).toBeInTheDocument();

    act(() => {
      fireEvent.change(typeField, {
        target: { value: 'dummy', name: 'ubos.0.type' }
      });
      fireEvent.change(emailField, { target: { value: 'dummy@gmail.com', name: 'ubos.0.email' } });
      fireEvent.change(nameField, { target: { value: 'dummy', name: 'ubos.0.name' } });
    });
    // Check if the input value has been updated
    act(() => {
      expect(typeField).toHaveValue('dummy');
      expect(emailField).toHaveValue('dummy@gmail.com');
      expect(nameField).toHaveValue('dummy');
    });

    const continueButton = screen.getByTestId('company-structure-continue');
    expect(continueButton).toBeInTheDocument();
    fireEvent.click(continueButton);
    await waitFor(() => {
      const step = store.getState().postOnboarding.activeStep;
      expect(step).toEqual(1);
    });
  });
});
