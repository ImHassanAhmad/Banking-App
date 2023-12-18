import { fireEvent, render, screen } from '@testing-library/react';
import Password from './Password';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';

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

describe('Password Component', () => {
  it('renders the password field', () => {
    render(<Password />);
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });
  it('renders the password field and trigger the input change', () => {
    render(<Password />);
    const password: string = 'pass124@';
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput.getAttribute('value')).toEqual(password);
  });
});
