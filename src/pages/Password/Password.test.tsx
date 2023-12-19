import { fireEvent, render, screen } from '@testing-library/react';
import Password from './Password';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import { useInvestorSignUpStepper } from '@app/context/InvestorSignUpStepperContext';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.CREATE_PASSWORD);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  }),
  i18n: {}
}));
jest.mock('react-router', () => ({
  useNavigate: () => jest.fn()
}));

jest.mock(
  '@app/context/InvestorSignUpStepperContext.tsx',
  () =>
    ({
      useInvestorSignUpStepper: () => ({}) as any
    }) as any
);

const renderPassword = (): void => {
  const props = useInvestorSignUpStepper();
  render(<Password {...props} />);
};

describe('Password Component', () => {
  it('renders the password field', () => {
    renderPassword();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });
  it('renders the password field and trigger the input change', () => {
    renderPassword();
    const password: string = 'pass124@';
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput.getAttribute('value')).toEqual(password);
  });
});
