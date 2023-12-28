import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import Address from './Address';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.ADDRESS);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

describe('Address Component', () => {
  const mockProps = {
    updateActiveStep: jest.fn(),
    registerUser: jest.fn(),
    isLoading: false,
    userPayload: {}
  };

  test('renders Address component with form fields', () => {
    render(<Address {...mockProps} />);

    expect(screen.getByLabelText(/postal code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/street/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/house no/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(<Address {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/postal code/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Sample City' } });
    fireEvent.change(screen.getByLabelText(/street/i), { target: { value: 'Sample Street' } });
    fireEvent.change(screen.getByLabelText(/house no/i), { target: { value: '42' } });

    fireEvent.click(screen.getByText(/continue/i));

    await waitFor(() => {
      expect(mockProps.updateActiveStep).toHaveBeenCalled();
    });
  });

  test('disables the submit button when there are form errors', () => {
    render(<Address {...mockProps} />);

    fireEvent.click(screen.getByText(/continue/i));

    expect(mockProps.updateActiveStep).not.toHaveBeenCalled();
  });

  test('handles form submission when isLoading is true', async () => {
    const isLoadingProps = { ...mockProps, isLoading: true };
    render(<Address {...isLoadingProps} />);

    fireEvent.click(screen.getByText(/continue/i));

    // Since isLoading is true, the button should be disabled, and the form submission should not occur
    await waitFor(() => {
      expect(mockProps.updateActiveStep).not.toHaveBeenCalled();
    });
  });
});
