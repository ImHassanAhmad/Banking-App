import { render, screen } from '@testing-library/react';
import RegisterEmail from './RegisterEmail';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import { useRegisterUserMutation } from '@app/store/api/onboarding';
import { useInvestorSignUpStepper } from '@app/context/InvestorSignUpStepperContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  }),
  i18n: {}
}));
jest.mock('react-router', () => ({
  useNavigate: () => jest.fn()
}));

jest.mock('@app/store/api/onboarding', () => ({
  useRegisterUserMutation: jest.fn(() => ({
    mockReturnValue: jest.fn() // Mock the useRegisterUserMutation
  })) as any
}));

jest.mock(
  '@app/context/InvestorSignUpStepperContext.tsx',
  () =>
    ({
      useInvestorSignUpStepper: () => ({ userPayload: {} }) as any
    }) as any
);

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.REGISTER_EMAIL);

const renderRegisterEmail = (): void => {
  const props = useInvestorSignUpStepper();
  render(<RegisterEmail {...props} />);
};

describe('RegisterEmail Component', () => {
  it('renders the RegisterEmail component with expected title and subtitle', () => {
    const mockUseRegisterUserMutation = useRegisterUserMutation as jest.Mock;
    mockUseRegisterUserMutation.mockReturnValue([jest.fn()]);

    renderRegisterEmail();
    expect(screen.getByText(en['register-email'].title)).toBeInTheDocument();
    expect(screen.getByText(en['register-email'].subtitle)).toBeInTheDocument();
  });

  it('renders the email input field with a label', () => {
    const mockUseRegisterUserMutation = useRegisterUserMutation as jest.Mock;
    mockUseRegisterUserMutation.mockReturnValue([jest.fn()]);

    renderRegisterEmail();
    const emailInput = screen.getByLabelText(en[RouteNames.REGISTER_EMAIL].email_input_label);
    expect(emailInput).toBeInTheDocument();
  });
  it('renders the "CONTINUE" button', () => {
    const mockUseRegisterUserMutation = useRegisterUserMutation as jest.Mock;
    mockUseRegisterUserMutation.mockReturnValue([jest.fn()]);

    renderRegisterEmail();
    const continueButton = screen.getByText(en[RouteNames.REGISTER_EMAIL].continue);
    expect(
      screen.getByRole('button', { name: en[RouteNames.REGISTER_EMAIL].continue })
    ).toBeInTheDocument();

    expect(continueButton).toBeInTheDocument();
  });
});
