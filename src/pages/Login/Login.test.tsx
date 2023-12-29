import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from './Login';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import { store } from '@app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoginStepperProvider } from '@app/context/LoginStepperContext';
import { AuthErrorProvider } from '@app/context/AuthErrorContext';
import type React from 'react';
import { type JSX } from 'react/jsx-runtime';
import {
  MOCK_CAPTCHA_VALUE,
  MOCK_LOGIN_EMAIL,
  MOCK_LOGIN_PASSWORD
} from '@app/store/api/mock/constants/onboarding.const';
import {
  MOCK_LOGIN_EMAIL_SOMETHING_WENTWRONG,
  MOCK_LOGIN_EMAIL_TOO_MANY_ATTEMPTS,
  INCORRECT_LOGIN_DATA,
  TOO_MANY_INVALID_LOGIN_ATTEMPTS
} from '@app/store/api/mock/constants/login.const';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.LOGIN);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

jest.mock('react-google-recaptcha', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  // eslint-disable-next-line react/display-name
  const RecaptchaV2 = React.forwardRef(
    (
      props: JSX.IntrinsicAttributes &
        React.ClassAttributes<HTMLInputElement> &
        React.InputHTMLAttributes<HTMLInputElement>,
      ref: React.LegacyRef<HTMLInputElement> | undefined
    ) => {
      React.useImperativeHandle(ref, () => ({
        reset: jest.fn(),
        executeAsync: () => MOCK_CAPTCHA_VALUE
      }));
      return <input ref={ref} data-testid="mock-v2-captcha-element" {...props} />;
    }
  );

  return RecaptchaV2;
});

const initialRender = (): void => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <AuthErrorProvider>
            <LoginStepperProvider>
              <Login />
            </LoginStepperProvider>
          </AuthErrorProvider>
        </Router>
      </Provider>
    );
  });
};

describe('Login', () => {
  it('renders the login form', () => {
    initialRender();

    // Ensure the title and subtitle are rendered
    expect(screen.getByText(en.login.title)).toBeInTheDocument();
    expect(screen.getByText(en.login.subtitle)).toBeInTheDocument();

    // Ensure the form fields and submit button are present
    expect(screen.getByText(en.login.signup)).toBeInTheDocument();
    expect(screen.getByText(en.login.login)).toBeInTheDocument();
    expect(screen.getByText(en.login.forgot_password)).toBeInTheDocument();
  });

  it('render Input Field', () => {
    initialRender();
    expect(screen.getByLabelText(en.login.email_input_label)).toBeInTheDocument();
    expect(screen.getByLabelText(en.login.password_input_label)).toBeInTheDocument();
    expect(screen.getByTestId('login-submit')).toBeInTheDocument();
  });

  it('check if password and email is required rendered in to the fields', async () => {
    initialRender();

    const loginBtn = screen.getByTestId('login-submit');

    await act(() => {
      return fireEvent.click(loginBtn);
    });

    await waitFor(() => {
      expect(screen.getByText(/email is a required field/i)).toBeInTheDocument();
      expect(screen.getByText(/password is a required field/i)).toBeInTheDocument();
    });
  });

  it('test login api mutation', async () => {
    initialRender();

    const emailLoginInput = screen.getByTestId('email-test-id');
    const passwordInput = screen.getByTestId('password-test-id');
    const loginBtn = screen.getByTestId('login-submit');

    act(() => {
      fireEvent.input(emailLoginInput, { target: { value: MOCK_LOGIN_EMAIL, name: 'email' } });
      fireEvent.input(passwordInput, { target: { value: MOCK_LOGIN_PASSWORD, name: 'password' } });
    });
    await waitFor(() => {
      expect(emailLoginInput).toHaveValue(MOCK_LOGIN_EMAIL);
      expect(passwordInput).toHaveValue(MOCK_LOGIN_PASSWORD);
    });
    await act(() => {
      return fireEvent.click(loginBtn);
    });
  });

  it('should return the wrong login data information', async () => {
    initialRender();

    const emailLoginInput = screen.getByTestId('email-test-id');
    const passwordInput = screen.getByTestId('password-test-id');
    const loginBtn = screen.getByTestId('login-submit');

    act(() => {
      fireEvent.input(emailLoginInput, {
        target: { value: MOCK_LOGIN_EMAIL + 'A', name: 'email' }
      });
      fireEvent.input(passwordInput, { target: { value: MOCK_LOGIN_PASSWORD, name: 'password' } });
    });

    await act(() => {
      return fireEvent.click(loginBtn);
    });

    await waitFor(() => {
      expect(screen.getByText(INCORRECT_LOGIN_DATA)).toBeInTheDocument();
    });
  });

  it('should block the user for multiple invalid inputs', async () => {
    initialRender();

    const emailLoginInput = screen.getByTestId('email-test-id');
    const passwordInput = screen.getByTestId('password-test-id');
    const loginBtn = screen.getByTestId('login-submit');

    act(() => {
      fireEvent.input(emailLoginInput, {
        target: { value: MOCK_LOGIN_EMAIL_TOO_MANY_ATTEMPTS, name: 'email' }
      });
      fireEvent.input(passwordInput, {
        target: { value: MOCK_LOGIN_PASSWORD, name: 'password' }
      });
    });

    await act(() => {
      return fireEvent.click(loginBtn);
    });

    await waitFor(() => {});
    expect(screen.getByText(TOO_MANY_INVALID_LOGIN_ATTEMPTS)).toBeInTheDocument();
  });

  it('should render the something went wrong error on multiple bad inputs', async () => {
    initialRender();

    const emailLoginInput = screen.getByTestId('email-test-id');
    const passwordInput = screen.getByTestId('password-test-id');
    const loginBtn = screen.getByTestId('login-submit');

    act(() => {
      fireEvent.input(emailLoginInput, {
        target: { value: MOCK_LOGIN_EMAIL_SOMETHING_WENTWRONG, name: 'email' }
      });
      fireEvent.input(passwordInput, { target: { value: MOCK_LOGIN_PASSWORD, name: 'password' } });
    });

    for (let i = 0; i < 12; i++) {
      await act(() => {
        return fireEvent.click(loginBtn);
      });
    }

    await waitFor(() => {
      expect(screen.getAllByText(/Something went wrong./i)).toBeDefined();
    });
  });
});
