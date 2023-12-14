import { type RenderResult, fireEvent, render, screen } from '@testing-library/react';
import PasswordField from './PasswordField';
import { RouteNames } from '@app/constants/routes';
import { en } from '@app/i18n/translations';
import transformation from '@app/utils/LanguageTransformation';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.CREATE_PASSWORD);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key],
    i18n: {
      language: 'en',
      changeLanguage: jest.fn()
    }
  })
}));

describe('PasswordField Component', () => {
  let renderResult: RenderResult;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    renderResult = render(<PasswordField onChange={onChangeMock} />);
  });

  it('renders correctly', () => {
    expect(renderResult.container).toMatchSnapshot(); // You can use snapshots if configured
  });

  it('toggles password visibility on button click', () => {
    const passwordInput = screen.getByTestId('password-input');
    const toggleButton = screen.getByAltText('eye');

    // Password input should be of type "password" initially
    expect(passwordInput.getAttribute('type')).toBe('password');

    fireEvent.mouseDown(toggleButton);
    expect(passwordInput.getAttribute('type')).toBe('text');

    fireEvent.mouseUp(toggleButton);
    fireEvent.mouseLeave(toggleButton);
    expect(passwordInput.getAttribute('type')).toBe('password');
  });

  it('updates password value correctly', () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

    expect(passwordInput.value).toBe('newpassword');
  });

  it('calls onChange handler when input value changes', () => {
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('shows the correct passwordMsg value', () => {
    const passwordInput = screen.getByTestId('password-input');
    const passwordMsg = screen.getByText('Password should 13 or more characters and unique to you');

    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });

    expect(passwordMsg).toHaveTextContent('At least one capital letter');
  });
});
