import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaxReporter from './TaxReporter';

// Mock the necessary dependencies for the component
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key })
}));

describe('TaxReporter Component', () => {
  test('renders TaxReporter component with form field and error message', () => {
    render(
      <TaxReporter
        updateActiveStep={() => {}}
        registerUser={() => {}}
        userPayload={{ peselNumber: '' }}
      />
    );

    // Ensure form field is rendered
    expect(screen.getByLabelText(/number_name/i)).toBeInTheDocument();

    // Ensure error message is rendered
    expect(screen.getByText(/stateserror/i)).toBeInTheDocument();
  });

  test('submits form successfully', async () => {
    const updateActiveStepMock = jest.fn();
    const registerUserMock = jest.fn();

    render(
      <TaxReporter
        updateActiveStep={updateActiveStepMock}
        registerUser={registerUserMock}
        userPayload={{ peselNumber: '' }}
      />
    );

    // Type into the input field
    await userEvent.type(screen.getByLabelText(/number_name/i), '123456789');

    // Submit the form
    fireEvent.click(screen.getByText(/continue/i));

    // Wait for form submission
    await waitFor(() => {
      // Ensure form is submitted successfully
      expect(registerUserMock).toHaveBeenCalledWith({
        payload: {
          peselNumber: '123456789',
          dryRun: true
        },
        onSuccess: expect.any(Function)
      });
    });
  });
});
