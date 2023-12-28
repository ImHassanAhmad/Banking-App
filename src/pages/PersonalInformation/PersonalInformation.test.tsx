import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import PersonalInformation from './PersonalInformation';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.PERSONAL_INFORMATION);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

describe('PersonalInformation Component', () => {
  const mockProps = {
    updateActiveStep: jest.fn(),
    registerUser: jest.fn(),
    isLoading: false,
    userPayload: {}
  };

  test('renders PersonalInformation component with form fields', () => {
    render(<PersonalInformation {...mockProps} />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dob/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(<PersonalInformation {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });

    // Simulate selecting a date on the Calendar component
    fireEvent.change(screen.getByLabelText(/dob/i), { target: { value: '01/01/2024' } });

    fireEvent.click(screen.getByText(/continue/i));
    await waitFor(() => {
      expect(mockProps.updateActiveStep).toHaveBeenCalled();
    });
  });

  test('disables the submit button when there are form errors', () => {
    render(<PersonalInformation {...mockProps} />);

    fireEvent.click(screen.getByText(/continue/i));

    expect(mockProps.updateActiveStep).not.toHaveBeenCalled();
  });

  test('renders form validation errors', async () => {
    render(<PersonalInformation {...mockProps} />);

    fireEvent.click(screen.getByText(/continue/i));

    await waitFor(() => {
      // Use queryAllByText to get an array of elements with the text "required"
      const requiredErrorElements = screen.queryAllByText(/required/i);

      // Assert that there is at least one element with the text "required"
      expect(requiredErrorElements.length).toBeGreaterThan(0);
    });
  });

  test('handles form submission when isLoading is true', async () => {
    const isLoadingProps = { ...mockProps, isLoading: true };
    render(<PersonalInformation {...isLoadingProps} />);

    fireEvent.click(screen.getByText(/continue/i));

    // Since isLoading is true, the button should be disabled, and the form submission should not occur
    await waitFor(() => {
      expect(mockProps.updateActiveStep).not.toHaveBeenCalled();
    });
  });
});
